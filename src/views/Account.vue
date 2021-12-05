<template>
    <div id="account">
        <Alert v-bind:message="alertMessage" v-bind:success="alertSuccess" />
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
                        <input v-bind:class="{ 'is-invalid': errors && errors.lastname }" class="form-control" type="text" id="lastname" v-model="form.lastname" aria-describedby="validationLastname"  />
                        <div v-if="errors && errors.lastname" id="validationLastname" class="invalid-feedback">
                            {{ errors.lastname | error }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="firstname">Prénom</label>
                        <input v-bind:class="{ 'is-invalid': errors && errors.firstname }" class="form-control" type="text" id="firstname" v-model="form.firstname" aria-describedby="validationFirstname" />
                        <div v-if="errors && errors.firstname" id="validationFirstname" class="invalid-feedback">
                            {{ errors.firstname | error }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="website">Site web</label>
                        <input placeholder="http://mon-site.com" v-bind:class="{ 'is-invalid': errors && errors.website }" class="form-control" type="text" id="website" v-model="form.website" aria-describedby="validationWebsite" />
                        <div v-if="errors && errors.website" id="validationWebsite" class="invalid-feedback">
                            {{ errors.website | error }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="email">Adresse mail</label>
                        <input class="form-control" type="email" id="email" v-model="account.email" disabled />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="date">Date de naissance</label>
                        <input v-bind:class="{ 'is-invalid': errors && errors.birthdate }" class="form-control" type="date" id="date" v-model="form.birthdate" aria-describedby="validationBirthdate" />
                        <div v-if="errors && errors.birthdate" id="validationBirthdate" class="invalid-feedback">
                            {{ errors.birthdate | error }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="password">Mot de passe</label>
                        <input v-bind:class="{ 'is-invalid': errors && errors.password }" class="form-control" type="password" id="password" placeholder="Nouveau mot de passe" v-model="form.password" aria-describedby="validationPassword" />
                        <div v-if="errors && errors.password" id="validationPassword" class="invalid-feedback">
                            {{ errors.password | error }}
                        </div>
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
        alertMessage = "";
        alertSuccess = false;
        loading = false;
        account: User | null = null;
        form: UserEdit | null = null;
        errors: any = null;

        mounted() {
            api.account().subscribe(r => {
                this.account = r;
                console.log(r);
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
                    website: this.account.website
                }
            }
        }

        edit(): void {
            if (this.form) {
                this.loading = true;
                this.alertMessage = "";
                this.errors = null;
                api.edit(this.form).subscribe(r => {
                    this.account = r;
                    this.map();
                    this.alertSuccess = true;
                    this.alertMessage = "Modification apportées.";
                    this.loading = false;
                }, e => {
                    if (e.response?.status == 400 && e.response?.data) {
                        this.errors = e.response.data;
                        this.alertSuccess = false;
                        this.alertMessage = "Modifications non apportées, veuillez corriger les erreurs ci-dessous."
                    }

                    this.loading = false;
                });
            }
        }
    }
</script>