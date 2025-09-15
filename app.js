const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let {tasks} = require('./task.json');


console.log(tasks)
let currentId = 1
app.get('/tasks', (req, res) => {
    res.send(tasks)
})

app.get('/tasks/:id',(req,res)=>{
    let task = tasks.find((el)=> el.id === parseInt(req.params.id))
    if(!task) return res.status(404).send()
    res.send(task)
})

app.post('/tasks', (req, res) => {
    console.log(req.body);
    let { title, description,completed } = req.body;
    if (!title) return res.status(400).send("title required");
    if (!description) return res.status(400).send('description required');

    tasks.push({
        "id": currentId++,
        "title": title,
        "description": description,
        "completed": completed
    })
    res.status(201).send('task created')
})

app.put('/tasks/:id',(req,res)=>{
    if(!tasks.some((each)=> each.id == parseInt(req.params.id))) {
        return res.status(404).send('item not exist in this id')
    }
    if( typeof req.body.completed!='boolean' || !req.body.title || !req.body.description) {
         return res.status(400).send('incorrect data')
    }
    tasks.map((each)=>{
        if(each.id === parseInt(req.params.id)) each = req.body
        return each
    })
    res.send('updated')
})

app.delete('/tasks/:id',(req,res)=>{
    if(!tasks.some((each)=> each.id == parseInt(req.params.id))) {
        return res.status(404).send('item not exist in this id')
    }
    tasks = tasks.filter((each)=>each.id!= parseInt(req.params.id))

    res.send(tasks)
})

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;