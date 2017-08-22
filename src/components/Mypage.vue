<template lang="html">
  <div class="">
    <button v-on:click="listPost()" type="button" class="btn listButton">List post</button>
    <div class="listPost">
      <ul v-if="listedPost !== null" class="list-group">
        <li class="list-group-item"  v-for="(post,index) in listedPost" :key="post.id">
            <div>{{post.body}}</div>
              <textarea
              type="text"
              v-show="post.editPost"
              v-model="post.body">
            </textarea>
            <br/>
           <div>{{post.interp}}</div>
           <textarea
           type="text"
           v-show="post.editPost"
           v-model="post.interp">
         </textarea>
           <span>
             <button v-on:click="editClick(this, index)" class="editButton"><i class="fa fa-lg fa-pencil-square-o" aria-hidden="true"></i></button>
           </span>
           <span>
             <button v-on:click="deletePost(this, index)" type="button" class="btn deleteButton"><i class="fa fa-lg fa-trash-o" aria-hidden="true"></i></button>
           </span>
           <div class="">
           <button v-on:click="updatePost(this, index)" v-show="post.editPost" type="button" class="submitButton">
             <i class="fa fa-lg fa-paper-plane" aria-hidden="true"></i>
           </button>
           <button type="button"
           v-on:click="thumbUp(this, index)"
           class="fa fa-thumbs-up"
           aria-hidden="true"
           v-bind:class="post.likeClass">
             {{post.total_likes}}
           </button>
         </div>
        </li>
       </ul>
       <div class="pagination">
         <b-pagination
         v-show="show" v-on:change="pagination" size="sm" :total-rows="totalPage" v-model="currentPage" :per-page="1">
         </b-pagination>
       </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
export default {
  data () {
    return {
      listedPost: null,
      currentPage: 1,
      totalPage: null,
      body: '',
      interp: '',
      id: 0,
      idList: null,
      likedList: '',
      like: '',
      show: false
    }
  },
  methods: {
    listPost () {
      this.isLoading = true
      this.show = !this.show
      var requestHeader = {'Accept': 'application/json'}
      var url = 'http://localhost:8080/api/users/1/posts?page=0&size=20&sort=createdAt,desc'
      this.$http.get(url, {headers: requestHeader}).then(resp => {
        this.totalPage = resp.body.totalPages
        this.listedPost = resp.body.content.map(x => {
          x.editPost = false
          x.likeClass = 'likeBlack'
          x.likeButtonCliked = 0
          x.total_likes = x.total_likes
          return x
        })
        this.idList = resp.body.content.map(x => {
          return x.id
        })
        this.isLoading = false
      })
    },
    editClick (ev, index) {
      this.listedPost[index].editPost = !this.listedPost[index].editPost
      this.id = this.idList[index]
    },
    updatePost (ev, index) {
      this.isLoading = true
      this.id = this.idList[index]
      var sessionStorageToken = sessionStorage.getItem('token')
      var url = `http://localhost:8080/api/posts/${this.id}`
      this.body = this.listedPost[index].body
      this.interp = this.listedPost[index].interp
      var requestHeader = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        'X-Auth-Token': sessionStorageToken
      }
      var requestBody = {'body': this.body, 'interp': this.interp}
      this.$http.put(url, requestBody, {headers: requestHeader}).then(resp => {
        this.listedPost[index].editPost = !this.listedPost[index].editPost
        this.isLoading = false
      })
    },
    pagination (e) {
      this.isLoading = true
      let page = e - 1
      var url = 'http://localhost:8080/api/users/1/posts'
      var urlParameters = {page: page, size: 10, sort: 'createdAt,desc'}
      this.$http.get(url, {params: urlParameters}).then(resp => {
        this.totalPage = resp.body.totalPages
        this.listedPost = resp.body.content.map(x => {
          x.editPost = false
          return x
        })
        this.isLoading = false
      })
    },
    deletePost (ev, index) {
      this.isLoading = true
      this.id = this.idList[index]
      var sessionStorageToken = sessionStorage.getItem('token')
      var url = `http://localhost:8080/api/posts/${this.id}`
      var requestHeader = {
        'Accept': 'application/json',
        'X-Auth-Token': sessionStorageToken
      }
      this.$http.delete(url, {headers: requestHeader}).then(resp => {
        this.isLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    thumbUp (ev, index) {
      this.listedPost[index].likeButtonCliked = this.listedPost[index].likeButtonCliked + 1
      var sessionStorageToken = sessionStorage.getItem('token')
      this.id = this.idList[index]
      var url = `http://localhost:8080/api/posts/${this.id}/likes`
      var requestHeader = {
        'Accept': 'application/json',
        'X-Auth-Token': sessionStorageToken
      }
      if (this.listedPost[index].likeButtonCliked % 2 === 1) {
        this.$http.post(url, null, {headers: requestHeader}).then(resp => {
          this.isLoading = true
          this.listedPost[index].likeClass = 'thumbUpButton'
          debugger
          this.listedPost[index].total_likes = this.listedPost[index].total_likes + 1
          this.isLoading = false
        })
      } else if (this.listedPost[index].likeButtonCliked % 2 === 0) {
        this.$http.delete(url, {headers: requestHeader}).then(resp => {
          this.isLoading = true
          this.listedPost[index].likeClass = 'likeBlack'
          this.listedPost[index].total_likes = this.listedPost[index].total_likes - 1
          debugger
          this.isLoading = false
        })
      }
    }
  }
}
</script>

<style lang="css">
</style>
