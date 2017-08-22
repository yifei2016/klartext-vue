<template>
  <div id="input">
      <v-select
        :on-search="getOptions"
        :on-change="consoleCallback"
        :options="options"
        label="value" >
      </v-select>
      <br/>
      <hr/>
      <div v-if="selected !== undefined">
        <p class="value">{{selected.value}}</p>
        <p>class: <span>{{selected.klass}}</span></p>
        <p>language: {{selected.lang}}</p>
        <p>translation: <span v-for="trans in selected.translation">{{trans}}, </span></p>
        <p>inflection: <span v-for="inf in selected.inflection">{{inf}}, </span></p>
      </div>
    </div>
</template>

<script>
  import vSelect from 'vue-select'
  export default {
    name: 'input',
    components: {vSelect},
    data: function () {
      return {
        options: [],
        selected: undefined
      }
    },
    methods: {
      consoleCallback (val) {
        this.selected = val
      },
      getOptions: function (search, loading) {
        loading(true)
        this.$http.get('http://localhost:8080/api/search/word', {
          params: {query: search}
        }).then(resp => {
          this.options = resp.body
          loading(false)
        })
      }
    }
  }
</script>
