<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  // //屏幕試配
  // data() {
  //   return {
  //     screenWidth: document.body.clientWidth
  //   };
  // },
  // mounted() {
  //   const that = this;
  //   if (this.screenWidth >= 768) {
  //     this.$router.push("/index");
  //   } else {
  //     this.$router.push("/home");
  //   }
  //   window.onresize = () => {
  //     return (() => {
  //       if (this.screenWidth >= 768) {
  //         this.$router.push("/index");
  //       } else {
  //         this.$router.push("/home");
  //       }
  //       window.screenWidth = document.body.clientWidth;
  //       that.screenWidth = window.screenWidth;
  //     })();
  //   };
  // },

  // watch: {
  //   screenWidth(val) {
  //     if (!this.timer) {
  //       this.screenWidth = val;
  //       this.timer = true;
  //       let that = this;
  //       setTimeout(function() {
  //         console.log(that.screenWidth);
  //         that.timer = false;
  //       }, 400);
  //     }
  //   }
  // },
  name: "App"
};
</script>
<style lang="scss" >

.el-carousel__arrow{
  background-color:rgba(0,0,0,0.6);
  display: block !important;
}
.el-input--suffix .el-input__inner{
    border-radius: 0px;
}
.el-tabs__nav-wrap:after{
  background: #FFF;
}
body {
  margin: 0;
}
.el-carousel__indicators--outside {
  display: none;
}
.el-carousel__container {
  height: 950px;
}
// 移动端首页轮播
.mu-carousel {
  height: 186px;
}
</style>


