<template>
    <div id="invite">
        <Alert v-bind:message="alertMessage" v-bind:success="alertSuccess" />
        <Spinner v-if="loading" />
        <div v-else class="container" id="main">
            <div class="card" id="infos">
                <div class="card-header">
                    <h1>Inviter une personne</h1>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label" for="lastname">Nom</label>
                        <input placeholder="Dupont" v-bind:class="{ 'is-invalid': errors && errors.lastname }" class="form-control" type="text" id="lastname" v-model="form.lastname" aria-describedby="validationLastname"  />
                        <div v-if="errors && errors.lastname" id="validationLastname" class="invalid-feedback">
                            {{ errors.lastname | error }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="firstname">Prénom</label>
                        <input placeholder="Marie" v-bind:class="{ 'is-invalid': errors && errors.firstname }" class="form-control" type="text" id="firstname" v-model="form.firstname" aria-describedby="validationFirstname" />
                        <div v-if="errors && errors.firstname" id="validationFirstname" class="invalid-feedback">
                            {{ errors.firstname | error }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="email">Adresse mail</label>
                        <input v-bind:class="{ 'is-invalid': errors && errors.email }" v-model="form.email" id="email" class="form-control" type="email" placeholder="exemple@domaine.com" aria-describedby="validationEmail">
                        <div v-if="errors && errors.email" id="validationEmail" class="invalid-feedback">
                            {{ errors.email | error }}
                        </div>
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="password">Mot de passe</label>
                        <input v-bind:class="{ 'is-invalid': errors && errors.password }" class="form-control" type="text" id="password" placeholder="Mot de passe" v-model="form.password" aria-describedby="validationPassword" />
                        <div v-if="errors && errors.password" id="validationPassword" class="invalid-feedback">
                            {{ errors.password | error }}
                        </div>
                    </div>
                    <button type="button" class="btn btn-success" @click="invite()">Inviter</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    #invite {
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
    }
</style>

<script lang="ts">
    import Alert from '@/components/Alert.vue';
    import Spinner from '@/components/Spinner.vue';
    import {
        api,
        UserInvite
    } from '@/services/ApiService';
    import {
        Component,
        Vue 
    } from "vue-property-decorator";

    @Component({
        components: {
            Alert,
            Spinner
        },
        metaInfo() {
            return {
                title: "Cooptation"
            }
        }
    })
    export default class Invite extends Vue {
        alertMessage = "";
        loading = false;
        alertSuccess = false;
        errors: any = null;

        empty: UserInvite =  {
            password: Math.random().toString(36).slice(-8)
        }

        form: UserInvite = { ... this.empty } // clone

        invite() {
            this.alertMessage = "";
            this.loading = true;
            this.errors = null;
            api.invite(this.form).subscribe(r => {
                this.form = { ... this.empty } // clone
                this.alertSuccess = true;
                this.alertMessage = "Personne ajoutée avec succès.";
                this.loading = false;
            }, e => {
                if (e.response?.status == 400 && e.response?.data) {
                    this.errors = e.response.data;
                    this.alertSuccess = false;
                    this.alertMessage = "Formulaire invalide, veuillez corriger les erreurs ci-dessous.";
                }

                this.loading = false;
            });
        }
    }
</script>