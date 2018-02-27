var Board = require('../models/board.model.js');
const uuidV4 = require('uuid/v4');

exports.create = function (req, res) {
    // Create and Save a new Note

    var board = new Board({
        title: req.body.title,
        cards: [{ id: req.body.card_id, title: req.body.card_title, description: req.body.card_description }]
    });

    board.save(function (err, data) {
        console.log(data);
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json(data);
        }
    });
};


exports.findAll = function (req, res) {

    // Retrieve and return all notes from the database.
    Board.find(function (err, lanes) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving notes." });
        } else {
            res.send({ lanes });
        }
    });
};


exports.findOne = function (req, res) {
    // Find a single note with a noteId
    Board.findById(req.params.noteId, function (err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve note with id " + req.params.noteId });
        } else {
            res.send(data);
        }
    });
};

exports.findTitle = function (req, res) {
    Board.find({ 'title': req.params.title }, function (err, data) {
        if (err) {
            res.send(err);
        }
        res.send(data);
    });
};

exports.update = function (req, res) {
    // Update a note identified by the noteId in the request
    Board.findById(req.params.noteId, function (err, note) {
        if (err) {
            res.status(500).send({ message: "Could not find a note with id " + req.params.noteId });
        }

        note.title = req.body.title;
        note.description = req.body.description;

        note.save(function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not update note with id " + req.params.noteId });
            } else {
                res.send(data);
            }
        });
    });
};

exports.delete = function (req, res) {
    Board.findOneAndUpdate(query, { $pull: { cards: req.params.cardId } }, function (err, data) {
        if (err) {
            return res.status(500).json({ 'error': 'error in deleting address' });
        }
        res.json(data);

    });
};

exports.addCard = function (req, res) {

    var card = {
        id: uuidV4(), title: req.body.card_title, description: req.body.card_description
    }

    Board.update(
        { _id: req.params.laneId },
        { $push: { cards: card } },
        { safe: true, upsert: true },
        function (err, data) {
            if (err) {
                res.json(err)
            } else {
                res.send(data)
            }
        }
    );
}
exports.deleteCard = function (req, res) {
    Board.update(
        { "id": req.params.laneId },
        { "$pull": { "cards": { "id": req.params.cardId } } },
        function (err, data) {
            if (err) {
                res.json(err)
            } else {
                res.send(data)
            }
        }
    );
}

exports.updateCard = function (req, res) {


    Board.find({ 'cards.id': req.params.cardId }, {
        'cards.$': 1
    }, function (err, stock) {
        Board.update(
            { "id": req.params.newLaneId },
            { $push: { cards: stock[0].cards[0] } },
            { upsert: true },
            function (err, data) {
                Board.update(
                    { "id": req.params.oldLaneId },
                    { "$pull": { "cards": { "id": req.params.cardId } } },
                    function (err, data) {
                        if (err) {
                            res.json(err)
                        } else {
                            res.send(data)
                        }
                    }
                );
            }
        );
    });


}

