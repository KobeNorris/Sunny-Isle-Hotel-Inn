<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';

$username = $_POST["username"];
$realname = $_POST["realname"];
$passport = $_POST["passport"];
$telephone = $_POST["telephone"];
$email = $_POST["email"];
$userpw = $_POST["password1"];
$checpw = $_POST["password2"];
$guest = "guest";
$unflag = 0;

try {
    $sql='select Username from webuser';
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        if($row['Username'] == $username) {
            echo("Duplicate username");
            $unflag = 1;
            break;
        }
    }
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}

if($unflag == 0 && $userpw != $checpw) {
    echo ("diff password");
    $unflag = 1;
}

if($unflag == 0) {
    try {
        $sql='insert into webuser values (:username,:realname,:passport,:telephone,:email,:userpw,"'.$guest.'");';
        $dbh=new PDO($dsn,$user,$password);
        $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $stmt=$dbh->prepare($sql);
        $stmt->bindParam('username',$username);
        $stmt->bindParam('realname',$realname);
        $stmt->bindParam('passport',$passport);
        $stmt->bindParam('telephone',$telephone);
        $stmt->bindParam('email',$email);
        $stmt->bindParam('userpw',$userpw);
        $stmt->execute();
        
        setcookie('username',$username,time()+3600*12,'/');
        setcookie('password',$userpw,time()+3600*12,'/');
        echo ("Successfully");
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

$dbh = NULL;
?>