import Web3 from "web3";
import NodeRegistrationArtifact from "../../build/contracts/NodeRegistration.json";

const NodeRegistration = {
	web3: null,
	account: null,
	meta: null,

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
			
		} catch (error) {
			console.error("Could not connect to contract or chain.");
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
		await transferFrom(addr).call();

		this.setStatus("Complete!");
	},

	setAccount: async function(idx) {
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

window.addEventListner("load", function() {
	NodeRegistration.web3 = new Web3(
		new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
	);

	NodeRegistration.start();
})
