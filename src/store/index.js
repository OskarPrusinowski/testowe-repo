import { createStore } from 'vuex'

import auth from "./modules/auth"
import cities from "./modules/cities"
import provinces from "./modules/provinces"
import animalStatuses from "./modules/animalStatuses"
import notifications from "./modules/notifications"
import reports from "./modules/reports"
import categories from "./modules/categories"

export default createStore({
    plugins: [
    ],
    modules: {
        auth,
        cities,
        provinces,
        animalStatuses,
        notifications,
        reports,
        categories
    },
})
