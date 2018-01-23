import config from "../config.js";

export default {
    url: ( config.apiUrl + "/videos-list" ),
    getVideos() {
        return fetch( this.url )
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            //.then(response => console.log('Success:', response));
    },
};