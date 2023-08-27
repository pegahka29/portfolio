<template>
  <particles-component
    v-if="!$q.dark.isActive"
      id="lightTsParticles"
      :particlesInit="particlesInit"
      :options="lightOption"
  />
  <particles-component
    v-else
    id="darkTsParticles"
    :particlesInit="particlesInit"
    :options="darkOption"
  />
  <router-view/>
</template>

<script>
import {defineComponent} from 'vue'
import {useTheme} from "/src/composables/theme";
import {useLanguage} from "/src/composables/language";
import {ParticlesComponent} from "vue3-particles";
import {loadFull} from "tsparticles"
import {useQuasar} from 'quasar'


export default defineComponent({
  name: 'App',
  components: {
    ParticlesComponent
  },
  setup() {
    const {initTheme} = useTheme();
    const {initLanguage} = useLanguage();
    const $q = useQuasar()

    initTheme();
    initLanguage();

    const baseParticles= {
      number: {
        value: 50
      },
      shape: {
          type: "circle"
        },
      opacity: {
        value: 0.5
      }
      ,
      size: {
        value: 400,
        random: {
            enable: true,
            minimumValue: 200
          }
      },
      move: {
        enable: true,
        speed: 10,
        direction: "top",
        outModes:
          {
            default: "out",
            top: "destroy",
            bottom: "none"
          }
      }
    }
    const lightTheme = {
      ...baseParticles,
        color: {
          value: [
            "#9bf6ff",
            "#caffbf",
            "#a0c4ff",
            "#bdb2ff",
            "#ffc6ff",
            "#fdffb6",
          ]
        }
    }
    const darkTheme = {
      ...baseParticles,
        color: {
          value: [
            "#056a70",
            "#121212",
            "#0f4594",
            "#4438a9",
            "#810a81",
            "#121212",
          ]
        }
    }
    const baseOption =
       {
        fpsLimit: 60,
          fullScreen:
        {
          enable: true
        }
      ,
        interactivity: {
          detectsOn: "canvas",
            events: {
            resize: true
          }
        },
        style: {
          filter: "blur(50px)"
        },
        detectRetina: true,
          emitters: {
          direction: "top",
            position: {
            x: 50,
              y: 150
          }
        ,
          rate: {
            delay: 0.2,
              quantity: 2
          }
        ,
          size: {
            width: 100,
              height: 0
          }
        }
      }
    const darkOption = {...baseOption, particles: {...darkTheme}}
    const lightOption = {...baseOption, particles: {...lightTheme}}
    const particlesInit = async engine => {
      await loadFull(engine);
    };

    const particlesLoaded = async container => {
      console.log("Particles container loaded", container);
    };
    return {
      particlesLoaded,
      particlesInit,
      darkOption,
      lightOption,
      $q
    }
  }
})
</script>
