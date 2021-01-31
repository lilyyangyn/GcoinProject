<template>
  <div class="home">
    <Layout :style="{height: '90%'}">
      <Header id="nav" >
        <Menu mode="horizontal">
          <div class="layout-logo"></div>
<!--          <div class=layout-nav>-->

          <MenuItem name="Logout" @click.native="toLogout()" to="/" style="float: right">
            <Icon type="md-home"/>
            Logout
          </MenuItem>

          <div class="coin-balance">
<!--              <Icon type="logo-bitcoin" />-->
<!--              <hr size="8" width="90%">-->
            <Steps :current="4" size="small">
              <Step title="Gcoin" icon="logo-bitcoin" content="1,000,000"></Step>
              <Step title="Exchcoin" icon="logo-bitcoin" content="1,000,000"></Step>
              <Step title="Exchcoin" icon="logo-bitcoin" content="1,000,000"></Step>
              <Step title="Stablecoin" icon="logo-bitcoin" content="1,000,000"></Step>
            </Steps>


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
              

            
            <Submenu name="Game_Service">
                <template slot="title">
                  <Icon type="ios-cart" />
                  Game Service
                </template>
                <MenuItem name="Game" to="/game">
                  <Icon type="ios-game-controller-b" />
                  Game
                </MenuItem>
                <MenuItem name="Shop" to="/shop">
                  <Icon type="ios-cart" />
                  Shop
                </MenuItem>


                <MenuItem name="Game_Launch" to="/gamelaunch">
                  <Icon type="ios-apps" />
                  Game Launch
                </MenuItem>
            </Submenu>

            <Submenu name="Smart_Contract_Service">
                <template slot="title">
                    <Icon type="ios-cart" />
                    Smart Contract Service
                </template>
                <MenuItem name="Smart_Contract" to="/smartcontract">
                    <Icon type="ios-document" />
                    Smart Contract
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

                <MenuItem name="Statistic">
                    <Icon type="ios-analytics"></Icon>
                    Statistic
                </MenuItem>
            </Submenu>

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
</template>

<script>
import {logout} from "../scripts/api/loginAPI";

export default {
  methods: {
    toLogout(){
      logout();
      this.$Message.success('Logout success!')
    }
  }
}
</script>

<style>
  .coin-balance {
    float: right;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    margin-right: 2%;
    width: 450px;
    border: #5b6270;
    border-radius: 3px;
  }

</style>
