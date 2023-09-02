<template>
  <q-layout view="lHh Lpr lff">
    <q-header class=" q-pa-sm"
              :class="[$q.dark.isActive ? 'text-white' : 'text-dark', scY >=25 ? 'sticky shadow-1' : 'bg-transparent']"
              :style="{background : $q.dark.isActive && scY >=25 ? ' linear-gradient(68deg,  #2a182a  0%,#080E1A 100%)' :'linear-gradient(68deg,  #ced2ff  0%,#ffc6ff 100%)'}">
      <q-toolbar class="flex justify-between items-center">
        <q-btn v-if="$q.screen.lt.md" @click="drawer = !drawer" push
               :color="$q.dark.isActive? 'dark' : 'white'"
               text-color="purple-12"
               round icon="menu" class="q-mr-sm"/>
        <q-btn
          round
          push
          :color="!$q.dark.isActive?'amber':'black'"
          :class="$q.dark.isActive ? 'text-teal-13' : 'text-white'"
          :icon="utilState.appTheme ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
          @click="toggleTheme(utilState.appTheme = ! utilState.appTheme)"/>
        <q-tabs
          v-if="!$q.screen.lt.md"
          v-model="tab"
          inline-label
        >
          <div :class="utilState.language === 'en-US' ? 'row reverse' :'flex'">
            <q-tab v-for="menuItem in menuItems"
                   :key="menuItem.name"
                   :name="menuItem.name"
                   :icon="menuItem.icon"
                   :label="menuItem.label"
                   @click="goToPage(menuItem.to)"
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
          toggle-color="purple-12"
          toggle-text-color="white"
          @update:model-value="changeLanguage"/>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="500"
      class="rounded"
      :style="{background :$q.dark.isActive ? ' linear-gradient(185deg,  #080E1A  0%,#2a182a 100%)' :'linear-gradient(185deg,  #ced2ff  0%,#ffc6ff 100%)'}"
    >
      <q-scroll-area class="fit">
        <q-list>
          <q-item class="flex justify-end items-center">
            <q-btn round color="red" glossy icon="close" @click="drawer = false"/>
          </q-item>
          <template v-for="(menuItem, index) in menuItems" :key="index">
            <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple @click="goToPage(menuItem.to)">
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
    <q-page-container v-if="isLoaded">
      <q-page class="flex column flex-center">
        <q-avatar :size="$q.screen.lt.md ?'200px' : '300px'">
          <q-img
            v-if="$q.dark.isActive"
            alt="profile picture of Pegaah"
            class="avatar"
            fit="contain"
            src="~assets/images/dark-profile.jpg"
          />
          <q-img
            v-else
            alt="profile picture of Pegaah"
            class="avatar"
            fit="contain"
            src="~assets/images/light-profile.jpg"
          />
        </q-avatar>
      <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref, computed, onBeforeUnmount, onMounted} from 'vue'
import {useTheme} from "/src/composables/theme";
import {useUtilStore} from "stores/util-store";
import {useI18n} from "vue-i18n";
import {useLanguage} from "/src/composables/language";
import {useRouter} from "vue-router"
import {useQuasar, QSpinnerHearts} from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const utilStore = useUtilStore();
    const {toggleTheme} = useTheme();
    const tab = ref('home')
    const {t} = useI18n({useScope: "global"});
    const {changeLanguage} = useLanguage();
    const router = useRouter()
    const $q = useQuasar()
    const isLoaded = ref(true)
    const drawer = ref(false)
    const scTimer = ref(0)
    const scY = ref(0)
    let timer

    onBeforeUnmount(() => {
      if (timer !== void 0) {
        clearTimeout(timer)
        $q.loading.hide()
      }
    })
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    const handleScroll = () => {
      if (scTimer.value) return;
      scTimer.value = setTimeout(() => {
        scY.value = window.scrollY;
        clearTimeout(scTimer.value);
        scTimer.value = 0;
      }, 100);
    }

    const menuItems = computed(() => {
      return [
        {
          name: "home",
          label: t("home"),
          icon: 'home',
          to: '/'
        },
        {
          name: "aboutMe",
          label: t("aboutMe"),
          icon: 'person',
          to: 'aboutMe'
        },
        {
          name: "works",
          label: t("works"),
          icon: 'mdi-code-tags',
          to: ''
        },
        {
          name: "resume",
          label: t("resume"),
          icon: 'mdi-file-account',
          to: ''
        }
      ];
    });
    const goToPage = (val) => {
      isLoaded.value = false
      if (drawer.value === true) {
        drawer.value = false
      }
      $q.loading.show({
        spinner: QSpinnerHearts,
        spinnerColor: $q.dark.isActive ? 'cyan-14' : 'green-14',
        spinnerSize: 140,
        backgroundColor: $q.dark.isActive ? 'purple-10' : 'purple-6',
        message: t("loading"),
        messageColor: $q.dark.isActive ? 'white' : 'black'
      })

      // hiding in 1s
      timer = setTimeout(() => {
        $q.loading.hide()
        timer = void 0
        isLoaded.value = true
      }, 1000)
      router.push(val)
    }
    return {
      utilState: utilStore.$state,
      toggleTheme,
      tab,
      t,
      menuItems,
      changeLanguage,
      drawer,
      goToPage,
      router,
      isLoaded,
      scTimer,
      scY
    }
  }
})
</script>
<style>
.scroll {
  position: sticky;
}
</style>
