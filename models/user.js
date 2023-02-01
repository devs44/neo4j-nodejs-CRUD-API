const neo4j=require('neo4j-driver')
const {v4:uuidv4}=require('uuid')
require('dotenv').config()
const {
    url,
    username,
    password,
    database
}=process.env

const driver=neo4j.driver("bolt://localhost:7687",neo4j.auth.basic("neo4j","devi"))

const session=driver.session({
    database:database
})

session
    .run('RETURN 1')
    .then(result => {
        console.log('Connected to Neo4j');
        
    })
    .catch(error => {
        console.log('Error connecting to Neo4j:', error);
    });
    



const findAll=async(req,res)=>{
    try{
        const result=await session.run(`MATCH (n) RETURN n`)
        return result.records.map(i=>i.get('n').properties)
    }
    catch(error){
        console.log('error: ',error)
    }
}

const findById=async(id)=>{
    try{
        const result=await session.run(`MATCH (n) where id(n)=${id} return n`)
        return result.records[0].get('n').properties
    }
    catch(error){
        console.log('error: ',error)
    }   
}

const create=async(user)=>{
    try{
        const result=await session.run(`CREATE (u:User {name: '${user.name}', email: '${user.email}'} ) return u`) 
        return result.records[0].get('u').properties
    }
    catch(error){
        console.log('error: ',error)
    }
}

const update=async(id,user)=>{
    try{
        const result = await session.run(`MATCH (n) where id(n)=${id} SET n.name="${user}" return n`)
        return result.records[0].get('n').properties 
    }
    catch(error){
        console.log('error: ',error)
    }
}

const deleteUser=async(id)=>{
    try{
        const result=await session.run(`MATCH (n) where id(n)=${id} delete n`)
    }
    catch(error){
        console.log('error: ',error)
    }
}

const createRelation=async(id1,id2,relationship)=>{
    try{
      const result=await session.run(`MATCH (a),(b) where id(a)=${id1} and id(b)=${id2} CREATE (a)-[r:${relationship}]->(b)`)
      
    }
    catch(error){
        console.log('error: ',error)
    }
}

module.exports={
    findAll,
    findById,
    create,
    update,
    deleteUser,
    createRelation
}