
import axios from 'axios';
const URL_REPORTS = '/reports';


export default {
    state: {
        report: {
            id:0,
            name:""
        },
        reports:[],
        allCounts:0
    },
    getters: {
        getReport:state=>state.report,
        getReports:state=>state.reports,
        getAllCounts:state=>state.allCounts
    },
    mutations: {
        setReport(state, data) {
            state.report = data;
        },
        setReports(state, data) {
            state.reports = data;
        },
        setAllCounts(state,data){
            state.allCounts=data;
        }
    },
    actions: {
        async listReports(state,params) {
            return axios.get(URL_REPORTS+"/params",{params})
                .then(response=>{
                    console.log(response.data)
                    state.commit("setReports",response.data.content)
                    state.commit("setAllCounts",response.data.totalElements)
                })
        },
    }
}
