var roomType;
var Checkin;
var Checkout;
var username;
var roomList = [];
var orderedList = [];

var test = "";

window.onload = function () {
    if (window.XMLHttpRequest)
        var xmlhttp = new XMLHttpRequest();
    else
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $info = JSON.parse(xmlhttp.responseText)
            if ($info['count'] == 4) {
                roomType = $info['roomType'];
                Checkin = $info['Checkin'];
                Checkout = $info['Checkout'];
                username = $info['username'];
                getroomList();
            } else {
                window.location.href = "../Bookhotel/Bookhotel.html";
            }
        }
        else if (xmlhttp.readyState == 4 && xmlhttp.status != 200)
            console.error(xhr.status);
    }
    xmlhttp.open("POST", "getInfoSS.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function getroomList() {
    if (window.XMLHttpRequest)
        var xmlhttp = new XMLHttpRequest();
    else
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            $info = JSON.parse(xmlhttp.responseText)
            roomList = $info;
            refresh(0);
        }
        else if (xmlhttp.readyState == 4 && xmlhttp.status != 200)
            console.error(xhr.status);
    }
    xmlhttp.open("POST", "SelectRoom.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("roomType=" + roomType + "&Checkin=" + Checkin + "&Checkout=" + Checkout);
}

function refresh(level) {
    for (var index = 0; index < roomList[level].length; index = index + 1) {
        var roomIndex = roomList[level][index]['Roomnumber'];
        if (roomIndex.length < 2) {
            roomIndex = "R0" + roomIndex;
        } else {
            roomIndex = "R" + roomIndex;
        }
        if (roomList[level][index]['Status'] == 'Occupied') {
            document.getElementById(roomIndex).setAttribute("class", "occupiedRoomBlock");
            document.getElementById(roomIndex).setAttribute("onclick", "");
        } else if (roomList[level][index]['Status'] == 'Ordered') {
            document.getElementById(roomIndex).setAttribute("class", "orderedRoomBlock");
            document.getElementById(roomIndex).setAttribute("onclick", "disbookRoom(event)");
        } else {
            document.getElementById(roomIndex).setAttribute("class", "emptyRoomBlock");
            document.getElementById(roomIndex).setAttribute("onclick", "bookRoom(event)");
        }
    }
}

function bookRoom(event) {
    event.target.setAttribute("class", "orderedRoomBlock");
    event.target.setAttribute("onclick", "disbookRoom(event)");
    var roomLevel = document.getElementById("floorNumber").innerHTML;
    var roomNumber = event.target.innerHTML;
    var int_roomLevel = parseInt(roomLevel);
    for (var i = 0; i < roomList[int_roomLevel - 1].length; i = i + 1) {
        if (roomList[int_roomLevel - 1][i]['Roomnumber'] == roomNumber) {
            roomList[int_roomLevel - 1][i]['Status'] = 'Ordered';
            orderedList.push(roomList[int_roomLevel - 1][i]);
            break;
        }
    }

    dispalyOrder();
    document.getElementById("numberOfRoom").innerHTML = ": " + orderedList.length + " rooms";
}

function disbookRoom(event) {
    event.target.setAttribute("class", "emptyRoomBlock");
    event.target.setAttribute("onclick", "bookRoom(event)");
    var roomLevel = document.getElementById("floorNumber").innerText;
    var roomNumber = event.target.innerHTML;
    var int_roomLevel = parseInt(roomLevel);
    for (var i = 0; i < roomList[int_roomLevel - 1].length; i = i + 1) {
        if (roomList[int_roomLevel - 1][i]['Roomnumber'] == roomNumber) {
            roomList[int_roomLevel - 1][i]['Status'] = 'Empty';
            orderedList = removeElement(orderedList, roomNumber, roomLevel);
            break;
        }
    }

    dispalyOrder();
    document.getElementById("numberOfRoom").innerHTML = ": " + orderedList.length + " rooms";
}

function removeFromOrderedList(numberOfOrderedRoom) {
    if (numberOfOrderedRoom[0] == "0") {
        var roomLevel = numberOfOrderedRoom[1];
    } else {
        var roomLevel = numberOfOrderedRoom[0] + numberOfOrderedRoom[1];
    }
    if (numberOfOrderedRoom[2] == "0") {
        var roomNumber = numberOfOrderedRoom[3];
    } else {
        var roomNumber = numberOfOrderedRoom[2] + numberOfOrderedRoom[3];
    }
    var int_roomLevel = parseInt(roomLevel);
    var int_roomNumber = parseInt(roomNumber);
    for (var i = 0; i < roomList[int_roomLevel - 1].length; i = i + 1) {
        if (roomList[int_roomLevel - 1][i]['Roomnumber'] == roomNumber) {
            roomList[int_roomLevel - 1][i]['Status'] = 'Empty';
            orderedList = removeElement(orderedList, roomNumber, roomLevel);
            break;
        }
    }

    dispalyOrder();
    document.getElementById("numberOfRoom").innerHTML = ": " + orderedList.length + " rooms";
    var previousLevel = document.getElementById("floorNumber").innerHTML;
    previousLevel = parseInt(previousLevel);
    refresh(previousLevel - 1);
}

function dispalyOrder() {
    var innerContain = "";

    for (var t = 0; t < orderedList.length; t++) {
        Roomlevel = orderedList[t]['Roomlevel'];
        Roomnumber = orderedList[t]['Roomnumber'];
        if (Roomlevel < 10)
            Roomlevel = "0" + Roomlevel;
        if (Roomnumber < 10)
            Roomnumber = "0" + Roomnumber;
        var number = Roomlevel + "" + Roomnumber;
        innerContain = innerContain + '<button class="roomButton" onclick="removeFromOrderedList(\'' + number + '\')">' + number + '&nbsp;&nbsp;&nbsp;&nbsp;' + roomType + '</button><br />';
    }
    document.getElementById("orderedList").innerHTML = innerContain;
}

function removeElement(_arr, _obj0, _obj1) {
    var length = _arr.length;
    _obj0 = _obj0 + "";
    _obj1 = _obj1 + "";
    _obj0 = parseInt(_obj0);
    _obj1 = parseInt(_obj1);
    for (var i = 0; i < length; i++) {
        if (_arr[i]['Roomnumber'] == _obj0 && _arr[i]['Roomlevel'] == _obj1) {
            if (i == 0) {
                temp = _arr.shift();
                break;
            }
            else if (i == length - 1) {
                _arr.pop();
                break;
            }
            else {
                _arr.splice(i, 1);
                break;
            }
        }
    }

    return _arr;
}

function backButton() {
    window.location.href = "../Bookhotel/Bookhotel.html";
}

function confirmButton() {
    Setcookie("orderedList", orderedList);
    window.location.href = "ViewOrder.html";
}


function Setcookie(name, value) {
    var expdate = new Date();  
    expdate.setTime(expdate.getTime() + 3600 * 12 * 1000);   
    value = JSON.stringify(value);
    document.cookie = name + "=" + value + ";expires=" + expdate.toGMTString() + ";path=/";
}

function foolrSub() {
    var number = document.getElementById("floorNumber").innerHTML;
    number = parseInt(number);
    if (number > 1) {
        number = number - 1;
        refresh(number - 1);
    } else {
        refresh(number - 1);
    }
    document.getElementById("floorNumber").innerHTML = number;
}

function foolrAdd() {
    var number = document.getElementById("floorNumber").innerHTML;
    number = parseInt(number);
    if (number < 10) {
        number = number + 1;
        refresh(number - 1);
    } else {
        refresh(number - 1);
    }
    document.getElementById("floorNumber").innerHTML = number;
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