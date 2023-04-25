<template>
    <div>
        <v-row class=" mt-5">
            <v-col cols="9">
                <h2 class="mt-3">Quiz List</h2>
            </v-col>
            <v-col cols="3">
                <router-link to="/manage">
                    <v-btn prepend-icon="mdi-plus" class="mt-3 bg-deep-purple float-right">Quiz</v-btn>
                </router-link>
            </v-col>
        </v-row>
        <div class="quiz-list mt-5">
            <v-table v-if="quizList && quizList.length > 0">
                <thead>
                    <tr>
                        <th class="text-left">
                            Sr.no
                        </th>
                        <th class="text-left">
                            Quiz
                        </th>
                        <th class="text-left">
                            Questions
                        </th>
                        <th class="text-left">
                            Difficulty
                        </th>
                        <th class="text-left">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(quiz, index) in quizList" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ quiz.title }}</td>
                        <td>{{ quiz.questions.length }}</td>
                        <td>{{ quiz.level }}</td>
                        <td>
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn variant="text" icon="mdi-dots-vertical" v-bind="props"></v-btn>
                                </template>

                                <v-list>
                                    <v-list-item :value="item" density="compact" border v-for="(item, i) in actionOptions"
                                        @click="optionSelected(item, quiz)" class="py-2"
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
        <WarningDialogue 
            :show="isWarningDialogue" 
            @delete-quiz="deleteQuiz" 
            @close-dialog="isWarningDialogue = false"
            :text="`Are you sure you want to delete this quiz?`"
         />
        <CommonAlert :alert="alert" />
        <OverlayProgress 
            :show="isOverlay"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { defaultStore } from '@/stores/default';
import CommonAlert from '@/components/Common/CommonAlert.vue';
import WarningDialogue from '@/components/Common/WarningDialogue.vue'
import { useRouter } from 'vue-router';
import OverlayProgress from '@/components/Common/OverlayProgress.vue';



const store = defaultStore();
let isOverlay = ref(false)
let isWarningDialogue = ref(false)

const router = useRouter();

let selectedQuiz = reactive({})

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


async function getQuizList() {
    await store.fetchQuizList()
    isOverlay.value = false
}

isOverlay.value = true
getQuizList()

const quizList = computed(() => {
    return store.getQuizList;
});


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



// Managing Quiz Actions 
let optionSelected = (item: string, quiz: object) => {
    selectedQuiz = quiz;
    if (item.value === 'edit') {
        router.push(`/manage/${quiz.id}`)
    } else if (item.value === 'delete') {
        isWarningDialogue.value = true;
    }
}

async function deleteQuiz() {
    let response = await store.deleteQuiz(selectedQuiz)
    if (response === 204) {
        isWarningDialogue.value = false;

        alert.isTrue = true;
        alert.color = 'green';
        alert.text = 'Quiz deleted Successfully.'

        getQuizList();

    } else {
        alert.isTrue = true;
        alert.color = 'green';
        alert.text = 'Something went wrong.'
    }

}

</script>

<style scoped></style>