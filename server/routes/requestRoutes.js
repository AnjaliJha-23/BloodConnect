const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {

    createRequest,

    getRequests,

    getMyRequests,

    deleteRequest,

    completeRequest,
    respondToRequest

} = require("../controllers/requestController");

router.post("/", auth, createRequest);

router.get("/", getRequests);

router.get("/mine", auth, getMyRequests);

router.delete("/:id", auth, deleteRequest);

router.put("/:id/complete", auth, completeRequest);

router.put("/:id/respond", auth, respondToRequest);

module.exports = router;