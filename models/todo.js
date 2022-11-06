
const mongoose = require("mongoose");
const todoschema = new mongoose.Schema({
    activity: {type:String, required:true},
    status:{type:String, required:true},
    timetaken:{type:String,required:true},
    action:{type:String,required:true},
    useRef:{type:String}
})
module.exports = mongoose.model("todo",todoschema)