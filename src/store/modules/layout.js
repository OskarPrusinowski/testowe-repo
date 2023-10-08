export default {
    state: {
        showSideNav: null
    },
    getters: {
        getShowSideNav: state => state.showSideNav
    },
    mutations: {
        setShowSideNav(state) {
            state.showSideNav = !state.showSideNav;
        },
    },

}
