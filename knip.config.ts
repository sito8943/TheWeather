// knip.config.ts
import { type KnipConfiguration } from "knip"

const config: KnipConfiguration = {
  $schema: "https://unpkg.com/knip@6/schema.json",
  ignoreFiles: ["dist/**", "web-build/**"],
  ignoreDependencies: [
    "expo-updates",
    "expo-system-ui",
    "@expo/vector-icons",
    "expo-font",
    "eslint-config-expo",
  ],
  ignoreBinaries: ["eas-cli"],
  // Each modlet's index.ts is its public API surface. Treating barrels as
  // entries stops knip flagging re-exports only consumed inside the feature,
  // while non-index implementation files are still checked for dead exports.
  entry: ["src/shared/**/index.ts"],
}

export default config
