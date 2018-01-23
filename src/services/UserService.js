import config from "../config.js";

export default {
    url: ( config.apiUrl ),
    username: "",
    usernameSlug: "",
    login( user, psw ){
        var promise = new Promise((resolve, reject)=> {

            var formData = new FormData();
                formData.append( "user", user);
                formData.append( "psw", psw);

            fetch(  this.url + "/login" ,
                    {
                        method: 'POST',
                        body: formData
                    }
                )
                .catch((e)=>{
                    reject(e);
                })
                .then(res => res.json())
                .then((res)=>{
                    if( res.status === "success" ){
                        this.updateUser( user ); 
                        resolve( this );
                    }else{
                        reject( res );
                    }
                });
        });
        return promise; 
    },
    register( user, psw ){
        var promise = new Promise((resolve, reject)=> {

            var formData = new FormData();
                formData.append( "user", user);
                formData.append( "psw", psw);

            fetch(  this.url + "/register" ,
                    {
                        method: 'POST',
                        body: formData
                    }
                ).catch((e)=>{
                    reject(e);
                })
                .then(res => res.json())
                .then((res)=>{
                    if( res.status === "success" ){
                        this.updateUser( user ); 
                        resolve( this );
                    }else{
                        reject( res );
                    }
                });
        });
        return promise; 
    },
    updateUser(user = "anonymous"){
        this.username = user;
        this.usernameSlug = user.toLowerCase().replace(/[^0-9a-z]/,"-");
    }
};