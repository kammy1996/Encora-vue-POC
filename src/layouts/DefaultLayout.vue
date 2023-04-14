<script setup>


let drawer = true;

</script>

<template>
  <v-app>
    <v-navigation-drawer app permanent v-model="drawer" class="bg-deep-purple">
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
            <router-link to="/">
              <v-list-item prepend-icon="mdi-help-box-multiple" title="Quizzes" value="quizzes"></v-list-item>
            </router-link>
            <router-link to="/manage"  >
              <v-list-item prepend-icon="mdi-plus" title="Create Quiz" value="create-quiz"></v-list-item>
            </router-link>
            <router-link to="/">
              <v-list-item prepend-icon="mdi-play-box" title="Play Quiz" value="play-quiz"></v-list-item>
            </router-link>
        </v-list>
    </v-navigation-drawer>

    <v-content>
      <!-- Page content goes here -->
      <router-view />
    </v-content>
  </v-app>
</template>

<style scoped>
.v-list-item {
  color: white !important;
}
</style>