export default {
    state: {
        showEror: false,
        message: "",
        showMessage: false,
        response: {
            status: 0,
            message: "",
            messages: []
        }
    },
    getters: {
        getShowError: state => state.showError,
        getMessage: state => state.message,
        getShowMessage: state => state.showMessage,
        getResponse: state => state.response,
        getErrors: state => state.response.messages,
        getError: state => state.response.message
    },
    mutations: {
        setShowError(state, data) {
            state.showError = data;
        },
        setMessage() {
            state.message = data
        },
        setShowMessage(state, data) {
            state.showMessage = data;
        },
        setResponse(state, data) {
            state.response = data
        },
        setErrors(state, data) {
            state.response.messages = data;
        },
        setError(state, data) {
            state.response.message = data;
        }
    },
    actions: {
        showError(state, error) {
            state.commit("setShowError", true);
            state.commit("setError", error);
        },
        showMessage(state, message) {
            console.log("pokazuje")
            state.commit("setShowMessage", true);
            state.commit("setMessage", message);
        },
    }
}
