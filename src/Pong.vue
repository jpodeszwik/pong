<template>
  <div>
    <h2 align="center">{{p1 && p1.name}} {{store.p1Score}}:{{store.p2Score}} {{p2 && p2.name}}</h2>
    <canvas ref="canvas"></canvas>
  </div>


</template>

<script>
  import store, {me} from './store'

  export default {
    data() {
      return {
        store,
        playerY: 200,
        aiY: 200,
      }
    },

    computed: {
      me,
      playerKeys() {
        return Object.keys(this.store.players)
      },
      p1() {
        return this.store.players[this.playerKeys[0]]
      },
      p2() {
        return this.store.players[this.playerKeys[1]]
      },
    },

    watch: {
      'store.players'() {
        this.playerY = this.p1 && this.p1.paddle;
        this.aiY = this.p2 && this.p2.paddle;
      }
    },

    mounted() {

      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      canvas.width = 1000;
      canvas.height = 500;

      const cw = canvas.width;
      const ch = canvas.height;

      const ballSize = 20;

      let ballX = cw / 2 - ballSize / 2;
      let ballY = ch / 2 - ballSize / 2;

      const paddelHeight = 100;
      const paddelWidth = 20;

      const playerX = 70;
      const aiX = 910;

      const lineWidht = 6;
      const lineHeight = 16;

      let ballSpeedX = -5;
      let ballSpeedY = 1;


      let topCanvas = canvas.offsetTop;

      const self = this;

      function player() {
        ctx.fillStyle = '#7FFF00';
        ctx.fillRect(playerX, self.playerY, paddelWidth, paddelHeight);
      }

      function applyBoundings(requestedY) {
        var calculatedY = requestedY - topCanvas - paddelHeight / 2;
        if (calculatedY >= ch - paddelHeight) {
          calculatedY = ch - paddelHeight;
        }

        if (calculatedY <= 0) {
          calculatedY = 0;
        }
        return calculatedY;
      }


      function ai() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(aiX, self.aiY, paddelWidth, paddelHeight);
      }

      function ball() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ballX, ballY, ballSize, ballSize);
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballX <= 0) {
          store.p2Score++;
        } else if (ballX + ballSize >= cw) {
          store.p1Score++;
        }
        if (ballY + ballSize >= ch || ballY <= 0) {
          ballSpeedY = -ballSpeedY;
        }
        if (ballX + ballSize >= cw || ballX <= 0) {

          reset();
        }


        hitPlayer1();
        hitPlayer2();

      }

      function speedUp() {
        if (ballSpeedX > 0) {
          ballSpeedX += .7;
        } else if (ballSpeedX < 0) {
          ballSpeedX -= .7;
        }

        if (ballSpeedY > 0) {
          ballSpeedY += .7;
        } else {
          ballSpeedY -= .7;
        }
      }

      function hitPlayer1() {
        if (ballX >= playerX &&
          ballX <= playerX + paddelWidth &&
          ballY >= self.playerY &&
          ballY <= self.playerY + paddelHeight) {
          ballSpeedX = -ballSpeedX;
          ballSpeedY = -ballSpeedY;
          speedUp();
        }
      }

      function hitPlayer2() {
        if (ballX + ballSize >= aiX &&
          ballX + ballSize <= aiX + paddelWidth &&
          ballY >= self.aiY &&
          ballY <= self.aiY + paddelHeight) {
          ballSpeedX = -ballSpeedX;
          ballSpeedY = -ballSpeedY;
          speedUp();
        }
      }


      function table() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, cw, ch);
        for (let linePosition = 20; linePosition < ch; linePosition += 30) {
          ctx.fillStyle = "gray";
          ctx.fillRect(cw / 2 - lineWidht / 2, linePosition, lineWidht, lineHeight)
        }
      }

      function reset() {
        ballSpeedX = -4;
        ballSpeedY = 1;
        ballX = cw / 2 - ballSize / 2;
        ballY = ch / 2 - ballSize / 2;
      }

      function game() {
        table()
        ball()
        player()
        ai()
      }

      setInterval(game, 1000 / 60)

    }
  }
</script>

<style>
  body {
    /*wyzerowanie marginesu*/
    margin: 0;
    /*wyśrodkowanie elementu canvas*/
    display: flex;
    align-items: center;
    justify-content: center;
  }

  canvas {
    /*określamy obramowania canvas*/
    border: 3px solid #fff;
  }
</style>
