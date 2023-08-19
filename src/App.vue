<template>
  <particles-component
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="option"
  />
  <router-view/>
</template>

<script>
import {defineComponent, reactive} from 'vue'
import {useTheme} from "/src/composables/theme";
import {useLanguage} from "/src/composables/language";
import {ParticlesComponent} from "vue3-particles";
import { loadFull } from "tsparticles"


export default defineComponent({
  name: 'App',
  components: {ParticlesComponent},
  setup() {
    const {initTheme} = useTheme();
    const {initLanguage} = useLanguage();
    initTheme();
    initLanguage();
    const option = reactive( {
      fpsLimit: 60,
      fullScreen: { enable: true },
      particles: {
        number: {
          value: 50
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5
        },
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
          outModes: {
            default: "out",
            top: "destroy",
            bottom: "none"
          }
        }
      },
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
      themes: [
        {
          name: "light",
          default: {
            value: true,
            mode: "light"
          },
          options: {
            background: {
              color: "#f7f8ef"
            },
            particles: {
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
          }
        },
        {
          name: "dark",
          default: {
            value: true,
            mode: "dark"
          },
          options: {
            background: {
              color: "#080710"
            },
            particles: {
              color: {
                value: [
                  "#6ebac3",
                  "#99c396",
                  "#708fc3",
                  "#877cc3",
                  "#c38fc3",
                  "#c1c385",
                ]
              }
            }
          }
        }
      ],
      emitters: {
        direction: "top",
        position: {
          x: 50,
          y: 150
        },
        rate: {
          delay: 0.2,
          quantity: 2
        },
        size: {
          width: 100,
          height: 0
        }
      }
    })
    const particlesInit = async engine => {
      //await loadFull(engine);
      await loadFull(engine);
    };

    const particlesLoaded = async container => {
      console.log("Particles container loaded", container);
    };
    return {
      particlesLoaded,
      particlesInit,
      option
    }
  }
})
</script>
