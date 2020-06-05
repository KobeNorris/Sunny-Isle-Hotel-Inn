var username = "";
var realname = "";
var passport = "";
var telephone = "";
var email = "";
var userpw = "";

function JUMP2HP() {
    window.location.href = "../index.php";
}
function JUMP2MO() {
    window.location.href = "../ManageOrder/ManageOrder.html";
}

window.onload = function () {
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var profileInfo = [];
            profileInfo = JSON.parse(xmlhttp.responseText);
            if(profileInfo.length < 6) {
                cancel();
            }
            username = profileInfo["Username"];
            realname = profileInfo["Realname"];
            passport = profileInfo["Passport"];
            telephone = profileInfo["Telephone"];
            email = profileInfo["Email"];
            userpw = profileInfo["Password"];
            fillForm();
        }
    }
    xmlhttp.open("POST", "profileInfo.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}

function fillForm() {
    document.getElementById("UserAllege").innerHTML = username + "'s Profile";
    document.getElementById("1").value = realname;
    document.getElementById("2").value = passport;
    document.getElementById("3").value = telephone;
    document.getElementById("4").value = email;
    document.getElementById("5").value = userpw;
    document.getElementById("6").value = userpw;
}

function submit() {
    var info = new Array(); 
    info[0] = username;
    info[1] = document.getElementById("1").value;
    info[2] = document.getElementById("2").value;
    info[3] = document.getElementById("3").value;
    info[4] = document.getElementById("4").value;
    info[5] = document.getElementById("5").value;
    info[6] = document.getElementById("6").value;
    var flag = 0;

    if((info[1] == "")||(info[2] == "")||(info[3] == "")||(info[4] == "")||(info[5] == "")||(info[6] == "")){
        flag = 1;
        document.getElementById("warnning").innerHTML="Please fullfill the form";
        return;
        // document.getElementById("warnning").
    } else {
        document.getElementById("warnning").innerHTML="";
    }
    
    if((document.getElementById("6B").innerHTML != "Modify") || (document.getElementById("5B").innerHTML != "Modify") || (document.getElementById("4B").innerHTML != "Modify") || (document.getElementById("3B").innerHTML != "Modify") || (document.getElementById("2B").innerHTML != "Modify") || (document.getElementById("1B").innerHTML != "Modify")){
        flag = 1;
        document.getElementById("warnning").innerHTML="Please confirm the form";
        return;
    } else {
        document.getElementById("warnning").innerHTML="";
    }

    if(flag == 1) {
        return;
    } else if (checkPassword() && checkEmail() && checkTelephone()){
        var xmlhttp;
	    if (window.XMLHttpRequest)
	    {
		    xmlhttp=new XMLHttpRequest();
	    }
	    else
	    {
		    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    xmlhttp.onreadystatechange=function()
	    {
		    if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
                if(xmlhttp.responseText == "diff password"){
                    document.getElementById("check6").innerHTML="*";
                    document.getElementById("warnning").innerHTML="Wrong confirm password";
                } else if (xmlhttp.responseText == "Successfully"){
                    cancel();
                } else {
                    document.getElementById("warnning").innerHTML="Database error try again!";
                }
		    }
	    }
        xmlhttp.open("POST","updateProfile.php",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("username=" + info[0] + "&realname=" + info[1] + "&passport=" + info[2] + "&telephone=" + info[3] + "&email=" + info[4] + "&password1=" + info[5] + "&password2=" + info[6]);
    }
}

function logOut() {
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

function cancel() {
    window.history.back(-1);
}

function modify(event, num) {
    event.target.innerHTML = "Confirm";
    document.getElementById(num).removeAttribute('disabled');
    event.target.setAttribute("onclick", "confirm(event, " + num + ")");
}

function confirm(event, num) {
    if(num == '3' && checkTelephone()) {
        event.target.innerHTML = "Modify";
        document.getElementById(num).setAttribute("disabled", "ture");
        event.target.setAttribute("onclick", "modify(event, " + num + ")");
    } else if(num == '4' && checkEmail()) {
        event.target.innerHTML = "Modify";
        document.getElementById(num).setAttribute("disabled", "ture");
        event.target.setAttribute("onclick", "modify(event, " + num + ")");
    } else {
        event.target.innerHTML = "Modify";
        document.getElementById(num).setAttribute("disabled", "ture");
        event.target.setAttribute("onclick", "modify(event, " + num + ")");
    }
}

function modifypw(event, num) {
    event.target.innerHTML = "Confirm";
    document.getElementById(num).removeAttribute('disabled');
    document.getElementById(num).setAttribute('type', 'text');
    event.target.setAttribute("onclick", "confirmpw(event, " + num + ")");
}

function confirmpw(event, num) {
    event.target.innerHTML = "Modify";
    document.getElementById(num).setAttribute("disabled", "ture");
    document.getElementById(num).setAttribute('type', 'password');
    event.target.setAttribute("onclick", "modifypw(event, " + num + ")");
    checkPassword();
}

function checkPassword() {
    opassword = document.getElementById("5").value;
    cpassword = document.getElementById("6").value;
    if (cpassword != opassword) {
        document.getElementById("check5").innerHTML = "*";
        document.getElementById("check6").innerHTML = "*";
        document.getElementById("warnning").innerHTML = "Wrong confirm password!";
        document.getElementById("warnning").setAttribute("style", "color: red;");
        return false;
    } else {
        document.getElementById("check5").innerHTML = "";
        document.getElementById("check6").innerHTML = "";
        document.getElementById("warnning").innerHTML = "";
        return true;
    }
}

function checkEmail() {
    var reg1 = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
    var email = document.getElementById("4");
    if (!reg1.test(email.value)) {
        document.getElementById("check4").innerHTML = " * ";
        document.getElementById("warnning").innerHTML = "Wrong email format!";
        document.getElementById("warnning").setAttribute("style", "color: red;");
        return false;
    } else {
        document.getElementById("check4").innerHTML = "";
        document.getElementById("warnning").innerHTML = "";
        return true;
    }
}

function checkTelephone(){
    var reg1 = /(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
    var telephone = document.getElementById("3");
    if(!reg1.test(telephone.value)){
        document.getElementById("check3").innerHTML=" * ";
        document.getElementById("warnning").innerHTML="Wrong telephone number format!";
        document.getElementById("warnning").setAttribute("style", "color: red;");
        return false;
    } else{
        document.getElementById("check3").innerHTML="";
        document.getElementById("warnning").innerHTML="";
        return true;
    }
}