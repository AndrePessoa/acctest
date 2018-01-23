<?php
require ( 'mysql.php');

class UserController {
	protected $config;

	public function __construct( $config ) 
	{		
		$this->config = $config;
    }
    
    public function singIn( $user, $psw ){
        $mysql = new MySQL($this->config);
        $error = $mysql->saveUser( array(
			'user' =>  $user,
			'psw' =>  md5( $psw )
		) );

        return $error ? false : (object) array( "user" => $user ) ;
    }   

    public function logIn( $user, $psw ){
        $mysql = new MySQL($this->config);
        $user = $mysql->getUser( array(
			'user' =>  $user
        ) );
        
        if( !empty( $user ) && $user['psw'] === md5( $psw ) ){
            return (object) array( "user" => $user['user'] ) ;
        }else{
            return false;
        }        
    }

    public function getHistory( $user ){
        $mysql = new MySQL($this->config);
        $user = $mysql->getUser( array(
            'user' =>  $user
        ) );
        
        if( !empty( $user ) ){
            $history = $mysql->getHistory( array(
                'user' =>  $user['user']
            ) );
            return (object) array( "user" => $user['user'], "history" => $history['history'] ) ;
        }else{
            return false;
        }  

    }

    public function saveHistory( $user, $history ){
        $mysql = new MySQL($this->config);
        $user = $mysql->getUser( array(
            'user' =>  $user
        ) );
        
        if( !empty( $user ) ){
            $error = $mysql->saveHistory( array(
                'user' =>  $user['user'],
                'history' => $history
            ) );
            return (object) array( "user" => $user['user'], "history" => $history ) ;
        }else{
            return false;
        }  

    }
}