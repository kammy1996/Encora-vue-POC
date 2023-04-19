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
                <tbody >
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
                                    <v-list-item 
                                        :value="item" 
                                        density="compact" 
                                        border v-for="(item, i) in actionOptions"
                                        @click="optionSelected(item)"
                                        class="py-2"
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
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

async function getQuizList() { 
    await store.dispatch(`getQuizList`)
}

getQuizList()

const quizList = computed(() => {
    return store.getters[`getQuizList`];
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
    {
        id: 3,
        name: 'Play',
        value: 'play',
        icon: 'mdi-play-box',
        path: '/play'
    }
]);



// Managing Quiz Actions 
let optionSelected = (item) => { 
    if(item.value === 'edit') {

    } else if(item.value === 'delete') {

    } else if(item.value === 'play') {

    }
}

</script>

<style scoped></style>