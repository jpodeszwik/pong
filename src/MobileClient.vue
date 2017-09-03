<template>
  <v-container>
    <h2>Podaj imię</h2>
    <v-layout>
      <v-flex xs12>
        <v-text-field v-if="!hasJoined"
            label="Imię"
            v-model="name"
        ></v-text-field>
        <v-btn v-if="!hasJoined" primary :disabled="!name" @click="join">Dołącz</v-btn>
        <v-btn v-if="readyToGo" error >Start</v-btn>
        <p v-if="hasJoined && waitingForOtherPlayer">Waiting for other player to join...</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import store, {joinGame, playersCount, hasJoined} from './store'

  export default {
    data() {
      return {
        name: '',
        store
      }
    },

    computed: {
      playersCount,
      hasJoined,
      readyToGo() {
        return this.playersCount >= 2
      },
      waitingForOtherPlayer() {
        return this.playersCount === 1
      }
    },

    methods: {
      join() {
        joinGame(this.name)
      }
    }
  }
</script>
