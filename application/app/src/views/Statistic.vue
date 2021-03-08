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
<!--  <iframe  height ="100%" width="100%"-->
<!--           style="border:3px solid black;"-->
<!--           src="http://localhost:3000"  id="frame" ></iframe>-->
  <div>

<!--    <div id="frame-wrapper" hidden="" style="position: absolute; height: 1000px; width: 886px; transform: scale(0.5); transform-origin: 0px 0px; display: block;">-->
<!--      <iframe id="frame" style="position: absolute; width: 3000px; height: 100%; border: none;" src="http://localhost:3000"></iframe>-->
<!--    </div>-->
    <Tabs type="card" value="gameChainNetwork" style="height: 650px">
      <TabPane label="Game Chain Network Statistic" name="gameChainNetwork">
        <div id="frame-wrapper" hidden="" style="position: absolute; height: 100%; width: 100%; transform: scale(0.60); transform-origin: 0px 0px; display: block;">
          <!--      <iframe id="frame" style="position: absolute; width: 2066px; height: 1077px;  margin-left: 5px" src="https://ethstats.net/"></iframe>-->
          <iframe id="frame" style="position: absolute; width: 2066px; height: 1063px;  margin-left: 5px" src="https://ethstats.net/"></iframe>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  mounted() {
    // if ($(this).attr('src') != '') { resize(); $('#frame-wrapper').fadeIn(300); }
    if(document.getElementById("frame")!=null){
      // resize();
      // this.getElementById("frame-wrapper").fadeIn(300);

    }
  }
}
</script>

<style>

/*#frame {*/
/*  width: 97%;*/
/*  height: 100%;*/
/*  resize: both;*/
/*}*/

</style>