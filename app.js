const express=require("express")
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const app=express()
const date=require(__dirname+"/date.js")
app.set("view engine","ejs")
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
//REQUIREING ALL THE NODE MODULES THAT WEE WILL USE 
mongoose.connect("mongodb://localhost:27017/todolistDB") //connecting to the database 

const itemschema=new mongoose.Schema({   //creating schema
    name:String 
})
   const Item=mongoose.model("Item",itemschema)  //giving the schema a name inside the database and choose wich schema gonna use 

//creating a defult list items  to show the user how to use the web app 
    const item1=new Item({
        name:"Welcome to your To Do List"
    })
    const item2=new Item({
        name :"Hit the + button to Add a new list "
    })
    
    const item3=new Item({
        name:"Hit the Checkbox to Delete the list "
    })

    const defultitems=[item1,item2,item3] // put the all the items ubove in constant  
      //creating database for regestier and login
    
        const userschema=new mongoose.Schema({
            username:{type:String ,unique:true},
            email:{type:String,unique:true},
            password:String
        })
        const User=mongoose.model("User",userschema)
        


app.get("/",function(req,res){   // request data from the home route 
    const day=date.getdate()//get the date data from date.js

    Item.find({}).then(function(finditems){ //finding a specific item 
          if(finditems.length===0){
            Item.insertMany(defultitems).then(function(){//iserting an item to the list
                console.log("seccessfully saved the items")
            }).catch(function(err){
                console.log(err)
            })
            res.redirect("/")
          }else{
            res.render("list",{ListTiatle:day,NewListItems:finditems})//rendering the data form list.ejs to home route
          }
    }).catch(function(err){
        console.log(err)
    })
    



})
app.post("/",function(req,res){ // send the information to the home route 
    const  itemName=req.body.newitem //access  to the list.ejs iside the body and select  inside a form that include input that has a name called "newitem"
    
    const item=new Item({
        name:itemName
    })
    item.save() 
   
        
    res.redirect("/")  //redirect the info to the home route 
    
})

app.post("/delete",function(req,res){  //route for deleteing the list item
        const checkeditemID=req.body.checkbox//taking the id from the value of item._id 
        Item.findByIdAndRemove(checkeditemID).then(function(){ //deleting item
            console.log("seccessfully delete the item")
        }).catch(function(err){
            console.log(err)//catch the error if it happen any thing wrong 
        })
        res.redirect("/")
})
 
app.listen(3000,function(){ //which port our web app is running at 
    console.log(" server is listning on port 3000")
})