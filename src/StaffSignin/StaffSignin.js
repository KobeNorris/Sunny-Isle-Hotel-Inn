function jump2RA() {
    window.location.href = "../RegisterAccount/RegisterAccount.html";
}
function JUMP2SS(){
    window.location.href = "../StaffSignin/StaffSignin.html";
}
function JUMP2HP(){
    window.location.href = "../index.php";
}
function jump2LI(){
    window.location.href="../SigninPage/SigninPage.html";
}

function checkSignin()
{
    var xmlhttp;
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
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
		if (xmlhttp.readyState==4 && xmlhttp.status == 200)
		{
            if(xmlhttp.responseText == "staff"){
                window.location.href = "./StaffView.html";
            } else if (xmlhttp.responseText == "guest"){
                document.getElementById("username").value="";
                document.getElementById("password").value="";
                document.getElementById("warnning").innerHTML="Please use guest signin channel!";
            } else if (xmlhttp.responseText == "falseusername"){
                document.getElementById("username").value="";
                document.getElementById("warnning").innerHTML="Wrong username try again!";
            } else if (xmlhttp.responseText == "falsepassword"){
                document.getElementById("password").value="";
                document.getElementById("warnning").innerHTML="Wrong password try again!";
            } else {
                document.getElementById("warnning").innerHTML="Database error try again!";
            }
		}
	}
    xmlhttp.open("POST","StaffSignin.php",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("username=" + username + "&password=" + password);
}