<?php
class Router {
    protected $rules = array();
    
    public function __construct( $options = array() ) {

    }

    public function addRule( $method, $path, $callback ){
        array_push(
            $this->rules,
            (object) array( 
                "method" => $method,
                "path" => str_replace("/", "\/", $path),
                "callback" => $callback
            ) );
    }

    public function process(  $method, $path, $vars ){
        $result = false;
        $method = strtolower( $method );
        foreach( $this->rules as $rules ){
            $regExp = ( "/" . $rules->path . "/i" );
            if( !$result && ( $rules->method == "all" || $rules->method == $method ) && preg_match( $regExp, $path ) ){
                $result = call_user_func( $rules->callback, $vars );
                break;
            }
        }
        return $result;
    }
}