<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';
// $dsn = 'mysql:host=localhost;dbname=test';
// $user = 'root';
// $password = 'root';

if (isset($_COOKIE['username'])){
    $username = $_COOKIE["username"];

    try {
        $sql="select * from webuser where Username='$username'";
        $dbh=new PDO($dsn,$user,$password);
        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $stmt=$dbh->prepare($sql);
        $stmt->execute();

        $profileInfo = array ();
        while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
            $profileInfo['Username'] = $row['Username'];
            $profileInfo['Realname'] = $row['Realname'];
            $profileInfo['Passport'] = $row['Passport'];
            $profileInfo['Telephone'] = $row['Telephone'];
            $profileInfo['Email'] = $row['Email'];
            $profileInfo['Password'] = $row['Password'];
        }
    echo JSON_encode($profileInfo);
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
} else {
    echo JSON_encode([]);
}

$dbh = NULL;
?>