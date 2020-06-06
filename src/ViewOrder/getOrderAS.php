<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$dsn = 'mysql:host=localhost;dbname=scykw1';
$user = 'team35';
$password = 'team35';

$roomType = $_POST['roomType'];
$numberOfRoom = $_POST['numberOfRoom'];
$Check_in = $_POST['Checkin'];
$Check_out = $_POST['Checkout'];

try {
    $sql="select * from rooms where Roomtype='$roomType' Order By Roomlevel ASC,Roomnumber ASC;";
    $dbh=new PDO($dsn,$user,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $stmt=$dbh->prepare($sql);
    $stmt->execute();
    
    $message = array();
    for ($count = 0; $count < $numberOfRoom;) {
        $row=$stmt->fetch(PDO::FETCH_ASSOC);
        if(checkRoom($row, $Check_in, $Check_out)) {
            $temp = array(
                'Roomlevel'=>$row['Roomlevel'],
                'Roomnumber'=>$row['Roomnumber'],
            );
            array_push($message, $temp);
            $count = $count + 1;
        }
    }
    echo json_encode($message);
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
            if(($Check_in >= $n_row['Checkout'] && $Check_out > $n_row['Checkout']) || ($Check_out < $n_row['Checkin'] && $Check_out <= $n_row['Checkin']))
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