<template>
  <div id="home">
    <div id="carousel" class="carousel carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active" data-bs-interval="5000">
        <img src="@/assets/carousel1.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Recruteur: Trouvez votre candidat idéal</h5>
          <p>Fini le casse-tête habituel. Retrouvez facilement les candidats qui vous correspondent. <router-link :to="{name: 'Persons'}">Effectuer une recherche</router-link>.</p>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="5000">
        <img src="@/assets/carousel2.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Candidat: Faites-vous connaître</h5>
          <p>Publiez votre CV pour rentrez en contact avec des recruteurs. <router-link :to="{name: 'Login'}">Se connecter</router-link>.</p>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="5000">
        <img src="@/assets/carousel3.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
          <h5>Faites-connaître le site</h5>
          <p>Le site est 100% gratuit ! Nous comptons sur vous pour partager le lien sur vos réseaux préférés.</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  </div>
</template>

<style lang="scss">
  #home {
    .carousel {
      position: absolute;
      top: 0;
      z-index: -1;
      height: 100%;
      overflow: hidden;
      background: black;
    }

    .carousel-caption {
      position: absolute;
      top: 100px;
      height: 100px;
    }

    img {
      width: 100%;
      filter: brightness(0.65);
    }
    .carousel-caption {
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border-radius: 5px;
    }
    .button {
      color: white;
    }
    a {
      color: rgb(204, 252, 132);
      font-weight: bold;
    }
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
  metaInfo() {
    return {
      title: "Accueil"
    }
  }
})
export default class Home extends Vue {}
</script>
