<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';
// $dsn = 'mysql:host=localhost;dbname=test';
// $user = 'root';
// $password = 'root';

$Username = $_POST['username'];
try {
    $sql="select * from orders where Username='$Username' Order By Checkin ASC,Roomlevel ASC,Roomnumber ASC;";
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    
    $message = array();
    while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        $temp = array(
            'Roomlevel'=>$row['Roomlevel'],
            'Roomnumber'=>$row['Roomnumber'],
            'Checkin'=>$row['Checkin'],
            'Checkout'=>$row['Checkout'],
        );
        array_push($message, $temp);
    }
    echo json_encode($message);
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}

$dbh = NULL;
?>