<template>
  <div class="">
    <nav class="navbar navbar-toggleable-lg navbar-inverse bg-inverse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link nav-item active" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      <button
      class="btn btn-secondary signUp navbar-toggler-right"
      data-toggle="collapse"
      type="button"
      v-popover:foo><i class="fa fa-lg fa-user" aria-hidden="true"></i>
    </button>
    <popover name="foo">
      <div class="d-flex justify-content-around">
        <button type="button" v-show="loggedIn" v-on:click="signUp" class="signin btn btn-link">Sign up</button>
        <button  type="button" v-show="loggedIn" v-on:click="signIn" class="signin btn btn-link">Sign in</button>
        <button type="button" v-show="!loggedIn" v-on:click="signOut" class="signin btn btn-link">Sign out</button>
      </div>
    </popover>
  </nav>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Popover from 'vue-js-popover'
Vue.use(Popover)

export default {
  name: 'app',
  data () {
    return {
      loggedIn: false
    }
  },
  methods: {
    signIn () {
      this.loggedIn = !this.loggedIn
      location.href = '/#/signin'
    },
    signUp () {
      this.loggedIn = !this.loggedIn
      location.href = '/#/signup'
    },
    signOut () {
      this.loggedIn = !this.loggedIn
      location.href = '/#/home'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
