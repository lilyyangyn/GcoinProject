<template>
  <div class="home">
    <Layout :style="{height: '90%'}">
      <Header id="nav">
        <Menu mode="horizontal">
          <div class="layout-logo"></div>

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
            <!--            <MenuItem name="Home" to="/">-->
            <!--              <Icon type="md-home"/>-->
            <!--              Home-->
            <!--            </MenuItem>-->

            <MenuItem name="Game" to="/game">
              <Icon type="ios-game-controller-b"/>
              Game
            </MenuItem>

            <Submenu name="Service">
              <template slot="title">
                <Icon type="ios-apps"/>
                Platform Service
              </template>

              <MenuItem name="Shop" to="/shop">
                <Icon type="ios-cart"/>
                Shop
              </MenuItem>

              <MenuItem name="Game_Launch" to="/gamelaunch">
                <Icon type="md-cloud-upload" />
                Game Launch
              </MenuItem>

            </Submenu>

            <Submenu name="Blockchain_Service">
              <template slot="title">
                <Icon type="md-git-merge" />
                Blockchain
              </template>

              <Submenu name="Smart Contract">
                <template slot="title">
                  <Icon type="ios-document"/>
                  Contract
                </template>
                <MenuItem name="Ethereum_Smart_Contract" to="/smartcontract/ethereum">
                  Ethereum Chain
                </MenuItem>
                <MenuItem name="GameChain_Smart_Contract" to="/">
                  Game Chain
                </MenuItem>
              </Submenu>



              <!-- <MenuItem name="NodeRegister" to="/nodeRegister">
                  <Icon type="md-add" />
                  NodeRegister
              </MenuItem>

              <MenuItem name="Transfer" to="/transfer">
                  <Icon type="md-card" />
                  Transfer
              </MenuItem> -->

              <MenuItem name="Explorer" to="/explorer">
                <Icon type="ios-keypad"/>
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
    toLogout() {
      logout();
      this.$router.push({path: '/login'});
      this.$Message.success('Logout success!');
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
