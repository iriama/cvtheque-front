<template>
    <div id="login">
        <Alert v-bind:message="error" />
        <Spinner v-if="loading" />
        <div v-else class="container">
            <h3><i class="bi bi-box-arrow-in-right"></i> Connexion</h3>
            <form @submit="login">
                <label for="email">Adresse mail</label>
                <input v-bind:class="{ 'is-invalid': errors && errors.email }" v-model="email" id="email" class="form-control" type="email" placeholder="exemple@domaine.com" aria-describedby="validationEmail">
                <div v-if="errors && errors.email" id="validationEmail" class="invalid-feedback">
                    {{ errors.email | error }}
                </div>

                <label for="password">Mot de passe</label>
                <input v-bind:class="{ 'is-invalid': errors && errors.password }" v-model="password" id="password" class="form-control" type="password" placeholder="mot de passe" aria-describedby="validationPassword">
                <div v-if="errors && errors.password" id="validationPassword" class="invalid-feedback">
                    {{ errors.password | error }}
                </div>

                <div class="right">
                    <button id="submit" type="submit" class="btn btn-primary">Se connecter</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
    #login {
        .container {
            h3 {
                text-align: center;
                margin-bottom: 25px;
            }
            max-width: 500px;
            form {
                display: block;
                .right {
                    text-align: right;
                }
                #submit {
                    margin-top: 10px;
                }
            }
        }
    }
</style>

<script lang="ts">
    import Alert from '@/components/Alert.vue';
    import Spinner from '@/components/Spinner.vue';
    import { api } from '@/services/ApiService';
    
    import {
        Component,
        Vue,
        Provide
    } from "vue-property-decorator";

    @Component({
        components: {
            Alert,
            Spinner
        },
        metaInfo() {
            return {
                title: "Connexion"
            }
        }
    })
    export default class Login extends Vue {

        @Provide() email = ""
        @Provide() password = ""
        loading = false
        error = ""
        errors: any = null;

        login(e: Event): void {
            this.error = ""
            this.loading = true;
            this.errors = null;

            api.signin(this.email, this.password).subscribe(r => {
                api.setToken(r.data);
                this.$router.push({ name: "Account" }).catch(e => console.log(e));

            }, e => {
                if (e.response?.status == 400 && e.response?.data) {
                    this.errors = e.response.data;
                    this.error = "Formulaire de connexion invalide, veuillez corriger les erreurs ci-dessous."
                    this.errors = e.response.data;
                }
                else if (e.response.status == 500) this.error = "Informations de connexion invalides.";

                this.loading = false
            });
            
            e.preventDefault();
        }
    }
</script>