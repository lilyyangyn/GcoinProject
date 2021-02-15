<template>


	<Card class="contract-info-container">
		<Collapse style="width: 100%">

		<Panel name="contractInfo">Contract Info</Panel>
		<Panel name="contractSourceCode">Contract Source Code</Panel>

		<Panel name="verifyOtp">Verify Otp
			<div slot="content">
				<label>verifyOtp</label>
			<input type="text" placeholder="" id="verifyOtp-otp">

			<button class="button" @click="register.verifyOtp()">submit</button>
			
		</div>
		</Panel>

		<Panel name="settingOtpHashValue">Setting Otp Hash Value
			<div slot="content">
				<label>setOtp applicant</label>
			<input type="text" placeholder="" id="setOtp-applicant">
				<label>setOtp hashedOpt</label>
			<input type="text" placeholder="" id="setOtp-hashedOpt">

			<button class="button" @click="register.settingOtpHashValue()">submit</button>
			
		</div>
		</Panel>

		<Panel name="addingPeer">Adding Peer
			<div slot="content">
				<label>addPeer applicant</label>
			<input type="text" placeholder="" id="addPeer-applicant">

			<button class="button" @click="register.addingPeer()">submit</button>
			
		</div>
		</Panel>

		<Panel name="setHashedAdminPW">Set Hashed Admin PW
			<div slot="content">
				<label>set Hashed Admin PW</label>
			<input type="text" placeholder="" id="setHashedAdminPW-hashedPw">

			<button class="button" @click="register.setHashedAdminPW()">submit</button>
			
		</div>
		</Panel>

		<Panel name="deleteMappingElement">Delete Mapping Element
			<div slot="content">
				<label>deleteEle addr</label>
			<input type="text" placeholder="" id="deleteEle-addr">

			<button class="button" @click="register.deleteMappingElement()">submit</button>
			
		</div>
		</Panel>

		<Panel name="addressNetworkState">Address Network State
			<div slot="content">
				<label>daddrState</label>
			<input type="text" placeholder="" id="addrState-addr">

			<button class="button" @click="register.addressNetworkState()">submit</button>
			
		</div>
		</Panel>

		<Panel name="addressOtphashedValue">Address Otp hashed Value
			<div slot="content">
				<label>addrOpt addr</label>
			<input type="text" placeholder="" id="addrOpt-addr">

			<button class="button" @click="register.addressOtphashedValue()">submit</button>
			
		</div>
		</Panel>

		<div class="status">
			<p id="status">status</p>
		</div>


		</Collapse>
			</Card>

</template>

<style lang="stylus" scoped>

.contract-info-container {
  width:100%;
  max-height: 550px;
  /*height: 550px;*/
  overflow: scroll;
}
  label {
    margin-right: 2%;
  }

  input {
    margin-right: 4%;
  }
.balance{
	margin-left: 4%;
}
.status{
	margin-left: 4%;
}
</style>

<script>
	import { NodeRegister } from '../scripts/NodeRegister.js';

	export default {
		name: 'Register',
		created(){
			this.register = NodeRegister
		},
		mounted(){
			NodeRegister.start();
		}
	}
</script>
