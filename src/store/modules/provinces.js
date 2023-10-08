
import axios from 'axios';
const URL_PROVINCES = '/provinces';


export default {
    state: {
        province: {
            id:0,
            name:""
        },
        provinces:[]
    },
    getters: {
        getProvince:state=>state.province,
        getProvinces:state=>state.provinces
    },
    mutations: {
        setProvince(state, data) {
            state.province = data;
        },
        setProvinces(state, data) {
            state.provinces = data;
        },
    },
    actions: {
        async listProvinces(state) {
            return axios.get(URL_PROVINCES)
                .then(response=>{
                    state.commit("setProvinces",response.data)
                })
        },
    }
}
