<template>
  <div id="app">
    <router-view/>
      
  </div>
</template>


<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale

#nav
  background-color white



#main
  //min-height 700px
  height 720px
  margin-left 50px
  margin-top 20px
  color #2c3e50


.layout-nav{
    //width: 110px;
    //position :relative
    //float :right;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 70%;
    margin: 0 auto;
    margin-right: 0px;
}

.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
#foot
  text-align center

.table {
  border-top: @table-border;
}
.table-header {
  .table-row {
    background-color: #f9f9f9;
    &:hover {
      background-color: #f9f9f9;
    }
  }
}
.table-row {
  display: flex;
  border-bottom: @table-border;
  padding: 12px;
  &:hover {
    background-color: #f2f2f2;
  }
}
.table-column {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  width: 60%;
  height: auto;
  padding-top: 3%;
  position: relative;
  left: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.page-title {
  font-size: 40px;
  margin-bottom: 2%
}
</style>
<script>

       
</script>
