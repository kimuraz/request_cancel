<template>
  <div id="app">
    Token: 
    <input type="text" v-model="token">
    Server: 
    <input type="text" v-model="server">
    Endpoint: 
    <input type="text" v-model="endpoint">
    <br/>
    Body: 
    <textarea type="text" v-model="requestBody" rows="10"/>
    <br/>
    <button type="button" @click="clean">Clean</button>
    <button type="button" @click="doPost">POST</button>
    <button type="button" @click="cancel">Cancel</button>
    <br/>
    Response:
    {{ response }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      token: '',
      server: 'http://localhost:8000/',
      endpoint: '',
      requestBody: '',
      response: '',
      source: axios.CancelToken.source(),
    }
  },
  methods: {
    doPost() {
      console.log('here');
      localStorage.setItem('Token', this.token);
      this.$api.post(`${this.server}${this.endpoint}`, JSON.parse(this.requestBody),
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
      console.log('clicked');
      this.source.cancel('canceled');
    },
    clean() {
      this.response = '';
    },
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
