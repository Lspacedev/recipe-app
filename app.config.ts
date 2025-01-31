import { ExpoConfig, ConfigContext } from "@expo/config";
import * as dotenv from "dotenv";

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: "recipe-app",
  name: "recipe-app",
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.lspacedev.recipeapp",
  },
  extra: {
    eas: {
      projectId: "2dc5de4b-9f85-43b3-ac63-aba6241dd850",
    },
    API_URL: process.env.API_URL,
  },
});
