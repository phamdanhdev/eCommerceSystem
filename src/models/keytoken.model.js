const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

var keytokenSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Shop'
    },
    publicKey:{
        type:String,
        required:true,
    },
    privateKey:{
        type:String,
        required:true,
    },
    //RefreshToken đã được sử dụng, để sau này truy vấn account nào truy cập mà còn dùng RT cũ thì đưa vào diện nghi vấn
    refreshTokensUsed:{
        type:Array,
        default: []
    },
    refreshToken: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keytokenSchema);