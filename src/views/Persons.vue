<template>
    <div id="persons">
        <Alert v-bind:message="error" />
        <div class="container">
            <div id="search-container">
                <div class="input-group rounded" id="search">
                    <input v-model="searchInput" v-on:keyup.enter="search()" type="search" class="form-control rounded"
                        placeholder="Chercher une personne..." aria-label="Search" aria-describedby="search-addon" />
                    <span @click="search()" class="input-group-text border-0" id="search-addon">
                        <i class="bi bi-search"></i>
                    </span>
                </div>
                <div class="input-group" id="type">
                    <div class="form-check form-check-inline">
                        <input @change="type = 'name'" class="form-check-input" type="radio" name="type" id="name"
                            value="name" checked>
                        <label class="form-check-label" for="name">Nom et prénom</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input @change="type = 'function'" class="form-check-input" type="radio" name="type"
                            id="function" value="function">
                        <label class="form-check-label" for="function">Poste</label>
                    </div>
                </div>
            </div>
            <Spinner v-if="loading" />
            <div v-else id="persons-container">
                <div class="card">
                    <div class="card-header">
                        <h1 v-if="$route.query.name">Résultats de recherche pour "{{ $route.query.name }}"</h1>
                        <h1 v-else-if="$route.query.activity">Résultats de recherche pour le poste "{{ $route.query.activity }}"</h1>
                        <h1 v-else>Toutes les personnes</h1>
                    </div>
                    <p class="empty" v-if="!persons || persons.length == 0">Aucun résultat.</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item" v-for="person in persons" :key="person.id">
                            <router-link :to="{ name: 'CV', params: { id: person.id } }">
                                <span v-for="title in person.professionalTitles" :key="title" class="badge-container">
                                    <span class="badge rounded-pill bg-secondary">{{ title }}</span>
                                </span>
                                <p>{{ person.firstname | capitalize }} {{ person.lastname | capitalize }}</p>
                                <small v-if="person.website"><a class="website" :href="person.website | webify"
                                        target="_blank">{{ person.website | webify }}</a></small>
                            </router-link>
                        </li>
                    </ul>
                    <div class="card-footer">
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                                <li v-bind:class="{disabled: page_current == 1}" class="page-item">
                                    <p @click="navigate(page_current - 1)" class="page-link">&laquo;</p>
                                </li>
                                <li v-bind:class="{ active: page_1 == page_current }" class="page-item"><p class="page-link" @click="navigate(page_1)">{{ page_1 }}</p></li>
                                <li v-if="page_2 != 1" v-bind:class="{ active: page_2 == page_current }" class="page-item"><p class="page-link" @click="navigate(page_2)">{{ page_2 }}</p></li>
                                <li v-if="page_3 != 1" v-bind:class="{ active: page_3 == page_current }" class="page-item"><p class="page-link" @click="navigate(page_3)">{{ page_3 }}</p></li>
                                <li v-bind:class ="{ disabled: page_current == page_3 }" class="page-item">
                                    <p class="page-link" @click="navigate(page_current + 1)">&raquo;</p>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    #persons>.container {
        max-width: 700px;
    }

    #persons-container {
        margin-top: 25px;
    }

    #persons {

        .empty {
            padding: 10px;
        }

        .badge-container {
            float: right;
            .badge {
                margin-left: 4px;
            }
        }

        #search-addon {
            background: none;
            cursor: pointer;
        }

        #search-container {
            width: 100%;
        }

        #search,
        #type {
            max-width: 600px;
            margin: 0 auto;
        }

        #type {
            margin-top: 3px;
        }

        .card {
            h1 {
                font-size: 1.2em;
            }
            .list-group-item {
                min-height: 65px;

                p {
                    margin-bottom: 0;
                }

                a {
                    text-decoration: none;
                    color: black;
                }
                .website {
                    color: rgb(109, 109, 109)
                }
            }

            .card-footer {
                ul {
                    margin: 0;
                }
            }
        }

        .page-link {
            cursor: pointer;
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
    import { ActivityType, api, Person } from '@/services/ApiService';
    import { Route } from "vue-router";

    @Component({
        components: {
            Alert,
            Spinner
        },
        metaInfo() {
            return {
                title: "Annuaire"
            }
        }
    })
    export default class Persons extends Vue {

        error = ""
        type = "name" // "name" or "function"
        persons: Person[] = [];
        searchInput = ""
        
        page_current = 1;
        page_1 = 1;
        page_2 = 2;
        page_3 = 3;
        loading = false;

        search(): void {
            if (this.searchInput.length > 0) {
                if (this.type == "name")
                    this.$router.push({ path: "/persons", query: { page: "1", name: this.searchInput } }).catch(e => console.log(e.message));
                else
                    this.$router.push( { path: "/persons", query: { page: "1", activity: this.searchInput } } ).catch(e => console.log(e.message));
            } else {
                this.$router.push( { path: "/persons" }).catch(e => console.log(e.message));
            }
        }

        navigate(page: number): void {
            this.$router.push({ path: "/persons", query: { page: page.toString(), name: this.$route.query.name, activity: this.$route.query.activity } }).catch(e => console.log(e.message));
        }

        refresh(route: Route) {

            this.loading = true;

            let page = 1;
            try {
                if (typeof(route.query.page) == "string") {
                    page = parseInt(route.query.page);
                }
            } catch(e) {
                console.log(e);
            }

            this.page_current = page;
            this.page_1 = page == 1 ? page : page - 1;
            this.page_2 = page == 1 ? page + 1 : page;
            this.page_3 = page == 1 ? page + 2 : page + 1;

            api.persons(page, route.query.name as string, route.query.activity as string).subscribe(r => {
                this.persons = r;
                if (r.length < 10) {
                    this.page_3 = page;
                    this.page_2 = page > 1 ? page - 1 : page;
                    this.page_1 = page > 2 ? page - 2 : page;
                }
                
                this.loading = false;
            });
        }

        mounted() {
            this.refresh(this.$route);
        }

        beforeRouteUpdate(to: Route, from: Route, next: any) {
            this.refresh(to);
            next();
        }
    }
</script>