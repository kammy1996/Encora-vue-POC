<template>
    <div>
        <v-dialog v-model="props.show" persistent width="auto">
            <v-card class="px-5 py-3">
                <h4 class="text-center mb-5">
                    {{  props.text }}
                </h4>
                <div class="display-block mx-auto">
                    <v-card-actions class="text-center">
                        <v-spacer></v-spacer>
                        <v-btn color="red" size="small" variant="elevated" @click="$emit(`delete-quiz`)">
                            Delete
                        </v-btn>
                        <v-btn color="dark" size="small" variant="text" @click="$emit(`closeDialog`)">
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    show: boolean,
    text: string,
}>();


</script>

<style scoped></style>