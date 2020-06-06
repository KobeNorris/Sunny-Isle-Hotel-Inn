<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';

$roomType = $_POST['roomType'];
$Check_in = $_POST['Check_in'];
$Check_out = $_POST['Check_out'];
$NumberOfRoom = $_POST['NumberOfRoom'];


setcookie('roomType', $roomType, time()+3600*12, '/');
setcookie('numberOfRoom', $NumberOfRoom, time()+3600*12, '/');
setcookie('Checkin', $Check_in, time()+3600*12, '/');
setcookie('Checkout', $Check_out, time()+3600*12, '/');


try {
    $sql="select * from rooms where Roomtype='$roomType'";
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();

    $count = 0;
    while ($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
        if(checkRoom($row, $Check_in, $Check_out)){
            $count = $count + 1;
        }
    }
    echo ($count);
} catch (PDOException $error) {
    echo 'SQL Query:'.$sql.'</br>';
    echo 'Connection failed:'.$error->getMessage();
}

$dbh = NULL;

function checkRoom($selectRoom, $Check_in, $Check_out){
    $n_dsn = 'mysql:host=localhost;dbname=scykw1';
    $n_user = 'team35';
    $n_password = 'team35';

    $n_Roomlevel = $selectRoom['Roomlevel'];
    $n_Roomnumber = $selectRoom['Roomnumber'];

    $flag = 0;

    try {
        $n_sql="select * from orders where Roomlevel='$n_Roomlevel' AND Roomnumber='$n_Roomnumber'";
        $n_dbh=new PDO($n_dsn,$n_user,$n_password);
        $n_dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        $n_stmt=$n_dbh->prepare($n_sql);
        $n_stmt->execute();

        while ($n_row=$n_stmt->fetch(PDO::FETCH_ASSOC)) {
            if(($Check_in > $n_row['Checkout'] && $Check_out > $n_row['Checkout']) || ($Check_out < $n_row['Checkin'] && $Check_out < $n_row['Checkin']))
                ;
            else {
                return FALSE;
                $flag = 1;
                break;
            }
        }
        if($flag == 0) {
            return TRUE;
        }
    } catch (PDOException $error) {
        echo 'SQL Query:'.$n_sql.'</br>';
        echo 'Connection failed:'.$error->getMessage();
    }

    $n_dbh = NULL;
}
?>