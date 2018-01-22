export default {
    username: "",
    usernameSlug: "",
    login( user, psw ){
        var promise = new Promise((resolve, reject)=> {
            this.updateUser( user );        
            resolve( this );
        });
        return promise;  

    },
    register( user, psw ){
        var promise = new Promise((resolve, reject)=> {
            this.updateUser( user );        
            resolve( this );
        });
        return promise; 
    },
    updateUser(user){
        (!user && (user == "anonymous"))
        this.username = user;
        this.usernameSlug = user.toLowerCase().replace(/[^0-9a-z]/,"-");
    }
};