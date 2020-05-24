var isAuthenticated = false;

module.exports.setAuthentication = ()=>{

    isAuthenticated = true;

};

module.exports.getAuthentication = ()=>{

    return isAuthenticated;

};