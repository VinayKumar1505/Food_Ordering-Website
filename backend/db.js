const mongoose = require('mongoose');
const mongoURI= 'mongodb+srv://TasteEase:20U11A6701@cluster0.hskljuu.mongodb.net/TasteEase?retryWrites=true&w=majority&appName=Cluster0'

const mongoDB= ()=>{

    mongoose.connect(mongoURI, async (err, res)=>{
        if(err){
            console.log("Error Occured:-", err);
        }else{
            console.log("connected mongo");
            const fetched_data= await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err, data){
                
            const foodCategory= await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function (err, catData){

                if(err) console.log(err);
                else {
                    //   console.log(global.food_items)
                         global.food_items= data;
                         global.foodCategory= catData;
                      }   
            })
            })
        }
    });
}

module.exports= mongoDB