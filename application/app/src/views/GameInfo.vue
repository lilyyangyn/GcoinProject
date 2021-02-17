<template>
  <div v-if="gameInfo" class="page-container">
<!--    <h1 class="page-title">{{gameInfo.name}}</h1>-->
    <div class="left-container">
      <div class="tabplane-container">
        <Tabs type="card">
          <TabPane label="Poster">
            <Card>
              <img :src="gameInfo.thumbnailBase64Str" style="width:100%">
            </Card>
          </TabPane>
          <TabPane label="Trailer">
            <Card>
              <iframe width="560" height="315" :src="gameInfo.trailerUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </Card>
          </TabPane>
        </Tabs>
        <Button style="margin-top: 2%" type="warning">Game Download</Button>
      </div>


      <div class="context-text right-container">
        <Button style="position:relative; float: right; width: 60px; margin-bottom: 3%" to="/game">Back</Button>
        <div class="gameinfo-container">
          <label>Game Name: </label>
          <p>{{gameInfo.name}}</p>
          <br>
          <label>Game Description:</label>
          <p>{{gameInfo.gameDescription}}</p>
          <br>
          <label>Game Category:</label>
          <p>{{gameInfo.category}}</p>
          <br>
          <label>Issue Date:</label>
          <p>{{gameInfo.issueDate}}</p>
          <br>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {getGameInfo, getGameListData} from "../scripts/api/gameAPI";

export default {
  data () {
    return {
      gameInfo : null
    }
  },
  async created() {
    let gameId = {gameID: this.$route.params.gameId};
    await getGameInfo(gameId, this.getGameInfoCallback);
    this.gameCategoryHandling();
    this.gameIssueDateHandling();
  },
  methods: {
    getGameInfoCallback (code,msg,data){
      this.gameInfo = data;
      console.log("here");
    },
    gameCategoryHandling(){
      switch (this.gameInfo.category){
        case "0":
          this.gameInfo.category = 'RPG';
          break;
        case "1":
          this.gameInfo.category = 'Action';
          break;
        case "2":
          this.gameInfo.category = 'Sports';
          break;
        case "3":
          this.gameInfo.category = 'Strategy';
          break;
        case "4":
          this.gameInfo.category = 'Other';
          break;
      }
    },
    gameIssueDateHandling(){
      this.gameInfo.issueDate = this.gameInfo.issueDate.substring(0, 10);
    }

  },
}
</script>

<style scoped>

  .page-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .left-container{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 80% ;
    height: 600px;
    padding: 3%;
    background: #17233d;
    border-radius: 35px;
  }

  .tabplane-container {
    width: 50%;
    margin-right: 3%;
    height: auto;
    display: flex;
    flex-direction: column;
  }

  .right-container{
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .gameinfo-container {
    background: #515a6e;
    height: 100%;
    width: 100%;
    border-radius: 15px;
    padding: 3%;
    overflow-y: scroll;
  }

  label {
    font-weight: bold;
    font-size: 15px;
    color: #f2f2f2;
    margin-top: 10%;
  }

  .context-text {
    font-size: 15px;
    color: #f2f2f2;
  }

</style>