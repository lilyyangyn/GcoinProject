<template>
  <div>
  <div id="app">
    <Layout :style="{height: '90%'}">
      <Header id="nav" :style="{width: '100%'}">
        <Menu mode="horizontal">
          <div class="layout-logo"></div>
          <div class=layout-nav>
            

            <MenuItem name="Home" to="/">
                  <Icon type="md-home" />
                  Logout
              </MenuItem>

          </div>
        </Menu>
        <br/>
      </Header>
      <Layout>
        <Sider :style="{background: '#fff'}" id="sider">
          <Menu theme="light" width="auto">
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
                  <Icon type="ios-keypad" />
                  Explorer
              </MenuItem>
              
              <Submenu name="3">
                  <template slot="title">
                      <Icon type="ios-analytics"></Icon>
                      Statistic
                  </template>
                  <MenuItem name="3-1">Option 1</MenuItem>
                  <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="Game">
                  <template slot="title">
                      <Icon type="" />
                      Game
                  </template>
                  <MenuItem name="2-1">Option 1</MenuItem>
                  <MenuItem name="2-2">Option 2</MenuItem>
              </Submenu>
              <MenuItem name="Wallet" to="/">
                  <Icon type="" />
                  Wallet
              </MenuItem>
          </Menu>

        </Sider>

        <Content id="main">
          <router-view/>
        </Content>
      </Layout>
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

  min-height 700px


.layout-nav{
    width: 120px;
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
