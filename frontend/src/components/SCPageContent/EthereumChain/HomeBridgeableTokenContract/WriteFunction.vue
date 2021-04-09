<template>
  <Collapse accordion simple>
    <Panel name="approveFunction">
      Approve
      <div slot="content">
<!--        <label>to</label>-->
<!--        <input type="text"></input>-->
        <label>value</label>
        <input type="text" v-model="approve"></input>
        <Button type="success" @click="approveFunction()">write</Button>
      </div>
    </Panel>
    <Panel name="setBridgeContractFunction">
      Set_Bridge_Contract
      <div slot="content">
        <label>bridgeContsract</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="transferFromFunction">
      Transfer_From
      <div slot="content">
        <label>sender</label>
        <input type="text"></input>
        <label>recipient</label>
        <input type="text"></input>
        <label>amount</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="increaseAllowanceFunction">
      Increase_Allowance
      <div slot="content">
        <label>to</label>
        <input type="text"></input>
        <label>addedValue</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="transferAndCallFunction">
      Transfer_And_Call
      <div slot="content">
<!--        <label>to</label>-->
<!--        <input type="text"></input>-->
        <label>value</label>
        <input type="text" v-model="transferAndCall"></input>
<!--        <label>data</label>-->
<!--        <input type="text"></input>-->
        <Button type="success" @click="transferAndCallFunction()">write</Button>
      </div>
    </Panel>
    <Panel name="mintFunction">
      Mint
      <div slot="content">
        <label>to</label>
        <input type="text"></input>
        <label>amount</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="burnFunction">
      Burn
      <div slot="content">
        <label>value</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="decreaseApprovalFunction">
      Decrease_Approval
      <div slot="content">
        <label>spender</label>
        <input type="text"></input>
        <label>subtractedValue</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="claimTokensFunction">
      Claim_Tokens
      <div slot="content">
        <label>token</label>
        <input type="text"></input>
        <label>to</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="renounceOwnershipFunction">
      Renounce_Ownership
      <div slot="content">
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="finishMintingFunction">
      Finish_Minting
      <div slot="content">
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="permitFunction">
      Permit
      <div slot="content">
        <label>holder</label>
        <input type="text"></input>
        <label>spender</label>
        <input type="text"></input>
        <label>nonce</label>
        <input type="text"></input>
        <label>expiry</label>
        <input type="text"></input>
        <label>allowed</label>
        <input type="text"></input>
        <label>v</label>
        <input type="text"></input>
        <label>r</label>
        <input type="text"></input>
        <label>s</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="decreaseAllowanceFunction">
      Decrease_Allowance
      <div slot="content">
        <label>spender</label>
        <input type="text"></input>
        <label>subtractedValue</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="transferFunction">
      Transfer
      <div slot="content">
        <label>to</label>
        <input type="text"></input>
        <label>value</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="pushFunction">
      Push
      <div slot="content">
        <label>to</label>
        <input type="text"></input>
        <label>amount</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="moveFunction">
      Move
      <div slot="content">
        <label>from</label>
        <input type="text"></input>
        <label>to</label>
        <input type="text"></input>
        <label>amount</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="increaseApprovalFunction">
      Increase_Approval
      <div slot="content">
        <label>spender</label>
        <input type="text"></input>
        <label>addedValue</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="pullFunction">
      Pull
      <div slot="content">
        <label>from</label>
        <input type="text"></input>
        <label>amount</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
    <Panel name="transferOwnershipFunction">
      Transfer_Ownership
      <div slot="content">
        <label>newOwner</label>
        <input type="text"></input>
        <Button type="success" disabled>write</Button>
      </div>
    </Panel>
  </Collapse>
</template>

<script>
import { BridgeableToken_Home } from '@/scripts/homechain/BridgeableToken.js';

export default {
  name: "WriteFunction",
  data(){
    return{
      approve: 0,
      transferAndCall: 0,
    }
  },
  methods: {
    successCallBack(){
      console.log("success");
    },
    errorCallBack(error){
      console.log(error);
    },
    approveFunction(){
      BridgeableToken_Home.approve(this.approve, this.successCallBack,this.errorCallBack);
    },
    transferAndCallFunction(){
      BridgeableToken_Home.transferToChildChain(this.transferAndCall, null, this.successCallBack, this.errorCallBack);
    }
  }
}
</script>

<style scoped>
label {
  margin-right: 2%;
  font-weight: initial;
}

input {
  margin-right: 4%;
}
</style>