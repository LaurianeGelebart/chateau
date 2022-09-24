<?php
try{
    //Serveur Local
    $BDD=new PDO('mysql:host=chateanouessant.mysql.db;dbname=chateanouessant','chateanouessant','Ch4teau0uessant',
    //array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
}

catch(PDOException $e){
    die('Erreur :'.$e->getMessage());
}

?>





