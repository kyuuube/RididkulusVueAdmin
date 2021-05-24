<template>
    <transition name="el-fade-in-linear">
        <div class="login-warp">
            <div id="clouds">
                <div class="cloud x1"></div>
                <!-- Time for multiple clouds to dance around -->
                <div class="cloud x2"></div>
                <div class="cloud x3"></div>
                <div class="cloud x4"></div>
                <div class="cloud x5"></div>
            </div>
            <div class="container">
                <div id="login">
                    <div class="login-form-warp">
                        <p>
                            <span class="fontawesome-user">
                                <i class="el-icon-user"></i>
                            </span>
                            <input type="text" v-model="account" aria-labelledby="login account" required />
                        </p>
                        <p>
                            <span class="fontawesome-lock">
                                <i class="el-icon-lock"></i>
                            </span>
                            <input type="password" v-model="password" aria-labelledby="login password" required />
                        </p>
                        <div
                            @keypress.enter="login"
                            v-loading="loading"
                            element-loading-spinner="el-icon-loading"
                            class="login-button"
                            @click="login"
                        >
                            Log in
                        </div>
                    </div>

                    <p>Not a member? <a href="#" class="blue">Sign up now</a></p>
                </div>
                <!-- end login -->
            </div>
        </div>
    </transition>
</template>

<script>
// apis
import * as accountApi from 'src/apis/accountApi';
const md5 = require('md5');
// store
import { mapActions } from 'vuex';
import * as $account from 'src/store/modules/account/types';
// import { Message } from 'element-ui';
export default {
    name: 'login',
    data() {
        return {
            loading: false,
            account: '',
            password: ''
        };
    },
    methods: {
        ...mapActions($account.namespace, {
            setToken: $account.actions.setToken,
            setUserInfo: $account.actions.setUserInfo
        }),
        async login() {
            this.loading = true;
            const { code, data } = await accountApi.login({ username: this.account, password: md5(this.password) }).catch(e => e);
            this.loading = false;
            if (code !== 200) {
                return this.$message.error('msg');
            }
            this.setToken(data.accessToken);
            this.setUserInfo(data);
            await this.$router.push('/');
        }
    }
};
</script>

<style lang="less">
.login-warp {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: #ffffff;
}

/* ---------- GENERAL ---------- */
* {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
*:before,
*:after {
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

body {
    background: #2c3338;
    color: #606468;
    font: 87.5%/1.5em 'Open Sans', sans-serif;
    margin: 0;
    overflow-y: auto !important;
    overflow-x: hidden !important;
}

a {
    color: #eee;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

input {
    border: none;
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5em;
    padding: 0;
    -webkit-appearance: none;
    outline: none;
}

p {
    line-height: 1.5em;
}

.clearfix {
    *zoom: 1;
}
.clearfix:before,
.clearfix:after {
    content: ' ';
    display: table;
}
.clearfix:after {
    clear: both;
}

.container {
    left: 50%;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}

/* ---------- LOGIN ---------- */
#login {
    width: 280px;
}

#login .login-form-warp span {
    background-color: #363b41;
    border-radius: 3px 0px 0px 3px;
    color: #eff0f1;
    display: block;
    float: left;
    height: 50px;
    line-height: 50px;
    text-align: center;
    width: 50px;
}

#login .login-form-warp input {
    height: 50px;
}

#login .login-form-warp input[type='text'],
input[type='password'] {
    background-color: #3b4148;
    border-radius: 0px 3px 3px 0px;
    color: #eff0f1;
    margin-bottom: 1em;
    padding: 0 16px;
    width: 230px;
}

#login .login-form-warp .login-button {
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    background-color: #3d80ea;
    color: #eee;
    font-weight: bold;
    margin-bottom: 2em;
    width: 280px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    user-select: none;
}

#login .login-form-warp .login-button:hover {
    background-color: #1f62d4;
}

#login > p {
    text-align: center;
}

#login > p span {
    padding-left: 5px;
}

/*Lets start with the cloud formation rather*/

/*The container will also serve as the SKY*/

* {
    margin: 0;
    padding: 0;
}

#clouds {
    padding: 50px 0;
    background: #c9dbe9;
    background: -webkit-linear-gradient(top, #c9dbe9 0%, #fff 100%);
    background: -linear-gradient(top, #c9dbe9 0%, #fff 100%);
    background: -moz-linear-gradient(top, #c9dbe9 0%, #fff 100%);
}

/*Time to finalise the cloud shape*/
.cloud {
    width: 200px;
    height: 60px;
    background: #fff;

    border-radius: 200px;
    -moz-border-radius: 200px;
    -webkit-border-radius: 200px;

    position: relative;
}

.cloud:before,
.cloud:after {
    content: '';
    position: absolute;
    background: #fff;
    width: 100px;
    height: 80px;
    position: absolute;
    top: -15px;
    left: 10px;

    border-radius: 100px;
    -moz-border-radius: 100px;
    -webkit-border-radius: 100px;

    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
    -moz-transform: rotate(30deg);
}

.cloud:after {
    width: 120px;
    height: 120px;
    top: -55px;
    left: auto;
    right: 15px;
}

/*Time to animate*/
.x1 {
    -webkit-animation: moveclouds 15s linear infinite;
    -moz-animation: moveclouds 15s linear infinite;
    -o-animation: moveclouds 15s linear infinite;
}

/*variable speed, opacity, and position of clouds for realistic effect*/
.x2 {
    left: 200px;

    -webkit-transform: scale(0.6);
    -moz-transform: scale(0.6);
    transform: scale(0.6);
    opacity: 0.6; /*opacity proportional to the size*/

    /*Speed will also be proportional to the size and opacity*/
    /*More the speed. Less the time in 's' = seconds*/
    -webkit-animation: moveclouds 25s linear infinite;
    -moz-animation: moveclouds 25s linear infinite;
    -o-animation: moveclouds 25s linear infinite;
}

.x3 {
    left: -250px;
    top: -200px;

    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.8; /*opacity proportional to the size*/

    -webkit-animation: moveclouds 20s linear infinite;
    -moz-animation: moveclouds 20s linear infinite;
    -o-animation: moveclouds 20s linear infinite;
}

.x4 {
    left: 470px;
    top: -250px;

    -webkit-transform: scale(0.75);
    -moz-transform: scale(0.75);
    transform: scale(0.75);
    opacity: 0.75; /*opacity proportional to the size*/

    -webkit-animation: moveclouds 18s linear infinite;
    -moz-animation: moveclouds 18s linear infinite;
    -o-animation: moveclouds 18s linear infinite;
}

.x5 {
    left: -150px;
    top: -150px;

    -webkit-transform: scale(0.8);
    -moz-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.8; /*opacity proportional to the size*/

    -webkit-animation: moveclouds 20s linear infinite;
    -moz-animation: moveclouds 20s linear infinite;
    -o-animation: moveclouds 20s linear infinite;
}

@-webkit-keyframes moveclouds {
    0% {
        margin-left: 1000px;
    }
    100% {
        margin-left: -1000px;
    }
}
@-moz-keyframes moveclouds {
    0% {
        margin-left: 1000px;
    }
    100% {
        margin-left: -1000px;
    }
}
@-o-keyframes moveclouds {
    0% {
        margin-left: 1000px;
    }
    100% {
        margin-left: -1000px;
    }
}
.bottom {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 10px 0;
    height: 100px;
    position: absolute;
}
.bottom h3 {
    color: white;
    font-size: 30px;
    font-weight: bold;
    margin-top: 45px;
    padding-bottom: 45px;
}
.blue {
    color: #09c;
}
</style>
