<template>
  <q-page class="flex flex-center">
    <q-avatar size="300px">
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
      />    </q-avatar>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {useQuasar} from "quasar";

export default defineComponent({
  name: 'IndexPage',

})
</script>
<style>
.avatar {
  background: center;
}
</style>
