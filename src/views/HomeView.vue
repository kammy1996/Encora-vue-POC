<template>
  <div style="width:950px">
    <h2 class="mt-3">Quiz List</h2>
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
          <tr v-for="(quiz,index) in quizList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ quiz.title }}</td>
              <td>{{ quiz.questions.length }}</td>
              <td>{{ quiz.level }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';



//Getting list of quizzes
let quizList: Array<object> = reactive([])

let stringed = window.localStorage.getItem(`quizzes`)
if(stringed) { 
  quizList = JSON.parse(stringed)
} 



</script>

<style></style>
