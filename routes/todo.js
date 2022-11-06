const express = require("express");
const auth = require("../middleware/authn")
const router = express.Router();
const todoModel = require("../Models/contacts")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../keys");
const cors = require("cors");

//api to save record
router.post("/addTodo", auth, async (req, res) => {

    const { activity,status,timeTaken,action} = req.body


    try {
        const data = await todoModel.create({
            activity,
            status,
            timeTaken,
            action,
            useRef: req.user.id
        })
        data.save()

        res.json({
            message: "contact added succesfully",
            data
        })
    }

    catch (err) {
        res.send({
            message: err.message
        })
    }
})

///code to fetch data

router.get("/todos", auth, async (req, res) => {
    try {
        const records = await todoModel.find({ useRef: req.user.id }).limit(10);
        if (records) {
            res.json({
                records
            });
        }
    } catch (err) {
        res.send({
            message: err.message
        })
    }
})

//code to delete record
router.delete("/delete/:id",auth, async (req, res) => {


    try {
        const deleteContact = await todoModel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            message: "Deleted sucessfully",
            deleteContact
        })
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})
module.exports = router;