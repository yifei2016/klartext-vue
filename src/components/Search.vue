<template>
  <div>
    <multiselect
      class="selectArea"
      v-model="selectedWord"
      label="value"
      id="ajax"
      :options="words"
      placeholder="Search"
      :option-height="10"
      open-direction="bottom"
      :multiple="false"
      :options-limit="300"
      :internal-search="false"
      @search-change="getData"
      @select="getExample">
      <template slot="option" scope="props">
        <div>
          <div class="icon">
            <span>{{props.option.value}}</span>
            <span v-if="props.option.lang==='sv'" class="flag-icon flag-icon-se"></span>
            <span v-else class="flag-icon flag-icon-gb"></span>
            <span v-if="props.option.klass===null" class="klass">{{ }}</span>
            <span class="klass" v-else>{{props.option.klass}}</span>
          </div>
          <p class="d-flex justify-content-between inflection"><span v-for="inf in props.option.inflection">{{inf}}</span></p>
          <p class="d-flex justify-content-between inflection"><span v-for="trans in props.option.translation">{{trans}}</span></p>
        </div>
      </template>
    </multiselect>
        <div v-if="selectedWord !== null" class="card" style="width: 30rem;">
          <div class="card-block">
            <h4 class="card-title">
              <span v-if="selectedWord !== null">{{selectedWord.value}}</span>
              <span v-if="selectedWord !== null && selectedWord.lang === 'sv'" class="flag-icon flag-icon-se"></span>
              <span v-if="selectedWord !== null && selectedWord.klass !== null" class="klass">{{selectedWord.klass}}</span>
            </h4>
            <p class="d-flex justify-content-between" v-if="selectedWord !== null && selectedWord.inflection !== null">
              <span v-for="inf in selectedWord.inflection">{{inf}}</span>
            </p>
          </div>
          <h6 class="card-text">Examples</h6>
          <ul v-if="selectedWord !== null" class="list-group list-group-flush">
            <li v-for="exa in this.example" class="list-group-item">{{exa.body}},
              <span class="interp flag">{{exa.interp}}</span>
              <span class="flag-icon flag-icon-gb flag"></span>
            </li>
          </ul>
        </div>
        <div class="createPost">
          <textarea class="form-control" rows="3" v-model="body" placeholder="Example"></textarea>
          <textarea class="form-control" rows="3" v-model="interp" placeholder="Interpretation"></textarea>
          <div class="d-flex justify-content-around buttons">
            <button v-on:click="createPost" type="button" class="btn createButton">Create post</button>
          </div>
        </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  components: {
    Multiselect
  },
  data () {
    return {
      words: [],
      selectedWord: null,
      example: undefined,
      body: '',
      interp: ''
    }
  },
  methods: {
    getData (query) {
      this.isLoading = true
      this.$http.get('http://localhost:8080/api/words/search', {
        params: {query: query}
      }).then(resp => {
        this.words = resp.body
        this.isLoading = false
      })
    },
    getExample (selectedWord) {
      this.isLoading = true
      var sendValue = selectedWord.inflection || []
      if (sendValue.indexOf(selectedWord.value) === -1) {
        sendValue.unshift(selectedWord.value)
      }
      this.$http.get('http://localhost:8080/api/posts/search', {
        params: {query: sendValue.join(',')}
      }).then(resp => {
        this.example = resp.body
        this.isLoading = false
      })
    },
    createPost (query) {
      this.isLoading = true
      var sessionStorageUser = sessionStorage.getItem('userName')
      var sessionStorageToken = sessionStorage.getItem('token')
      if (sessionStorageUser === null) {
        location.href = '/#/signin'
      } else {
        var url = 'http://localhost:8080/api/posts'
        var requestHeader = {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json',
          'X-Auth-Token': sessionStorageToken
        }
        var requestBody = {
          'body': this.body,
          'interp': this.interp
        }
        this.$http.post(url, requestBody, {headers: requestHeader}).then(resp => {
          location.href = '/#/me'
          this.isLoading = false
        })
      }
    }
  }
}

</script>
