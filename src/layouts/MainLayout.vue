<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff">
      <q-header class="bg-transparent" :class="$q.dark.isActive ? 'text-white' : 'text-dark'">
        <q-toolbar class="flex justify-between items-center">
            <q-btn v-if="$q.screen.lt.md" @click="drawer = !drawer" push color="white"
                   :text-color="$q.dark.isActive ? 'deep-purple-11': 'purple-11' " round icon="menu" class="q-mr-sm"/>
            <q-btn
              round
              push
              :color="utilState.appTheme?'amber':'deep-purple-11'"
              :icon="utilState.appTheme ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
              @click="toggleTheme(utilState.appTheme = ! utilState.appTheme)"/>
          <q-tabs
            v-if="!$q.screen.lt.md"
            v-model="tab"
            inline-label
          >
            <div :class="utilState.language === 'en-US' ? 'row reverse' :'flex' ">
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
            :toggle-color="$q.dark.isActive ? 'deep-purple-11' :'purple-11'"
            toggle-text-color="white"
            @update:model-value="changeLanguage"/>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        class="rounded"
        :style="{background :$q.dark.isActive ? 'linear-gradient(185deg,  #99c396  0%,#6ebac3 100%)' :'linear-gradient(185deg,  #ced2ff  0%,#ffc6ff 100%)'}"
      >
        <q-scroll-area class="fit">
          <q-list>
            <q-item class="flex justify-end items-center">
              <q-btn round color="red" glossy icon="close" @click="drawer = false"/>
            </q-item>
            <template v-for="(menuItem, index) in menuItems" :key="index">
              <q-item  clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon"/>
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator/>
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import {defineComponent, ref, computed,} from 'vue'
import {useTheme} from "/src/composables/theme";
import {useUtilStore} from "stores/util-store";
import {useI18n} from "vue-i18n";
import {useLanguage} from "/src/composables/language";

export default defineComponent({
  name: 'MainLayout',

  components: {},

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
      drawer: ref(false),
    }
  }
})
</script>
