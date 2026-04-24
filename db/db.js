const mongoose = require('mongoose')

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log('MongoDB connected Succesfully');
    }).catch((err) => {
        console.log('MongoDb Connction Faild:', err)
    })
}

module.exports = connectToDb