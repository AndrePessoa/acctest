export default {
    url: "http://localhost/acctest/public/api/videos-list",
    getVideos() {
        return fetch( this.url )
            .then(res => res.json())
            .catch(error => console.error('Error:', error))
            //.then(response => console.log('Success:', response));
    }
};