import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default [
    {
        ignores: ["cypress/*"],
    },
    {
        files: ["**/*.{js,vue}"]
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        languageOptions: {
            globals: globals.browser,
        }
    },
    {
        rules: {
            'vue/multi-word-component-names': 0,
        }
    },
];