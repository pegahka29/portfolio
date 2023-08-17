<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import {useTheme} from "/src/composables/theme";
import {useLanguage} from "/src/composables/language";

export default defineComponent({
  name: 'App',
  setup(){
    const { initTheme } = useTheme();
    const { initLanguage } = useLanguage();
    initTheme();
    initLanguage();
  }
})
</script>
