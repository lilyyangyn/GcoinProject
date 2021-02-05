<template>
  <div class="game-container">
    <Card style="width:360px" class="game-thumbnail" v-for="game in gameList" :key="game.gameId" :id="game.gameId" @click.native="gameOnClickHandle($event)">
      <div style="text-align:center">
        <!--        <img src="../../public/image/pubgSample.jpg" style="width:320px">-->
        <img :src="game.thumbnailBase64Str" style="width:320px">
        <!--        <h3>PubG Sample Game</h3>-->
        <h3 >{{game.name}}</h3>
      </div>
    </Card>

  </div>
</template>

<script>
import {getGameListData, getThumbnailBase64Str} from "../scripts/api/gameAPI";

export default {
  data (){
    return {
      gameList:[],
    }
  },
  mounted() {
    getGameListData(null, this.getGameListDataCallback);
  },
  methods: {
    getGameListDataCallback (code,msg,data){
      this.gameList = data;
    },
    gameOnClickHandle(event){
      // console.log(event.currentTarget.id);
      let id = event.currentTarget.id;
      this.$router.push({name: 'GameInfo', params: { gameId: id}})
      // this.$router.push({ path: `/user/${ele.id}})
    }
  }
}
</script>
<!--<template>-->
<!--  <div class="game-container">-->
<!--    <Card style="width:360px" class="game-thumbnail" v-for="game in gameList" :key="game.name">-->
<!--      <div style="text-align:center">-->
<!--&lt;!&ndash;        <img src="../../public/image/pubgSample.jpg" style="width:320px">&ndash;&gt;-->
<!--        <img :src="game.imgbase64Str" style="width:320px">-->
<!--&lt;!&ndash;        <h3>PubG Sample Game</h3>&ndash;&gt;-->
<!--        <h3>{{game.name}}</h3>-->
<!--      </div>-->
<!--    </Card>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {getGameListData, getThumbnailBase64Str} from "../scripts/api/gameAPI";-->

<!--export default {-->
<!--  data (){-->
<!--    return {-->
<!--      gameList:[],-->
<!--      imgBase64StrTemp:''-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    getGameListData(null, this.getGameListDataCallback);-->
<!--  },-->
<!--  methods: {-->
<!--    async getGameListDataCallback (code,msg,data){-->
<!--      let game;-->
<!--      if (code ==0 && data!=null){-->
<!--        for (let i=0; i<data.length; i++){-->
<!--          game = {};-->
<!--          game.name = data[i].name;-->
<!--          await getThumbnailBase64Str(null,this.getThumbnailBase64StrCallback,data[i].thumbnailPath);-->
<!--          game.imgbase64Str = this.imgBase64StrTemp;-->
<!--          console.log("here : "+this.imgBase64StrTemp);-->
<!--          // this.gameList[i].name = data[i].name;-->
<!--          this.gameList.push(game);-->
<!--        }-->
<!--        console.log(this.gameList);-->
<!--      }-->
<!--    },-->
<!--    getThumbnailBase64StrCallback(code,msg,base64Str){-->
<!--      if (code==0){-->
<!--        let game = {};-->
<!--        if(base64Str!=null){-->
<!--          this.imgBase64StrTemp = "data:image/jpg;base64,"+base64Str;-->
<!--          console.log("inside callback");-->
<!--        }else {-->
<!--          this.imgBase64StrTemp = null;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style>
  .game-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .game-thumbnail{
    margin-right: 1%;
    margin-bottom: 1%;
  }
</style>
