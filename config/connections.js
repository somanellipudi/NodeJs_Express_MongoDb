const mongoose = require('mongoose');

const connectToDb = (url, logMsg) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}).then(resp => {
        console.log(logMsg);
    }).catch(err => {
        console.log(err);
    });
}

module.exports = {
    connectToDb
}
