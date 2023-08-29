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

    <div v-if="$q.screen.gt.sm" :class="[ 'g-cursor', { 'g-cursor_hover': hover }, {'g-cursor_hide': hideCursor} ]">
      <div :style="cursorCircle " class='g-cursor__circle'
           :class=" utilState.language === 'en-US' ?  'g-cursor__circle' :'g-cursor__circle rtl'"></div>
      <div class="g-cursor__point" :class="utilState.language === 'en-US' ?  'g-cursor__point' :'g-cursor__point rtl'"
           :style="cursorPoint"></div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import {defineComponent, onMounted, reactive, ref, computed, onBeforeMount} from 'vue'
import {useUtilStore} from "stores/util-store";
import {useTheme} from "/src/composables/theme";
import {useLanguage} from "/src/composables/language";
import {ParticlesComponent} from "vue3-particles";
import {loadFull} from "tsparticles"
import {useQuasar} from 'quasar'
import {useRouter} from "vue-router"


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
    const utilStore = useUtilStore();

    initTheme();
    initLanguage();
    const cursorCircle = computed(() => {
      return `transform: translateX(${xParent.value}px) translateY(${yParent.value}px) translateZ(0) translate3d(0, 0, 0)`
    })
    const cursorPoint = computed(() => {
      return `transform: translateX(${xChild.value - 3}px) translateY(${yChild.value - 3}px) translateZ(0) translate3d(0, 0, 0)`
    })
    const moveCursor = (e) => {
      xChild.value = e.clientX;
      yChild.value = e.clientY;
      setTimeout(() => {
        xParent.value = e.clientX - 10;
        yParent.value = e.clientY - 10;
      }, 100);
    }
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
    onBeforeMount(() => {
      document.addEventListener("mousemove", moveCursor);
      document.addEventListener('mouseleave', e => {
        hideCursor.value = true;
      });
      document.addEventListener('mouseenter', e => {
        hideCursor.value = false;
      });
    })
    onMounted(() => {
      router.push('/')
      document.addEventListener("mousemove", moveCursor);
      document.addEventListener('mouseleave', e => {
        hideCursor.value = true;
      });
      document.addEventListener('mouseenter', e => {
        hideCursor.value = false;
      });
    })
    const xChild = ref(0)
    const yChild = ref(0)
    const xParent = ref(0)
    const yParent = ref(0)
    const hover = ref(false)
    const hideCursor = ref(true)

    return {
      particlesInit,
      darkOption,
      lightOption,
      $q,
      xChild,
      yChild,
      xParent,
      yParent,
      hover,
      hideCursor,
      cursorCircle,
      cursorPoint,
      utilState: utilStore.$state
    }
  }
})
</script>
<style lang="scss">

.g-cursor {

  &_hide {
    opacity: 0;
    width: 60px;
    height: 60px;
    transition: width .6s ease,
    height .6s ease,
    opacity .6s ease;
  }

  &__circle {
    pointer-events: none;
    user-select: none;
    top: 0;
    position: fixed;
    width: 30px;
    height: 30px;
    border: 2px solid #700586;
    border-radius: 100%;
    z-index: 5555;
    backface-visibility: hidden;
    transition: all .01s ease-out;
  }

  &__point {
    top: 0;
    position: fixed;
    width: 10px;
    height: 10px;
    pointer-events: none;
    user-select: none;
    border-radius: 100%;
    background: #d415ff;
    z-index: 55555555;
    backface-visibility: hidden;
    will-change: transform;
  }

  &_hover {
    .g-cursor__circle {
      opacity: 0;
      width: 60px;
      height: 60px;
      transition: width .01s ease-out,
      height .01s ease,
      opacity .01s ease;
    }
  }
}

.g-cursor__circle.rtl {
  left: auto;
  right: 0;
}

.g-cursor__point.rtl {
  left: auto;
  right: 0;
}
</style>
