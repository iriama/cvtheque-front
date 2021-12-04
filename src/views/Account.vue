<template>
    <div id="account">
        <Alert v-bind:message="error" />
        <Spinner v-if="!account || loading" />
        <div v-else class="container" id="main">
            <div class="card" id="infos">
                <div class="card-header">
                    <h1>Compte</h1>
                    <router-link :to="{ name: 'CV', params: { id: account.id } }" class="href">Consulter/modifier mon CV</router-link>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label" for="lastname">Nom</label>
                        <input class="form-control" type="text" id="lastname" v-model="form.lastname" />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="firstname">Prénom</label>
                        <input class="form-control" type="text" id="firstname" v-model="form.firstname" />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="website">Site web</label>
                        <input class="form-control" type="text" id="website" v-model="form.website" />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="email">Adresse mail</label>
                        <input class="form-control" type="email" id="email" v-model="account.email" disabled />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="date">Date de naissance</label>
                        <input class="form-control" type="date" id="date" v-model="form.birthdate" />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="password">Mot de passe</label>
                        <input class="form-control" type="password" id="password" placeholder="Nouveau mot de passe" v-model="form.password" />
                    </div>
                    <button type="button" class="btn btn-success" @click="edit()">Mettre à jour</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    #account {
        h1 {
            font-size: 1.5em;
        }

        #main {
            margin: auto;
            max-width: 900px;
            label {
                font-weight: bold;
            }
        }

        #infos {
            button {
                margin-top: 10px;
                float: right;
            }
        }

        .card-header {
            h1 {
                float: left;
            }
            a {
                padding-top: 7px;
                float: right;
                font-weight: bold;
            }
        }
    }
</style>

<script lang="ts">
    import Alert from '@/components/Alert.vue';
    import Spinner from '@/components/Spinner.vue';
    import {
        api,
        UserEdit,
        User
    } from '@/services/ApiService';
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
        account: User | null = null;
        form: UserEdit | null = null;

        mounted() {
            api.account().subscribe(r => {
                this.account = r;
                this.map();
            });
        }

        map() {
            if (this.account) {
                this.form = {
                    id: this.account.id,
                    firstname: this.account.firstname,
                    lastname: this.account.lastname,
                    birthdate: this.account.birthdate,
                    password: '',
                    website: this.account.website
                }
            }
        }

        edit(): void {
            if (this.form) {
                this.loading = true;
                api.edit(this.form).subscribe(r => {
                    this.account = r;
                    this.map();
                    this.loading = false;
                });
            }
        }
    }
</script>