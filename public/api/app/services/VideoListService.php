<?php

class VideoListService {
    protected $tempFolder = "./temp/";
    protected $url = "https://sela-test.herokuapp.com/assets/hkzxv.json";

    // get VideoList JSON
    public function load( $url = false ){
        $url = $url ? $url : $this->url ;
        $content = "";

        // try get cached data
        $cached = $this->loadCache( $url );
        if( !empty( $cached ) ){
            $content = $cached;
        }else{
            // if not cached, get from server and cache
            $content = $this->loadExternalJSON($url);
            $this->saveCache( $url, $content );
        }

        return json_decode($content);
    }

    // get and check cached List to avoid multiple cross-domain requests
    private function loadCache( $url ){
        $hashFile = md5( $url );
        $cachePath = $this->tempFolder . $hashFile . ".json";
        // check if cache file exists
        if( file_exists( $cachePath ) ){
            // get age of file in minutes
            $ageMinutes = (time() - filectime($cachePath))/60;
            // check if has less than 5 minutes
            if( $ageMinutes > 5 ){
                return file_get_contents( $cachePath );
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    private function saveCache( $url, $content ){
        $hashFile = md5( $url );
        $cachePath = $this->tempFolder . $hashFile . ".json";
        file_put_contents( $cachePath, $content );
    }

    // get external service JSON list
    private function loadExternalJSON( $url ){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_URL, $url);
        $result = curl_exec($ch);
        curl_close($ch);

        return $result;
    }
}