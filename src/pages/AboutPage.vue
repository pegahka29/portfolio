<template>
  <div class="q-pa-md">
    <div class="q-pa-md items-start q-gutter-md row justify-center ">
      <CustomCard>
        <div class="text-h6 text-bold relative-position custom-card">{{ t("about") }}</div>
        <div class="text-subtitle2">{{ t("introduction") }}</div>
        <div class="text-h6 text-bold relative-position custom-card q-mt-sm">{{ t("personalInfo") }}</div>
        <q-btn v-for="personal in personalInfos" :key="personal.name"
               :href="personal.link"
               :icon="personal.icon"
               :label="personal.label"
               class="q-pa-sm  q-mt-sm q-mr-sm flex column  items-start  justify-center "
               style="width: 100%"
               flat
               rounded>
          <q-tooltip v-if="personal.hover" class="text-section text-body2"
                     transition-show="scale"
                     transition-hide="scale" :offset="[10, 10]"
                     :class="$q.dark.isActive ? 'bg-deep-purple-14 text-white' :'bg-purple-3 text-dark'">
            {{ personal.hover }}
          </q-tooltip>
        </q-btn>
      </CustomCard>
    </div>
  </div>
</template>
<script>
import {computed, defineComponent} from 'vue'
import {useI18n} from "vue-i18n"
import {useUtilStore} from "stores/util-store"
import CustomCard from "components/CustomCard.vue";


export default defineComponent({
  name: 'AboutMe',
  components: {CustomCard},

  setup() {
    const {t} = useI18n({useScope: "global"})
    const utilStore = useUtilStore();

    const year = new Date().getFullYear()
    const myAge = year - 2000
    const personalInfos = computed(() => {
      return [
        {
          name: 'pegika327@gmail.com',
          link: 'mailto:pegika327@gmail.com',
          icon: 'mdi-gmail',
          target: '_self',
          label: 'pegika327@gmail.com'
        },
        {
          name: 'phone',
          link: 'tel:+989981379329',
          icon: 'mdi-phone',
          target: '_self',
          label: '09981379329'
        },
        {
          label: t("birthday"),
          hover: myAge + ' ' + t("year"),
          name: 'birthday',
          icon: 'mdi-calendar',
        },
        {
          label: t("location"),
          name: 'location',
          icon: 'mdi-pin',
        },
      ];
    });

    return {
      t,
      personalInfos,
      myAge,
      utilState: utilStore.$state,
    }
  }
})
</script>
<style>
</style>
