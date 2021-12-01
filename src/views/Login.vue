<template>
    <div id="login">
        <Alert v-bind:message="error" />
        <div class="container">
            <h3><i class="bi bi-box-arrow-in-right"></i> Connexion</h3>
            <form @submit="login">
                <label for="email">Adresse électronique</label>
                <input v-model="email" id="email" class="form-control" type="email" placeholder="name@example.com">
                
                <label for="password">Mot de passe</label>
                <input v-model="password" id="password" class="form-control" type="password" placeholder="mot de passe">
                
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
    
    import {
        Component,
        Vue,
        Provide
    } from "vue-property-decorator";

    @Component({
        components: {
            Alert
        }
    })
    export default class Login extends Vue {

        @Provide() email = ""
        @Provide() password = ""
        error = ""

        login(e: Event): void {
            if (this.email == "" || this.password == "") this.error = "Merci de remplir tous les champs."
            else {
                this.error = ""
                alert("connexion... " + this.email + " ; " + this.password)
            }
            
            e.preventDefault();
        }
    }
</script>