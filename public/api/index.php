<?php
require ( 'utils.php');

// check if the server is FGV
if( 
	!preg_match("/fgv\.br/i", $_SERVER['HTTP_HOST']) &&
	!$_SERVER['HTTP_HOST'] == 'locahost'
	){ die('403'); }

require ( 'config.php');
require ( 'app.php');

$app = new App($config);
$app->processRequest();

?>