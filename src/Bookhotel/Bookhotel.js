var roomType = "";
var roomList;


function JUMP2SS() {
    window.location.href = "../StuffSignin/StuffSignin.html";
} function JUMP2HP() {
    window.location.href = "../index.php";
} function JUMP2MP() {
    window.location.href = "../MyProfile/Myprofile.html";
}

function chooseType(roomType) {
    document.getElementById("selectType").innerHTML = "You choosed " + roomType + ", nice choice!";
    document.getElementById("selectType").style.color = "black";
    document.getElementById("confirm").value = roomType;
}

function timeSplit(tempInput) {
    var partTimeKeeper = tempInput.split(" ", 3);
    if (partTimeKeeper[1].length == 1) {
        partTimeKeeper[1] = "0" + partTimeKeeper[1];
    }
    if (partTimeKeeper[2].length == 1) {
        partTimeKeeper[2] = "0" + partTimeKeeper[2];
    }
    tempInput = partTimeKeeper[0] + partTimeKeeper[1] + partTimeKeeper[2];
    return tempInput;
}

document.getElementById("signinButton").onclick = function () {
    var context = document.getElementById("userProfile");
    if (context) {
        window.location.href = "../MyProfile/Myprofile.html";
    } else {
        setPathValue("../Bookhotel/Bookhotel.html");
    }
}

function nextStep() {
    var roomType = document.getElementById("confirm").value;
    var Check_in = document.getElementById("Check_in").value;
    var Check_out = document.getElementById("Check_out").value;
    var numberOfRoom = -1;
    if (document.getElementById("selectCheckN").checked) {
        numberOfRoom = document.getElementById("numberOfRooms").value;
        if (numberOfRoom > 0) {
            if (Check_in != "" && Check_out != "" && roomType != "") {
                Check_in = timeSplit(Check_in);
                Check_out = timeSplit(Check_out);
                document.getElementById("selectType").innerHTML = "You choosed " + roomType + ", nice choice!";
                document.getElementById("selectType").style.color = "black";
                if (!CheckTime(Check_in, Check_out)) {
                    return;
                }
                var xmlhttp;
                if (window.XMLHttpRequest)
                    xmlhttp = new XMLHttpRequest();
                else
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var roomCount = xmlhttp.responseText;
                        roomCount = parseInt(roomCount);
                        numberOfRoom = parseInt(numberOfRoom);
                        if (roomCount >= numberOfRoom) {
                            if (document.getElementById("username").value == "0") {
                                setPathValue("../ViewOrder/ViewOrder.html");
                            } else {
                                window.location.href = "../ViewOrder/ViewOrder.html";
                            }
                        } else {
                            document.getElementById("selectType").innerHTML = "Only " + roomCount + " rooms left, please change your choice.";
                            document.getElementById("selectType").style.color = "red";
                        }
                    }
                }
                xmlhttp.open("POST", "./Bookhotel.php", true);
                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xmlhttp.send("roomType=" + roomType + "&Check_in=" + Check_in + "&Check_out=" + Check_out + "&NumberOfRoom=" + numberOfRoom);
            } else {
                document.getElementById("selectType").innerHTML = "Please make full choice!";
                document.getElementById("selectType").style.color = "red";
            }
        }
    } else {
        if (Check_in != "" && Check_out != "" && roomType != "") {
            Check_in = timeSplit(Check_in);
            Check_out = timeSplit(Check_out);
            document.getElementById("selectType").innerHTML = "You choosed " + roomType + ", nice choice!";
            document.getElementById("selectType").style.color = "black";
            if (!CheckTime(Check_in, Check_out)) {
                return;
            }
            saveChoice(roomType, Check_in, Check_out);
        } else {
            document.getElementById("selectType").innerHTML = "Please make full choice!";
            document.getElementById("selectType").style.color = "red";
        }
    }
}

function saveChoice(roomType, Check_in, Check_out) {
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (document.getElementById("username").value == "0") {
                setPathValue("../SelectRoom/SelectRoom.html");
            } else {
                window.location.href = "../SelectRoom/SelectRoom.html";
            }
        }
    }
    xmlhttp.open("POST", "saveChoice.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("roomType=" + roomType + "&Check_in=" + Check_in + "&Check_out=" + Check_out);
}

function CheckTime(Check_in, Check_out) {
    var dat = new Date();
    var nianD = dat.getFullYear();
    var yueD = dat.getMonth() + 1;
    var tianD = dat.getDate();
    if (yueD < "10")
        yueD = "0" + yueD;
    if (tianD < "10")
        tianD = "0" + tianD;
    if (Check_in >= Check_out) {
        document.getElementById("selectType").innerHTML = "Please check your time!";
        document.getElementById("selectType").style.color = "red";
    } else if ((nianD + "" + yueD + tianD) > Check_in) {
        document.getElementById("selectType").innerHTML = "Please check your time!";
        document.getElementById("selectType").style.color = "red";
    } else {
        return true;
    }
    return false;
}

function how2SelectN() {
    var choice = document.getElementById("selectCheckN").checked;
    if (choice) {
        document.getElementById("selectWords").innerHTML = 'Please select the number of rooms you want: ' +
            '<select id="numberOfRooms" onblur="checkInput()">' +
            '<option value="1">1</option><option value="2">2</option><option value="3">3</option>' +
            '<option value="4">4</option><option value="5">5</option><option value="6">6</option>' +
            '<option value="7">7</option><option value="8">8</option><option value="9">9</option>' +
            '<option value="10">10</option>' +
            '</select>';
    } else {
        document.getElementById("selectWords").innerHTML = " ";
    }
}

function how2SelectY() {
    var choice = document.getElementById("selectCheckY").checked;
    if (choice) {
        document.getElementById("selectWords").innerHTML = "<div></div>";
    } else {
        document.getElementById("selectWords").innerHTML = 'Please input the number of rooms you want: <input type="text" id="numberOfRooms"  onblur="checkInput()">';
    }
}

function checkInput() {
    numberOfRoom = document.getElementById("numberOfRooms").value;
    if (numberOfRoom == "") {
        document.getElementById("selectType").innerHTML = "The number of rooms could not be empty !";
        document.getElementById("selectType").style.color = "red";
    } else {
        document.getElementById("selectType").innerHTML = "You choosed " + numberOfRoom + " rooms !";
        document.getElementById("selectType").style.color = "black";
    }
}

function setPathValue(value) {
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            window.location.href = "../SigninPage/SigninPage.html";
        }
    }
    xmlhttp.open("POST", "setPath.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("value=" + value);
}