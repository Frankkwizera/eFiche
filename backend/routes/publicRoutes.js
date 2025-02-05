const express = require("express");

const router = express.Router();

router.get("/ping", (req, res) => {
    console.log("Ping endpoint hit");
    res.send({
        "message": "pong"
    });
});

module.exports = router;