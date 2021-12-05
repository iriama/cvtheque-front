<template>
    <div id="logout">
        <div class="spinner-border" role="status"></div><div>Deconnecté. Redirection...</div>
    </div>
</template>

<style lang="scss">
    #logout {
        padding: 10px;
        div {
            display: inline-block;
        }
        .spinner-border {
            margin-right: 5px;
            width: 16px;
            height: 16px;
        }
    }
</style>

<script lang="ts">
    import { api } from '@/services/ApiService';
    import {
        Component,
        Vue
    } from "vue-property-decorator";

    @Component({
        metaInfo() {
            return {
                title: "Déconnexion"
            }
        }
    })
    export default class Logout extends Vue {
        mounted() {
            let redirectDelay = 0;
            if (api.loggedIn()) {
                api.clearToken();
                redirectDelay = 250;
            }
            setTimeout(() => this.$router.push({ name: 'Home' }).catch(e => console.log(e)), redirectDelay)
        }

    }
</script>