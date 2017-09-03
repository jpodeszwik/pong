<template>
  <div>
    <div id="qrcode" ref="qrcode"></div>
    <pong></pong>
  </div>
</template>

<script>
  import Pong from './Pong.vue'

  export default {
    components: {
      Pong
    },

    mounted() {
      const url = 'http://192.168.1.2:8080';
      new QRCode(this.$refs.qrcode, url);
    }
  }
</script>

<style scoped>
  #qrcode {
    width:260px;
    height:260px;
    margin-top:15px;
  }
</style>