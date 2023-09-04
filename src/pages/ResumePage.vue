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
            <q-timeline-entry v-for="e in experience" :key="e.title" :icon="e.icon" color="purple-12">
              <template v-slot:title>
                {{ e.title }}
              </template>
              <template v-slot:subtitle>
                {{ e.subtitle }}
              </template>
              <div class="flex column">
                <a class="text-subtitle2" href="http://rayanparsi.com/"  :class="$q.dark.isActive ? 'text-white' : 'text-dark'">
                  <q-icon name="mdi-office-building"/>
                  {{ e.company }}
                </a>
                <span class="text-subtitle2 q-my-sm">
                  <q-icon name="mdi-pin"/>
                  {{ e.location }}
                </span>
                <span class="text-subtitle2 q-mb-sm">
               {{ t("fieldOfActivity") }}: {{ e.companyDesc }}
              </span>
                <q-separator/>
                <span class="text-subtitle2 q-mt-sm">
              <q-icon name="mdi-medal-outline"/>   {{ t("AchievementsOrTasks") }}:
              </span>
                <ul>
                  <li v-for="item in e.tasks" :key="item.title" class="text-subtitle2 text-bold q-my-md tasks"
                      :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey-10'"> {{
                      t(item.title)
                    }}
                  </li>
                </ul>
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
    const experience = computed(() => {
      return [
        {
          title: t("job"),
          subtitle: t("startWorking"),
          company: t("company"),
          location: t("jobLocation"),
          companyDesc: t("companyDesc"),
          tasks: [
            {
              title: "tasks.task1",
            },
            {
              title: "tasks.task2",
            },
            {
              title: "tasks.task3",
            },
            {
              title: "tasks.task4",
            },
            {
              title: "tasks.task5",
            },
            {
              title: "tasks.task6",
            },
          ],
          icon: "mdi-laptop-mac"
        },
      ]
    })

    return {
      t,
      tabs,
      tab,
      education,
      experience
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

.tasks {
  font-family: "Vazir FD" !important;
}
a{
  text-decoration: none;
}
</style>
