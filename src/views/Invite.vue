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
                        <input class="form-control" type="text" id="lastname" placeholder="Dupont" v-model="form.lastname" />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="firstname">Prénom</label>
                        <input class="form-control" type="text" id="firstname" placeholder="Marie" v-model="form.firstname" />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="email">Adresse mail</label>
                        <input class="form-control" type="email" id="email" placeholder="exemple@domaine.com" v-model="form.email" />
                    </div>
                    <div class="mb-3">
                        <label  class="form-label" for="password">Mot de passe</label>
                        <input class="form-control" type="text" id="password" placeholder="Mot de passe" v-model="form.password" />
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
        }
    })
    export default class Invite extends Vue {
        alertMessage = "";
        loading = false;
        alertSuccess = false;

        empty: UserInvite =  {
            email: "",
            firstname: "",
            lastname: "",
            password: Math.random().toString(36).slice(-8)
        }

        form: UserInvite = { ... this.empty } // clone

        invite() {
            this.alertMessage = "";
            this.loading = true;
            api.invite(this.form).subscribe(r => {
                this.form = { ... this.empty } // clone
                this.alertSuccess = true;
                this.alertMessage = "Personne ajoutée avec succès.";
                this.loading = false;
            });
        }
    }
</script>