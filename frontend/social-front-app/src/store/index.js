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
    }
  },
  mutations: {
    logUser(state, user){
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      instance.defaults.headers.common['Authorization'] = user.token;
    },
    unlogUser(state){
      state.user = { userId: -1, token: '' };
      localStorage.clear();
      instance.defaults.headers.common['Authorization'] = '';
    },
    setStatus(state, status){
      state.status = status;
    }
  },
  actions: {
    createAccount: ({commit}, userInfo) => {
      commit('setStatus', 'loading');
      instance.post('/signup', userInfo)
      .then(response => {
        commit('setStatus', 'created');
        console.log(response);
      })
      .catch(error => {
        commit('setStatus', 'error_create');
        console.log(error);
      })
    },
    login: ({commit}, userInfo) => {
      commit('setStatus', 'loading');
      instance.post('/login', userInfo)
      .then(response => {
        commit('setStatus', 'connected');
        commit('logUser', response.data);
        console.log(response.data.token);
      })
      .catch(error => {
        commit('setStatus', 'error_login');
        console.log(error);
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
