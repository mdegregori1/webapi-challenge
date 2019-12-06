const express = require('express');

const action = require("../data/helpers/actionModel.js"); 
const router = express.Router(); 

router.use(express.json());

// post action
router.post('/', (req,res) => {
    const input = req.body;
    if (input.project_id && input.description && input.notes) {
        action.insert(input)
        .then(add => {
            res.status(201).json({...add, input})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: "Error adding the action"})
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide the project id, the notes, and description." })
    }
})

// get by 

router.get('/:id', (req, res) => {
    const id = req.params.id
    action.get(id)
    .then( id => {
        if (id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
    })
    .catch( error => {
        console.log(error);
        res.status(500).json( { error: "The project information could not be retrieved." })
    })
})


// delete action by id 
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    action.remove(id)
    .then( id => {
        if (id) {
            res.status(200).json({message: "The project action was successfully deleted."})
        } else {
            res.status(404).json({ message: "The project action with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The project acton could not be removed" })
    })
})

//edit action by id
router.put('/:id', (req, res) => {
    const id = req.params.id
    const input = req.body
    if (input.description && input.notes) {
        action.update(id, input)
        .then ( id => {
            if (id) {
                res.status(200).json({...id, ...input})
            } else {
                res.status(404).json({ message: "The project with the specified ID does not exist." })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The project information could not be modified." })
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide notes and a description." })
    }
    
})


module.exports = router;
