const express = require("express");
const router = express.Router();
const { getContact, createContact, updateContact, deleteContact, getContacts } = require("../controllers/contactController");
const validateToken = require("../controllers/middleware/validateTokenHandler");

router.use(validateToken);
router.route('/getAll').get(getContacts);
router.route('/createContact').post(createContact);
router.route('/getById/:id').get(getContact);
router.route('/update/:id').put(updateContact);
router.route('/delete/:id').delete(deleteContact);

module.exports = router