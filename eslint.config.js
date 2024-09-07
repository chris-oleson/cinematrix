import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [
    {
        files: ["**/*.{js,mjs,cjs,vue}"]
    },
    pluginJs.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    {
        rules: {
            'vue/multi-word-component-names': 0,
        }
    },
];