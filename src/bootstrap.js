
import * as Popper from '@popperjs/core'
window.Popper = Popper

import 'bootstrap'

import katex from 'katex';
import 'katex/dist/katex.min.css';

import axios from 'axios'
window.axios = axios
window.katex = katex

import router from './routes';
import store from './store';

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true

axios.defaults.baseURL = 'http://api.animap.itify.pl:8081/api/';

axios.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use((response) => {
    if (response.status === 401) {
        router.push({ name: 'Login' })
        store.dispatch("showMessage", "Wylogowano przez brak aktywności")
    }
    if (response.status == 201) {
        store.dispatch("showMessage", "Prawidłowo utworzono")
    }
    if (response.status == 234) {
        store.dispatch("showMessage", "Prawidłowo zaaktualizowano")
    }
    if (response.status == 250) {
        store.dispatch("showMessage", "Prawidłowo usunięto")
    }
    return response;
}, (error) => {
    console.log(error.response)
    if (error.response && error.response.data) {
        store.commit("setResponse", error.response.data)
        store.dispatch("showError")
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});