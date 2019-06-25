import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    loginUser: localStorage.getItem("user"),
    userList: JSON.parse(localStorage.getItem("localusers")) || []
  },
  mutations:{
    saveLoginUser(state,value){
      state.loginUser = value
      localStorage.setItem("user",value)
    },
    saveUserList(state,users){
      state.userList = users
    }
  },
  actions:{
    getUserList({commit}){
      return new Promise((resolve,rej) => {
        axios.get('/api/userlist')
          .then(users => {
            commit('saveUserList',users.data)
            localStorage.setItem("localusers",JSON.stringify(users.data))
            resolve()
          })
      })
    }
  },
  getters:{
    newUsers: state => state.userList.filter(user => user.age<30),
    oldUsers: state => state.userList.filter(user => user.age>=30)
  }
})
