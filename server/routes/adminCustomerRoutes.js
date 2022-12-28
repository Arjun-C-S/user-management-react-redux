const express = require("express");

const adminCustomerController = require("../controller/adminCustomerController");

const router = express.Router();

router.get("/add-customer", adminCustomerController.addCustomerGet);

router.post("/add-customer", adminCustomerController.addCustomerAddPost);

router.get('/deleteUser', adminCustomerController.deleteCustomer);

router.get('/update-customer', adminCustomerController.loadCustomerToUpdate);

router.post('/update-customer', adminCustomerController.updateCustomer);

module.exports = router;
