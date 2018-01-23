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
	
	public function checkTables(){
		$sth = $this->PDO->prepare( "CREATE TABLE IF NOT EXISTS users (".
															"`id` int(11) NOT NULL auto_increment, PRIMARY KEY(id),".
															"`user` varchar(250) NOT NULL default '',".
															"`psw` varchar(250) NOT NULL default ''".
														")" );
		$sth->execute(); 

		$sth = $this->PDO->prepare( "CREATE TABLE IF NOT EXISTS histories (".
														"`id` int(11) NOT NULL auto_increment, PRIMARY KEY(id),".
														"`user` varchar(250) NOT NULL default '',".
														"`history` LONGTEXT NOT NULL default ''".
													")" );
		$sth->execute(); 													
	}

    public function saveUser( $data ){
		$this->checkTables();

    	$to_create = false;
    	$to_update = false;

		$exists = $this->getUser($data);

		if( empty( count($exists) ) ){
			// CREATE

			$SQL = "INSERT INTO users ( user, psw )".
						" VALUES ( :user, :psw )";
			$values =  array(
				":user" 	=> $data["user"], 
				":psw" 		=> $data["psw"]
			);

			if( !empty($SQL) ){
				$sth = $this->PDO->prepare($SQL); 
				$sth->execute($values); 

				if (!$sth) {
					echo "\nPDO::errorInfo():\n";
					print_r($sth->errorInfo());
					return $sth->errorInfo();
				}
			}
		}else{
			return "Just exists";
		}
		
		return false;
    }
	
	public function getUser( $data ){
		$this->checkTables();

		$return = array();

		$SQL = "SELECT * FROM users WHERE user = :user " ;
		$values = array(
			":user" => $data["user"]
		);

		$sth = $this->PDO->prepare($SQL); 
		$sth->execute($values); 
		$return = array_merge($return, $sth->fetchAll(PDO::FETCH_ASSOC));

		return array_shift( $return );
	}

	public function saveHistory( $data ){
		$this->checkTables();

    	$to_create = false;
    	$to_update = false;

		$exists = $this->getHistory( $data );

		if( empty( count($exists) ) ){
			// CREATE

			$SQL = "INSERT INTO histories ( user, history )".
						" VALUES ( :user, :history )";
			$values =  array(
				":user" 	=> $data["user"], 
				":history" 	=> $data["history"]
			);

			$sth = $this->PDO->prepare($SQL); 
			$sth->execute($values); 

			if (!$sth) {
				echo "\nPDO::errorInfo():\n";
				print_r($sth->errorInfo());
				return $sth->errorInfo();
			}
		}else{
			// UPDATE
			
			$SQL = "UPDATE histories SET " .
						"user = :user, ".
						"history = :history ".
						"WHERE id = :id; ";

			$values = array(
				":user" 	=> $data["user"], 
				":history" 	=> $data["history"],
				":id" 	    => $exists['id']
			);

			return "Just exists";
		}

    	return false;
    }

	public function getHistory( $data ){
		$this->checkTables();
		
		$return = array();

		$SQL = "SELECT * FROM histories WHERE user = :user " ;
		$values = array(
			":user" => $data["user"]
		);

		$sth = $this->PDO->prepare($SQL); 

		$sth->execute($values); 
		$return = array_merge($return, $sth->fetchAll(PDO::FETCH_ASSOC));

		return array_shift( $return );
	}

} 


?>