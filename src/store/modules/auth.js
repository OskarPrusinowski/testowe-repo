
import router from '../../routes'
import axios from 'axios';
const URL_AUTH = '/auth';


export default {
    state: {
        authenticated: true,
        actualUser: {},
        roles: []
    },
    getters: {
        getAuthenticated: state => state.authenticated,
        getActualUser: state => state.actualUser,
        getRoles: state => state.roles
    },
    mutations: {
        setAuthenticated(state, data) {
            state.authenticated = data;
        },
        setActualUser(state, value) {
            state.actualUser = value;
        },
        setRoles(state, data) {
            state.roles = data;
        },
    },
    actions: {
        async login(state, auth) {
            return axios.post(URL_AUTH + '/login', auth)
        },
        async getActualUser(state) {
            await axios.get(URL_AUTH + '/user').then(({ data }) => {
                state.commit("setActualUser", data);
                state.commit("setAuthenticated", true);
                var roles = data.roles.map(role => role.name);
                localStorage.setItem('roles', roles)
                state.commit("setRoles", data.roles)
            }).catch(() => {
                state.commit("setActualUser", {});
                state.commit("setAuthenticated", false);
                state.commit("setRoles", [])
                router.push({ name: 'Login' })
            })
        },
        async logout(state) {
            await axios.post(URL_AUTH + '/logout').then(() => {
                state.commit("setActualUser", {});
                state.commit("setAuthenticated", false);
                localStorage.removeItem('access_token')
                localStorage.removeItem('roles')
                router.push({ name: 'Login' })
            })
        },
    }
}
