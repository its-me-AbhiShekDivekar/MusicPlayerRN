const { withDangerousMod, withPlugins } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

const withAndroidSounds = (config) => {
  return withDangerousMod(config, [
    "android",
    async (config) => {
      // 1. Android Native Path
      const resRawPath = path.join(
        config.modRequest.platformProjectRoot,
        "app/src/main/res/raw",
      );
      if (!fs.existsSync(resRawPath))
        fs.mkdirSync(resRawPath, { recursive: true });

      const src = path.join(
        config.modRequest.projectRoot,
        "assets/sounds/alarm_sound.wav",
      );
      const dest = path.join(resRawPath, "alarm_sound.wav");

      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
      return config;
    },
  ]);
};

const withIosSounds = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (config) => {
      // 2. iOS Native Path (Copies to the root of the app bundle)
      const src = path.join(
        config.modRequest.projectRoot,
        "assets/sounds/alarm_sound.wav",
      );
      const dest = path.join(
        config.modRequest.platformProjectRoot,
        "alarm_sound.wav",
      );

      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
      return config;
    },
  ]);
};

module.exports = (config) =>
  withPlugins(config, [withAndroidSounds, withIosSounds]);
