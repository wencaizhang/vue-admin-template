<template>
  <div class="container register-container">
    <a-form class="main user-layout-login" :form="form" :class="{ change: name !== 'register' }">
      <h1 class="title">
        <img :src="logo" alt="logo" style="height: 32px;">
        <p
          style="display: inline-block; margin-left: 12px; height: 32px; line-height: 32px;"
        >{{ title }}</p>
      </h1>
      <a-form-item v-if="name === 'register'">
        <a-input
          size="small"
          type="text"
          autocomplete="new-password"
          placeholder="设置登录名称"
          v-decorator="[
            'userName',
            {rules: [{ required: true, message: '请设置登录名称' }]}
          ]"
        >
        </a-input>
      </a-form-item>

      <!-- <a-form-item>
        <a-popover :okText="false" cancelText placement="rightTop" :visible="visiblepopover">
          <template slot="content">
            <div :style="{ width: '240px' }">
              <div :class="['user-register', pwdLevel[state.passwordLevel].class]">
                强度：
                <span>{{ pwdLevel[state.passwordLevel].text }}</span>
              </div>
              <a-progress
                :percent="state.percent"
                :showInfo="false"
                :strokeColor="pwdLevel[state.passwordLevel].color "
              />
              <div style="margin-top: 10px;">
                <p>请至少输入 8 个字符，且至少包含大小字母、数字、特殊字符(_,!,@,#)中的两项。</p>
              </div>
            </div>
          </template>

          <a-input
            size="small"
            :type="passwordType"
            placeholder="设置登录密码"
            @blur="visiblepopover = false"
            @focus="visiblepopover = true"
            autocomplete="new-password"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '请设置登录密码' },
                  { validator: handlePasswordLevel }
                ]
              }
            ]"
          >
            <a-icon
              slot="suffix"
              class="suffix-eye"
              :type="passwordType | eyeIcon"
              @click="toggleType('passwordType')"
            />
          </a-input>
        </a-popover>
      </a-form-item> -->
      
      <a-form-item>
        <a-input
          size="small"
          :type="passwordType"
          autocomplete="new-password"
          placeholder="设置登录密码"
          v-decorator="[
            'password',
            {
              rules: [
                { required: true, message: '请设置登录密码' },
                { validator: handlePasswordLevel },
              ]
            }
          ]"
        >
          <a-icon
            slot="suffix"
            class="suffix-eye"
            :type="passwordType | eyeIcon"
            @click="toggleType('passwordType')"
          />
        </a-input>
      </a-form-item>
      <a-form-item v-if="name === 'register'">
        <a-input
          size="small"
          :type="password2Type"
          autocomplete="false"
          placeholder="再次确认密码"
          v-decorator="[
            'password2',
            {rules: [{ required: true, message: '请再次确认密码' }]}
          ]"
        >
          <a-icon
            slot="suffix"
            class="suffix-eye"
            :type="password2Type | eyeIcon"
            @click="toggleType('password2Type')"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          size="small"
          type="text"
          autocomplete="false"
          placeholder="请输入手机号码"
          v-decorator="[
            'phone',
            {
              rules: [
                { required: true, message: '请输入手机号码' },
                rulesObj.phone,
              ]
            }
          ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <div style="display: flex;">
          <a-input
            size="small"
            type="text"
            autocomplete="false"
            placeholder="输入验证码"
            v-decorator="[
              'smsCode',
              {rules: [{ required: true, message: '请输入验证码' }]}
            ]"
          >
          </a-input>
          <captcha-button @clickBtn="getCaptcha" size="small"/>
        </div>
      </a-form-item>

      <a-button
        @click="handleSubmit"
        type="primary"
        block
        style="margin-top: 10px; height: 36px;"
      >{{ submitText }}</a-button>
      <div
        class="user-login-other"
        style="display: flex; justify-content: space-between; margin-top: 10px;"
      >
        <span>
          <span>有账号,</span>
          <router-link class="register" :to="{ name: 'login' }">去登录</router-link>
        </span>
      </div>
    </a-form>
    <my-canvas/>
    <basic-footer class="footer-copyright"/>
  </div>
</template>

<script>
import CaptchaButton from "@/components/tools/CaptchaButton";
import { sendCode, createUser } from "@/api/user/user";
import rulesObj from "@/utils/rules";
import Canvas from "./Canvas.vue";

import BasicFooter from "@/components/Layout/BasicFooter";
import logo from "@/assets/images/logo/3.png";

export default {
  components: { MyCanvas: Canvas, BasicFooter, CaptchaButton },
  data() {
    return {
      logo,
      rulesObj,
      name: "",
      title: "",
      submitText: "",

      form: null,

      passwordType: "password",
      password2Type: "password",
      visiblepopover: false,
      state: {
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: "#FF0000"
      },
      pwdLevel: [
        { text: "低", class: "error",   color: "#ff0000" },
        { text: "低", class: "error",   color: "#ff0000" },
        { text: "中", class: "warning", color: "#ff7e05" },
        { text: "中", class: "warning", color: "#ff7e05" },
        { text: "强", class: "success", color: "#52c41a" },
      ],
    };
  },
  created () {

    // register or forget
    // 根据路由来决定显示的文字和表单项目
    const name = this.$route.name;
    Object.assign(this, {
      name,
      title: name === "register" ? "欢迎注册友普云服务" : "找回密码",
      submitText: name === "register" ? "注册" : "确定"
    });
    this.form = this.$form.createForm(this);
  },
  // mounted() {
  //   // register or forget
  //   // 根据路由来决定显示的文字和表单项目
  //   const name = this.$route.name;
  //   Object.assign(this, {
  //     name,
  //     title: name === "register" ? "欢迎注册友普云服务" : "找回密码",
  //     submitText: name === "register" ? "注册" : "确定"
  //   });
  //   this.form = this.$form.createForm(this);
  // },

  filters: {
    eyeIcon(type) {
      return type === "password" ? "eye-invisible" : "eye";
    }
  },
  watch: {
    "state.passwordLevel"(level) {
      if (level === 0) {
        this.state.percent = 10;
      } else {
        this.state.percent = level * 20;
      }
    }
  },
  methods: {
    handlePasswordLevel(rule, value, callback) {
      let level = 0;

      const msg =
        "密码长度不低于8位,必须包含大小字母,数字,特殊字符(!,@,#)其中的两项";
      const rules = [
        {
          pattern: /.{8,20}/,
          message: "密码长度长度8-20位"
        }
      ];
      const regsGroup = [/[a-z]/, /[A-Z]/, /[0-9]/, /[_!@#]/];
      const ret = regsGroup.filter(reg => reg.test(value));
      level += ret.length;
      rules.forEach(rule => {
        if (!rule.pattern.test(value)) {
          return callback(rule.message);
        }
        level++;
      });
      this.state.passwordLevel = level;

      // 包含组合中的两项即可
      ret.length >= 2 ? callback() : callback(msg);
    },
    toggleType(typeName) {
      let type = this[typeName];
      this[typeName] = type === "password" ? "text" : "password";
    },
    async handleSubmit() {
      try {
        await this.handleValidatePwd();
        const values = await this.handleValidateField();
        const resp = await createUser(values);
        this.$router.push({ name: "login" });
      } catch (error) {}
    },
    async handleValidatePwd() {
      const keys = ["password", "password2"];
      const data = await this.handleValidateField(keys);
      return new Promise((resolve, reject) => {
        if (data.password !== data.password2) {
          this.form.setFields({
            password2: {
              value: data.password2,
              errors: [
                {
                  message: "两次密码输入不一致!"
                }
              ]
            }
          });
          reject('两次密码输入不一致');
        }
        resolve();
      })
    },
    async handleValidateField(fields = null) {
      return new Promise((resolve, reject) => {
        this.form.validateFieldsAndScroll(fields, (err, values) => {
          err ? reject(err) : resolve(values);
        });
      });
    },

    async getCaptcha(callback) {
      try {
        const data = await this.handleValidateField(["phone"]);
        callback &&
          callback({
            api: sendCode,
            payload: {
              phoneNumber: data.phone,
              // 验证码类型[0:注册验证码 1:修改密码验证码 2:找回密码验证码 ]
              smsType: 0
            },
          });
      } catch (error) {}
    }
  }
};
</script>

<style lang="less" scoped>
.suffix-eye {
  cursor: pointer;
  color: #d9d9d9;
}
.user-register {
  &.error {
    color: #ff0000;
  }
  &.warning {
    color: #ff7e05;
  }
  &.success {
    color: #52c41a;
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
  width: 340px;
  margin: 0 auto;
  padding: 30px 620px 30px 30px;
  background: #fff url("../../assets/images/register.png") no-repeat right;
  background-size: contain;
  box-shadow: 4px 2px 10px 10px #e3e7f3;
}
.main.change {
  background: #fff url("../../assets/images/change.png") no-repeat right;
  background-size: contain;
  padding-right: 460px;
}
.title {
  text-align: left;
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
}
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    // height: 40px;
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
