<?php
class MySQL { 
    protected $PDO;
    protected $table;
    public function __construct( $options ) {
		try{
			$drive = 'mysql:host=' . $options['server'] . ';port=' . $options['port'] . ';dbname=' . $options['db'] . ';charset=utf8mb4;';

			$this->PDO = new PDO( $drive, $options['user'], $options['pass']);
			$this->PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->PDO->setAttribute(PDO::ATTR_EMULATE_PREPARES, true);
			$this->table = $options['table'];
			return false;
		} catch (Exception $e) {
			throw new Exception('Database connection error...');
		}
    }

    public function test(){
    	$sth = $this->PDO->prepare('SELECT version() as version');  
    	$sth->execute(); 	
    	return $sth->fetchAll();
    }

    public function post( $array ){

    	$to_create = array();
    	$to_update = array();

    	// SPLIT ARRAY TO CORRECT METHODS ARRAYS
		foreach ($array as $key => $data) {
			$exists = $this->get(array(array(
				'oferta' =>  $data['oferta'],
				'pagina' =>  $data['pagina'],
				'aluno' =>   $data['aluno'],
				'campo' =>   $data['campo']
			)));
			if( count($exists) ){
				$data['id'] = $exists[0]['id'];
				$to_update[] = $data;
			}else{
				$to_create[] = $data;
			}
    	}			

    	// UPDATE
		$SQL = "";
		$values = array();

    	foreach ($to_update as $key => $value) {
    		$SQL .= "UPDATE ". $this->table . " SET " .
					"valor = :valor_up_{$key}, ".
					"data_modificacao = :modified_up_{$key} ".
					"WHERE id = :id_up_{$key}; ";
			$values = array_merge( $values, array(
				":valor_up_{$key}" 	=> $value['valor'], 
				":modified_up_{$key}" => date('Y-m-d H:i:s'),
				":id_up_{$key}" 		=> $value['id']
			) );
    	}

		if( !empty($SQL) ){

			$sth = $this->PDO->prepare($SQL); 
			$sth->execute($values); 

	 		if (!$sth) {
			    echo "\nPDO::errorInfo():\n";
			    print_r($sth->errorInfo());
			    return $sth->errorInfo();
			}
    	}	

		// CREATE
		$SQL = "";
		$values = array();

    	foreach ($to_create as $key => $value) {
    		$SQL .= 'INSERT INTO '. $this->table . ' ( ' .
						"oferta, pagina, pagina_oferta, aluno, campo, valor, data_criacao, data_modificacao )".
						" VALUES ( :oferta_new_{$key}, :pagina_new_{$key}, :pagina_oferta_new_{$key}, :aluno_new_{$key}, :campo_new_{$key}, :valor_new_{$key}, :created_new_{$key}, :modified_new_{$key} ); ";
			$values = array_merge( $values, array(
				":oferta_new_{$key}" 		=> $value["oferta"], 
				":pagina_new_{$key}" 		=> $value["pagina"], 
				":pagina_oferta_new_{$key}" => $value["pagina_oferta"],			
				":aluno_new_{$key}" 		=> $value["aluno"], 
				":campo_new_{$key}" 		=> $value["campo"], 
				":valor_new_{$key}" 		=> $value["valor"], 
				":created_new_{$key}" 		=> date("Y-m-d H:i:s"),
				":modified_new_{$key}"		=> date("Y-m-d H:i:s")
			) );
    	}

		if( !empty($SQL) ){

			$sth = $this->PDO->prepare($SQL); 
			$sth->execute($values); 

	 		if (!$sth) {
			    echo "\nPDO::errorInfo():\n";
			    print_r($sth->errorInfo());
			    return $sth->errorInfo();
			}
    	}

    	//return $sth->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function get( $array = array() ) {

    	$SQL = "";
		$values = array();
		$return = array();

    	foreach ($array as $key => $data) {
    		$SQL = 'SELECT * FROM ' . $this->table . " ".
    					"WHERE oferta = :oferta_$key AND pagina = :pagina_$key AND aluno = :aluno_$key AND campo = :campo_$key; " ;
			$values = array(
				":oferta_{$key}" 		=> $data["oferta"], 
				":pagina_{$key}" 		=> $data["pagina"], 			
				":aluno_{$key}" 		=> $data["aluno"], 
				":campo_{$key}" 		=> $data["campo"]
			);

			$sth = $this->PDO->prepare($SQL); 
			$sth->execute($values); 
    		$return = array_merge($return, $sth->fetchAll(PDO::FETCH_ASSOC));
    	}

    	return $return;
    } 
} 


?>