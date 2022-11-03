const mongoose = require('mongoose');

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect(`mongodb+srv://PinkFlag-admin:admin@cluster0.get5jch.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("MongoDB online.");
    }).catch(erro => {
        console.log(erro);
    });

db = mongoose.connection;

module.exports = db;