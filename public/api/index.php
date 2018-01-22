<?php
require ( './app/utils.php');

// check if the server is FGV
if( 
	!preg_match("/entreoutros\.com/i", $_SERVER['HTTP_HOST']) &&
	!$_SERVER['HTTP_HOST'] == 'locahost'
	){ die('403'); }

require ( './config.php');
require ( './app/app.php');

$app = new App($config);
$app->processRequest();

?>