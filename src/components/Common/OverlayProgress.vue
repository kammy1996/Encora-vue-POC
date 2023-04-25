<template>
    <div>
        <v-overlay
            :model-value="props.show"
            class="align-center justify-center"
            persistent
        >
        <v-progress-circular
            color="primary"
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({ 
        show: Boolean
    })
</script>

<style lang="scss" scoped>

</style>