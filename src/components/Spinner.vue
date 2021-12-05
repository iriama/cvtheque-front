<template>
    <div id="spinner" class="containe">
        <div class="spinner-border" role="status"></div>
    </div>
</template>

<style lang="scss">
    #spinner {
        margin-top: 30px;
        text-align: center;
    }
</style>

<script lang="ts">
    import {
        Vue
    } from "vue-property-decorator";
     export default class Spinner extends Vue {}

</script>