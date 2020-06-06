<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';

$username = $_POST["username"];
$userpw = $_POST["password"];
$flag = 0;

try {
    $sql='select * from webuser where username=:username';
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->bindParam('username',$username);
    $stmt->execute();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        if($row['Username'] == $username) {
            if($row['Password'] == $userpw) {
                if($row['Type'] == "guest"){
                    
                    setcookie('username',$username,time()+3600*12,'/'); //12 hours' cookies
                    setcookie('password',$userpw,time()+3600*12,'/');

                    echo ("guest");
                    $flag = 1;
                    break;
                } else {
                    echo ("stuff");
                    $flag = 1;
                    break;
                }
            } else {
                echo ("falsepassword");
                $flag = 1;
                break;
            }
        }
    }
    if($flag == 0) {
        echo ("falseusername");
    }
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}

$dbh = NULL;
?>