<template>
    <div class="container h-100 mt-16 pt-16">
        <v-card class="mx-auto px-6 py-8 mt-16 text-center" max-width="444" color="" rounded>
            <img src="/logo.svg" width="250"  alt="">
            <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="auth.username" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="Nazwa użytkownika"></v-text-field>
                <v-text-field v-model="auth.phoneNumber" :readonly="loading" :rules="[required]" class="mb-2" clearable
                    label="Numer telefonu"></v-text-field>

                <br>
                <v-btn rounded color="#AAD037" :disabled="!form" :loading="loading" block  size="large" type="submit"
                    variant="elevated" class="text-white">
                    Zaloguj się
                </v-btn>
            </v-form>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            auth:{
                phoneNumber:"",
                username:""
            },
            form: false,
            loading: false,
            validationErrors: {},
            show:false
        }
    },
    methods: {
        async login() {
            await this.$store.dispatch("login", this.auth).then(response => {
                var token = response.data.token;
                var roles = response.data.roles;
                console.log(token)
                console.log(roles)
                localStorage.setItem('access_token', token)
                localStorage.setItem('roles', roles)
                this.$store.commit("setAuthenticated", true)
                this.$store.dispatch("getActualUser");
                this.$router.push({ name: 'Home' })
            }).catch(error => {
                console.log(error)
                this.$store.dispatch("showError", "Błędne dane autoryzacyjne")
            })
        },
        redirectIfAuthenticated() {
            // if (this.$store.getters.getAuthenticated) {
            //     this.$router.push({ name: 'Home' })
            // }
        },
        async onSubmit() {
            if (!this.form) return

            this.loading = true;
            await this.login();
            this.loading = false;
        },
        required(v) {
            return !!v || 'Pole jest wymagane'
        },
    },
    created() {
        this.redirectIfAuthenticated();
    }
}
</script>
