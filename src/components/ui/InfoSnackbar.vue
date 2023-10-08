<template>
    <div class="text-center">
        <v-snackbar v-model="showMessage" timeout="2000" color="primary" location="top">
            {{ message }}
        </v-snackbar>
    </div>
</template>
<script>
export default {
    computed: {
        showMessage: {
            get() {
                return this.$store.getters.getShowMessage;
            },
            set(val) {
                this.$store.commit("setShowMessage", val)
            }
        },
        message() {
            return this.$store.getters.getMessage;
        }
    },
    methods: {
        open(message) {
            this.showMessage = true;
            this.message = message;
        }
    }
}
</script>