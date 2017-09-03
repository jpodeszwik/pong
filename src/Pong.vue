<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
  export default {
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
      let playerY = 200;
      let aiY = 200;

      const lineWidht = 6;
      const lineHeight = 16;

      let ballSpeedX = -1;
      let ballSpeedY = 1;


      let topCanvas = canvas.offsetTop;

      function player() {
        ctx.fillStyle = '#7FFF00';
        ctx.fillRect(playerX, playerY, paddelWidth, paddelHeight);
      }

      function playerPosition(e) {
        console.log("mouse position to: " + (e.clientY - topCanvas));
        playerY = e.clientY - topCanvas - paddelHeight / 2;
        if (playerY >= ch - paddelHeight) {
          playerY = ch - paddelHeight;
        }

        if (playerY <= 0) {
          playerY = 0;
        }

        aiY = playerY;
      }

      function ai() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(aiX, aiY, paddelWidth, paddelHeight);
      }

      function ball() {
//        console.log("ball X: " + ballX);
//        console.log("ball Y: " + ballY);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(ballX, ballY, ballSize, ballSize);
        ballX += ballSpeedX;
        ballY += ballSpeedY;


        if (ballY + ballSize >= ch || ballY <= 0) {
          ballSpeedY = -ballSpeedY;
//          speedUp();
        }
        if (ballX + ballSize >= cw || ballX <= 0) {
          ballSpeedX = -ballSpeedX;
//          speedUp();
        }


        hitPlayer1();
        hitPlayer2();

      }

      function speedUp() {
        if (ballSpeedX > 0) {
          ballSpeedX += .2;
        } else if (ballSpeedX < 0) {
          ballSpeedX -= .2;
        }

        if (ballSpeedY > 0) {
          ballSpeedY += .2;
        } else {
          ballSpeedY -= .2;
        }
      }

      function hitPlayer1() {
        var bX = ballX;
        var bY = ballY;
        if ((playerX<= bX || (playerX + paddelWidth))>=bX) {
          ballSpeedX = -ballSpeedX;
//          speedUp();
        }
        if ((playerY <= bY || (playerY + paddelHeight) >=bY)) {
          ballSpeedY = -ballSpeedY;
//          speedUp();
        }
      }

      function hitPlayer2(){
        var bX = ballX;
        var bY = ballY;
        if ((cw- aiX <= bX || (cw - (aiX - paddelWidth)))>=bX) {
          ballSpeedX = -ballSpeedX;
//          speedUp();
        }
        if ((aiY <= bY || (aiY + paddelHeight) >=bY)) {
          ballSpeedY = -ballSpeedY;
//          speedUp();
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

      function aiPosition() {

      }

      canvas.addEventListener('mousemove', playerPosition);

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
