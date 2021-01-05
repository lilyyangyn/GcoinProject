import NodeRegistrationArtifact from "../../../build/contracts/NodeRegistration.json";
import { vm } from "../main.js";

const NodeRegister = {
	web3: vm.web3,
	account: null,
	meta: null,
	version: "1.0.0",

	start: async function() {
		const { web3 } = this;

		try {
			// get contract instance
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = NodeRegistrationArtifact.networks[networkId];
			this.meta = new web3.eth.Contract(
				NodeRegistrationArtifact.abi, 
				deployedNetwork.address,
			);

			// get account
			this.setAccount(0);
			
			console.log("Connected to contract 'NodeRegistration' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'NodeRegistration'.");
		}
	},

	verifyOtp: async function() {
		const otp = document.getElementById("verifyOtp-otp").value;

		this.setStatus("Processing... (please wait)");

		const { verifyOtp } = this.meta.methods;
		await verifyOtp(otp).call();

		this.setStatus("Complete!");
	},

	settingOtpHashValue: async function() {
		const applicant = document.getElementById("setOtp-applicant").value;
		const hashedOpt = document.getElementById("setOtp-hashedOpt").value;

		this.setStatus("Processing... (please wait)");

		const { settingOtpHashValue } = this.meta.methods;
		await settingOtpHashValue(applicant, hashedOpt).call();
		
		this.setStatus("Complete!");
	},

	addingPeer: async function() {
		const applicant = document.getElementById("addPeer-applicant").value;

		this.setStatus("Processing... (please wait)");

		const { addingPeer } = this.meta.methods;
		await addingPeer(applicant).call();

		this.setStatus("Complete!");
	},

	setHashedAdminPW: async function() {
		const hashedPw = document.getElementById("setHashedAdminPW-hashedPw").value;

		this.setStatus("Processing... (please wait)");

		const { setHashedAdminPW } = this.meta.methods;
		await setHashedAdminPW(hashedPw).call();
		
		this.setStatus("Complete!");
	},

	deleteMappingElement: async function() {
		const addr = document.getElementById("deleteEle-addr").value;

		this.setStatus("Processing... (please wait)");

		const { deleteMappingElement } = this.meta.methods;
		await deleteMappingElement(addr).call();
		
		this.setStatus("Complete!");
	},

	addressNetworkState: async function() {
		const addr = document.getElementById("addrState-addr").value;

		this.setStatus("Processing... (please wait)");

		const { addressNetworkState } = this.meta.methods;
		await addressNetworkState(addr).call();

		this.setStatus("Complete!");
	},

	addressOtphashedValue: async function() {
		const addr = document.getElementById("addrOpt-addr").value;

		this.setStatus("Processing... (please wait)");

		const { addressOtphashedValue } = this.meta.methods;
		await addressOtphashedValue(addr).call();

		this.setStatus("Complete!");
	},

	setAccount: async function(idx) {
		const { web3 } = this;
		
		const accounts = await web3.eth.getAccounts();
		if (idx <= accounts.length && idx >= 0) {
			this.account = accounts[idx];
		} else {
			this.account = accounts[0];
		}
	},

	setStatus: function(message) {
		// update page
		const status = document.getElementById("status");
		status.innerHTML = message;
	},

}

export { NodeRegister }



