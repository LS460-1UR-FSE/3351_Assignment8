const express = require('express');
const app = express();
const PORT = 3000;



//log timestamps, http method, and url of requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    
    next();
});


app.use(express.json()); // parse JSON request


const resources = [

    {
        id: 1,
        title: 'Task 1: Study Node.js',
        completed: false,
    },

    {
        id: 2,
        title: 'Task 2: Study Express.js',
        completed: false,
    },

    {
        id: 3,
        title: 'Task 3: Study MongoDB',
        completed: false,
    }
];

let nextId = 4; // next id to assign to a new resource

// GET /resources - get all resources
app.get('/api/resources', (req, res) => {
    res.json(resources);
});

//return task by id 
app.get('/api/resources/:id', (req, res) => {
    const id = parseInt(req.params.id); //cinvert id to integer
    const resource = resources.find((resource) => resource.id === id);

    if(!resource) { //if resource not found, return 404
        return res.status(404).json({ error: 'Resource not found' }); 
    }

    res.json(resource);
});




app.listen(PORT, () => { //starts server
    console.log(`Server is running on port ${PORT}`);
});

