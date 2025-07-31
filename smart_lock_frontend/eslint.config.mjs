import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        Node: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        console: "readonly"
      }
    },
    ignores: [
      "node_modules/**",
      "build/",
      "dist/**",
      "dist/",
      "*.log",
      "*.tmp",
      "*.tsbuildinfo",
      "coverage/",
      ".vscode/",
      ".idea/",
      "*.config.mjs",
    ],
    languageOptions: {
      parser: undefined,
      parserOptions: undefined,
      globals: {
        window: "readonly",
        document: "readonly",
        fetch: "readonly",
        localStorage: "readonly",
        Node: "readonly",
        setTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        console: "readonly",
        MutationObserver: "readonly",
        performance: "readonly",
        setImmediate: "readonly",
        navigator: "readonly",
        MessageChannel: "readonly",
        DOMException: "readonly",
        URL: "readonly",
        queueMicrotask: "readonly",
        __REACT_DEVTOOLS_GLOBAL_HOOK__: "readonly",
        MSApp: "readonly",
        reportError: "readonly"
      }
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Your custom rules here
    },
  },
  {
    languageOptions: {
      globals: {
        document: "readonly",
      },
    },
  },
];
