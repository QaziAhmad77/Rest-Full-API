const express = require('express');

const app = express();
const port = 4000;

app.use(express.json());
const employees = [];

app.post("/users",function (req, res) {
    let {name} = req.body;
    employees.push(name);
    if(!name || name.length < 3){
        res.status(400).send("Invalid name");
        return 0;
    }
    res.status(200).send(`${name} added in users successfully`);
    console.log(name);
});

app.get('/users', function (req, res) {
    res.status(200).send(employees);
    console.log(employees);
});

app.get('/users/:id', function (req, res) {
    const {id} = req.params;
    let result = employees[id];
    if(!result || result > employees.length) {
        res.status(401).send("Invalid User id");
    }
    res.status(200).send(result);
});

app.put('/users/:id', function(req, res) {
    let {id} = req.params;
    let {name} = req.body;
    let result = employees[id];
    if(!result || result > employees.length) {
        res.status(401).send("Invalid User id");
        return 0;
    }
    employees[id] = name;
    res.status(200).send(employees);
});

app.delete('/users/:id', function (req, res) {
    let {id} = req.params;
    let result = employees[id];
    if(!result || result > employees.length) {
        res.status(401).send("Invalid User id");
        return 0;
    }
    employees.splice(id, 1);
    res.status(200).send(employees);
});


app.listen(port, function() {
    console.log(`Server is running on port ${port}`);
});