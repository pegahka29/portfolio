<template>
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
    <span class="text-bold text-h4 q-my-md">{{ t("myName") }}</span>
    <span class="text-bold text-h6 q-mb-md"
          :class="$q.dark.isActive ? 'text-deep-purple-14' : 'text-pink-13'">{{ t("job") }}</span>
    <div class="text-center q-mt-sm">
      <q-btn v-for="socialItem in SocialMediaItems" :key="socialItem.name"
             :href="socialItem.link"
             :icon="socialItem.icon"
             :aria-label="socialItem.name + ' link'"
             class="q-pa-xs team-btn relative-position q-mx-sm"
             :class="$q.dark.isActive ? 'bg-cyan-14' : 'bg-teal-13'"
             dense
             push
             rounded
             :target="socialItem.target">
        <q-tooltip v-if="socialItem.hover" class="bg-system-primary text-section text-body2 ltr" :offset="[10, 10]">
          {{ socialItem.hover }}
        </q-tooltip>
      </q-btn>
    </div>
    <q-btn :label="t('downloadResume')"
           class="q-mt-xl q-mb-md q-pa-md"
           :color="$q.dark.isActive ? 'deep-purple-11': 'purple-11'"
           dense
           push
           rounded
           icon="mdi-cloud-download"
           href="Pegah Kazemi Resume.pdf"
           download/>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const {t} = useI18n({useScope: "global"})
    const SocialMediaItems = [
      {
        name: 'email',
        link: 'mailto:pegika327@gmail.com',
        icon: 'mdi-gmail',
        target: '_self',
        hover: 'pegika327@gmail.com',
      },
      {
        name: 'phone',
        link: 'tel:+989981379329',
        icon: 'mdi-phone',
        target: '_self',
        hover: '+989981379329',
      },
      {
        name: 'Linkedin',
        link: 'https://www.linkedin.com/in/pegaahk',
        icon: 'mdi-linkedin',
        target: '_blank',
        hover: 'pegaahk'
      },
      {
        name: 'Skype',
        link: 'https://join.skype.com/invite/c5ybyrqlD1td',
        icon: 'mdi-skype',
        target: '_blank',
      },
      {
        name: 'Github',
        link: 'https://github.com/pegahka29',
        icon: 'mdi-github',
        target: '_blank',
        hover: 'pegahka29',
      },
    ]
    return {
      t,
      SocialMediaItems
    }
  }
})
</script>
<style>
.avatar {
  background: center;
}
</style>
