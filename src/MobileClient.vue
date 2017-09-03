<template>
  <v-container>
    <h2>Podaj imię</h2>

    <v-layout>
      <v-flex xs12>
        <v-text-field
            label="Imię"
            :value="name"
        ></v-text-field>
        <v-btn primary>Dołącz</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {name: ''}
    },

    mounted() {
    }
  }
</script>

<style scoped>
</style>