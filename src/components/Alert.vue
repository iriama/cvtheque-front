<template>
    <div id="alert">
        <div v-bind:class="{ hidden:  isEmpty, 'alert-danger': !success, 'alert-success': success  }" id="box" class="alert" role="alert">
            {{ message }}
            <a v-if="returnUrl && returnText" :href="returnUrl">{{returnText}}</a>
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
        @Prop(String) returnUrl: string | undefined;
        @Prop(String) returnText: string | undefined;
        @Prop(Boolean) success: boolean | undefined;
        @Provide() isEmpty = true
        
        @Watch("message")
        onMessageChange(val: string): void {
            if (val == "") this.isEmpty = true
            else this.isEmpty = false
        }
    }
</script>