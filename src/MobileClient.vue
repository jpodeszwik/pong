<template>
  <v-app>
    <v-container>
      <h2>Podaj imię</h2>
      <v-layout>
        <v-flex xs12>
          <v-text-field v-if="!hasJoined"
                        label="Imię"
                        v-model="name"
          ></v-text-field>
          <v-btn v-if="!hasJoined" primary :disabled="!name" @click="join">Dołącz</v-btn>
          <template v-if="readyToGo">
            <v-btn error>Start</v-btn>
            <v-slider v-model="paddle" min="0" max="400"></v-slider>
          </template>
          <p v-if="hasJoined && waitingForOtherPlayer">Waiting for other player to join...</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
  import store, {joinGame, playersCount, hasJoined, setPaddle} from './store'

  export default {
    data() {
      return {
        name: '',
        slider: 0,
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
      },

      paddle: {
        get() {
          return this.slider
        },
        set(val) {
          this.slider = val
          setPaddle(val)
        }
      }
    },

    methods: {
      join() {
        joinGame(this.name)
      }
    }
  }
</script>
