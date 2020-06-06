<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';

try {
    $sql='select * from orders Order By Username ASC, Roomlevel asc, Roomnumber ASC, Checkin ASC';
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    $orderList = array();
    $temp = array();
    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        $temp['username'] = $row['Username'];
        $temp['Roomlevel'] = $row['Roomlevel'];
        $temp['Roomnumber'] = $row['Roomnumber'];
        $temp['Checkin'] = $row['Checkin'];
        $temp['Checkout'] = $row['Checkout'];
        array_push($orderList, $temp);
        $temp = array();
    }
    echo JSON_encode($orderList);
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}

$dbh = NULL;
?>