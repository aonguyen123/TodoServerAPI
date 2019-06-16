const todoController = require('./../controller/todoController');
const signinController = require('./../controller/signinControler');

module.exports = (app) => {
    app.post('/api/addTodo/:id', signinController.loginRequired, async (req, res) => {
        await todoController.addTodo(req, res);
    });
    app.get('/api/getAllTodoByUser/:id', signinController.loginRequired, async (req, res) => {
        await todoController.getAllTodoByUserAndPagination(req, res);
    });
    app.post('/api/updateIsDone', signinController.loginRequired, async (req, res) => {
        await todoController.updateTodoIsDone(req, res);
    });
    app.get('/api/getAllTodoDoneByUser/:id', signinController.loginRequired, async (req, res) => {
        await todoController.getTodoDoneByUserAndPagination(req, res);
    });
    app.delete('/api/deleteTodoDone', signinController.loginRequired, async (req, res) => {
        await todoController.deleteTodoDone(req, res);
    });
    app.put('/api/updateTenCV', signinController.loginRequired, async (req, res) => {
        await todoController.updateTenCV(req, res);
    })
}