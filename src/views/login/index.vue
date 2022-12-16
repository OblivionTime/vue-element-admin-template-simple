<template>
  <div>
    <div class="main" style="width: 40%; height: 100vh; margin: 60px auto">
      <div class="login">后台管理平台</div>
      <div class="form">
        <el-form :model="form" ref="ruleForm">
          <el-form-item prop="mobile" ref="mobile">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              style="border-radius: 10px"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="smsVerify" ref="smsVerify" :borderBottom="false">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              @keyup.enter.native="loginSubmit()"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <div style="width: 100%; margin: 40px auto; text-align: center">
          <el-button
            type="primary"
            style="width: 300px; border-radius: 20px"
            @click="loginSubmit"
            >登录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UserLogin } from "@/api/auth.js";
import { mapActions } from "vuex";
export default {
  props: {
    isBack: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      disabled: true,
      start: false,

      //表单
      form: {
        username: 'admin',
        password: '111111'
      },
      //提示
    };
  },

  methods: {
    ...mapActions(["Login"]),
    //登录
    loginSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          var fordata = new FormData();
          fordata.append("username", this.form.username);
          fordata.append("password", this.form.password);
          UserLogin(fordata)
            .then((res) => {
              if (res.code == 20000) {
                this.Login(res);
                this.$message.success("登录成功");
                this.$router.push("/");
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "用户名或密码错误",
                  offset: 100,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          this.$message.warning("请正确输入手机号");
          return false;
        }
      });
    },
  },
};
</script>


<style  scoped>
.header-fixed {
  height: 60px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

.header-nav {
  display: flex;
  align-items: center;
  height: 60px;
}
.login {
  margin: 5% 0;
  font-weight: 700;
  font-size: 36px;
  line-height: 50px;
  color: #16221f;
  text-align: center;
}
.form {
  padding: 0 30px;
}
.message {
  color: blue;
  cursor: pointer;
}
.message-disable {
  color: blue;
  cursor: not-allowed;
}
.disabled-btn {
  background-color: #eee;
  border: 0;
}
</style>