
import axios from 'axios';
const URL_CITIES = '/cities';


export default {
    state: {
        city: {
            id:0,
            name:""
        },
        cities:[]
    },
    getters: {
        getCity:state=>state.city,
        getCities:state=>state.cities
    },
    mutations: {
        setCity(state, data) {
            state.city = data;
        },
        setCities(state, data) {
            state.cities = data;
        },
        setRoles(state, data) {
            state.roles = data;
        },
    },
    actions: {
        async listCities(state) {
            return axios.get(URL_CITIES)
                .then(response=>{
                    state.commit("setCities",response.data)
                })
        },
    }
}
