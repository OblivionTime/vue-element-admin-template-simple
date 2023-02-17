<template>
  <div class="login-main">
    <form class="login-form">
      <div class="login-form__cover"></div>
      <div class="login-form__loader">
        <div class="login-spinner active">
          <svg class="login-spinner__circular" viewBox="25 25 50 50">
            <circle
              class="login-spinner__path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke-width="4"
              stroke-miterlimit="10"
            ></circle>
          </svg>
        </div>
      </div>
      <div class="login-form__content">
        <h1
          style="
            font-size: 40px;
            margin: 15px 0 20px 0;
            letter-spacing: 0.05em;
            color: #714cab;
            font-weight: 700;
          "
        >
          后台管理系统
        </h1>
        <el-form ref="ruleForm" :inline="true" :model="form" :rules="rules">
          <el-form-item prop="username" label-width="400px">
            <div class="login-styled-input">
              <input
                type="text"
                class="login-styled-input__input"
                name="nickname"
                v-model="form.username"
              />
              <div class="login-styled-input__placeholder">
                <span class="login-styled-input__placeholder-text"
                  ><span class="login-letter">U</span
                  ><span class="login-letter">s</span
                  ><span class="login-letter">e</span
                  ><span class="login-letter">r</span
                  ><span class="login-letter">n</span
                  ><span class="login-letter">a</span
                  ><span class="login-letter">m</span
                  ><span class="login-letter">e</span></span
                >
              </div>
              <div class="login-styled-input__circle"></div>
            </div>
          </el-form-item>
          <el-form-item prop="password">
            <div class="login-styled-input">
              <input
                type="password"
                class="login-styled-input__input"
                v-model="form.password"
              />
              <div class="login-styled-input__placeholder">
                <span class="login-styled-input__placeholder-text"
                  ><span class="login-letter">P</span
                  ><span class="login-letter">a</span
                  ><span class="login-letter">s</span
                  ><span class="login-letter">s</span
                  ><span class="login-letter">w</span
                  ><span class="login-letter">o</span
                  ><span class="login-letter">r</span
                  ><span class="login-letter">d</span></span
                >
              </div>
              <div class="login-styled-input__circle"></div>
            </div>
          </el-form-item>
          <el-form-item>
            <button
              type="button"
              class="login-styled-button"
              @click="loginSubmit"
              :disabled="submitBtn"
            >
              <span class="login-styled-button__real-text-holder">
                <span class="login-styled-button__real-text">Submit</span>
                <span class="login-styled-button__moving-block face">
                  <span class="login-styled-button__text-holder">
                    <span class="login-styled-button__text">Submit</span>
                  </span> </span
                ><span class="login-styled-button__moving-block back">
                  <span class="login-styled-button__text-holder">
                    <span class="login-styled-button__text">Submit</span>
                  </span>
                </span>
              </span>
            </button>
          </el-form-item>
        </el-form>
      </div>
    </form>
  </div>
</template>

<script>
import { UserLogin } from "@/api/auth.js";
import { mapActions } from "vuex";

export default {
  name: "Test",
  mounted() {
    var placeholders = document.querySelectorAll(
        ".login-styled-input__placeholder-text"
      ),
      inputs = document.querySelectorAll(".login-styled-input__input");
    placeholders.forEach(function (el, i) {
      var value = el.innerText,
        html = "";
      for (
        var _iterator = value,
          _isArray = Array.isArray(_iterator),
          _i = 0,
          _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
        ;

      ) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var w = _ref;

        if (!value) value = "&nbsp;";
        html += '<span class="login-letter">' + w + "</span>";
      }
      el.innerHTML = html;
    });

    inputs.forEach(function (el) {
      var parent = el.parentNode;
      el.addEventListener(
        "focus",
        function () {
          parent.classList.add("login-filled");
          placeholderAnimationIn(parent, true);
        },
        false
      );
      el.addEventListener(
        "blur",
        function () {
          if (el.value.length) return;
          parent.classList.remove("login-filled");
          placeholderAnimationIn(parent, false);
        },
        false
      );
    });

    function placeholderAnimationIn(parent, action) {
      var act = action ? "add" : "remove";
      var letters = parent.querySelectorAll(".login-letter");
      letters = [].slice.call(letters, 0);
      if (!action) letters = letters.reverse();
      letters.forEach(function (el, i) {
        setTimeout(function () {
          var contains = parent.classList.contains("login-filled");
          if ((action && !contains) || (!action && contains)) return;
          el.classList[act]("login-active");
        }, 50 * i);
      });
    }

    setTimeout(function () {
      document.body.classList.add("on-start");
    }, 100);

    setTimeout(function () {
      document.body.classList.add("document-loaded");
    }, 1800);
  },
  data() {
    return {
      disabled: true,
      submitBtn: false,
      //规则
      rules: {
        // 字段名称
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur"],
          },
        ],
      },
      //表单
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["Login", "saveUserInfo"]),

    //登录
    loginSubmit() {
      if (this.submitBtn) {
        return;
      }
      this.submitBtn = true;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          UserLogin(this.form)
            .then((res) => {
              if (res.errCode == 0) {
                this.Login(res);
                this.$message.success("登录成功");
                this.$router.go(-1);
              } else {
                this.$message.error("用户名或密码错误");
                this.form.password = "";
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.submitBtn = false;
            });
        } else {
          this.submitBtn = false;
          return false;
        }
      });
    },
  },
};
</script>

<style >
* {
  box-sizing: border-box;
}
.login-main {
  all: initial;
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.02em;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #3f2766;
}
.login-form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  width: 400px;
  height: 400px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding: 20px;
  border-radius: 5px;
}
.login-form__loader {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: -4;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.login-form__content {
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  opacity: 0;
  -webkit-transform: translateY(10px);
  transform: translateY(10px);
  -webkit-transition: all 0.5s ease 0.7s;
  transition: all 0.5s ease 0.7s;
}
.login-form__cover {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -4;
  border-radius: 7px;
  overflow: hidden;
  -webkit-transition: all 0.3s ease 0.8s;
  transition: all 0.3s ease 0.8s;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
}
.login-form__cover:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #4d317a;
  z-index: -4;
  border-radius: 50%;
  -webkit-transition: all 1.5s ease 0.3s;
  transition: all 1.5s ease 0.3s;
  -webkit-transform: scale(0);
  transform: scale(0);
}
.login-form__cover:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: white;
  z-index: -5;
  border-radius: 50%;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  -webkit-transform: scale(0);
  transform: scale(0);
}
body.on-start .login-form__cover:before {
  -webkit-transform: scale(0.15);
  transform: scale(0.15);
}
body.document-loaded .login-form__loader {
  -webkit-transform: scale(0);
  transform: scale(0);
  opacity: 0;
  visibility: hidden;
}
body.document-loaded .login-form__content {
  opacity: 1;
  -webkit-transform: none;
  transform: none;
  width: 400px;
}
body.document-loaded .login-form__cover {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}
body.document-loaded .login-form__cover:after {
  -webkit-transform: scale(2);
  transform: scale(2);
}
body.document-loaded .login-form__cover:before {
  -webkit-transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
  transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
  transition: transform 2s ease, opacity 0.3s ease 0.8s;
  transition: transform 2s ease, opacity 0.3s ease 0.8s,
    -webkit-transform 2s ease;
  -webkit-transform: scale(2);
  transform: scale(2);
  opacity: 0;
}
.login-styled-button {
  -webkit-appearance: none;
  -webkit-user-select: none;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  padding: 20px;
  outline: none;
  background: none;
  position: relative;
  color: #492e72;
  border-radius: 3px;
  margin-bottom: 25px;
  border: none;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  background: #714cac;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  overflow: hidden;
}
.login-styled-button__real-text-holder {
  position: relative;
}
.login-styled-button__real-text {
  color: transparent;
  display: inline-block;
}
.login-styled-button__text-holder {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.login-styled-button__moving-block {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.login-styled-button__moving-block.back {
  color: white;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.login-styled-button__moving-block.back .login-styled-button__text-holder {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.login-styled-button:hover,
.login-styled-button:active {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  background: #7a51bb;
}
.login-styled-button:hover .face,
.login-styled-button:active .face {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}
.login-styled-button:hover .face .login-styled-button__text-holder,
.login-styled-button:active .face .login-styled-button__text-holder {
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
}
.login-styled-button:hover .back,
.login-styled-button:active .back {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
.login-styled-button:hover .back .login-styled-button__text-holder,
.login-styled-button:active .back .login-styled-button__text-holder {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
.login-styled-button:active {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
.login-styled-input {
  width: 100%;
  position: relative;
  margin-bottom: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
.login-styled-input__circle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  overflow: hidden;
  border-radius: 3px;
}
.login-styled-input__circle:after {
  content: "";
  position: absolute;
  left: 16.5px;
  top: 19px;
  height: 14px;
  width: 14px;
  z-index: -2;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0);
  -webkit-transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: opacity 1s ease, -webkit-transform 0.6s ease;
  transition: transform 0.6s ease, opacity 1s ease;
  transition: transform 0.6s ease, opacity 1s ease, -webkit-transform 0.6s ease;
}
.login-styled-input__input {
  width: 100%;
  -webkit-appearance: none;
  font-size: 14px;
  outline: none;
  background: none;
  padding: 18px 15px;
  color: #ceafff;
  border: none;
  font-weight: 600;
  letter-spacing: 0.035em;
}
.login-styled-input__placeholder {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  z-index: -1;
  padding-left: 45px;
  color: white;
}
.login-styled-input__placeholder-text {
  -webkit-perspective: 500px;
  perspective: 500px;
  display: inline-block;
}
.login-styled-input__placeholder-text .login-letter {
  display: inline-block;
  vertical-align: middle;
  position: relative;
  -webkit-animation: letterAnimOut 0.25s ease forwards;
  animation: letterAnimOut 0.25s ease forwards;
  text-shadow: 0 0 5px;
}
.login-styled-input__placeholder-text .login-letter.login-active {
  -webkit-animation: letterAnimIn 0.25s ease forwards;
  animation: letterAnimIn 0.25s ease forwards;
}
.login-styled-input:hover {
  border-color: rgba(255, 255, 255, 0.4);
}
.login-styled-input.login-filled {
  border-color: rgba(255, 255, 255, 0.2);
}
.login-styled-input.login-filled .login-styled-input__circle:after {
  -webkit-transform: scale(37);
  transform: scale(37);
  opacity: 0;
}

.login-spinner {
  position: relative;
  margin: auto;
  width: 50px;
  height: 50px;
  -webkit-transition: all 0.2s ease 0s;
  transition: all 0.2s ease 0s;
}
.login-spinner__circular {
  -webkit-animation: rotate 1.5s linear infinite;
  animation: rotate 1.5s linear infinite;
  -webkit-animation-play-state: paused;
  animation-play-state: paused;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: auto;
}
.login-spinner__path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  -webkit-animation: dash 1.3s ease forwards 0.5s;
  animation: dash 1.3s ease forwards 0.5s;
  opacity: 0;
  stroke-linecap: round;
  stroke: #7b23ff;
  -webkit-animation-play-state: running;
  animation-play-state: running;
}
</style>
<style >
@-webkit-keyframes letterAnimIn {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  56% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 0;
    color: #00ff6b;
  }
  76% {
    color: #00ff6b;
    opacity: 1;
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
  }
  100% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
}
@keyframes letterAnimIn {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  25% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  56% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 0;
    color: #00ff6b;
  }
  76% {
    color: #00ff6b;
    opacity: 1;
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
  }
  100% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
}
@-webkit-keyframes letterAnimOut {
  0% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
  25% {
    -webkit-transform: translate(-30px, -40px);
    transform: translate(-30px, -40px);
    opacity: 0;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  56% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}
@keyframes letterAnimOut {
  0% {
    -webkit-transform: translate(-30px, -27px);
    transform: translate(-30px, -27px);
    opacity: 1;
  }
  25% {
    -webkit-transform: translate(-30px, -40px);
    transform: translate(-30px, -40px);
    opacity: 0;
  }
  45% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
  }
  55% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    opacity: 0;
    color: red;
  }
  56% {
    -webkit-transform: translate(0, 10px);
    transform: translate(0, 10px);
    color: red;
  }
  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}
@-webkit-keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 40, 200;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 125, 200;
    opacity: 1;
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    opacity: 0;
  }
  50% {
    stroke-dasharray: 40, 200;
    opacity: 1;
  }
  100% {
    stroke-dasharray: 125, 200;
    opacity: 1;
  }
}
</style>
<style scoped>
::v-deep .el-form--inline .el-form-item__content {
  width: 340px;
}
</style>