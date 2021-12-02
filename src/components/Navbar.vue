<template>
    <div id="navbar">
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container-fluid">
                <router-link class="navbar-brand" :to="{ name: 'Home' }"><i class="bi bi-journal-richtext"></i> CVthèque</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                        <li class="nav-item">
                            <router-link v-bind:class="{ active: $route.name == 'Home' }" class="nav-link" aria-current="page" :to="{ name: 'Home' }"><i class="bi bi-house-door-fill"></i>Accueil</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link v-bind:class="{ active: $route.name == 'Persons' }" class="nav-link" :to="{ name: 'Persons' }"><i class="bi bi-binoculars-fill"></i>Personnes</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ">
                        <li class="nav-item">
                            <router-link v-bind:class="{ active: $route.name == 'Login' }" class="nav-link" :to="{ name: 'Login' }"><i class="bi bi-person-check-fill"></i>Connexion</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<style lang="scss">
    #navbar {
        //margin-bottom: 50px;
    }
</style>

<script lang="ts">
    import {
        Component,
        Vue
    } from "vue-property-decorator";

    @Component
    export default class Navbar extends Vue {}
</script>