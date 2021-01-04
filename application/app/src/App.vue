<template>
  <div>
  <div id="app">
    <Layout :style="{height: '90%'}">
      <Header id="nav" :style="{position: 'fixed', width: '100%'}">
        <Menu mode="horizontal">
          <div class="layout-logo"></div>
          <div class=layout-nav>
            <MenuItem name="Home" to="/">
                <Icon type="md-home" />
                Home
            </MenuItem>

            <MenuItem name="NodeRegister" to="/nodeRegister">
                <Icon type="md-add" />
                NodeRegister
            </MenuItem>
            
            <MenuItem name="Transfer" to="/transfer">
                <Icon type="md-card" />
                Transfer
            </MenuItem>

            <MenuItem name="Explorer" to="/explorer">
                <Icon type="md-add" />
                Explorer
            </MenuItem>

          </div>
        </Menu>
        <br/>
      </Header>

        <Content id="main">
          <router-view/>
        </Content>
      <Footer id="foot">
        foot
      </Footer>
    </Layout>
      
  </div>
  </div>
</template>


<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
#nav
  background-color white

#main
  padding-top 74px


.layout-nav{
    width: 520px;
    margin: 0 auto;
    margin-right: 20px;
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

</style>
<script>
  window.onload=function(){document.getElementById("content").style.height = document.documentElement.clientHeight-document.getElementById("foot").offsetHeight+ "px"; }
</script>
