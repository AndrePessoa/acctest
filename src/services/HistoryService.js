import config from "../config.js";
import UserService from '../services/UserService';

export default {
    url: ( config.apiUrl + "/history" ),
    getVideos() {
        return fetch( this.url )
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            //.then(response => console.log('Success:', response));
    },
    save(data){
        let userKey = UserService.usernameSlug + "-history";
        localStorage.setItem(userKey, JSON.stringify(data));
    },
    load(){
        var promise = new Promise(function(resolve, reject) {
            let userKey = UserService.usernameSlug + "-history";
            var dataString = localStorage.getItem(userKey);            
            resolve( dataString ? JSON.parse( dataString ) : [] );
        });
        return promise;        
    }
};