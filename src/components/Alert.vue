<template>
    <div id="alert">
        <div v-bind:class="{ hidden:  isEmpty }" id="box" class="alert alert-danger" role="alert">
            {{message}}
        </div>
    </div>
</template>

<style lang="scss">
    .hidden {
        display: none;
    }
    #box {
        border-radius: 0;
    }
    #alert {
        margin-bottom: 25px;
    }
</style>

<script lang="ts">
    import {
        Component,
        Prop,
        Vue,
        Watch,
        Provide
    } from "vue-property-decorator";

    @Component
    export default class Alert extends Vue {
        @Prop(String) message: string | undefined;
        @Provide() isEmpty = true
        
        @Watch("message")
        onMessageChange(val: string): void {
            if (val == "") this.isEmpty = true
            else this.isEmpty = false
        }
    }
</script>