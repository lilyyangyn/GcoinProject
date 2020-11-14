var Gcoin=artifacts.require("Gcoin");

module.exports = function(deployer) {
      deployer.deploy(Gcoin, 10000);
}