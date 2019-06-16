let mongoose = require('mongoose');
let Todos = require("./../models/todoModel");

exports.addTodo = async (req, res) => {
    let todo = new Todos({
        tenCV: req.body.tenCV,
        date: req.body.date,
        isDone: false,
        id_user: req.params.id
    });
    let todoNew = await todo.save();
    if (todoNew) {
        return res.json({ todoNew })
    }
    return res.json({
        message: 'add err'
    })
}
exports.getAllTodoByUserAndPagination = async (req, res) => {
    let pageNum = parseInt(req.query.pageNum);
    let size = parseInt(req.query.size);
    let query = {};
    if (pageNum < 0 || pageNum === 0) {
        return res.json({
            err: true,
            message: 'page start with 1, invalid page number'
        })
    }
    query.skip = size * (pageNum - 1);
    query.limit = size;
    const { id } = req.params;
    let totalCount = await Todos.countDocuments({ id_user: id, isDone: false });
    if (totalCount > 0) {
        let todos = await Todos.find({ id_user: id, isDone: false }, {}, query).sort({ _id: 'desc' });
        return res.json({ todos, totalCount });
    }
    return res.json({
        todos: []
    })
}
exports.updateTodoIsDone = async (req, res) => {
    const { idTodo } = req.body;
    let result = await Todos.findById({ _id: idTodo }).updateOne({ isDone: true });
    if (result) {
        const { pageNum, size, idUser } = req.body;
        let query = {};
        query.skip = size * (pageNum - 1);
        query.limit = size;
        let totalCount = await Todos.countDocuments({ id_user: idUser, isDone: false });
        if (totalCount > 0) {
            let todos = await Todos.find({ id_user: idUser, isDone: false }, {}, query).sort({ _id: 'desc' });
            if (todos.length === 0) {
                query.skip = 0;
                return res.json({
                    message: 'page end',
                    todos: await Todos.find({ id_user: idUser, isDone: false }, {}, query).sort({_id: 'desc'}),
                    totalCount
                })
            }
            return res.json({ todos, totalCount });
        }
        return res.json({
            todos: []
        })
    }
    return res.json({
        message: 'err'
    })
}
exports.getTodoDoneByUserAndPagination = async (req, res) => {
    const pageNum = parseInt(req.query.pageNum);
    const size = parseInt(req.query.size);
    const query = {};
    if (pageNum < 0 || pageNum === 0) {
        return res.json({
            err: true,
            message: 'page start with 1, invalid page number'
        })
    }
    query.skip = size * (pageNum - 1);
    query.limit = size;
    const { id } = req.params;
    let totalCount = await Todos.countDocuments({ id_user: id, isDone: true });
    if (totalCount > 0) {
        let todos = await Todos.find({ id_user: id, isDone: true }, {}, query).sort({ _id: 'desc' });
        return res.json({ todos, totalCount });
    }
    return res.json({
        todos: []
    })
}
exports.deleteTodoDone = async (req, res) => {
    const { idTodo } = req.body;
    let result = await Todos.deleteOne({ _id: idTodo });
    if (result) {
        const { pageNum, size, idUser, statusDelete } = req.body;
        const query = {};
        query.limit = size;
        query.skip = size * (pageNum - 1);
        const totalCount = await Todos.countDocuments({ id_user: idUser, isDone: statusDelete === 'todoDone' ? true : false });
        if (totalCount > 0) {
            let todos = await Todos.find({ id_user: idUser, isDone: statusDelete === 'todoDone' ? true : false }, {}, query).sort({ _id: 'desc' });
            if (todos.length === 0) {
                query.skip = 0;
                return res.json({
                    message: 'page end',
                    todos: await Todos.find({ id_user: idUser, isDone: statusDelete === 'todoDone' ? true : false }, {}, query).sort({_id: 'desc'}),
                    totalCount
                })
            }
            return res.json({ todos, totalCount });
        }
        return res.json({
            todos: []
        })
    }
    return res.json({
        message: 'err'
    })
}
exports.updateTenCV = async (req, res) => {
    const { tenCV, id } = req.body;
    const result = await Todos.findById({_id: id}).updateOne({tenCV});
    if(result)
    {
        return res.json({
            message: 'update complete'
        })
    }
    return res.json({
        message: 'update fail'
    })
}