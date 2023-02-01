

const router=require('router')

const user=require('../models/user')



const getUsers=async(req,res)=>{
    const result=await user.findAll()
    res.json(result)
}

const getUserById=async(req,res)=>{
    const result=await user.findById(req.params.id)
    res.json(result)
}

const createUser=async(req,res)=>{
    const result=await user.create(req.body)
    res.json(result)
}

const updateUser=async(req,res)=>{
    const result=await user.update(req.params.id,req.body.name)
    res.json(result)
}

const deletUser=async(req,res)=>{
    const result=await user.deleteUser(req.params.id)
    res.json({success:true,message:"User deleted successfully"})
}

const createRelationUser=async(req,res)=>{
    const result=await user.createRelation(req.body.id1,req.body.id2,req.body.relationship)
    res.json({success:true,message:"Relationship created successfully"})
}

module.exports={
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deletUser,
    createRelationUser
}