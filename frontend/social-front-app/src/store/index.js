import { createStore } from 'vuex'
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/auth/'
})

export default createStore({
  state: {
    status: '',
    user: {
      userId: -1,
      token: ''
    },
    rigth: ''
  },
  mutations: {
    logUser(state, user){
      state.user = user;
      console.log(state.user.userId);
      localStorage.setItem('user', JSON.stringify(user));
      instance.defaults.headers.common['Authorization'] = 'BEARER ' + user.token;
    },
    unlogUser(state){
      state.user = { userId: -1, token: '' };
      localStorage.clear();
      instance.defaults.headers.common['Authorization'] = '';
    },
    setStatus(state, status){
      state.status = status;
    },
    giveAllRigth(state){
      state.rigth = 'admin';
    }
  },
  actions: {
    createAccount: ({commit}, userInfo) => {
      return new Promise((resolve, reject) => {
        commit('setStatus', 'loading');
        instance.post('/signup', userInfo)
        .then(() => {
          commit('setStatus', 'created');
          resolve();
        })
        .catch(error => {
          commit('setStatus', 'error_create');
          console.log(error);
          reject();
        })
      })
        
    },
    login: ({commit}, userInfo) => {
      return new Promise((resolve, reject) => {
        commit('setStatus', 'loading');
        instance.post('/login', userInfo)
          .then(response => {
            commit('setStatus', 'connected');
            commit('logUser', response.data);
            if(response.data.userId === 1)
              commit('giveAllRigth');
            resolve();
          })
          .catch(error => {
            commit('setStatus', 'error_login');
            console.log(error);
            reject();
          })
      })
    },
    logout: ({commit}) => {
      commit('setStatus', '');
      commit('unlogUser');
    }
  },
  modules: {
  }
})
