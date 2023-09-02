<template>
  <div class="q-pa-md">
    <div class="q-pa-md row items-start q-gutter-md row  justify-center items-center">
      <q-card class="q-pa-md col-md-6 col-sm-8 col-12">
        <q-card-section>
          <div class="text-h6 text-bold relative-position about">{{ t("aboutMe") }}</div>
          <div class="text-subtitle2">{{ t("introduction") }}</div>
          <div class="text-h6 text-bold relative-position about q-mt-sm">{{ t("personalInfo") }}</div>
              <q-btn v-for="personal in personalInfos" :key="personal.name"
                     :href="personal.link"
                     :icon="personal.icon"
                     :label="personal.label"
                     class="q-pa-sm  q-mt-sm q-mr-sm flex column  items-start  justify-center "
                     style="width: 100%"
                     flat
                     rounded>
                <q-tooltip v-if="personal.hover" class="text-section text-body2 " :offset="[10, 10]" :class="$q.dark.isActive ? 'bg-dark text-white' :'bg-white text-dark'">
                  {{ personal.hover }}
                </q-tooltip>
              </q-btn>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import {computed, defineComponent} from 'vue'
import {useI18n} from "vue-i18n"
import {useUtilStore} from "stores/util-store"


export default defineComponent({
  name: 'AboutMe',

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
          label:'pegika327@gmail.com'
        },
        {
          name: 'phone',
          link: 'tel:+989981379329',
          icon: 'mdi-phone',
          target: '_self',
          label:'0989981379329'
        },
        {
          label:t("birthday"),
          hover: myAge + ' ' +t("year") ,
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
.q-card {
  background-color: rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(60px);
  border-radius: 50px;
  -webkit-box-shadow: 20px 20px 22px rgba(0, 0, 0, 0.2);
  box-shadow: 20px 20px 22px rgba(0, 0, 0, 0.2);
}

.about::after {
  position: absolute;
  top: 50%;
  height: 0.125rem;
  border-radius: 0.375rem;
  background-image: linear-gradient(to right, #fa5252, #bdb2ff);
  content: '';
  width: 2rem;
  margin-left: 5px;
}

</style>
