import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import pluginCypress from "eslint-plugin-cypress";

export default [
    {
        files: ["**/*.{js,mjs,cjs,vue}"]
    },
    pluginJs.configs.recommended,
    pluginCypress,
    ...pluginVue.configs["flat/essential"],
    {
        rules: {
            'vue/multi-word-component-names': 0,
        }
    },
];