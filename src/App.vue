<template>
  <div id="app">
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

    <div id="cursor-tracker" v-if="elementCoordinates && elementCoordinates.value && $q.screen.gt.sm"
         class="absolute cursor"></div>

    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>
<script>
import {defineComponent, onMounted, reactive} from 'vue'
import {useUtilStore} from "stores/util-store"
import {useTheme} from "/src/composables/theme"
import {useLanguage} from "/src/composables/language"
import {ParticlesComponent} from "vue3-particles"
import {loadFull} from "tsparticles"
import {useQuasar} from 'quasar'
import {useRouter} from "vue-router"
import {cursor} from "src/composables/cursorPosition"

export default defineComponent({
  name: 'App',
  components: {
    ParticlesComponent
  },
  setup() {
    const {initTheme} = useTheme();
    const {initLanguage} = useLanguage();
    const $q = useQuasar()
    const router = useRouter()
    const elementCoordinates = reactive({})
    const {getElementCoordinates} = cursor()
    const utilStore = useUtilStore();

    initTheme();
    initLanguage();

    const baseParticles = {
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
    const baseOption = {
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
    onMounted(() => {
      router.push('/')
      document.addEventListener("mousemove", (event) => {
        const element = document.getElementById("app");
        elementCoordinates.value = getElementCoordinates(event, element);
        let cursorTracker = document.getElementById('cursor-tracker');
        let left = elementCoordinates.value.x;
        let top = elementCoordinates.value.y;
        if (cursorTracker && cursorTracker.style) {
          cursorTracker.style.left = left - 10 + 'px';
          cursorTracker.style.top = top - 10 + 'px';
          if ($q.dark.isActive) {
            let colors = [
              "#9bf6ff",
              "#caffbf",
              "#a0c4ff",
              "#bdb2ff",
              "#ffc6ff",
              "#fdffb6",
            ]
            let color = colors[Math.floor(Math.random() * colors.length)]
            const mouse = document.getElementById('cursor-tracker')
            mouse.style.borderColor = color
          } else {
            let colors = [
              "#056a70",
              "#121212",
              "#0f4594",
              "#4438a9",
              "#810a81",
              "#ff1ab4",
            ]
            let color = colors[Math.floor(Math.random() * colors.length)]
            const mouse = document.getElementById('cursor-tracker')
            mouse.style.borderColor = color
          }
        }
      })
    })

    return {
      particlesInit,
      darkOption,
      lightOption,
      $q,
      elementCoordinates,
      getElementCoordinates,
      utilState: utilStore.$state
    }
  }
})
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.cursor {
  border-radius: 50%;
  width: 10px;
  height: 10px;
  z-index: 50000000000000000;
  border: 2px solid;
}

</style>
