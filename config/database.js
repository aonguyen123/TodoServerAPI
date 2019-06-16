let configValues = require("./config");

module.exports = {
    getDbConnectionString : function () {
        return `mongodb://${ configValues.username }:${ configValues.password }@ds159204.mlab.com:59204/node-todos` ;
    }
}
