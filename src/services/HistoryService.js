import config from "../config.js";

export default {
    url: config.apiUrl,
    getVideos() {
        return fetch( this.url )
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        //.then(response => console.log('Success:', response));
    },
    save(data){
        localStorage.setItem('history', JSON.stringify(data));
    },
    load(){
        var promise = new Promise(function(resolve, reject) {
            var dataString = localStorage.getItem("history");            
            resolve( dataString ? JSON.parse( dataString ) : [] );
        });
        return promise;        
    }
};