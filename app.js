const express=require('express')
const bodyParser=require('body-parser')
const app=express()
const PORT=5000

app.set('view engine','hbs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const index=require('./controllers/index')

const user=require('./controllers/user')


app.get('/',index.home)

app.get('/users',user.getUsers)
app.get('/users/:id',user.getUserById)
app.post('/user',user.createUser)
app.patch('/user/:id',user.updateUser)
app.delete('/user/:id',user.deletUser)

app.post('/createRelation',user.createRelationUser)


const server=app.listen(PORT,function(){
    console.log(`Server running at http:localhost:${PORT}`)
})