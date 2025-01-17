import express from 'express'

const app = express()

const port = 3000

app.use(express.json())

let teadata =[]
let nextId = 1
//create tea
app.post("/teas",(req,res) =>{
    const {name , price } = req.body
    const newTea = {id: nextId++, name,price}
    teadata.push(newTea)
    res.status(201).send(newTea)
})
//get all tea
app.get("/teas",(req,res)=>{
    res.status(200).send(teadata)
})
// get tea
app.get("/teas/:id",(req,res)=>{
    const tea = teadata.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('tea not found')
    }else{
        return res.status(200).send(tea)
    }
})
//update tea

app.put("/teas/:id",(req,res)=>{
    const tea = teadata.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('tea not found')
    }
    const {name,price} = req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
})

//delete tea
app.delete("/teas/:id",(req,res)=>{
    const index = teadata.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('tea not found')
    }else{
        teadata.splice(index,1)
        return res.status(200).send('deleted')
    }
})


app.listen(port, () =>{
    console.log(`server is listening at ${port}`)
})