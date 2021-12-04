<template>
    <div id="cv">
        <Alert v-bind:message="error" v-bind:returnText="returnText" v-bind:returnUrl="returnUrl" />
        <Spinner v-if="loading" />
        <div v-else-if="person" class="container text-center">
            <div class="text-center">
                <h1>{{ person.lastname | capitalize }} {{ person.firstname | capitalize }}</h1>
                <div v-if="person.professionalTitles.length > 0" class="badge-container">
                    <span v-for="title in person.professionalTitles" :key="title"
                        class="badge rounded-pill bg-primary">{{ title }}</span>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div v-if="isActivity" id="add-container">
                        <button id="addBtn" @click="addActivity()" type="button" class="btn btn-success btn btn-sm"><i class="bi bi-plus-lg"></i>
                            Ajouter</button>
                    </div>
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button @click="isActivity = false" class="nav-link active" id="pills-home-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab"
                                aria-controls="pills-home" aria-selected="true">Présentation</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button @click="isActivity = true" class="nav-link" id="pills-profile-tab"
                                data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab"
                                aria-controls="pills-profile" aria-selected="false" >Expériences et projets</button>
                        </li>
                    </ul>
                </div>
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div v-if="self" class="actions">
                            <router-link :to="{ name: 'Account' }"><i class="bi bi-pencil-square"></i></router-link>
                        </div>
                        <div class="item"><span class="bold">Nom:</span> {{ person.lastname | capitalize }}</div>
                        <div class="item"><span class="bold">Prénom:</span> {{ person.firstname | capitalize }}</div>
                        <div v-if="person.age" class="item"><span class="bold">Age:</span> {{ person.age }} ans</div>
                        <div class="item"><span class="bold">Adresse mail:</span> <a
                                :href="'mailto:' + person.email">{{ person.email }}</a></div>
                        <div v-if="person.website" class="item"><span class="bold">Site web:</span> <a
                                :href="person.website | webify" target="_blank">{{ person.website | webify }}</a></div>
                    </div>
                    <div class="tab-pane" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div v-if="!person.activities || person.activities.length == 0">Aucune expérience ou projet
                            renseigné.</div>
                        <div v-for="activity in person.activities" :key="activity.id" class="activity">
                            <div v-if="self" class="actions">
                                <a href="#" @click.prevent="editActivity(activity)"><i class="bi bi-pencil-square"></i></a>
                                <a href="#" @click.prevent="deleteActivity(activity)"><i
                                        class="bi bi-trash-fill delete"></i></a>
                            </div>
                            <span v-if="activity.type == 'PERSONAL'" class="badge rounded-pill bg-success">Projet
                                personnel</span>
                            <span v-else-if="activity.type == 'PROFESSIONAL'"
                                class="badge rounded-pill bg-primary">Expérience professionnelle</span>
                            <span v-else-if="activity.type == 'EDUCATIONAL'" class="badge rounded-pill bg-danger">Projet
                                académique</span>
                            <span v-else class="badge rounded-pill bg-secondary">Autre</span>

                            <div class="item"><span class="bold">Année:</span> {{ activity.year }}</div>
                            <div class="item"><span class="bold">Intitulé:</span> {{ activity.title }}</div>
                            <div v-if="activity.description" class="item"><span class="bold">Description:</span>
                                {{ activity.description }}</div>
                            <div v-if="activity.website" class="item"><span class="bold">Site web:</span> <a
                                    :href="activity.website | webify"
                                    target="_blank">{{ activity.website | webify }}</a></div>
                            <hr v-if="activity.id != person.activities[person.activities.length - 1].id">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- deleteModal -->
        <button type="button" class="btn btn-primary hidden" data-bs-toggle="modal" data-bs-target="#deleteModal" id="deleteBtn"></button>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="toDelete" class="modal-title" id="deleteModalLabel">Suppression de '{{ toDelete.title }}'</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Êtes-vous sûr ? Attention: action <b>irréversible</b>.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button v-if="toDelete" @click="deleteActivity(toDelete, true)" type="button" class="btn btn-danger" data-bs-dismiss="modal">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- inputModal --> 
        <button type="button" class="btn btn-primary hidden" data-bs-toggle="modal" data-bs-target="#inputModal" id="inputBtn"></button>
        <div class="modal fade" id="inputModal" tabindex="-1" aria-labelledby="inputModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="inputModalLabel" v-if="!editMode">Ajouter une activité</h5>
                        <h5 class="modal-title" id="inputModalLabel" v-else>Modifier l'activité "{{ toEdit.title }}"</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="toEdit">
                        <div class="mb-2">
                            <label  class="form-label" for="year">Année</label>
                            <input class="form-control" type="number" id="year" placeholder="2020" v-model="toEdit.year" />
                        </div>
                        <div class="mb-2">
                            <label  class="form-label" for="type">Type</label>
                            <select class="form-control" name="select" v-model="toEdit.type">
                                <option value="PROFESSIONAL">Expérience professionnelle</option>
                                <option value="EDUCATIONAL">Projet académique</option>
                                <option value="PERSONAL">Projet personnel</option>
                                <option value="OTHER">Autre</option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label  class="form-label" for="title">Intitulé</label>
                            <input class="form-control" type="text" id="title" placeholder="Mon super projet" v-model="toEdit.title" />
                        </div>
                        <div class="mb-2">
                            <label  class="form-label" for="description">Description</label>
                            <textarea class="form-control" type="text" id="description" placeholder="Tâches effectuées, outils utilisés..." v-model="toEdit.description" />
                        </div>
                        <div class="mb-2">
                            <label  class="form-label" for="website">Site web</label>
                            <input class="form-control" type="text" id="website" placeholder="https://mon-super-site.com" v-model="toEdit.website" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                        <button @click="addActivity(toEdit)" type="button" class="btn btn-success" data-bs-dismiss="modal" v-if="!editMode">Ajouter</button>
                        <button @click="editActivity(toEdit, true)" type="button" class="btn btn-success" data-bs-dismiss="modal" v-else>Modifier</button>
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

        .hidden {
            display: none;
        }

        .actions {
            float: right;
            font-size: 1.3em;

            a {
                color: rgb(75, 75, 75);
                display: inline-block;
                margin-left: 2px;
            }

            a:hover {
                color: black;
            }

            .delete:hover {
                color: red;
            }
        }

        #add-container {
            float: right;

            .btn {
                margin-top: 5px;
            }
        }

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
    import {
        Activity,
        ActivityType,
        User,
        UserEdit
    } from '@/services/ApiService';

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

        self = false;

        isActivity = false;

        toDelete: Activity | null = null;
        toEdit: Activity | null = null;
        editMode = false;

        refresh() {
            let id = -1;
            try {
                id = parseInt(this.$route.params.id);
                this.loading = true;
                api.person(id).subscribe(r => {
                    if (!r) {
                        this.error = "La personne à l'identifiant '" + id + "' n'existe plus."
                    } else this.person = r;
                    if (api.loggedIn()) {
                        api.account().subscribe(a => {
                            if (a && a.id == r.id) this.self = true;
                            this.loading = false;
                        });
                    } else {
                        this.loading = false;
                    }
                });
            } catch (e) {
                console.log(e);
            }
        }

        activityBadge(activity: Activity) {
            return activity.type.substring(0, 2).toUpperCase();
        }

        deleteActivity(activity: Activity, confirm: boolean | null): void {
            if  (!this.person?.activities) return;

            if (!confirm) {
                this.toDelete = activity;
                document.getElementById("deleteBtn")?.click();
            } else {
                api.deleteActivity(activity.id).subscribe(r => {
                    this.person = r;
                });
            }
        }

        editActivity(activity: Activity, finished: boolean): void {
            if  (!this.person?.activities) return;
            if (!finished) {
                this.editMode = true;
                this.toEdit = activity;
                document.getElementById("inputBtn")?.click();
            } else {
                api.editActivity(activity).subscribe(r => {
                    this.person = r;
                });
            }
        }


        addActivity(activity: Activity) {
            this.toEdit = null;
            if (!this.person?.activities) return;
            if (!activity) {
                this.editMode = false;
                this.toEdit = {
                    id: 0,
                    title: "",
                    description: "",
                    website: "",
                    year: (new Date()).getFullYear(),
                    type: ActivityType.PROFESSIONAL
                }
                document.getElementById("inputBtn")?.click();
            } else {
                api.addActivity(activity).subscribe(r => {
                    this.person = r;
                });
            }
        }

        mounted() {
            this.refresh();
        }
    }
</script>