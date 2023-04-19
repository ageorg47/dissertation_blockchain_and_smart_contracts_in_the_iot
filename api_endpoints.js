//Import the script that makes the contract calls
const contractCalls = require("./contract_calls");
const express = require("express");
const router = express.Router();

//Handle requests to check if a device is registered
router.get("/get-device", async (req, res) => {
  const deviceAddress = req.query.deviceAddress;
  let device;
  try {
    //Send the device information back to the client
    device = await contractCalls.getDevice(deviceAddress);
    res.json({
      deviceName: device[1],
      deviceId: device[2],
      deviceAddress: device[3],
      managers: JSON.stringify(device[4]),
    });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.status(400).send({ message: error.reason });
  }
});

//Handle requests to register a manager
router.get("/register-manager", async (req, res) => {
  const managerAddress = req.query.managerAddress;
  const managerName = req.query.managerName;
  const currentManager = req.query.currentManager;
  let result;
  try {
    result = await contractCalls.registerManager(
      managerAddress,
      managerName,
      currentManager
    );
    res.send({ message: `Manager registered: ${result.transactionHash}` });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.send({ message: error.reason });
  }
  
});

//Handle requests to register a device
router.get("/register-device", async (req, res) => {
  const deviceAddress = req.query.deviceAddress;
  const deviceName = req.query.deviceName;
  const deviceID = req.query.deviceID;
  const currentManager = req.query.currentManager;
  let result;
  try {
    result = await contractCalls.registerDevice(
      deviceAddress,
      deviceName,
      deviceID,
      currentManager
    );
    res.send({ message: `Device registered: ${result.transactionHash}` });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.send({ message: error.reason });
  }
});

//Handle requests to add a manager to a device
router.get("/add-manager", async (req, res) => {
  const deviceId = req.query.deviceID;
  const managerAddress = req.query.managerAddress;
  const currentManager = req.query.currentManager;
  let result;
  try {
    result = await contractCalls.addManager(
      deviceId,
      managerAddress,
      currentManager
    );
    res.send({ message: `Manager added: ${result.transactionHash}` });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.send({ message: error.reason });
  }
  
});

//Handle requests to remove a manager from a device
router.get("/remove-manager", async (req, res) => {
  const deviceId = req.query.deviceID;
  const managerAddress = req.query.managerAddress;
  const currentManager = req.query.currentManager;
  let result;
  try {
    result = await contractCalls.removeManager(
      deviceId,
      managerAddress,
      currentManager
    );
    res.send({ message: `Manager removed: ${result.transactionHash}` });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.send({ message: error.reason });
  }
  
});

//Handle requests to add a rule
router.get("/add-rule", async (req, res) => {
  const managerAddress = req.query.managerAddress;
  const constrainedDeviceAddress = req.query.constrainedDeviceAddress;
  const newDeviceAddress = req.query.newDeviceAddress;
  const resource = req.query.resource;
  const accessRights = req.query.accessRights;
  const expirationBlocks = req.query.expirationBlocks;
  const currentManager = req.query.currentManager;
  let result;
  try {
    result = await contractCalls.addRule(
      managerAddress,
      constrainedDeviceAddress,
      newDeviceAddress,
      resource,
      accessRights,
      expirationBlocks,
      currentManager
    );
    res.send({ message: `Rule added: ${result.transactionHash}` });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.send({ message: error.reason });
  }
  
});

//Handle requests to de-register a manager
router.get("/deregister-manager", async (req, res) => {
  const managerAddress = req.query.managerAddress;
  const currentManager = req.query.currentManager;
  let result;
  try {
    result = await contractCalls.deregisterManager(
      managerAddress,
      currentManager
    );
    res.send({ message: `Manager de-registered: ${result.transactionHash}` });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.send({ message: error.reason });
  }
  
});

//Handle requests to de-register a device
router.get("/deregister-device", async (req, res) => {
  const deviceId = req.query.deviceId;
  const currentManager = req.query.currentManager;
  let result;
  try {
    result = await contractCalls.deregisterDevice(deviceId, currentManager);
    res.send({ message: `Device de-registered: ${result.transactionHash}` });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.send({ message: error.reason });
  }
  
});

//Handle requests to revoke a permission (remove a rule)
router.get("/revoke-permission", async (req, res) => {
  const managerAddress = req.query.managerAddress;
  const constrainedDeviceAddress = req.query.constrainedDeviceAddress;
  const newDeviceAddress = req.query.newDeviceAddress;
  const currentManager = req.query.currentManager;
  let result;
  try {
    result = await contractCalls.revokePermission(
      managerAddress,
      constrainedDeviceAddress,
      newDeviceAddress,
      currentManager
    );
    res.send({ message: `Permission revoked: ${result.transactionHash}` });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.send({ message: error.reason });
  }
  
});

//Handle requests to get a manager
router.get("/get-manager", async (req, res) => {
  const managerAddress = req.query.managerAddress;
  let manager;
  try {
    manager = await contractCalls.getManager(managerAddress);
    res.json({
      managerName: manager[0],
      managerAddress: manager[1],
    });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.status(400).send({ message: error.reason });
  }
  
});

//Handle requests to query a permission
router.get("/query-permission", async (req, res) => {
  const constrainedDeviceAddress = req.query.constrainedDeviceAddress;
  const newDeviceAddress = req.query.newDeviceAddress;
  let permission;
  try {
    permission = await contractCalls.queryPermission(
      constrainedDeviceAddress,
      newDeviceAddress
    );
    res.json({
      allowed: permission[0],
      accessRights: permission[1],
      resource: permission[2],
      remainingBlocks: permission[3],
    });
  } catch (error) {
    //Get the error message from the contract require statement and send it
    //back to the client
    res.status(400).send({ message: error.reason });
  }

});

module.exports = router;
