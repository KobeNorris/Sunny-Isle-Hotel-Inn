var orderList = '';

function jump2RA() {
    window.location.href = "../RegisterAccount/RegisterAccount.html";
}function JUMP2SS(){
    window.location.href = "../StaffSignin/StaffSignin.html";
}function JUMP2HP(){
    window.location.href = "../index.php";
}

window.onload = function () {
    var xmlhttp;
    var innerContent = "";
    var dat = new Date();
    var nianD = dat.getFullYear();
    var yueD = dat.getMonth() + 1;
    var tianD = dat.getDate();
    if(yueD < 10) {
        yueD = "0" + yueD;
    }
    if (tianD < 10) {
        // alert("Yes");
        tianD = "0" + tianD;
    }
    var date = "" + nianD + yueD + tianD;

    checkName();

    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            orderList = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < orderList.length; i++) {
                Roomlevel = orderList[i]['Roomlevel'] + "";
                Roomnumber = orderList[i]['Roomnumber'] + "";
                if (Roomlevel < 10)
                    Roomlevel = "0" + Roomlevel;
                if (Roomnumber < 10)
                    Roomnumber = "0" + Roomnumber;
                var number = Roomlevel + "" + Roomnumber;
                if (Roomnumber == "13") {
                    var roomType = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;VIP Room&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                } else if (Roomnumber == "12" || Roomnumber == "11" || Roomnumber == "01" || Roomnumber == "02") {
                    var roomType = "Large Double Room";
                } else if (Roomnumber == "10" || Roomnumber == "09" || Roomnumber == "03" || Roomnumber == "04") {
                    var roomType = "Large Single Room";
                } else {
                    var roomType = "Small Single Room";
                }

                var yearIn = orderList[i]['Checkin'][0] + orderList[i]['Checkin'][1] + orderList[i]['Checkin'][2] + orderList[i]['Checkin'][3];
                var monthIn = orderList[i]['Checkin'][4] + orderList[i]['Checkin'][5];
                var dayIn = orderList[i]['Checkin'][6] + orderList[i]['Checkin'][7];

                var yearOut = orderList[i]['Checkout'][0] + orderList[i]['Checkout'][1] + orderList[i]['Checkout'][2] + orderList[i]['Checkout'][3];
                var monthOut = orderList[i]['Checkout'][4] + orderList[i]['Checkout'][5];
                var dayOut = orderList[i]['Checkout'][6] + orderList[i]['Checkout'][7];

                // alert(date + " " + orderList[i]['Checkin'] + " " + orderList[i]['Checkout']);
                if (date < orderList[i]['Checkin']) {
                    innerContent = innerContent + "<button class='orderBlockEmpty' id=" + number + " onmouseover=showRoom(\'" + number + "\')  onmouseout=disShowRoom(\'" + number + "\')>" + orderList[i]['username'] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + number + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + roomType + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + yearIn + "/" + monthIn + "/" + dayIn + "&nbsp;&nbsp;&nbsp;&nbsp;" + yearOut + "/" + monthOut + "/" + dayOut + "</button><br />"
                } else if (date > orderList[i]['Checkout']) {
                    // alert("Yes");
                    innerContent = innerContent + "<button class='orderBlockOverdue' id=" + number + " onmouseover=showRoom(\'" + number + "\')  onmouseout=disShowRoom(\'" + number + "\')>" + orderList[i]['username'] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + number + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + roomType + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + yearIn + "/" + monthIn + "/" + dayIn + "&nbsp;&nbsp;&nbsp;&nbsp;" + yearOut + "/" + monthOut + "/" + dayOut + "</button><br />"
                } else {
                    innerContent = innerContent + "<button class='orderBlockOccupied' id=" + number + " onmouseover=showRoom(\'" + number + "\')  onmouseout=disShowRoom(\'" + number + "\')>" + orderList[i]['username'] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + number + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + roomType + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + yearIn + "/" + monthIn + "/" + dayIn + "&nbsp;&nbsp;&nbsp;&nbsp;" + yearOut + "/" + monthOut + "/" + dayOut + "</button><br />"
                }
            }
            document.getElementById("orderList").innerHTML = innerContent;
        }
    }
    xmlhttp.open("POST", "StaffView.php", true);
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
 
function checkName() {
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if(xmlhttp.responseText == "1"){
                return false;
            } else {
                window.location.href = "../StaffSignin/StaffSignin.html";
            }
        }
    }
    xmlhttp.open("POST", "CheckName.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function logOut() {
    var xmlhttp;
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