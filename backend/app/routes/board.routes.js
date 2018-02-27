module.exports = function (app) {

    var boards = require('../controllers/board.controller.js');

    // Create a new Note
    app.post('/boards', boards.create);

    // Retrieve all Notes
    app.get('/boards', boards.findAll);

    // Retrieve a single Note with noteId

    // Delete a Note with noteId
    app.delete('/boards/:cardId', boards.delete);
    // get a single Note with title

    app.patch('/boards/addCard/:laneId', boards.addCard)
    app.patch('/boards/deleteCard/:laneId/:cardId', boards.deleteCard)
    app.patch('/boards/updateCard/:cardId/:newLaneId/:oldLaneId', boards.updateCard);

}
