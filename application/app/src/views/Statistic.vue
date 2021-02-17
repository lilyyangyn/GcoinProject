<!--<template>-->
<!--  <div class="container">-->
<!--    <iframe src="http://localhost:3000"></iframe>-->
<!--  </div>-->
<!--</template>-->

<!--<style>-->

<!--.container{-->
<!--  height: 700px;-->
<!--  width: auto;-->
<!--  overflow-x: scroll;-->
<!--  overflow-y: hidden;-->
<!--}-->

<!--iframe {-->
<!--  height: 1000px;-->
<!--  /*width: 2130px;*/-->
<!--  width: 2150px;-->
<!--  overflow-y: hidden;-->
<!--  overflow-x: scroll;-->
<!--  /*-ms-transform: scale(0.75);*/-->
<!--  /*-moz-transform: scale(0.75);*/-->
<!--  /*-o-transform: scale(0.75);*/-->
<!--  -webkit-transform: scale(0.75);-->
<!--  /*transform: scale(0.75);*/-->

<!--  -ms-transform-origin: 0 0;-->
<!--  -moz-transform-origin: 0 0;-->
<!--  -o-transform-origin: 0 0;-->
<!--  -webkit-transform-origin: 0 0;-->
<!--  transform-origin: 0 0;-->
<!--}-->
<!--</style>-->

<template>
  <iframe  height ="100%" width="100%"
           style="border:3px solid black;"
           src="http://localhost:3000"  id="frame" ></iframe>
</template>

<style>

#frame {
  width: 97%;
  height: 100%;
  resize: both;
}
</style>