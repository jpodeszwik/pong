import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBQjE9uGjGfUbRdJ3O_Iv4bG0Q0CAbN-TA",
  authDomain: "pong-81c10.firebaseapp.com",
  databaseURL: "https://pong-81c10.firebaseio.com/",
  storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);
const database = firebase.database();

const store = {
  playerY: undefined,
  aiY: undefined,
  players: {},
  me: undefined
};

database.ref('players').on('value', function (dataSnapshot) {
  let players = dataSnapshot.val();
  store.players = players || [];
})

export default store;

export function joinGame(name) {
  const player = database.ref('players').push({name})
  store.me = player.key
  player.onDisconnect().remove()
}

export function playersCount() {
  return Object.keys(store.players).length
}
export function hasJoined() {
  return store.players[store.me];
}

export function setPaddle(paddle) {
   database.ref('players').child(store.me).child('paddle').set(paddle)
}