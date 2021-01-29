<template>
  <div class="page-container">
    <h1 class="page-title">Game Launch</h1>
    <div class="card-container">
      <Card>
        <Form :model="formGameLaunch" label-position="left" :label-width="140" class="form-container">
          <FormItem label="Game Name">
            <Input v-model="formGameLaunch.gameName" placeholder="game name"></Input>
          </FormItem>
          <FormItem label="Game Description">
            <Input v-model="formGameLaunch.gameDescription" type="textarea" placeholder="game description"></Input>
          </FormItem>
          <FormItem label="Trailer Youtube URL">
            <Input v-model="formGameLaunch.trailerURL" placeholder="Trailer Youtube URL"></Input>
          </FormItem>
        </Form>
        <span class="upload-box-container">
          <div>
            <Upload
              ref=upload
              :before-upload="handleUpload"
              :data="uploadData"
              :on-success="handleSuccess"
              action="http://192.168.0.100:8090/gameregistration/fileupload">
              <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
            </Upload>
            <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>
          </div>
        </span>
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
        gameDescription:''
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
          thumbnailPath: this.$refs.upload.fileList[0].response //As the thumbnail only have 1 pic, so array with index 0 is used
        };
        gameLaunch(param, this.formSubmitCallback());
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
  justify-content: center;
}

.submit-btn {
  float: right;
  width: 25%;
  height: 40px;
  margin-top: 2%;
  margin-right: 2%;
}
</style>

<!--<template>-->
<!--<div>-->
<!--  <div class="demo-upload-list" v-for="item in uploadList">-->
<!--    <template v-if="item.status === 'finished'">-->
<!--      ![](item.url)-->
<!--      <div class="demo-upload-list-cover">-->
<!--        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>-->
<!--        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>-->
<!--      </div>-->
<!--    </template>-->
<!--    <template v-else>-->
<!--      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>-->
<!--    </template>-->
<!--  </div>-->
<!--  <Upload-->
<!--      ref="upload"-->
<!--      :show-upload-list="false"-->
<!--      :default-file-list="defaultList"-->
<!--      :on-success="handleSuccess"-->
<!--      :format="['jpg','jpeg','png']"-->
<!--      :max-size="2048"-->
<!--      :on-format-error="handleFormatError"-->
<!--      :on-exceeded-size="handleMaxSize"-->
<!--      :before-upload="handleBeforeUpload"-->
<!--      multiple-->
<!--      type="drag"-->
<!--      action="http://192.168.0.112:8090/gameregistration/fileupload"-->
<!--      style="display: inline-block;width:58px;">-->
<!--    <div style="width: 58px;height:58px;line-height: 58px;">-->
<!--      <Icon type="camera" size="20"></Icon>-->
<!--    </div>-->
<!--  </Upload>-->
<!--  <Modal title="View image" v-model="visible">-->
<!--    ![]('https://o5wwk8baw.qnssl.com/' + imgName + '/large')-->
<!--  </Modal>-->
<!--</div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
<!--  data () {-->
<!--    return {-->
<!--      defaultList: [-->
<!--        {-->
<!--          'name': 'a42bdcc1178e62b4694c830f028db5c0',-->
<!--          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'-->
<!--        },-->
<!--        {-->
<!--          'name': 'bc7521e033abdd1e92222d733590f104',-->
<!--          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'-->
<!--        }-->
<!--      ],-->
<!--      imgName: '',-->
<!--      visible: false,-->
<!--      uploadList: []-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    handleView (name) {-->
<!--      this.imgName = name;-->
<!--      this.visible = true;-->
<!--    },-->
<!--    handleRemove (file) {-->
<!--      // delete data from the upload instance-->
<!--      const fileList = this.$refs.upload.fileList;-->
<!--      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);-->
<!--    },-->
<!--    handleSuccess (res, file) {-->
<!--      // Since the upload process is an instance, here's the mock add url-->
<!--      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';-->
<!--      file.name = '7eb99afb9d5f317c912f08b5212fd69a';-->
<!--    },-->
<!--    handleFormatError (file) {-->
<!--      this.$Notice.warning({-->
<!--        Title: 'The file format is incorrect',-->
<!--        Desc: 'file' + file.name + ' The format is incorrect. Please upload a picture in jpg or png format. '-->
<!--      });-->
<!--    },-->
<!--    handleMaxSize (file) {-->
<!--      this.$Notice.warning({-->
<!--        Title: 'Exceeded file size limit',-->
<!--        Desc: 'file' + file.name + ' is too large to exceed 2M. '-->
<!--      });-->
<!--    },-->
<!--    handleBeforeUpload () {-->
<!--      const check = this.uploadList.length < 5;-->
<!--      if (!check) {-->
<!--        this.$Notice.warning({-->
<!--          Title: 'Up to 5 images can be uploaded at most. '-->
<!--        });-->
<!--      }-->
<!--      return check;-->
<!--    }-->
<!--  },-->
<!--  mounted () {-->
<!--    this.uploadList = this.$refs.upload.fileList;-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--.demo-upload-list{-->
<!--  display: inline-block;-->
<!--  width: 60px;-->
<!--  height: 60px;-->
<!--  text-align: center;-->
<!--  line-height: 60px;-->
<!--  border: 1px solid transparent;-->
<!--  border-radius: 4px;-->
<!--  overflow: hidden;-->
<!--  background: #fff;-->
<!--  position: relative;-->
<!--  box-shadow: 0 1px 1px rgba(0,0,0,.2);-->
<!--  margin-right: 4px;-->
<!--}-->
<!--.demo-upload-list img{-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->
<!--.demo-upload-list-cover{-->
<!--  display: none;-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  bottom: 0;-->
<!--  left: 0;-->
<!--  right: 0;-->
<!--  background: rgba(0,0,0,.6);-->
<!--}-->
<!--.demo-upload-list:hover .demo-upload-list-cover{-->
<!--  display: block;-->
<!--}-->
<!--.demo-upload-list-cover i{-->
<!--  color: #fff;-->
<!--  font-size: 20px;-->
<!--  cursor: pointer;-->
<!--  margin: 0 2px;-->
<!--}-->
<!--</style>-->