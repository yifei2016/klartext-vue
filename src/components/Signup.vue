<template lang="html">
  <div class="container">
  <form>
    <div class="form-group row">
      <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" v-model="email" class="form-control" id="inputEmail3" placeholder="Email">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputName" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input type="text" v-model="name" class="form-control" id="inputName" placeholder="Name">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input type="password" v-model="password" class="form-control" id="inputPassword3" placeholder="Password">
      </div>
    </div>
    <div class="form-group row">
      <div class="offset-sm-2 col-sm-10">
        <button type="submit" v-on:click="signup()" class="btn btn-primary">Sign up</button>
      </div>
    </div>
  </form>
</div>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      name: null,
      password: null
    }
  },
  methods: {
    signup () {
      this.isLoading = true
      var url = 'http://localhost:8080/api/users/register'
      var requestHeader = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
      }
      var requestBody = {
        'email': this.email,
        'name': this.name,
        'password': this.password
      }
      this.$http.post(url, requestBody, {headers: requestHeader}).then(resp => {
        this.isLoading = false
        location.href = '/#/signin'
      })
    }
  }
}
</script>

<style lang="css">
</style>
