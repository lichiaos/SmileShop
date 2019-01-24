<template>
  <div>
    <div>
      <van-nav-bar
        title="用户注册"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
      <div class="register-panel">
        <van-field
          v-model="userName"
          label="用户名"
          icon="clear"
          left-icon="contact"
          placeholder="请输入用户名"
          required
          :error-message="usernameErrorMsg"
          @click-icon="userName = ''"
        />
        <van-field
          v-model="password"
          type="password"
          label="密码"
          left-icon="eye"
          placeholder="请输入密码"
          required
          :error-message="passwordErrorMsg"
          @keyup.enter="register"
        />
        <div class="register-button">
          <van-button type="primary" size="large" @click="register" :loading="openLoading">马上注册</van-button>
          <van-button style="margin-top: .5rem;" type="warning" size="large" @click="$router.push('/login')">已有账号, 去登录</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'

export default {
  data () {
    return {
      userName: '',
      password: '',
      openLoading: false,
      usernameErrorMsg: '', // 当用户名出现错误的时候
      passwordErrorMsg: '' // 当密码出现错误的时候
    }
  },
  methods: {
    register () {
      this.checkForm() && this.request()
    },
    async request () {
      this.openLoading = true
      let res = await this.$http.post(url.register, {
        userName: this.userName,
        password: this.password
      })
      if (res.data.code === 200) {
        Toast.success('注册成功')
        this.$router.push('/')
      } else {
        Toast.fail('注册失败')
        this.openLoading = false
      }
    },
    checkForm () {
      let isOk = true
      if (this.userName.length < 2) {
        this.usernameErrorMsg = '用户名不能小于5位'
        isOk = false
      } else {
        this.usernameErrorMsg = ''
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = '密码不能少于6位'
        isOk = false
      } else {
        this.passwordErrorMsg = ''
      }
      return isOk
    }
  }
}
</script>

<style scoped>
  .register-panel {
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
  }

  .register-button {
    padding-top: 10px;
  }
</style>
