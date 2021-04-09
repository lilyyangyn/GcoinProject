import NodeRegistrationArtifact from "../../../../childchain/build/contracts/NodeRegistration.json";
import { vm } from "../../main.js";

const NodeRegister = {
	web3: null,
	meta: null,
	version: "1.0.0",

	start: async function(web3, callback) {
		this.web3 = web3

		try {
			// get contract instance
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = NodeRegistrationArtifact.networks[networkId];
			this.meta = new web3.eth.Contract(
				NodeRegistrationArtifact.abi, 
				deployedNetwork.address,
			);
			
			console.log("Connected to contract 'NodeRegistration' successfully.");
		} catch (error) {
			console.error("Could not connect to contract 'NodeRegistration'.");
		}
	},

	verifyOtp: async function(from, otp, callback) {
		const { verifyOtp } = this.meta.methods;
		verifyOtp(otp).send({from: from}, callback);
	},

	settingOtpHashValue: async function(applicant, hashedOpt, callback) {
		const { settingOtpHashValue } = this.meta.methods;
		settingOtpHashValue(applicant, hashedOpt).send({from: from}, callback);
	},

	addingPeer: async function(applicant, callback) {
		const { addingPeer } = this.meta.methods;
		addingPeer(applicant).send({from: from}, callback);
	},

	setHashedAdminPW: async function(hashedPw, callback) {
		const { setHashedAdminPW } = this.meta.methods;
		setHashedAdminPW(hashedPw).send({from: from}, callback);
	},

	deleteMappingElement: async function(addr, callback) {
		const { deleteMappingElement } = this.meta.methods;
		deleteMappingElement(addr).send({from: from}, callback);
		
		this.setStatus("Complete!");
	},

	addressNetworkState: async function(addr, callback) {
		const { addressNetworkState } = this.meta.methods;
		addressNetworkState(addr).call(callback);
	},

	addressOtphashedValue: async function(addr, callback) {
		const { addressOtphashedValue } = this.meta.methods;
		addressOtphashedValue(addr).send({from: from}, callback);
	},
}

export { NodeRegister }



