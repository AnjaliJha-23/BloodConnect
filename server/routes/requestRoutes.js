const express = require("express");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");


const {

    createRequest,

    getRequests,

    getMyRequests,

    deleteRequest,

    completeRequest,
    respondToRequest

} = require("../controllers/requestController");

router.post("/", protect, createRequest);

router.get("/", getRequests);

router.get("/mine", protect, getMyRequests);

router.delete("/:id", protect, deleteRequest);

router.put("/:id/complete", protect, completeRequest);

router.put("/:id/respond", protect, respondToRequest);

module.exports = router;