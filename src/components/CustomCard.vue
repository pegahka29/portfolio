<template>
  <q-card class="q-pa-md col-md-6 col-sm-8 col-12 about-card q-py-lg ">
    <q-card-section class="">
      <slot/>
    </q-card-section>
  </q-card>
</template>

<style lang="scss">
.q-card {
  background-color: rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(60px);
  backdrop-filter: blur(60px);
  border-radius: 50px;
  -webkit-box-shadow: 20px 20px 22px rgba(0, 0, 0, 0.2);
  box-shadow: 20px 20px 22px rgba(0, 0, 0, 0.2);
  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 24px;
    border-radius: 8px;
    z-index: 300;
    background: transparent;
    -webkit-backdrop-filter: blur(60px);
    backdrop-filter: blur(60px);
    bottom: 110px;
    width: 66.6667%;
  }
}
.q-card__section {

}
.about-card {
  overflow-y: scroll;
  height: 300px !important;

}
</style>
