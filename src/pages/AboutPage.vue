<template>
  <div>{{ t("aboutMe") }}</div>
</template>
<script>
import {defineComponent} from 'vue'
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: 'AboutMe',

  components: {},

  setup() {
    const {t} = useI18n({useScope: "global"});

    return {
      t,
    }
  }
})
</script>


<style scoped>

</style>
