<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="../../../assets/images/logo.png" style="width: 38px" />
        <div class="sidebar-title">{{ title }} </div>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="../../../assets/images/logo.png" style="width: 38px; display: inline-block; vertical-align: middle; margin-right: 10px;" />
        <div class="sidebar-title">{{ title }} </div>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '优转铺管理平台'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: #304156;
  text-align: center;
  color: #fff;
  overflow: hidden;
  /* border-right: 1px solid #ccc; */
  border-bottom: 1px solid #999;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      color: #fff;
      /* margin-bottom: 52px; */
      font-weight: 600;
      font-family: Roboto,sans-serif;
      /* line-height: 50px; */
      font-size: 15px;
      font-weight: bold;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
