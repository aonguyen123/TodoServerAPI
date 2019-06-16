let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let todoSchema = new Schema({
    tenCV  : String,
    date: String,
    isDone : Boolean,
    id_user : String
});

let Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;