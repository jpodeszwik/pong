<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
  import store from './store'

  export default {
    data() {
      return {
        store,
        playerY: 200,
        aiY: 200,
      }
    },

    watch: {
      'store.playerY'(val) {
        this.playerY = val;
      },
      'store.aiY'(val) {
        this.aiY = val;
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

      function movePlayer(newY) {
        self.store.playerY = applyBoundings(newY);
      }

      function moveAi(newY) {
        self.store.aiY = applyBoundings(newY);
      }

      function ai() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(aiX, self.aiY, paddelWidth, paddelHeight);
      }

      function ball() {
//        console.log("ball X: " + ballX)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ballX, ballY, ballSize, ballSize);
        ballX += ballSpeedX;
        ballY += ballSpeedY;


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

      function mouseMove(e) {
        movePlayer(e.clientY);
        moveAi(e.clientY);
      }

      canvas.addEventListener('mousemove', mouseMove);

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
