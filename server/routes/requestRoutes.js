const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    createRequest,
    getRequests
} = require("../controllers/requestController");

router.post("/",auth,createRequest);

router.get("/",getRequests);

module.exports = router;