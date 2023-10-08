
import axios from 'axios';
const URL_CATEGORIES = '/categories';


export default {
    state: {
        category: {
            id:0,
            name:""
        },
        categories:[]
    },
    getters: {
        getCategory:state=>state.category,
        getCategories:state=>state.categories
    },
    mutations: {
        setCategory(state, data) {
            state.category = data;
        },
        setCategories(state, data) {
            state.categories = data;
        },
    },
    actions: {
        async listCategories(state) {
            return axios.get(URL_CATEGORIES)
                .then(response=>{
                    state.commit("setCategories",response.data)
                })
        },
    }
}
