<template>
  <div class="page-container">
    <h1 style="font-size: 40px">Buy Gcoin</h1>
    <Tabs type="card" class="payment-method-container">
      <TabPane label="USD">
        <Card style="width:100%">
            <Form :model="formUSDBuyGcoin" label-position="left" :label-width="70" class="Gcoin-buying-form">
              <FormItem label="Amount">
                <Input v-model="formUSDBuyGcoin.amount" placeholder="amount"></Input>
              </FormItem>
              <FormItem label="Address">
                <Input v-model="formUSDBuyGcoin.address" placeholder="amount"></Input>
              </FormItem>
              <FormItem label="Payment">
                <Select v-model="formUSDBuyGcoin.paymentMethod" placeholder="Select Your Payment Method">
                  <Option value="0">EPS</Option>
                  <Option value="1">UnionPay</Option>
                </Select>
              </FormItem>
            </Form>
            <span class="charging-amount-container">
              <p class="charging-amount">USD Charging:</p>
              <p class="charging-amount">$ {{formUSDBuyGcoin.amount}}</p>
            </span>
        </Card>
        <Button type="success" class="confirm-btn">Confirm</Button>
      </TabPane>
      <TabPane label="Stable Coin">
        <Card style="width:100%">
          <Form :model="formStableCoinBuyGcoin" label-position="left" :label-width="70" class="Gcoin-buying-form">
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
      formUSDBuyGcoin : {
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
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.payment-method-container {
  width: 50%;
  display: flex;
  flex-direction: column;
}

.Gcoin-buying-form {
  width: 50%;
  height: 200px;
  position: relative;
  left: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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