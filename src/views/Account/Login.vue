<template>
  <div class="container login-container">
    <div class="main">
      <div class="top">
        <div class="header">
          <!-- <a href="/" class="logo">友普云自服务</a> -->
        </div>

        <h1 class="title">
          <img :src="logo" alt="logo"
            style="height: 32px;"
          >
          <p style="display: inline-block; margin-left: 12px; height: 32px; line-height: 32px;">{{ title }}</p>
        </h1>

      </div>
      <username-form ref="UsernameForm" />
      <div style="display: flex; flex-direction: row-reverse; justify-content: space-between; margin-bottom: 10px;">

      </div>
      <a-button
        size="large"
        type="primary"
        htmlType="submit"
        class="login-button"
        style="width: 100%;"
        :loading="loading"
        :disabled="loading"
        @click="handleSubmit"
      >
        登录
      </a-button>
    </div>
    <my-canvas />
    <basic-footer class="footer-copyright" />
  </div>
</template>

<script>
import Vue from "vue";
import notification from "ant-design-vue/es/notification";

// import PhoneForm from "./Login/PhoneForm";
import UsernameForm from "./Login/UsernameForm";

import { mapActions } from "vuex";
import { welcome } from "@/utils/util";

import { userLogin } from "@/api/user/user";
import { workerLogin } from "@/api/user/worker";
import { ACCESS_TOKEN, PROJECT_ID } from "@/store/mutation-types";
import Canvas from "./Canvas.vue";
import BasicFooter from "@/components/Layout/BasicFooter";
import logo from '@/assets/images/logo/3.png';

export default {
  components: {
    UsernameForm,
    // PhoneForm,
    MyCanvas: Canvas,
    BasicFooter,
  },

  data() {
    return {
      customActiveKey: "UsernameForm",
      loading: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,

      logo,
      title: '友普云自服务',

    };
  },
  mounted () {
    console.log('login mounted');
    
  },
  methods: {

    async handleSubmit() {
      try {
        const payload = await this.$refs[this.customActiveKey].handleSubmit();
        this.loading = true;
        const resp = await workerLogin(payload);
        this.loginSuccess(resp);
        const info = await this.$store.app.dispatch('fetchUserInfo');
      } catch (err) {

      } finally {
        this.loading = false;
      }
    },
    loginSuccess(resp) {
      
      // const expire = 1 * 60 * 60 * 1000;
      Vue.ls.set(ACCESS_TOKEN, resp[ACCESS_TOKEN]);
      Vue.ls.set('userInfo', resp);

      // 管理员角色[1:普通管理员 110:超级管理员]
      const roleMap = {
        '1': 'admin',
        '110': 'superAdmin',
      }
      const role = roleMap[resp.workerType];
      this.$store.commit('app/setRole', role);
      this.$store.commit('app/setUserInfo', resp);

      this.$router.push({ name: "Index" });
      this.$message.success(welcome() + "，欢迎回来", 3);
    },
  }
};
</script>

<style lang="less" scoped>

.top {
  text-align: center;
  .header {
    height: 44px;
    line-height: 44px;
    .logo {
      display: inline-block;
      height: 44px;
      vertical-align: top;
      margin-right: 16px;
      border-style: none;
    }
  }
  .desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }
}
.container {
  width: 100%;
  min-height: 100vh;
  background: #f0f2f5 url("../../assets/images/background.svg") no-repeat 50%;
  background-size: 100%;
  padding: 110px 0 144px;
  position: relative;
}
.icon {
  color: rgba(0, 0, 0, 0.25);
}
.main {
  position: absolute;
  z-index: 11;
  top: 110px;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: content-box;
  border-radius: 5px;
  width: 300px;
  // height: 465px;
  margin: 0 auto;
  padding: 30px 460px 30px 30px;
  background: #fff url("../../assets/images/login.png") no-repeat right;
  background-size: contain;
  box-shadow: 4px 2px 10px 10px #e3e7f3;
}
.title {
  text-align: left;
  font-size: 20px;
  margin-bottom: 40px;
  font-weight: bold;
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    line-height: 22px;


  }
}
.item-icon {
  font-size: 24px;
  color: rgba(0, 0, 0, 0.2);
  margin-left: 16px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #1890ff;
  }
}
.footer-copyright {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
}
</style>
