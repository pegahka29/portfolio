<template>
  <div class="q-pa-md ">
<!--    //full-width-->
    <q-tabs

      v-model="tab"
      indicator-color="purple-12"
    >
      <q-tab v-for="i in tabs" :key="i.name" :name="i.name" :icon="i.icon" :label="i.label"/>
    </q-tabs>
    <div class="items-start q-pa-md q-gutter-md row justify-center">
      <q-card class="col-12 q-px-md resume-card q-pb-lg q-pt-md">
        <q-card-section>
          <div
               class="text-h6 text-bold relative-position about">
            {{ tab === 'experience' ? t("myExperience") : t("myEducation") }}
          </div>
          <q-timeline v-if="tab === 'experience'" color="secondary">
            <q-timeline-entry icon="mdi-laptop-mac" color="purple-12">
              <template v-slot:title>
                Event Title
              </template>
              <template v-slot:subtitle>
                February 21, 1986
              </template>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </div>
            </q-timeline-entry>
          </q-timeline>
          <q-timeline v-else color="secondary">
            <q-timeline-entry v-for="e in education" :key="e.title" :icon="e.icon" color="purple-12">
              <template v-slot:title>
                {{ e.title }}
              </template>
              <template v-slot:subtitle>
                {{ e.subtitle }}
              </template>
              <div>
                {{ e.desc }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script>
import {computed, defineComponent, ref} from 'vue'
import {useI18n} from "vue-i18n"
import {useQuasar} from 'quasar'

export default defineComponent({
  name: 'ResumePage',

  setup() {
    const {t} = useI18n({useScope: "global"})
    const tab = ref('experience')
    const $q = useQuasar()
    const tabs = computed(() => {
      return [
        {
          label: t("experience"),
          icon: 'mdi-laptop-mac',
          name: "experience",
        },
        {
          label: t("education"),
          icon: 'mdi-pen',
          name: "works",
        }
      ]
    })
    const education = computed(() => {
      return [
        {
          title: t("bachelorDegree"),
          subtitle: t("bachelorDegreeDate"),
          desc: t("bachelorDegreeCollege"),
          icon: "mdi-pen"
        },
        {
          title: t("associateDegree"),
          subtitle: t("associateDegreeDate"),
          desc: t("associateDegreeCollege"),
          icon: "mdi-pen"
        }
      ]
    })

    return {
      t,
      tabs,
      tab,
      education
    }
  }
})
</script>


<style scoped>
.q-card {
  background-color: rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(60px);
  border-radius: 50px;
  -webkit-box-shadow: 20px 20px 22px rgba(0, 0, 0, 0.2);
  box-shadow: 20px 20px 22px rgba(0, 0, 0, 0.2);
}

.resume-card {
  overflow-y: scroll;
  height: 280px;
}
</style>
