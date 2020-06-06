<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';

$Content = $_POST['Content'];
$Content = rawurldecode($Content);
$Content = json_decode($Content);

try {
    $sql="INSERT INTO `orders`(`Roomlevel`,`Roomnumber`,`Username`,`Checkin`,`Checkout`) VALUES ";

    for($count = 0; $count < sizeof($Content) - 1; $count = $count + 1) {
        $sql = $sql."(".$Content[$count]->Roomlevel.",".$Content[$count]->Roomnumber.",'".$Content[$count]->username."','".$Content[$count]->Checkin."','".$Content[$count]->Checkout."'),";
    }
    $count = sizeof($Content) - 1;
    $sql = $sql."(".$Content[$count]->Roomlevel.",".$Content[$count]->Roomnumber.",'".$Content[$count]->username."','".$Content[$count]->Checkin."','".$Content[$count]->Checkout."');";

    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo ("done");
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}

$n_dbh = NULL;
?>