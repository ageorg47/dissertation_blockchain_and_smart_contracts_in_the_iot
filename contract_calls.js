//Import the necessary libraries to set up the express server and initialize the web3 object
const Web3 = require("web3");
const access_control = require("./build/contracts/access_control.json");

//Import the contract ABI and address
const web3 = new Web3("http://localhost:9545");
const abi = access_control.abi;
const contractAddress = access_control.networks["5777"].address;
const contract = new web3.eth.Contract(abi, contractAddress);

//Set Web3 to handle revert errors
web3.eth.handleRevert = true;

//Function to get device
async function getDevice(deviceAddress) {
  try {
    let device;
    device = await contract.methods.isDeviceRegistered(deviceAddress).call();
    return device;
  } catch (error) {
    throw error;
  }
}

//Function to register a manager
async function registerManager(managerAddress, managerName, currentManager) {
try {
    const result = await contract.methods
      .registerManager(managerAddress, managerName)
      .send({ from: currentManager, gas: 3000000 });
    return result;
} catch (error) {
  throw error;
}
}

//Function to register a device
async function registerDevice(
  deviceAddress,
  deviceName,
  deviceID,
  currentManager
) {
  try {
    const result = await contract.methods
      .registerDevice(deviceName, deviceID, deviceAddress)
      .send({ from: currentManager, gas: 3000000 });
    return result;
  } catch (error) {
    throw error;
  }
}

//Function to add a manager to a device
async function addManager(deviceId, managerAddress, currentManager) {
 try {
   const result = await contract.methods
     .addManagerToDevice(deviceId, managerAddress)
     .send({ from: currentManager, gas: 3000000 });
   return result;
 } catch (error) {
   throw error;
 }
}

//Function to remove a manager from a device
async function removeManager(deviceId, managerAddress, currentManager) {
try {
    const result = await contract.methods
      .removeManagerFromDevice(deviceId, managerAddress)
      .send({ from: currentManager, gas: 3000000 });
    return result;
} catch (error) {
  throw error;
}
}

//Function to add a rule
async function addRule(
  managerAddress,
  constrainedDeviceAddress,
  newDeviceAddress,
  resourceAccess,
  accessRights,
  expirationBlocks,
  currentManager
) {
  try {
    const result = await contract.methods
      .addRule(
        managerAddress,
        constrainedDeviceAddress,
        newDeviceAddress,
        resourceAccess,
        accessRights,
        expirationBlocks
      )
      .send({ from: currentManager, gas: 3000000 });
    return result;
  } catch (error) {
    throw error;
  }
}

//Function to de-register a manager
async function deregisterManager(managerAddress, currentManager) {
  try {
    const result = await contract.methods
      .deregisterManager(managerAddress)
      .send({ from: currentManager, gas: 3000000 });
    return result;
  } catch (error) {
    throw error;
  }
}

//Function to de-register a device
async function deregisterDevice(deviceId, currentManager) {
  try {
    const result = await contract.methods
      .removeDevice(deviceId)
      .send({ from: currentManager, gas: 3000000 });
    return result;
  } catch (error) {
    throw error;
  }
}

//Function to revoke a permission
async function revokePermission(
  managerAddress,
  constrainedDeviceAddress,
  newDeviceAddress,
  currentManager
) {
  try {
    const result = await contract.methods
      .revokePermission(
        managerAddress,
        constrainedDeviceAddress,
        newDeviceAddress
      )
      .send({ from: currentManager, gas: 3000000 });
    return result;
  } catch (error) {
    throw error;
  }
}

//Function to get a manager
async function getManager(managerAddress) {
  try {
    let manager;
    manager = await contract.methods.getManager(managerAddress).call();
    return manager;
  } catch (error) {
    throw error;
  }
}

//Function to query a permission
async function queryPermission(
  constrainedDeviceAddress,
  newDeviceAddress
) {
 try {
   let permission;
   permission = await contract.methods
     .queryPermission(constrainedDeviceAddress, newDeviceAddress)
     .call();
   return permission;
 } catch (error) {
  console.log(error);
  throw error;
 }
}

module.exports = {
  getDevice,
  registerManager,
  registerDevice,
  addManager,
  removeManager,
  addRule,
  deregisterManager,
  deregisterDevice,
  revokePermission,
  getManager,
  queryPermission,
};
