const { json } = require("sequelize");
const Downtime = require("../models/Downtime");


const downtimeLog = async (req, res) => {
    try {
        const {pc_id, shutdown_time, startup_time, downtime } = req.body;

        await Downtime.create({
            pc_id,
            shutdown_time,
            startup_time,
            downtime,
        });

        console.log("Success")
        res.status(201).json({msg: "Downtime recorded succesfully"});
    }
    catch (error) {
        console.log("Error saving downtime: ", error.message);
        res.status(500).json({msg: "Server error"});
    }
};

const getDowntimeAll = async (req, res) => {
    try {
        const all = await Downtime.findAll();

        res.json(all);
    } catch (error) {
        console.error(error);
        res.status(500),json({ message: error.message});
    }
};

const getDowntimeID = async (req, res) => {

    try {
        const downtimeID = await Downtime.findByPk(req.params.id 
        //     {
        //     attributes: [ "pc_id", "downtime" ],
        // }
    );

    if (!downtimeID) {
        return res.status(404).json({ message: "Downtime ID not found!"});
    }
        // console.log(downtimeID);

        res.json(downtimeID)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: error.message})
    }
};

const getDowntimePC_ID = async (req, res) => {
    try {
        const pc_id = await Downtime.findOne({
            where: {pc_id: req.params.pc_id },
        });

        // console.log("PC_ID" ,pc_id);

        if (!pc_id) {
            return res.status(404).json({ message: "PC_ID not found!"});
        }

        res.json(pc_id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
};

const getDowntimePC_IDAll = async (req, res) => {
    try {
        const pc_id = await Downtime.findAll({
            where: {pc_id: req.params.pc_id},
        });

        if (!pc_id) {
            return res.status(404).json({ message: "PC_ID not found!"});
        }

        res.json(pc_id);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteDowntime = async (req, res) => {
    try {
            const pc_id = await Downtime.findOne({
            where: {pc_id: req.params.pc_id},
        });

        if (!pc_id) {
            return res.status(404).json({ message: "PC_ID not found!"});
        }

        await pc_id.destroy();

        res.json({ message: "Downtime deleted succesfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
};

const paginationDowntime = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    try {
        const { count, rows } = await Downtime.findAndCountAll({
            limit,
            offset,
            order: [[ 'createdAt', 'DESC' ]],
        });

        res.json({
            currentPage: page,
            totalPage: Math.ceil( count / limit ),
            totalRecords: count,
            downtime: rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
};

const paginationDowntimePC_ID = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const pcID = req.params.pc_id;

    try {
        const pc_id = await Downtime.findOne({
            where: {pc_id: req.params.pc_id},
        });

        if (!pc_id) {
            return res.status(404).json({ message: "PC_ID not found!"});
        }

        const { count, rows } = await Downtime.findAndCountAll({
            limit,
            offset,
            order: [[ 'createdAt', 'DESC' ]],
            where: { pc_id: pcID},
        });

        res.json ({
            currentPage: page,
            totalPage: Math.ceil( count / limit ),
            totalRecords: count,
            downtime: rows,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getDowntimeAll, 
                getDowntimePC_IDAll, 
                downtimeLog, 
                getDowntimeID, 
                getDowntimePC_ID, 
                deleteDowntime, 
                paginationDowntime,          
                paginationDowntimePC_ID}; 