<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'scykw1';
$password = 'Kobewkj990522#';

$username = $_POST["username"];
$unflag = 0;

try {
    $sql='select Username from webuser';
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        if($row['Username'] == $username) {
            echo("Duplicate");
            $unflag = 1;
            break;
        }
    }
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}
if ($unflag == 0) {
    echo("Unique");
}

$dbh = NULL;
?>