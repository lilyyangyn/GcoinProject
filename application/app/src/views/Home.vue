<template>
  <div class="home">
    <Layout :style="{height: '90%'}">
      <Header id="nav" >
        <Menu mode="horizontal">
          <div class="layout-logo"></div>
          <div class=layout-nav>

<!--            <MenuItem name="Home">-->
<!--                <Icon type="md-home" @click="logout"/>-->
<!--                Logout-->
<!--            </MenuItem>-->
            <dev @click="logout">
              <Icon type="md-home" />
              Logout
            </dev>
            <MenuItem name="Home" to="/">
                <Icon type="md-home" />
                Login
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
              <Submenu name="Wallet" to="/">
                  <template slot="title">
                      <Icon type="" />
                      Wallet
                  </template>
                  <MenuItem name="Deposit" to="/deposit">Deposit</MenuItem>
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
import {Logout} from "../scripts/api/loginAPI";

export default {
    methods: {
      logout(){
        Logout();
      }
    }
  }
</script>


