<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';
$SSR = 'Small Single Room';
$LSR = 'Large Single Room';
$LDR = 'Large Double Room';
$VIP = 'VIP Room';
$sql = 'Insert into rooms Values ';
for($i = 1; $i <= 10; $i++) {
    for($j = 1; $j <= 13; $j++) {
        if($j == 13) {
            if($i == 10)
                $sql = $sql."('$i', '$j', '$VIP');";
            else
                $sql = $sql."('$i', '$j', '$VIP'), ";
        } else if($j <= 8 && $j >= 5) {
            $sql = $sql."('$i', '$j', '$SSR'), ";
        } else if($j <= 10 && $j >= 3) {
            $sql = $sql."('$i', '$j', '$LSR'), ";
        } else {
            $sql = $sql."('$i', '$j', '$LDR'), ";
        }
    }
}

try {
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    echo("Done");
    
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}

$dbh = NULL;
?>