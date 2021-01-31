<template>
  <div class="page-container">
    <h1 class="page-title">Game Launch</h1>
    <div class="card-container">
      <Card style="display: flex;flex-direction: column">
        <Form :model="formGameLaunch" label-position="left" :label-width="180" class="form-container">
          <FormItem label="Game Name">
            <Input v-model="formGameLaunch.gameName" placeholder="game name"></Input>
          </FormItem>
          <FormItem label="Issuer ID">
            <Input v-model="formGameLaunch.issuerID" placeholder="Gaming company ID"></Input>
          </FormItem>
          <FormItem label="Trailer Youtube URL">
            <Input v-model="formGameLaunch.trailerURL" placeholder="Trailer Youtube URL"></Input>
          </FormItem>
          <FormItem label="Game Description">
            <Input v-model="formGameLaunch.gameDescription" type="textarea" placeholder="game description"></Input>
          </FormItem>
          <FormItem label="Game Category">
            <Select v-model="formGameLaunch.gameCategory" placeholder="Select the Game's Category">
              <Option value="0">RPG</Option>
              <Option value="1">Action</Option>
              <Option value="2">Sports</Option>
              <Option value="3">Strategy</Option>
              <Option value="4">Other</Option>
            </Select>
          </FormItem>
          <FormItem label="Game Thumbnail">
            <span class="upload-box-container">
              <div>
                <Upload
                    ref=upload
                    :before-upload="handleUpload"
                    :data="uploadData"
                    :on-success="handleSuccess"
                    action="http://172.24.172.87:8090/gameregistration/fileupload">
                  <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
                </Upload>
                <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>
              </div>
            </span>
          </FormItem>
        </Form>

      </Card>
      <div style="width: 100%">
        <Button type="success" class="submit-btn" @click="formSubmit">Submit</Button>
      </div>
    </div>
  </div>
</template>
<script>

import {gameLaunch} from "../scripts/api/gameLaunchAPI";

export default {
  data(){
    return{
      formGameLaunch : {
        gameName :'',
        trailerURL: '',
        gameDescription:'',
        issuerID:'',
        gameCategory:'',
      },
      file:null,
      uploadData:null,
      loadingStatus: false,
      name:'nname',
      time:'ttime',
      type:'ttype'
    }
  },
  methods:{
    handleUpload (file) {
      this.file = file;
      this.uploadData= {name:this.name,time:this.time,type:this.type}
      return false;
    },
    upload () {
      this.loadingStatus = true;
      this.$set(this.$refs.upload.data, 'name', this.name);
      this.$set(this.$refs.upload.data, 'time', this.time);
      this.$set(this.$refs.upload.data, 'type', this.type);
      this.$refs.upload.post(this.file);

      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
      }, 1500);
    },
    handleSuccess (res,file){
      const fileList = this.$refs.upload.fileList;
      if(fileList.length>1){
        this.$refs.upload.fileList.splice(fileList.indexOf(file)-1,1);
      }
      file.name = res;
    },
    formSubmit (){
      let checkthumbnail = this.handleFormSubmit();
      if (checkthumbnail === true){
        let param = {
          gameName :this.formGameLaunch.gameName,
          gameDescription:this.formGameLaunch.gameDescription,
          trailerURL: this.formGameLaunch.trailerURL,
          issuerID: this.formGameLaunch.issuerID,
          gameCategory: this.formGameLaunch.gameCategory,
          thumbnailPath: this.$refs.upload.fileList[0].response //As the thumbnail only have 1 pic, so array with index 0 is used
        };
        gameLaunch(param, this.formSubmitCallback);
      }
    },
    handleFormSubmit(){
      if(this.$refs.upload.fileList[0]==null){
        this.$Message.error("required to upload thumbnail image");
        return false;
      }
      return true;
    },
    formSubmitCallback(code,msg,data) {
      if (code === 0){
        this.$Message.success("Success to register the game");
        //todo: redirect page after register game successfully
        // setTimeout( () => this.$router.push({ path: '/'}
        // ), 1500);
        // document.getElementById("columnNav").updateActiveName();
      }
    }
  }
}
</script>

<style>

/*.page-container{*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*}*/

/*.title {*/
/*  text-align: center;*/
/*  margin-bottom: 20px;*/
/*}*/

.upload-box {
  width: 50%;
}

.card-container {
  width: 60%;
}

.upload-box-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
}

.submit-btn {
  float: right;
  width: 25%;
  height: 40px;
  margin-top: 2%;
  margin-right: 2%;
}

</style>