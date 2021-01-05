<template>
	<Layout>

		
			
			<Content id="content">

	<div class="nodeRegistration">
		<h1>This is the Node Registration page</h1>
		<p>Version: {{ register.version }}</p>

		<div class="verifyOtp">
			<input type="text" placeholder="verifyOtp" id="verifyOtp-otp">

			<button class="button" @click="register.verifyOtp()">submit</button>
			
		</div>
		<br>

		<div class="settingOtpHashValue">
			<input type="text" placeholder="setOtp applicant" id="setOtp-applicant">
			<input type="text" placeholder="setOtp hashedOpt" id="setOtp-hashedOpt">

			<button class="button" @click="register.settingOtpHashValue()">submit</button>
			
		</div>
		<br>

		<div class="addingPeer">
			<input type="text" placeholder="addPeer applicant" id="addPeer-applicant">

			<button class="button" @click="register.addingPeer()">submit</button>
			
		</div>
		<br>

		<div class="setHashedAdminPW">
			<input type="text" placeholder="setHashedAdminPW" id="setHashedAdminPW-hashedPw">

			<button class="button" @click="register.setHashedAdminPW()">submit</button>
			
		</div>
		<br>

		<div class="deleteMappingElement">
			<input type="text" placeholder="deleteEle addr" id="deleteEle-addr">

			<button class="button" @click="register.deleteMappingElement()">submit</button>
			
		</div>
		<br>

		<div class="addressNetworkState">
			<input type="text" placeholder="addrState" id="addrState-addr">

			<button class="button" @click="register.addressNetworkState()">submit</button>
			
		</div>
		<br>

		<div class="addressOtphashedValue">
			<input type="text" placeholder="addrOpt addr" id="addrOpt-addr">

			<button class="button" @click="register.addressOtphashedValue()">submit</button>
			
		</div>
		<br>

		<div class="status">
			<p id="status">status</p>
		</div>


	</div>
			</Content>
	</Layout>
</template>

<style lang="stylus">
#content
	min-height 100%
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
