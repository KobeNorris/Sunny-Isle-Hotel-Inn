<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'scykw1';
$password = 'Kobewkj990522#';
// $dsn = 'mysql:host=localhost;dbname=test';
// $user = 'root';
// $password = 'root';

$username = $_POST["username"];
$realname = $_POST["realname"];
$passport = $_POST["passport"];
$telephone = $_POST["telephone"];
$email = $_POST["email"];
$userpw = $_POST["password1"];
$checpw = $_POST["password2"];
$unflag = 0;

if($unflag == 0) {
    try {
        $sql='UPDATE webuser SET Realname = :realname, Passport = :passport, Telephone = :telephone, Email = :email, Password = :userpw WHERE Username = :username';
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
        
        echo ("Successfully");
    } catch (PDOException $error) {
        echo 'SQL Query:'.$sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }
}

$dbh = NULL;
?>