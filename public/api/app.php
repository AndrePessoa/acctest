<?php

//phpinfo();
//die();

require ( 'mysql.php');
require ( 'router.php');
require ( 'services/VideoListService.php' );

class App { 
	protected $db;
	protected $config;

	public function __construct( $config ) 
	{
		try{
			$this->config = $config;
			//$this->db = new MySQL($config);
		} catch (Exception $e) {
		    $this->render( 'Caught exception: ',  $e->getMessage(), true );
		    die();
		}
	}

	public function processRequest(){
		//if( empty($this->db) ){ $this->db = new MySQL($this->config); }

		/*
		try{	
			switch ( $_SERVER['REQUEST_METHOD'] ) {
				case 'POST':
					$array = $this->extract_post();	

					$validate = $this->validadeKeyData( $array );

					if( count( $validate['valid'] ) > 0 ){
						$this->db->post( $validate['valid'] );
						$validate['valid'] = $this->digestReturn( $this->db->get( $validate['valid'] ) );
						$this->render( $validate );
					}else{
						$this->render( $validate );
					}

					break;
				case 'GET':
					$array = $this->extract_get();
					$validate = $this->validadeKeyData( $array );

					if( count( $validate['valid'] ) > 0 ){
						$validate['valid'] = $this->digestReturn( $this->db->get( $validate['valid'] ) );
						$this->checkNotFound( $array, $validate );
						$this->render( $validate );
					}else{
						$this->render( $validate );
					}
					
					break;
				default:
					# code...
					break;
			}
		} catch (Exception $e) {
		    $this->render( 'Caught exception: ',  $e->getMessage(), true );
		}*/

		$router = new Router();
		$router->addRule( "get", "/videos-list", function(){ 
			$service = new VideoListService();
			$json = $service->load();
			return !empty( $json ) ? $json : "Ups";
		} );
		$router->addRule( "all", "/", function(){ return "Just ok. API working..."; } );
		
		$result = $router->process( $_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI'], $_REQUEST );
		if( !$result ){
			$this->render( 'Route not found', 404 );
		    die();
		}else{
			$this->render( $result );			
		}
	}

	public function extract_get(){
		$array = $_GET;

		if( isset($array['oferta']) ){
			$array = array( array(
				'oferta' => $array['oferta'],
				'pagina' => $array['pagina'],
				'aluno' => $array['aluno'],
				'campo' => $array['campo']
			) );
		}else{
			$array = $_GET;		
		}
		return $array;
	}

	public function extract_post(){
		$array = $_POST;

		if( isset($array['oferta']) ){
			$array = array( array(
				'oferta' => $array['oferta'],
				'pagina' => $array['pagina'],
				'pagina_oferta' => $array['pagina_oferta'],
				'aluno' => $array['aluno'],
				'campo' => $array['campo'],
				'valor' => $array['valor']
			) );
		}else{
			$array = $_POST;		
		}
		return $array;
	}

	public function validadeKeyData( $array ){
		$valid = array();
		$error = array();

		foreach ($array as $key => $input) {
			$errors = array();
			if( preg_match( '/[^A-Za-z0-9]|^$/', $input['oferta'] ) ) $errors[] = 'oferta';
			if( preg_match( '/[^A-Z0-9a-z_\-]|^$/', $input['pagina'] ) ) $errors[] = 'pagina';
			if( preg_match( '/[^A-Z0-9a-z\_\-\.]|^$/', $input['aluno'] ) ) $errors[] = 'aluno';
			if( preg_match( '/^[0-9\_\-]|[^A-Z0-9a-z\_\-]|^$/', $input['campo'] ) ) $errors[] = 'campo';
			if( count( $errors ) ){
				$unique_key = $this->genUniqueKey( $input );
				$error[ $unique_key ] = "Invalid values: " . implode(', ', $errors);
			}else{
				$unique_key = $this->genUniqueKey( $input );
				$valid[ $unique_key ] = $input;
			}
		}

		return array( 'valid' => $valid, 'error' => $error );
	}

	public function genUniqueKey( $data ){
		return $data[ 'campo' ] . "__" . $data[ 'pagina' ] . "__" . $data[ 'oferta' ];
	}

	public function digestReturn( $array ){
		$ret = array();
		foreach ($array as $key => $insert) {
			$unique_key = $this->genUniqueKey( $insert );
			$ret[ $unique_key ] = $insert;
		}
		return $ret;
	}
	public function checkNotFound( $array, &$result ){
		foreach ($array as $key => $input) {
			$unique_key = $this->genUniqueKey( $input );
			if( !array_key_exists($unique_key, $result['valid']) ){
				$result['error'][$unique_key] = "Not Found: " . $unique_key;
			}
		}
	}
	public function render( $data, $error = false ){
		if( $error ){
			switch( $error ){
				case 404:  header( "HTTP/1.1 404 Page Not Found" );
				default:   header( "HTTP/1.1 500 Server Error" );
			}
			header('Content-Type: application/json');
			echo json_encode( array( 'status' => 'error', 'result' => $data ) );
		} else {
			header( "HTTP/1.1 200 Success" );
			header('Content-Type: application/json');
			echo json_encode( array( 'status' => 'success', 'result' => $data ) );
		}
	}

}

?>