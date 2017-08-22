<template lang="html">
  <div class="container">
  <form>
    <div class="form-group row">
      <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input v-model="email" type="email" class="form-control" id="inputEmail3" placeholder="Email">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input v-model="password" type="password" class="form-control" id="inputPassword3" placeholder="Password">
      </div>
    </div>
    <div class="form-group row">
      <div class="offset-sm-2 col-sm-10">
        <button v-on:click="login()" type="submit" class="btn btn-primary">Sign in</button>
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
      password: null,
      userEmail: null,
      token: null
    }
  },
  methods: {
    login () {
      this.isLoading = true
      var requestHeader = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json'
      }
      var requestBody = {
        'email': this.email,
        'password': this.password
      }
      var url = 'http://localhost:8080/api/users/auth'
      return this.$http.put(url, requestBody, {headers: requestHeader}).then(resp => {
        sessionStorage.setItem('userName', resp.body.user.name)
        sessionStorage.setItem('userEmail', resp.body.user.email)
        sessionStorage.setItem('token', resp.body.token)
        debugger
        this.isLoading = false
        location.href = '/#/me'
      }).catch(error => {
        console.log(error)
      })
    }
  }
}

</script>

<style lang="css">
</style>
