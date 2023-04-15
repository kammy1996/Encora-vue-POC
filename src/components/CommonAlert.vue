<template>
    <div>
        <v-snackbar 
         v-model="props.alert.isTrue" 
         timeout="3000" 
         :color="props.alert.color"
         >
            <div class="text-subtitle-1 pb-2">{{ props.alert.text }}</div>

        </v-snackbar>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    alert: Object,
})

</script>

<style lang="scss" scoped></style>