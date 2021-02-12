<template>
  <div class="page-container">
    <h1>Buy Gcoin</h1>
    <Tabs type="card" class="SC-container">
      <TabPane label="USD">
        <Card style="width:100%">
            <Form :model="formGameLaunch" label-position="left" :label-width="70" class="form-container">
              <FormItem label="Amount">
                <Input v-model="formGameLaunch.amount" placeholder="amount"></Input>
              </FormItem>
              <FormItem label="Address">
                <Input v-model="formGameLaunch.address" placeholder="amount"></Input>
              </FormItem>
              <FormItem label="Payment">
                <Select v-model="formGameLaunch.paymentMethod" placeholder="Select Your Payment Method">
                  <Option value="0">EPS</Option>
                  <Option value="1">UnionPay</Option>
                </Select>
              </FormItem>
            </Form>
            <span class="charging-amount-container">
              <p class="charging-amount">USD Charging:</p>
              <p class="charging-amount">$ {{formGameLaunch.amount}}</p>
            </span>
        </Card>
        <Button type="success" class="confirm-btn">Confirm</Button>
      </TabPane>
      <TabPane label="Stable Coin">
        <Card style="width:100%">
          <Form :model="formStableCoinBuyGcoin" label-position="left" :label-width="70" class="form-container">
            <FormItem label="Amount">
              <Input v-model="formStableCoinBuyGcoin.amount" placeholder="amount"></Input>
            </FormItem>
            <FormItem label="Address">
              <Input v-model="formStableCoinBuyGcoin.address" placeholder="address"></Input>
            </FormItem>
          </Form>
          <span class="charging-amount-container">
              <p class="charging-amount">Stable Coin Charging:</p>
              <p class="charging-amount">$ {{formStableCoinBuyGcoin.amount}}</p>
            </span>
        </Card>
        <Button type="success" class="confirm-btn">Confirm</Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>

export default {
  data () {
    return {
      formGameLaunch : {
        amount:'',
        address:'',
        paymentMethod:''
      },
      formStableCoinBuyGcoin :{
        amount:'',
        address:''
      }

    }
  },
  methods: {

  }
}
</script>

<style>
/*.page-container {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  align-items: center;*/
/*}*/

.SC-container {
  width: 60%;
  display: flex;
  flex-direction: column;
}

.charging-amount-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.charging-amount {
  font-weight: bold;
  font-size: 15px;
  /*margin: 2%;*/
  width: 25%;
}

.confirm-btn {
  /*margin: 2%;*/
  /*position: relative;*/
  /*left: 25%;*/
  float: right;
  width: 25%;
  height: 40px;
  margin-top: 2%;
  margin-right: 2%;
}


</style>