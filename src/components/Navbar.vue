<template>
    <div id="navbar">
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/"><i class="bi bi-journal-richtext"></i> CVthèque</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav me-auto mb-2 mb-sm-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="/"><i class="bi bi-house-door-fill"></i>Accueil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/persons"><i class="bi bi-binoculars-fill"></i>Personnes</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav ">
                        <li class="nav-item">
                            <a class="nav-link" href="/login"><i class="bi bi-person-check-fill"></i>Connexion</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/register"><i class="bi bi-person-plus-fill"></i>Inscription</a>
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
    export default class Navbar extends Vue {

    }
</script>