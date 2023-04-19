<!-- This component will be used for Adding and editing the quiz -->
<template>
    <div style="width:950px">
        <h2 class="mt-3">Create Quiz</h2>
        <v-row >
            <v-col cols="8">
                <div>
                    <div >
                        <v-list-subheader>Quiz Title</v-list-subheader>
                        <v-text-field v-model="quiz.title" label="Quiz Title" variant="outlined"
                            density="compact"></v-text-field>
                    </div>
                </div>
            </v-col>
            <v-col cols="4">
                <div>
                    <v-list-subheader>Difficulty Level</v-list-subheader>
                    <v-select variant="outlined" v-model="quiz.level" density="compact" label="Select" :items="levels"
                        item-title="text"></v-select>
                </div>
            </v-col>

        </v-row>
        <v-row>
            <v-col cols="9">
                Questions ({{ quiz.questions.length }})
            </v-col>
            <v-col cols="3">
                <v-btn prepend-icon="mdi-plus" class="bg-deep-purple float-right" @click="openQuestionDrawer">
                    Questions
                </v-btn>
            </v-col>
        </v-row>
        <v-divider class="mt-5"></v-divider>
        <div class="questions-list">
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Question
                        </th>
                        <th class="text-left">
                            Options
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="question in quiz.questions" :key="question.id">
                        <td>{{ question.question }}</td>
                        <td>{{ question.options.length }}</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div class="action-btns">
            <v-btn prepend-icon="mdi-check" color="success" class="mr-5" @click="saveQuiz">
                Save
            </v-btn>
            <v-btn @click="clearQuiz">
                Cancel
            </v-btn>
        </div>
        <AddQuestion 
            :show="isQuestionDrawer" 
            @close-dialog="isQuestionDrawer = false" 
            @save-question="questionSaved" />
        <CommonAlert :alert="alert" />
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { ref } from 'vue';
import AddQuestion from '@/components/AddQuestion.vue';
import CommonAlert from '@/components/CommonAlert.vue'


import { useRouter } from 'vue-router';
const router = useRouter();

import { useStore } from 'vuex';
const store = useStore();




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


//Static Data 
const levels = [
    {
        id: 1,
        text: "Easy"
    },
    {
        id: 2,
        text: "Medium"
    },
    {
        id: 3,
        text: "Hard"
    }
];

interface Quiz {
    title: string;
    level: string;
    questions: Array<object>;
}

const quiz: Quiz = reactive({
    title: '',
    level: 'Easy',
    questions: [],
})


//Question Drawer
let isQuestionDrawer = ref(false)

function openQuestionDrawer() {
    isQuestionDrawer.value = true

}

function questionSaved(val) {
    val.id = quiz.questions.length + 1;
    let copy = JSON.parse(JSON.stringify(val))
    quiz.questions.push(copy)
}


const saveQuiz = async () => { 
    // check if quiz title is given 
    if(!quiz.title || quiz.title == '') { 
        alert.isTrue = true;
        alert.color = 'red';
        alert.text = 'Please Enter Quiz Title.'
    }

    if(quiz.questions.length < 1) { 
        alert.isTrue = true;
        alert.color = 'red';
        alert.text = 'Please enter atleast one Question.'
    }

    let status = await store.dispatch(`addQuiz`, quiz)

    if(status == 201) { 
        alert.isTrue = true;
        alert.color = 'green';
        alert.text = 'Quiz Saved Successfully.'

          //Clearing quiz values after saving
        setTimeout(() => {
            quiz.title =  ''
            quiz.level = 'Easy'
            quiz.questions = []

            router.push('/')
        }, 1000);
    }

}


</script>

<style scoped>
.action-btns {
    position: fixed;
    bottom: 20px;
    right: 50px;
}
</style>