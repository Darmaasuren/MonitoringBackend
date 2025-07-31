const express = require("express");
const router = express.Router();
const { downtimeLog, 
        getDowntimeID, 
        getDowntimePC_ID, 
        deleteDowntime, 
        getDowntimeAll, 
        getDowntimePC_IDAll,
        paginationDowntime,
        paginationDowntimePC_ID
        } = require("../contollers/downtimeController");

router.post("/create", downtimeLog);

router.get("/downtime/all", getDowntimeAll);

router.get("/downtime/id/:id", getDowntimeID);

router.get("/downtime/pc_id/:pc_id", getDowntimePC_ID);

router.get("/downtime/all/pc_id/:pc_id", getDowntimePC_IDAll);

router.delete("/downtime/delete/:pc_id", deleteDowntime);

router.get("/downtime", paginationDowntime);

router.get("/downtime/all/pc_id/table/:pc_id", paginationDowntimePC_ID);

module.exports = router;