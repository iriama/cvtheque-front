<template>
    <div id="account">
        <Alert v-bind:message="error" />
        <Spinner v-if="!account || loading" />
        <div v-else class="container">
            account
        </div>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import Alert from '@/components/Alert.vue';
    import Spinner from '@/components/Spinner.vue';
    import { api, Person } from '@/services/ApiService';
    import {
        Component,
        Vue
    } from "vue-property-decorator";

    @Component({
        components: {
            Alert,
            Spinner
        }
    })
    export default class Account extends Vue {
        error = "";
        loading = false;
        account: Person | null = null;

        mounted() {
            api.account().subscribe(r => {
                this.account = r;
            });
        }
    }
</script>