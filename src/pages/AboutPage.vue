<template>
  <div class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="">
        <q-card-section>
          <div class="text-h6">{{t("aboutMe")}}</div>
          <div class="text-subtitle2">{{t("introduction")}}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: 'AboutMe',


  setup() {
    const {t} = useI18n({useScope: "global"});

    return {
      t,
    }
  }
})
</script>
<style>
.q-card {
  background-color: rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  -webkit-box-shadow: 20px 20px 22px rgba(0,0,0,0.2);
  box-shadow: 20px 20px 22px rgba(0,0,0,0.2);
}
</style>
