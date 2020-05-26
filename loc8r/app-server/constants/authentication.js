var token = null;
var isAuthenticated = false;

module.exports.setAuthenticationToken = (jwttoken)=>{

    token = jwttoken;
    isAuthenticated = true;
        
};

module.exports.getAuthenticationToken = ()=>{

    return token;

};

module.exports.isAuthenticated = ()=>{

    return isAuthenticated;
}

module.exports.logout = ()=>{

    token = null;
    isAuthenticated = false;

};