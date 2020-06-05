function jump2RA(){
    window.location.href="./Bookhotel/Bookhotel.html";
}
function jump2LI(){
    setPathValue("../Bookhotel/Bookhotel.html");
}
function refreshPage(){
    window.location.href="javascript:location.reload()";
}

function setPathValue(value) {
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            window.location.href="./SigninPage/SigninPage.html";
        }
    }
    xmlhttp.open("POST", "setPath.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("value=" + value);
}