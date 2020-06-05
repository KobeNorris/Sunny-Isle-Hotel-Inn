var username;
var date;

window.onload = function () {
    var flag = 0;

    var dat = new Date();
    var nianD = dat.getFullYear();
    var yueD = dat.getMonth() + 1;
    var tianD = dat.getDate();
    // alert(tianD);
    if(yueD < 10) {
        yueD = "0" + yueD;
    }
    if (tianD < 10) {
        // alert("Yes");
        tianD = "0" + tianD;
    }
    date = "" + nianD + yueD + tianD;

    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++){
        var aCrumb = aCookie[i].split("=");
        if ("username" == aCrumb[0]){
            username = aCrumb[1];
            flag = 1;
            break;
        }
    }
    if(flag == 0)
        window.location.href = "../index.php";
    getOrderMO(username);
}

function getOrderMO(username) {
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var roomList = JSON.parse(xmlhttp.responseText);
            var innerContain = "";
            for (var t = 0; t < roomList.length; t++) {
                var Roomlevel = roomList[t]['Roomlevel'];
                var Roomnumber = roomList[t]['Roomnumber'];
                var Checkin = roomList[t]['Checkin'];
                var Checkout = roomList[t]['Checkout'];
                if(Roomlevel < 10)
                    n_Roomlevel = "0" + Roomlevel;
                else
                    n_Roomlevel = Roomlevel;
                if(Roomnumber < 10)
                    n_Roomnumber = "0" + Roomnumber;
                else
                    n_Roomnumber = Roomnumber;
                var number = n_Roomlevel + "" + n_Roomnumber;

                if(Roomnumber == "13"){
                    roomType = "VIP Room";
                } else if(Roomnumber == "12" || Roomnumber == "11" || Roomnumber == "01" || Roomnumber == "02"){
                    roomType = "Large Double Bed Room";
                } else if(Roomnumber == "10" || Roomnumber == "09" || Roomnumber == "03" || Roomnumber == "04"){
                    roomType = "Large Single Bed Room";
                } else{
                    roomType = "Small Single Bed Room";
                }

                var n_Checkin = Checkin[0]+Checkin[1]+Checkin[2]+Checkin[3]+"/ "+Checkin[4]+Checkin[5]+"/"+Checkin[6]+Checkin[7];
                var n_Checkout = Checkout[0]+Checkout[1]+Checkout[2]+Checkout[3]+"/"+Checkout[4]+Checkout[5]+"/"+Checkout[6]+Checkout[7];

                if(date < Checkin){
                    innerContain = innerContain + '<button class="futrueRoom" onmouseover="showRoom(\'' + number + '\')" onmouseout="disShowRoom(\'' + number + '\')" onclick = "deleteRoom('+ Roomlevel + ',' + Roomnumber + ',' + Checkin + ',\'' + number + '\')">' + number + '&nbsp;&nbsp;&nbsp;&nbsp;' + roomType + '&nbsp;&nbsp;&nbsp;&nbsp;' + n_Checkin + '&nbsp;&nbsp;&nbsp;&nbsp;' + n_Checkout + '</button><br />';
                } else if(date > Checkout){
                    innerContain = innerContain + '<button class="overduedRoom" onmouseover="showRoom(\'' + number + '\')" onmouseout="disShowRoom(\'' + number + '\')" onclick = "deleteRoom('+ Roomlevel + ',' + Roomnumber + ',' + Checkin + ',\'' + number + '\')">' + number + '&nbsp;&nbsp;&nbsp;&nbsp;' + roomType + '&nbsp;&nbsp;&nbsp;&nbsp;' + n_Checkin + '&nbsp;&nbsp;&nbsp;&nbsp;' + n_Checkout + '</button><br />';
                } else {
                    innerContain = innerContain + '<button class="ongoingRoom" onmouseover="showRoom(\'' + number + '\')" onmouseout="disShowRoom(\'' + number + '\')" onclick = "deleteRoom('+ Roomlevel + ',' + Roomnumber + ',' + Checkin + ',\'' + number + '\')">' + number + '&nbsp;&nbsp;&nbsp;&nbsp;' + roomType + '&nbsp;&nbsp;&nbsp;&nbsp;' + n_Checkin + '&nbsp;&nbsp;&nbsp;&nbsp;' + n_Checkout + '</button><br />';
                }
            }
            document.getElementById("roomList").innerHTML = innerContain;
        }
    }
    xmlhttp.open("POST", "./getOrderMO.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username);
}

function deleteRoom(Roomlevel, Roomnumber, Checkin, number) {
    if(confirm("Are you sure to delete this order?") == false)
        return;
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText == "done"){
                getOrderMO(username);
                disShowRoom(number);
            }
        }
    }
    xmlhttp.open("POST", "deleteOrder.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("Roomlevel=" + Roomlevel + "&Roomnumber=" + Roomnumber + "&Checkin=" + Checkin);
}

function back(){
    // window.location.href = "../MyProfile/Myprofile.html";
    window.history.back(-1);
}

function logOut(){
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            window.location.href = "../index.php";
        }
    }
    xmlhttp.open("POST", "logOut.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function showRoom(number) {
    var partNumberKeeper = number.split("", 4);
    if(partNumberKeeper[0] == "0")
        var Rlevel = partNumberKeeper[1];
    else
        var Rlevel = partNumberKeeper[0] + partNumberKeeper[1];
    var Rnumber = "R" + partNumberKeeper[2] + partNumberKeeper[3];
    document.getElementById(Rnumber).setAttribute("style", "background-color: cornflowerblue;");
    document.getElementById("R14").innerHTML = Rlevel + "th floor";
}

function disShowRoom(number) {
    var partNumberKeeper = number.split("", 4);
    var Rnumber = "R" + partNumberKeeper[2] + partNumberKeeper[3];
    document.getElementById(Rnumber).setAttribute("style", "background-color: white;");
    document.getElementById("R14").innerHTML = "Stairs and Looby";
}

function jump2RA() {
    window.location.href = "../RegisterAccount/RegisterAccount.html";
}function JUMP2SS() {
    window.location.href = "../StuffSignin/StuffSignin.html";
}function JUMP2HP() {
    window.location.href = "../index.php";
}function JUMP2MP() {
    window.location.href = "../MyProfile/Myprofile.html";
}