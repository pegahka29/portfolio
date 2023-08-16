<template>
  <q-layout view="lHh Lpr lFf">
    <q-toolbar class="flex justify-center items-center">
      <q-tabs
        v-model="tab"
        inline-label
        class=""
      >
        <q-tab name="home" icon="home" label="خانه" />
        <q-tab name="alarms" icon="alarm" label="Alarms" />
        <q-tab name="movies" icon="movie" label="Movies" />
      </q-tabs>
      <q-toggle
        v-model="utilStore.appTheme"
        :class="$q.screen.lt.md ? 'q-ml-xs': 'q-my-sm'"
        :color="utilStore.appTheme ? 'amber' : 'deep-purple-10'"
        aria-label="switch-theme-btn"
        checked-icon="mdi-brightness-7"
        class="text-blue"
        keep-color
        size="lg"
        unchecked-icon="mdi-weather-night"
        @update:model-value="toggleTheme"
      />
    </q-toolbar>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {useTheme} from "/composables/theme";
import {useUtilStore} from "stores/util-store";

// import EssentialLink from 'components/EssentialLink.vue'

// const linksList = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   },
//   {
//     title: 'Github',
//     caption: 'github.com/quasarframework',
//     icon: 'code',
//     link: 'https://github.com/quasarframework'
//   },
//   {
//     title: 'Discord Chat Channel',
//     caption: 'chat.quasar.dev',
//     icon: 'chat',
//     link: 'https://chat.quasar.dev'
//   },
//   {
//     title: 'Forum',
//     caption: 'forum.quasar.dev',
//     icon: 'record_voice_over',
//     link: 'https://forum.quasar.dev'
//   },
//   {
//     title: 'Twitter',
//     caption: '@quasarframework',
//     icon: 'rss_feed',
//     link: 'https://twitter.quasar.dev'
//   },
//   {
//     title: 'Facebook',
//     caption: '@QuasarFramework',
//     icon: 'public',
//     link: 'https://facebook.quasar.dev'
//   },
//   {
//     title: 'Quasar Awesome',
//     caption: 'Community Quasar projects',
//     icon: 'favorite',
//     link: 'https://awesome.quasar.dev'
//   }
// ]

export default defineComponent({
  name: 'MainLayout',

  components: {
    // EssentialLink
  },

  // setup () {
  //   // const leftDrawerOpen = ref(false)
  //
  //   return {
  //     // essentialLinks: linksList,
  //     // leftDrawerOpen,
  //     // toggleLeftDrawer () {
  //     //   leftDrawerOpen.value = !leftDrawerOpen.value
  //     // }
  //   }
  // }
  setup() {
    const utilStore = useUtilStore();
    const {toggleTheme} = useTheme();
    const tab = ref('home')
    return {
      utilStore,
      toggleTheme,
      tab
    }
  }
})
</script>
