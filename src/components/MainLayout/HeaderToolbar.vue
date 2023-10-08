<template>
    <v-card color="grey-lighten-4" flat rounded="0">
        <v-toolbar extended color="primary">
            <v-app-bar-nav-icon v-if="authenticated" @click="showSideNav"></v-app-bar-nav-icon>
            <div v-if="authenticated" @click="showSideNav" class="clickable">
                <v-toolbar-title>Maturka.pl</v-toolbar-title>
            </div>

            <v-spacer></v-spacer>
            <router-link :to="{ name: 'UserProfile' }" v-if="authenticated">
                <div class="d-flex align-start flex-column mr-8 mt-6 ">

                    <div class="d-flex d-flex justify-self-center">
                        <v-icon icon="mdi-account-circle" size="x-large"></v-icon>
                    </div>

                    <div>
                        Hej {{ actualUser.name }}
                    </div>

                </div>
            </router-link>

        </v-toolbar>
    </v-card>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            showNavigation: false
        }
    },
    computed: {
        actualUser() {
            return this.$store.getters.getActualUser;
        },
        authenticated() {
            return this.$store.getters.getAuthenticated;
        },
    },
    methods: {
        expand() {
            this.showNavigation = true;
        },
        showSideNav(val) {
            this.$store.commit("setShowSideNav", !this.$store.getters.getShowSideNav)
        }
    }
}
</script>