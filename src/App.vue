<template>
  <div id="app">
    <div class="input-group">
      <label>Token:</label> 
      <input type="text" v-model="token">
    </div>
    <div class="input-group">
      Endpoint: 
      <input type="text" v-model="endpoint">
    </div>
    <br/>
    <div class="input-group">
      <label>Body:</label> 
      <textarea type="text" v-model="requestBody" rows="10"/>
    </div>
    <div class="input-group">
      <label>Response:</label>
      <textarea type="text" v-model="response" rows="10"/>
    </div>
    <div class="btn-holder">
      <button class="clean" type="button" @click="clean">Clean</button>
      <button class="post" type="button" @click="doPost">POST</button>
      <button class="cancel" type="button" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      token: '',
      endpoint: 'http://localhost:8000/',
      requestBody: '',
      response: '',
      source: axios.CancelToken.source(),
    }
  },
  methods: {
    doPost() {
      console.log('here');
      localStorage.setItem('Token', this.token);
      this.$api.post(`${this.endpoint}`, JSON.parse(this.requestBody),
      {
        cancelToken: this.source.token,
      }).then((response) => {
        this.response = response
      }).catch((err) => {
        console.log(err);
        this.response = err;
        if (axios.isCancel(err)) {
          this.source = axios.CancelToken.source();
        }
      });
    },
    cancel() {
      this.source.cancel('canceled');
    },
    clean() {
      this.response = '';
    },
  }
}
</script>

<style lang="sass">
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin-top: 60px

  .input-group
    display: flex
    flex-direction: column
  .btn-holder
    width: 100%
    text-align: right
    margin-top: 30px
    button
      text-transform: uppercase
      font-size: 1rem
      font-weight: 300
      padding: 3px 15px
      border-radius: 0
      background-color: transparent
    .clean
      border: 1px solid #5bc0de
      color: #5bc0de
      &:hover
        color: white
        background-color: #5bc0de
    .post
      border: 1px solid #0275d8
      color: #0275d8
      &:hover
        color: white
        background-color: #0275d8
    .cancel
      border: 1px solid #d9534f
      color: #d9534f
      &:hover
        color: white
        background-color: #d9534f

</style>
