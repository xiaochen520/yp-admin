<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <el-button type="text" @click="loginout">退出登录</el-button> -->
      <el-dropdown @command="loginout" class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" class="user-avatar">
          <span>管理员</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import Hamburger from '@/components/Hamburger'

  export default {
    components: {
      Breadcrumb,
      Hamburger
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar'
      ])
    },
    methods: {
      loginout() {
        localStorage.removeItem("TOKEN");
        this.$router.push("/login");
      },
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      padding-right: 15px;
      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          >* {
            cursor: pointer;
          }

          .user-avatar {
            cursor: pointer;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            right: -20px;
            margin-left: 4px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>