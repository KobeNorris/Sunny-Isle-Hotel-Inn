<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';
// $dsn = 'mysql:host=localhost;dbname=test';
// $user = 'root';
// $password = 'root';

$Roomlevel = $_POST['Roomlevel'];
$Roomnumber = $_POST['Roomnumber'];
$Checkin = $_POST['Checkin'];

try {
    $sql="DELETE FROM orders WHERE Roomlevel = ".$Roomlevel." AND Roomnumber = ".$Roomnumber." AND Checkin = ".$Checkin.";";

    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo("done");
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}

$dbh = NULL;
?>