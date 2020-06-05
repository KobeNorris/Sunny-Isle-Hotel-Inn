var orderedList = [];
var username = "";
var roomType = "";
var Checkin = "";
var Checkout = "";

window.onload = function () {
    orderedList = getCookie("orderedList");
    orderedList = JSON.parse(orderedList);
    username = getCookie("username");
    roomType = getCookie("roomType");

    if (window.XMLHttpRequest)
        var xmlhttp = new XMLHttpRequest();
    else
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            roomInfo = JSON.parse(xmlhttp.responseText)
            if (roomInfo['count'] == 4) {
                roomType = roomInfo['roomType'];
                numberOfRoom = orderedList.length;
                Checkin = roomInfo['Checkin'];
                var inYear = Checkin[0] + Checkin[1] + Checkin[2] + Checkin[3];
                var inMonth = Checkin[4] + Checkin[5];
                var inDay = Checkin[6] + Checkin[7];
                Checkout = roomInfo['Checkout'];
                var outYear = Checkout[0] + Checkout[1] + Checkout[2] + Checkout[3];
                var outMonth = Checkout[4] + Checkout[5];
                var outDay = Checkout[6] + Checkout[7];
                username = roomInfo['username'];
                document.getElementById("orderInfo").innerHTML = numberOfRoom + "&nbsp;&nbsp;rooms in total, from&nbsp;&nbsp;&nbsp;&nbsp;" + inYear + "/" + inMonth + "/" + inDay + "&nbsp;&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;&nbsp;" + outYear + "/" + outMonth + "/" + outDay + "&nbsp;&nbsp;.";
                getOrderAS();
            } else {
                window.location.href = "../Bookhotel/Bookhotel.html";
            }
        }
        else if (xmlhttp.readyState == 4 && xmlhttp.status != 200)
            console.error(xhr.status);
    }
    xmlhttp.open("POST", "lastGetInfoSS.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1)
                c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function getOrderAS() {
    var roomList = orderedList
    var innerContain = "";
    for (var t = 0; t < roomList.length; t++) {
        Roomlevel = roomList[t]['Roomlevel'];
        Roomnumber = roomList[t]['Roomnumber'];
        if (Roomlevel < 10)
            Roomlevel = "0" + Roomlevel;
        if (Roomnumber < 10)
            Roomnumber = "0" + Roomnumber;
        var number = Roomlevel + "" + Roomnumber;
        innerContain = innerContain + '<button class="roomButton" onmouseover="showRoom(\'' + number + '\')" onmouseout="disShowRoom(\'' + number + '\')">' + number + '&nbsp;&nbsp;&nbsp;&nbsp;' + roomType + '</button><br />';
    }
    document.getElementById("roomList").innerHTML = innerContain;
    addOrder(roomList, Checkin, Checkout, username);
}

function addOrder(roomList, Checkin, Checkout, username) {
    var Content = new Array(roomList.length);

    for (var t = 0; t < roomList.length; t++) {
        Content[t] = {
            'Roomlevel': roomList[t].Roomlevel,
            'Roomnumber': roomList[t].Roomnumber,
            'username': username,
            'Checkin': Checkin,
            'Checkout': Checkout
        }
    }

    Content = JSON.stringify(Content);
    Content = encodeURIComponent(Content);

    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "done") {
                return;
            }
        }
        else if (xmlhttp.readyState == 4 && xmlhttp.status != 200)
            console.error(xhr.status);
    }
    xmlhttp.open("POST", "addOrder.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("Content=" + Content);
}

function reBook() {
    window.location.href = "../Bookhotel/Bookhotel.html";
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

    if (partNumberKeeper[0] == "0")
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