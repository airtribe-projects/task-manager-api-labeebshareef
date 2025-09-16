const express = require("express");
const router = express.Router()

let {tasks} = require('../task.json');

let currentId = 16;

router.get('/', (req, res) => {
    let filteredTasks= tasks;
    if(req.query.completed !== undefined ) {
        const completed = req.query.completed === 'true'
        filteredTasks = tasks.filter((each)=>each.completed === completed)
    }
    res.send(filteredTasks.sort((a, b)=> new Date(a.createdAt)- new Date(b.createdAt)))
})

router.get('/priority/:level',(req, res)=> {
    if(!req.params.level) return res.status(400).send('invalid level')
    res.send(tasks.filter((each)=>each.priority === req.params.level))
})

router.get('/:id',(req,res)=>{
    let task = tasks.find((el)=> el.id === parseInt(req.params.id))
    if(!task) return res.status(404).send()
    res.send(task)
})

router.post('/', (req, res) => {
    console.log(req.body);
    let { title, description, completed, priority } = req.body;
    if (!title) return res.status(400).send("title required");
    if (!description) return res.status(400).send('description required');
    if( typeof completed !== 'boolean') return res.status(400).send('completed must be boolean');

    tasks.push({
        "id": currentId++,
        "title": title,
        "description": description,
        "completed": completed,
        "createdAt": new Date().toISOString(),
        "priority": priority
    })
    res.status(201).send('task created')
})

router.put('/:id',(req,res)=>{
    if(!tasks.some((each)=> each.id == parseInt(req.params.id))) {
        return res.status(404).send('item not exist in this id')
    }
    if( !req.body.completed ) {
         return res.status(400).send('completed must be boolean')
    }
    if( typeof req.body.completed!='boolean' ) {
         return res.status(400).send('completed must be boolean')
    }
    if( !req.body.title ) {
         return res.status(400).send('title is required')
    }
    if( !req.body.description ) {
            return res.status(400).send('description is required')
    }
    // if(!req.body.priority) {
    //     return res.status(400).send('priority is required')
    // }
    tasks.map((each)=>{
        if(each.id === parseInt(req.params.id)) each = req.body
        return each
    })
    res.send('task updated')
})

router.delete('/:id',(req,res)=>{
    if(!tasks.some((each)=> each.id == parseInt(req.params.id))) {
        return res.status(404).send('item not exist in this id')
    }
    tasks = tasks.filter((each)=>each.id!= parseInt(req.params.id))

    res.send(tasks)
})

module.exports = router