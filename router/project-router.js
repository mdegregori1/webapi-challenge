const express = require('express');

const project = require("../data/helpers/projectModel.js"); //update path, as they are now in the same folder  
const router = express.Router(); // make sure to invoke it and use uppercase "R"

router.use(express.json());

//get project
router.get('/', (req, res) => {
    project.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({message:"Failed to retrieve projects"})
    })
})
//get project by ID 
router.get('/:id', (req, res) => {
    const id = req.params.id
    project.get(id)
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
// add project
router.post('/', (req, res) => {
    const input = req.body;
    if (input.name && input.description){
    project.insert(input)
    .then( add => {
        res.status(201).json({...add, ...input })
    })
    .catch( error => {
        console.log(error);
        res.status(500).json({ error: "There was an error while saving the project to the database" })
    })

    } else {
        res.status(400).json({ errorMessage: "Please provide the name and description." })
    }
})

// edit post by id 
router.put('/:id', (req, res) => {
    const id = req.params.id
    const input = req.body
    if (input.name && input.description) {
        project.update(id, input)
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
        res.status(400).json({ errorMessage: "Please provide a name and a description." })
    }
    
})
// delete post by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    project.remove(id)
    .then( id => {
        if (id) {
            res.status(200).json({message: "The project was successfully deleted."})
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error: "The project could not be removed" })
    })
})
// get actions by id 
router.get('/:id/actions', (req, res) => {
    const id = req.params.id
    project.getProjectActions(id)
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


module.exports = router;

