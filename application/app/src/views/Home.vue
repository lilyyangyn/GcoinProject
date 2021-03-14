<template>
  <div class="home">
    <Layout :style="{height: '90%'}">
      <Header id="nav">
        <Menu mode="horizontal">
          <div class="layout-logo"></div>

          <MenuItem name="Logout" style="float: right" to="/" @click.native="toLogout()">
            <Icon type="md-home"/>
            Logout
          </MenuItem>

          <div class="coin-balance">
            <!--              <Icon type="logo-bitcoin" />-->
            <!--              <hr size="8" width="90%">-->
            <Steps :current="4" size="small">
              <Step content="1,000,000" icon="logo-bitcoin" title="Gcoin"></Step>
              <Step icon="logo-bitcoin" title="Exchcoin[F]"
                    v-bind:content="coinBalance.childChainExchgCoinBalance"></Step>
              <Step icon="logo-bitcoin" title="Exchcoin[H]"
                    v-bind:content="coinBalance.homeChainExchgCoinBalance"></Step>
              <Step icon="logo-bitcoin" title="USDT" v-bind:content="coinBalance.USDTBalance"></Step>
            </Steps>

          </div>
        </Menu>
        <br/>
      </Header>
      <Layout>
        <Sider id="sider" :style="{background: '#fff'}">
          <Menu style="height: 100%" theme="light" width="auto">
            <!--            <MenuItem name="Home" to="/">-->
            <!--              <Icon type="md-home"/>-->
            <!--              Home-->
            <!--            </MenuItem>-->

            <MenuItem name="Game" to="/game">
              <Icon type="ios-game-controller-b"/>
              Game
            </MenuItem>

            <!--            test -->
            <MenuItem name="Test" to="/test">
              <Icon type="ios-game-controller-b"/>
              Test
            </MenuItem>
            <!--            test-->

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
                <Icon type="md-cloud-upload"/>
                Game Launch
              </MenuItem>

            </Submenu>

            <Submenu name="Blockchain_Service">
              <template slot="title">
                <Icon type="md-git-merge"/>
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
                <MenuItem name="GameChain_Smart_Contract" to="/smartcontract/gamechain">
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

              <MenuItem name="Faucet" to="/faucet">
                <Icon type="md-log-in"/>
                Faucet
              </MenuItem>

              <MenuItem name="Deposit" to="/deposit">
                <Icon type="md-log-out"/>
                Deposit
              </MenuItem>

              <MenuItem name="Explorer" to="/explorer">
                <Icon type="ios-keypad"/>
                Explorer
              </MenuItem>

              <MenuItem name="Statistic" to="/blockchain/statistic">
                <Icon type="ios-analytics"></Icon>
                Statistic
              </MenuItem>
            </Submenu>
            <MenuItem name="wallet" to="/wallet/manager">
              <Icon type="logo-buffer"/>
              Wallet Manager
            </MenuItem>
          </Menu>

        </Sider>

        <Content id="main">
          <router-view/>
        </Content>
      </Layout>
      <!--      <Footer id="foot">-->
      <!--        foot-->
      <!--      </Footer>-->
    </Layout>
  </div>
</template>

<script>
import {logout} from "../scripts/api/loginAPI";
import {web3Util} from "@/scripts/web3Util/web3Util";
import {vm} from "@/main";

export default {
  name: "home",
  data() {
    return {
      numeral: require('numeral'),
      coinBalance: {
        USDTBalance: '',
        homeChainExchgCoinBalance: '',
        childChainExchgCoinBalance: ''
      }
    }
  },
  methods: {
    toLogout() {
      logout();
      this.$router.push({path: '/login'});
      this.$Message.success('Logout success!');
    },
    USDTBalanceUpdate() {
      web3Util.getUserUSDTBalance().then((resolved) => {
        let balance = this.numeral(parseInt(resolved)).format('0,0');
        this.coinBalance.USDTBalance = balance;
        console.log("ran USDT update");
      });
    },
    parentChainExchgCoinUpdate() {
      web3Util.getUserParentChainExchangeCoinBalance().then((resolved) => {
        let balance = this.numeral(parseInt(resolved)).format('0,0');
        this.coinBalance.homeChainExchgCoinBalance = balance;
      });
    },
    childChainExchgCoinUpdate() {
      web3Util.getUserChildChainExchgCoinBalance().then((resolved) => {
        let balance = this.numeral(parseInt(resolved)).format('0,0');
        this.coinBalance.childChainExchgCoinBalance = balance;
      });
    },
  },
  mounted() {
    // let numeral = require('numeral');
    if (localStorage.getItem('address') != null && localStorage.getItem('address') != "") {
      this.USDTBalanceUpdate();
      this.parentChainExchgCoinUpdate();
      this.childChainExchgCoinUpdate();
    }

    vm.$on('USDTBalanceUpdate', () => {
      // console.log('USDTBalanceUpdate Event');
      this.USDTBalanceUpdate();
    });
    vm.$on('parentChainExchgCoinBalanceUpdate', () => {
      this.parentChainExchgCoinUpdate();
    });
    vm.$on('childChainExchgCoinBalanceUpdate', () => {
      this.childChainExchgCoinUpdate();
    });
    vm.$on('allBalanceUpdate', () => {
      this.coinBalance.USDTBalance = "";
      this.coinBalance.childChainExchgCoinBalance = "";
      this.coinBalance.homeChainExchgCoinBalance = "";
      this.USDTBalanceUpdate();
      this.parentChainExchgCoinUpdate();
      this.childChainExchgCoinUpdate();
    });
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
  width: 550px;
  border: #5b6270;
  border-radius: 3px;
}

</style>
