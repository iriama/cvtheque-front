<template>
    <div id="cv">
        <Alert v-bind:message="error" v-bind:returnText="returnText" v-bind:returnUrl="returnUrl" />
        <Spinner v-if="loading" />
        <div v-else-if="person" class="container text-center">
            <div class="text-center">
                <h1>{{ person.lastname | capitalize }} {{ person.firstname | capitalize }}</h1>
                <div v-if="person.professionalTitles.length > 0" class="badge-container">
                    <span  v-for="title in person.professionalTitles" :key="title"  class="badge rounded-pill bg-primary">{{ title }}</span>
                </div>
            </div>
            
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                aria-selected="true">Présentation</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                aria-selected="false">Expériences et projets</button>
                        </li>
                    </ul>
                </div>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                        aria-labelledby="pills-home-tab">
                        <div class="item"><span class="bold">Nom:</span> {{ person.lastname | capitalize }}</div>
                        <div class="item"><span class="bold">Prénom:</span> {{ person.firstname | capitalize }}</div>
                        <div v-if="person.age" class="item"><span class="bold">Age:</span> {{ person.age }} ans</div>
                        <div class="item"><span class="bold">Adresse mail:</span> <a
                                :href="'mailto:' + person.email">{{ person.email }}</a></div>
                        <div v-if="person.website" class="item"><span class="bold">Site web:</span> <a
                                :href="person.website | webify" target="_blank">{{ person.website | webify }}</a></div>
                    </div>
                    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div v-if="!person.activities || person.activities.length == 0">Aucune expérience ou projet renseigné.</div>
                        <div v-for="activity in person.activities" :key="activity.id" class="activity">
                            <span v-if="activity.type == 'PERSONAL'" class="badge rounded-pill bg-success">Projet personnel</span>
                            <span v-else-if="activity.type == 'PROFESSIONAL'" class="badge rounded-pill bg-primary">Expérience professionnelle</span>
                            <span v-else-if="activity.type == 'EDUCATIONAL'" class="badge rounded-pill bg-danger">Projet académique</span>
                            <span v-else class="badge rounded-pill bg-secondary">Autre</span>

                            <div class="item"><span class="bold">Année:</span> {{ activity.year }}</div>
                            <div class="item"><span class="bold">Intitulé:</span> {{ activity.title }}</div>
                            <div v-if="activity.description" class="item"><span class="bold">Description:</span> {{ activity.description }}</div>
                            <div v-if="activity.website" class="item"><span class="bold">Site web:</span> <a :href="activity.website | webify" target="_blank">{{ activity.website | webify }}</a></div>
                            <hr v-if="activity.id != person.activities[person.activities.length - 1].id" >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    #cv>.container {
        max-width: 1000px;
    }
    #cv {
         padding-bottom: 50px;

        #pills-tabContent {
            padding: 10px;
            text-align: left;
        }

        .item {
            font-size: 1.2em;
        }

        .bold {
            font-weight: bold;
        }

        .badge-container {
            margin-top: 2px;
            margin-bottom: 10px;
            .badge {
                margin-left: 4px;
            }
        }

        h1 {
            margin: 0;
        }

        hr {
            margin: 1rem 0;
            color: inherit;
            background-color: gray;
            border: 0;
            opacity: 0.25;
        }

    }
</style>

<script lang="ts">
    import {
        Component,
        Vue
    } from "vue-property-decorator";
    import Alert from '@/components/Alert.vue';
    import Spinner from '@/components/Spinner.vue';
    import { Activity, ActivityType } from '@/services/ApiService';

    import {
        api,
        Person
    } from '@/services/ApiService';
    import {
        Route
    } from "vue-router";
    @Component({
        components: {
            Alert,
            Spinner
        }
    })
    export default class CV extends Vue {
        error = "";
        returnText = "Retourner à la liste des personnes.";
        returnUrl = "/persons";
        person: Person | null = null;
        loading = false;

        refresh() {
            let id = -1;

            try {
                id = parseInt(this.$route.params.id);
                this.loading = true;
                api.person(id).subscribe(r => {
                    if (!r) {
                        this.error = "La personne à l'identifiant '" + id + "' n'existe plus."
                    } else this.person = r;

                    this.loading = false;
                });
            } catch (e) {
                console.log(e);
            }

            console.log(id);
        }

        activityBadge(activity: Activity) {
            return activity.type.substring(0, 2).toUpperCase();
        }

        mounted() {
            this.refresh();
        }

    }
</script>