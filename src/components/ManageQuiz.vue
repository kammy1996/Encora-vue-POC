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
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                                </template>

                                <v-list>
                                    <v-list-item :value="item" density="compact" border v-for="(item, i) in actionOptions"
                                        @click="optionSelected(item,question)" class="py-2"
                                        :style="[item.id == actionOptions[0].id ? 'border-top:0px' : '',
                                        item.id == actionOptions[actionOptions.length - 1].id ? 'border-bottom:0px' : '']" :key="i">
                                        <v-list-item-title>
                                            <v-icon :icon="item.icon" class="mr-2 mt-n2" color="deep-purple "></v-icon>
                                            <span>{{ item.name }}</span>
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div class="action-btns" v-if="quiz.questions.length > 0">
            <v-btn prepend-icon="mdi-check" color="success" class="mr-5" @click="saveQuiz">
                Save
            </v-btn>

            <router-link to="/">
                <v-btn>
                Cancel
            </v-btn>
            </router-link>
        </div>
        <AddQuestion 
            :show="isQuestionDrawer" 
            :mode="mode"
            :selectedQuestion = "selectedQuestion"
            @close-dialog="isQuestionDrawer = false" 
            @save-question="questionSaved"
            @update-question="questionUpdate"
            />
        <CommonAlert :alert="alert" />
        <OverlayProgress 
            :show="isOverlay"
        />
        <WarningDialogue
            :show="isWarningDialogue"
            :text="`Are you sure you want to delete this question?`"
            @delete-quiz="deleteQuestion"
            @close-dialog="isWarningDialogue = false"
        />
    </div>
</template>

<script setup lang="ts">
import { reactive, ref} from 'vue';
import AddQuestion from '@/components/AddQuestion.vue';
import CommonAlert from '@/components/Common/CommonAlert.vue'
import  { defaultStore }  from '@/stores/default';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import { v4 as uuidv4 } from 'uuid';
import OverlayProgress from '@/components/Common/OverlayProgress.vue';
import WarningDialogue from './Common/WarningDialogue.vue';



const router = useRouter();
const route = useRoute();
const store = defaultStore();


let mode = ref(`create`);
let isOverlay = ref(false)
let isWarningDialogue = ref(false);



interface Quiz {
    title: string;
    level: string;
    questions: Array<object>;
}

let quiz: Quiz = reactive({
    title: '',
    level: 'Easy',
    questions: [],
})

if(route.params.id) { 
     isOverlay.value = true;
     getQuizById(route.params.id) 
     mode.value = 'edit';
}

async function getQuizById() { 
    let response  = await store.getQuiz(route.params.id)
    if(response && response.length > 0) { 
        quiz.id = response[0].id
        quiz.title = response[0].title;
        quiz.questions = response[0].questions;
        quiz.level = response[0].level;
    }
    isOverlay.value = false;
}


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

let actionOptions: Array<object> = reactive([
    {
        id: 1,
        name: 'Edit',
        value: 'edit',
        icon: 'mdi-pencil',
        path: '/manage'
    },
    {
        id: 2,
        name: 'Delete',
        value: 'delete',
        icon: 'mdi-delete'

    },
]);


//Question Drawer
let isQuestionDrawer = ref(false)

function openQuestionDrawer() {
    isQuestionDrawer.value = true;
    selectedQuestion = {
        options:[],
        correctOption : null,
        question : ''
    };
}

function questionSaved(val) {
    val.id =  uuidv4();
    let copy = JSON.parse(JSON.stringify(val))
    quiz.questions.push(copy)
}

function questionUpdate(val) { 
    let updatingIndex = quiz.questions.findIndex(question => question.id === val.id)
    let question = quiz.questions[updatingIndex];
    if(updatingIndex >= 0) { 
        question.id = val.id;
        question.question = val.question;
        question.options = val.options;
        question.correctOption = val.correctOption;
    }  else { 
        val.id =  uuidv4();
        let copy = JSON.parse(JSON.stringify(val))
        quiz.questions.push(copy)
    }
}

function deleteQuestion() { 
    let foundIndex = quiz.questions.findIndex(question => question.id  === selectedQuestion.id);
    if(foundIndex != -1) { 
        quiz.questions.splice(foundIndex, 1)
    } 
    isWarningDialogue.value = false;
}


let selectedQuestion : Object = reactive({
    id:null,
    options:[],
    correctOption : null,
    question : ''
})

let optionSelected = (item: string, question:object) => {
    selectedQuestion = question;
    if (item.value === 'edit') {
        isQuestionDrawer.value = true;
    } else if (item.value === 'delete') {
        isWarningDialogue.value = true;
  }
}


const saveQuiz = async () => { 
    // check if quiz title is given 
    if(!quiz.title || quiz.title == '') { 
        alert.isTrue = true;
        alert.color = 'red';
        alert.text = 'Please enter quiz title.'
        return;
    }

    if(quiz.questions.length < 1) { 
        alert.isTrue = true;
        alert.color = 'red';
        alert.text = 'Please enter at least one question.'
        return;
    }

    isOverlay.value = true;
    let status;
    if(mode.value === 'edit') { 
        quiz.id = Number(route.params.id);
        status = await store.updateQuiz(quiz)
        alert.text = `Quiz updated successfully`
    } else { 
        status = await store.addQuiz(quiz)
        alert.text = 'Quiz saved successfully.'
    }

    isOverlay.value = false;
    alert.isTrue = true;
    alert.color = 'green';

     //Clearing quiz values after saving
     setTimeout(() => {
        quiz.title =  ''
        quiz.level = 'Easy'
        quiz.questions = []

        router.push('/')
    }, 1000);
}


</script>

<style scoped>
.action-btns {
    position: fixed;
    bottom: 20px;
    right: 50px;
}
</style>