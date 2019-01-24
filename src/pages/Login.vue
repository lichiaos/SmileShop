<template>
  <div>
    <div>
      <van-nav-bar
        title="用户登录"
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
          @keyup.enter="login"
        />
        <div class="register-button">
          <van-button type="primary" size="large" @click="login" :loading="openLoading">登录</van-button>
          <van-button style="margin-top: .5rem;" type="warning" size="large" @click="$router.push('/register')">还没有账号, 去注册</van-button>
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
    login () {
      this.checkForm() && this.request()
    },
    async request () {
      this.openLoading = true
      let res = await this.$http.post(url.login, {
        userName: this.userName,
        password: this.password
      })
      if (res.data.code === 200) {
        return new Promise((resolve, reject) => {
          localStorage.userInfo = { username: this.userName }
          setTimeout(() => { resolve() }, 500)
        }).then(() => {
          Toast.success('登录成功')
          this.$router.push('/')
        }).catch(err => {
          Toast.fail('登录失败')
          console.log(err)
        })
      } else {
        Toast.fail('登录失败')
        this.openLoading = false
      }
    },
    // 表单校验
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
  },
  created () {
    if (localStorage.userInfo) {
      Toast.success('您已经登录')
      this.$router.push('/')
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
