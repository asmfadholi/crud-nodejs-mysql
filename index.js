const express = require('express');
const cors = require('cors');
const query = require('./db')

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json())

app.post('/todos', async (req, res) => {
    try {
        const {description} = req.body
        const today = new Date();
        var date = today.getFullYear()+'-'+(((today.getMonth()+1) < 10 ? ('0'+ (today.getMonth()+1)) : today.getMonth()+1))+'-'+(today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate());
        var time = (today.getHours() < 10 ? '0'+ today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? '0'+ today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? '0'+ today.getSeconds() : today.getSeconds() );
        var created_date = date+' '+time;
        console.log(created_date, 'data')
        await query("INSERT INTO todo (description, created_date, updated_date) VALUES(?, ?, ?)", [description, created_date, created_date])
        const newTodo = await query("SELECT LAST_INSERT_ID()")
        const todo = await query("SELECT * FROM todo WHERE todo_id = ?", [newTodo[0]['LAST_INSERT_ID()']])
        res.json(todo[0])
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.get('/todos', async (req, res) => {
    try {
        const newTodo = await query("SELECT * FROM todo ORDER BY updated_date DESC")
        res.json(newTodo)
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})


app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const todo = await query("SELECT * FROM todo WHERE todo_id = ?", [id])
        res.json(todo[0])
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const today = new Date();
        var date = today.getFullYear()+'-'+(((today.getMonth()+1) < 10 ? ('0'+ (today.getMonth()+1)) : today.getMonth()+1))+'-'+(today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate());
        var time = (today.getHours() < 10 ? '0'+ today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? '0'+ today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? '0'+ today.getSeconds() : today.getSeconds() );
        var updated_date = date+' '+time;
        
        await query("UPDATE todo SET description = ?, updated_date = ? WHERE todo_id = ?", [description, updated_date, Number(id)])
        const todo = await query("SELECT * FROM todo WHERE todo_id = ?", [id])
        res.json(todo[0])
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.delete('/todos/:id', async (req, res) => {

    try {
        const {id} = req.params;
        const todo = await query("DELETE FROM todo WHERE todo_id = ?", [id])
        res.json(todo[0])
        // pool.end();
    } catch(err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log('Server running...'+ port)
})