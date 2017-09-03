<template>
  <div id="app">
    <img src="./assets/logo.png">
    <canvas ref="canvas"></canvas>
    <h1 ref="element">{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>


<script>
  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
      const canvas = this.$refs.canvas;
      const ctx= canvas.getContext('2d');

      canvas.width = 1000;
      canvas.height = 500;

      const cw = canvas.width;
      const ch = canvas.height;

      const ballSize =20;

      let ballX = cw/2 - ballSize/2;
      let ballY = ch/2 - ballSize/2;

      const paddelHeight = 100;
      const paddelWidth = 20;

      const playerX=70;
      const aiX = 910;
      let playerY = 200;
      let aiY = 200;

      const lineWidht = 6;
      const lineHeight = 16;

      let ballSpeedX = -1;
      let ballSpeedY = 1;

      canvas.addEventListener('mousemove', playerPosition());

      let topCanvas = canvas.offsetTop;

      function player(){
        ctx.fillStyle = '#7FFF00';
        ctx.fillRect(playerX,playerY,paddelWidth, paddelHeight);
      }

      function playerPosition(e) {
        console.log("mouse position to: "+(e.clientY - topCanvas));
        playerY = e.clientY - topCanvas - paddelHeight/2;
        if(playerY >= ch - paddelHeight){
          playerY = ch -paddelHeight;
        }

        if(playerY <= 0){
          playerY = 0;
        }

        aiY = playerY;
      }

      function ai() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
      }

      function ball(){
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ballX, ballY, ballSize, ballSize);
        ballX +=ballSpeedX;
        ballY+=ballSpeedy;

        if(ballY+ballSize >= ch || ballY<=0){
          ballSpeedY = -ballSpeedY;
          speedUp();
        }
        if (ballX+ballSize >= cw || ballX <=0){
          ballSpeedX=-ballSpeedX;
          soeedUp();
        }

        function speedUp(){
          if(ballSpeedX >0){
            ballSpeedX+=.2;
          }else if(ballSpeedX <0){
            ballSpeedX -=.2;
          }

          if(ballSpeedY >0){
            ballSpeedY+=.2;
          }else{
            ballSpeedY-=.2;
          }
        }
      }

    }
  }
</script>


<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  body {
    /*wyzerowanie marginesu*/
    margin: 0;
    /*body ma zajmować wysokosć przeglądarki*/
    height: 100vh;
    /*wyśrodkowanie elementu canvas*/
    display: flex;
    align-items: center;
    justify-content: center;
    /*kolor tła całej strony*/
    background-color: darkgray;
  }

  canvas {
    /*określamy obramowania canvas*/
    border: 3px solid #fff;
  }
</style>
