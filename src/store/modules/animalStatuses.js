
import axios from 'axios';
const URL_ANIMAL_STATUSES = '/animal-statuses';


export default {
    state: {
        animalStatus: {
            id:0,
            name:""
        },
        animalStatuses:[]
    },
    getters: {
        getAnimalStatus:state=>state.animalStatus,
        getAnimalStatuses:state=>state.animalStatuses
    },
    mutations: {
        setAnimalStatus(state, data) {
            state.animalStatus = data;
        },
        setAnimalStatuses(state, data) {
            state.animalStatuses = data;
        },
    },
    actions: {
        async listAnimalStatuses(state) {
            return axios.get(URL_ANIMAL_STATUSES)
                .then(response=>{
                    state.commit("setAnimalStatuses",response.data)
                })
        },
    }
}
