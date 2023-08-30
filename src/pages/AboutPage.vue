<template>
  <div class="q-pa-md">
    <div class="flex flex-center">
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">{{ t("aboutMe")}}</div>
              <div class="text-caption text-grey">
                {{t('introduction')}}
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-img
                class="rounded-borders"
                src="~assets/images/aboutPic.jpg"
              />
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat round icon="event" />
            <q-btn flat>
              7:30PM
            </q-btn>
            <q-btn flat color="primary">
              Reserve
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
  </div>
  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: 'AboutMe',

  components: {},

  setup() {
    const {t} = useI18n({useScope: "global"});

    return {
      t,
    }
  }
})
</script>
