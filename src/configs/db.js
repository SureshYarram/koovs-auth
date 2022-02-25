const mongoose= require("mongoose")
//step-1 :-connect to mongodb
const connect=()=>{
    return mongoose.connect("mongodb+srv://chandan:chandan_123@cluster0.iv5pd.mongodb.net/projectkoovs?retryWrites=true&w=majority")
}

module.exports= connect;