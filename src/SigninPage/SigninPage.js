var path = "";

function jump2RA() {
    window.location.href = "../RegisterAccount/RegisterAccount.html";
} function JUMP2SS() {
    window.location.href = "../StaffSignin/StaffSignin.html";
} function JUMP2HP() {
    window.location.href = "../index.php";
}

window.onload = function () {
    path = getCookie("path");
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function checkSignin() {
    var xmlhttp;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "guest") {
                window.location.href = path;
            } else if (xmlhttp.responseText == "stuff") {
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                document.getElementById("warnning").innerHTML = "Please use stuff signin channel!";
            } else if (xmlhttp.responseText == "falseusername") {
                document.getElementById("username").value = "";
                document.getElementById("warnning").innerHTML = "Wrong username try again!";
            } else if (xmlhttp.responseText == "falsepassword") {
                document.getElementById("password").value = "";
                document.getElementById("warnning").innerHTML = "Wrong password try again!";
            } else {
                document.getElementById("warnning").innerHTML = "Database error try again!";
            }
        }
    }
    xmlhttp.open("POST", "Signin.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("username=" + username + "&password=" + password);
}