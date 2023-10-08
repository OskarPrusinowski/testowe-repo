<template>
    <v-navigation-drawer v-model="showSideNav" temporary>
        <v-list-item v-if="actualUser" prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
            :title="`${actualUser.name} ${actualUser.lastName}`"></v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <v-list-item v-for="( element, index ) in  authorizedNavElements " :key="index" :prepend-icon="element.icon"
                :title="element.title" @click="goTo(element.name)"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    data() {
        return {
            navElements: [
                { name: "Home", icon: "mdi-home", title: "Strona główna" },
                { name: "MaturaExamList", icon: "mdi-forum", title: "Egzaminy maturalne" },
                { name: "TaskList", icon: "mdi-database", title: "Baza zadań" },
                { name: "SectionList", icon: "mdi-animation-outline", title: "Sekcje" },
                { name: "CourseList", icon: "mdi-book-multiple", title: "Kursy" },
                { name: "MaturaSheetList", icon: "mdi-note", title: "Arkusze maturalne" },
            ]
        }
    },
    computed: {
        actualUser() {
            return this.$store.getters.getActualUser;
        },
        showSideNav: {
            get() {
                return this.$store.getters.getShowSideNav
            },
            set(val) {
                this.$store.commit("setShowSideNav", val)
            }
        },
        authorizedNavElements() {
            var authorized = [];
            this.navElements.forEach(element => {
                if (this.authorized(element.name)) {
                    authorized.push(element)
                }
            })
            return authorized;
        }
    },
    methods: {
        goTo(routeName) {
            this.$router.push({ name: routeName })
        },
        authorized(routeName) {
            if (!localStorage.getItem("roles")) {
                var roles = []
            } else {
                var roles = localStorage.getItem("roles").split(",")
            }
            var requiredRoles = this.$router.resolve({
                name: routeName,
            }).meta.roles
            if (!requiredRoles) {
                return true;
            }
            var authorized = requiredRoles.some((element) => roles.includes(element));
            return authorized;
        }
    }
};
</script>