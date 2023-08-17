<template>
  <q-layout view="lHh Lpr lFf" >
    <q-toolbar class="flex justify-between items-center" >
      <q-toggle
        v-model="utilState.appTheme"
        :class="$q.screen.lt.md ? 'q-ml-xs': 'q-my-sm'"
        :color="utilState.appTheme ? 'amber' : 'deep-purple-10'"
        aria-label="switch-theme-btn"
        checked-icon="mdi-brightness-7"
        class="text-blue"
        keep-color
        size="lg"
        unchecked-icon="mdi-weather-night"
        @update:model-value="toggleTheme"
      />
      <q-tabs
        v-model="tab"
        inline-label
      >
        <div  :class="utilState.language === 'en-US' ? 'row reverse' :'flex' ">
          <q-tab v-for="menuItem in menuItems"
                 :key="menuItem.name"
                 :name="menuItem.name"
                 :icon="menuItem.icon"
                 :label="menuItem.label"
          />
        </div>
      </q-tabs>
      <q-btn-toggle
        v-model="utilState.language"
        :flat="$q.dark.isActive"
        :options="[
                      { label: 'En', value: 'en-US' },
                      { label: 'Fa', value: 'fa-IR' },
                    ]"
        class="text-bold"
        color="section"
        dense
        glossy
        no-caps
        padding="4px 13px"
        rounded
        style="height: 32px;"
        text-color="system-text"
        toggle-color="green-11"
        toggle-text-color="system-primary"
        @update:model-value="changeLanguage"/>
    </q-toolbar>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref, computed, onMounted} from 'vue'
import {useTheme} from "/src/composables/theme";
import {useUtilStore} from "stores/util-store";
import {useI18n} from "vue-i18n";
import {useLanguage} from "/src/composables/language";

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup() {
    const utilStore = useUtilStore();
    const {toggleTheme} = useTheme();
    const tab = ref('home')
    const {t} = useI18n({useScope: "global"});
    const {changeLanguage} = useLanguage();

    const menuItems = computed(() => {
      return [
        {
          name: "home",
          label: t("home"),
          // value: 'Inception',
          icon: 'home'
        },
        {
          name: "aboutMe",
          label: t("aboutMe"),
          // value: 'Death Note',
          icon: 'person',
        },
        {
          name: "works",
          label: t("works"),
          // value: 'WestWorld, Severance and The big bang theory',
          icon: 'mdi-code-tags',
        },
        {
          name: "resume",
          label: t("resume"),
          // value: 'Harry Potter collection',
          icon: 'mdi-file-account',
        }
      ];
    });
    return {
      utilState: utilStore.$state,
      toggleTheme,
      tab,
      t,
      menuItems,
      changeLanguage,
    }
  }
})
</script>
