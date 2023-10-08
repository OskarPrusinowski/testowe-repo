<template>
    <v-app>
        <v-app-bar color="#AAD037"  elevation="0" :rounded="true" height="100">
            <v-app-bar-nav-icon class="text-white">
                <div class="d-flex ml-4 align-center">
                <img class="ml-16 " src="/white-logo.svg" alt="" >
                <div class="ml-4 " style="font-size: 24px; font-family:Georgia, 'Times New Roman', Times, serif;">

                Animap
            </div>
            </div>
            </v-app-bar-nav-icon>
        </v-app-bar>
        <router-view ></router-view>
    </v-app>
</template>
<script>
export default {
    created(){
        // this.$store.dispatch("getActualUser")
    }
}
</script>