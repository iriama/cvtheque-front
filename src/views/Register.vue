<template>
    <div id="register">
        <Alert v-bind:message="error" />
        <div class="container">
            <h3><i class="bi bi-pencil-square"></i> Inscription</h3>
            <form @submit="login">
                <label for="lastname">Nom</label>
                <input v-model="lastname" id="lastname" class="form-control" type="text" placeholder="Dupont">
                
                <label for="firstname">Prénom</label>
                <input v-model="firstname" id="firstname" class="form-control" type="text" placeholder="Edgar">
                
                <label for="email">Adresse électronique</label>
                <input v-model="email" id="email" class="form-control" type="email" placeholder="name@example.com">

                <label for="password">Mot de passe</label>
                <input v-model="password" id="password" class="form-control" type="password" placeholder="mot de passe">
                
                <p>Vous êtes déjà inscrit? <a href="/login">Se connecter</a>.</p>
                
                <div class="right">
                    <button id="submit" type="submit" class="btn btn-primary">S'inscrire</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
    #register {
        .container {
            h3 {
                text-align: center;
                margin-bottom: 25px;
            }
            max-width: 500px;
            form {
                display: block;
                p {
                    margin-bottom: 10px;
                }
                .right {
                    text-align: right;
                }
            }
        }
    }
</style>

<script lang="ts">
    import {
        Component,
        Vue,
        Provide
    } from "vue-property-decorator";
    import Alert from '@/components/Alert.vue';

    @Component({
        components: {
            Alert
        }
    })
    export default class Register extends Vue {

        @Provide() firstname = ""
        @Provide() lastname = ""
        @Provide() email = ""
        @Provide() password = ""
        error = ""

        login(e: Event): void {
            if (this.firstname == "" || this.lastname == "" || this.email == "" || this.password == "") this.error = "Merci de remplir tous les champs." + Date.now()
            else {
                this.error = ""
                alert("connexion... " + this.firstname + " ; " + this.lastname + " ; " + this.email + " ; " + this.password )
            }

            e.preventDefault();
        }
    }
</script>