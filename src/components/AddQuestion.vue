<template>
    <div>
        <v-dialog v-model="props.show" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="$emit(`close-dialog`)">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Create Question</v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>

                <v-container>
                    <h2>{{ selectedQuestion  }}</h2>

                    <div class="mt-5">
                        <v-list-subheader>Question</v-list-subheader>
                        <v-text-field v-model="question.question" label="Enter your Question" variant="outlined"
                            density="compact"></v-text-field>
                    </div>

                    <v-row class="mt-3">
                        <v-col cols="6">
                            Options ({{ question.options.length }})
                        </v-col>
                        <v-col cols="6">
                            <v-btn prepend-icon="mdi-delete" class="float-right" @click="clearOptions">
                                Clear
                            </v-btn>
                            <v-btn prepend-icon="mdi-plus" class="bg-deep-purple float-right mr-5" @click="addOption">
                                Options
                            </v-btn>

                        </v-col>
                    </v-row>
                    <v-divider class="mt-3"></v-divider>

                    <v-row>
                        <v-col cols="5">
                            <div class="options-list">
                                <div v-for="(option, index) in question.options" :key="index">
                                    <v-row>
                                        <span class="mr-5 mt-2">{{ option.sequence }} :</span>
                                        <v-text-field class="mt-2" v-model="option.text" label="Enter your Option"
                                            variant="outlined" density="compact"></v-text-field>
                                    </v-row>
                                </div>
                            </div>

                        </v-col>
                        <v-col cols="1"></v-col>
                        <v-col cols="6" v-if="question.options.length > 1">
                            <div class="mt-5 d-flex">
                                <p class="mr-5">Correct Option: </p>
                                <v-select variant="outlined" v-model="question.correctOption" density="compact"
                                    label="Select Option" :items="question.options" item-title="text"
                                    item-value="sequence"></v-select>
                            </div>
                        </v-col>
                    </v-row>


                    <div class="action-btns" v-if="question.options.length > 0">
                        <v-btn prepend-icon="mdi-check" color="success" class="mr-5" @click="saveQuestion">
                            Save
                        </v-btn>
                        <v-btn @click="questionCancelled">
                            Cancel
                        </v-btn>
                    </div>
                </v-container>
            </v-card>
        </v-dialog>
        <CommonAlert :alert="alert" />
    </div>
</template>

<script setup lang="ts">
import { defineProps, reactive, defineEmits } from 'vue';
import CommonAlert from '@/components/Common/CommonAlert.vue'



const props = defineProps({
    show: Boolean,
    mode: String,
    selectedQuestion : Object
});


const emit = defineEmits([`close-dialog`, `save-question`])



interface Alert {
    isTrue: boolean,
    color: string,
    text?: string,
}

const alert: Alert = reactive({
    isTrue: false,
    color: '',
    text: '',
    title: ''
})

//Questions interface 
// interface Question {
//     id: number;
//     question: string;
//     options: Array<object>;
//     correctOption: number;
// }

let question = reactive({
    id: null,
    question: '',
    options: [],
    correctOption: null
})





//Options Interface
interface Option {
    text: string,
    sequence: number;
}


function addOption() {
    let option: Option = reactive({
        text: '',
        sequence: question.options.length + 1
    })
    // Maximum 5 options can be added on 1 question
    if (question.options.length < 5) {
        question.options.push(option)
    }
}


function clearOptions() {
    question.options = [];
}

function saveQuestion() {
    //Check if correct option is submitted or not 
    if (!question.correctOption) {
        alert.isTrue = true;
        alert.color = 'red';
        alert.text = 'Please choose correct option.'
    }


    //Check if option is less than 1 
    if (question.options.length < 2) {
        alert.isTrue = true;
        alert.color = 'red';
        alert.text = 'Please add more than one option.'
    }

    //If question is missing 
    if (!question.question) {
        alert.isTrue = true;
        alert.color = 'red';
        alert.text = 'Please Enter a valid question.'
    }

    emit(`save-question`, question)
    emit(`close-dialog`)

    setTimeout(() => {
        question.correctOption = null;
        question.id = null;
        question.options = [];
        question.question = ''   
    }, 2000);
}


function questionCancelled() {
    emit(`close-dialog`)
}

</script>

<style scoped>
.options-list {
    margin-top: 30px;
}

.action-btns {
    position: fixed;
    bottom: 20px;
    right: 90px;
}
</style>