function jump2LI(){
    window.location.href = "../SigninPage/SigninPage.html";
}
function jump2HP(){
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

function checkUsername(username) {
    var reg1 = /^[a-zA-Z0-9_\-]*$/;
    var reg2 = /^[a-zA-Z0-9_\-]{0,20}$/;
    if(!reg1.test(username)){
        document.getElementById("check0").innerHTML="*";
        document.getElementById("warnning").innerHTML="Username only contains _ , - , numbers and characters!";
        return false;
    } else if(!reg2.test(username)){
        document.getElementById("check0").innerHTML="*";
        document.getElementById("warnning").innerHTML="Username can only contain less than 20 characters!";
        return false;
    } else{
        document.getElementById("check0").innerHTML="";
        document.getElementById("warnning").innerHTML="";
    }

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
            if(xmlhttp.responseText == "Unique"){
                document.getElementById("check0").innerHTML="&nbsp;";
                document.getElementById("warnning").innerHTML="";
                return true;
            } else if (xmlhttp.responseText == "Duplicate"){
                document.getElementById("check0").innerHTML="*";
                document.getElementById("warnning").innerHTML="Duplicated username!";
                return false;
            } else {
                document.getElementById("warnning").innerHTML="Database error try again!";
                return false;
            }
		}
	}
    xmlhttp.open("POST","Checkname.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("username=" + username);
}

function register(){
    var info = new Array(); 
    info[0] = document.getElementById("username").value;
    info[1] = document.getElementById("realname").value;
    info[2] = document.getElementById("passport").value;
    info[3] = document.getElementById("telephone").value;
    info[4] = document.getElementById("email").value;
    info[5] = document.getElementById("password1").value;
    info[6] = document.getElementById("password2").value;
    var flag = 0;

    if((info[0] == "")||(info[1] == "")||(info[2] == "")||(info[3] == "")||(info[4] == "")||(info[5] == "")||(info[6] == ""))
        flag = 1;

    if(flag == 1) {
        document.getElementById("warnning").innerHTML="Please fullfill the form!";
    } else if (checkPassword() && checkEmail() && checkTelephone() && checkPasswordFormat()){
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
                    document.getElementById("warnning").innerHTML="Wrong confirm password!";
                } else if (xmlhttp.responseText == "Duplicate username"){
                    document.getElementById("check1").innerHTML="*";
                    document.getElementById("username").value="";
                    document.getElementById("warnning").innerHTML="Duplicated username!";
                } else if (xmlhttp.responseText == "Successfully"){
                    window.location.href = path;
                } else {
                    console.log(xmlhttp.responseText);
                    document.getElementById("warnning").innerHTML="Database error try again!";
                }
		    }
	    }
        xmlhttp.open("POST","Register.php",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	    xmlhttp.send("username=" + info[0] + "&realname=" + info[1] + "&passport=" + info[2] + "&telephone=" + info[3] + "&email=" + info[4] + "&password1=" + info[5] + "&password2=" + info[6]);
    }
}

function checkPasswordFormat(){
    var regNull=/\s+/;
    var reg1 = /^.{0,20}$/;
    opassword = document.getElementById("password1").value;

    if(!reg1.test(opassword)){
        document.getElementById("check5").innerHTML="*";
        document.getElementById("warnning").innerHTML="Password contains less than 20 characters!";
        return false;
    } else if(regNull.test(opassword)){
        document.getElementById("check5").innerHTML="*";
        document.getElementById("warnning").innerHTML="Password should not contain spaces!";
        return false;
    } else {
        document.getElementById("check5").innerHTML="";
        document.getElementById("warnning").innerHTML="";
        return true;
    }
}

function checkPassword(){
    opassword = document.getElementById("password1").value;
    cpassword = document.getElementById("password2").value;
    if(cpassword != opassword){
        document.getElementById("check6").innerHTML="*";
        document.getElementById("warnning").innerHTML="Wrong confirm password!";
        return false;
    } else {
        document.getElementById("check6").innerHTML="";
        document.getElementById("warnning").innerHTML="";
        return true;
    }
}

function checkEmail(){
    var reg1 = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]{0,200}$/;
    var email = document.getElementById("email");
    if(!reg1.test(email.value)){
        document.getElementById("check4").innerHTML="*";
        document.getElementById("warnning").innerHTML="Wrong email format!";
        return false;
    } else{
        document.getElementById("check4").innerHTML="";
        document.getElementById("warnning").innerHTML="";
        return true;
    }
}

function checkTelephone(){
    var reg1 = /(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$)/;
    var email = document.getElementById("telephone");
    if(!reg1.test(email.value)){
        document.getElementById("check3").innerHTML="*";
        document.getElementById("warnning").innerHTML="Telephone number only contains _ and numbers!";
        return false;
    } else{
        document.getElementById("check3").innerHTML="";
        document.getElementById("warnning").innerHTML="";
        return true;
    }
}