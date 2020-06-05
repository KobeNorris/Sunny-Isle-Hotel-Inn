window.onload = function () {

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

    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText == "Null") {
                document.getElementById("username").innerHTML = "new guest";
                document.getElementById("username").value = "0";
                document.getElementById("signinButton").innerHTML = '<img id="userSignin" src="../images/Signin.jpg">';
            } else {
                document.getElementById("username").innerHTML = xmlhttp.responseText;
                document.getElementById("username").value = "1";
                document.getElementById("signinButton").innerHTML = '<img id="userProfile" class="myProfileButton" src="../images/myProfile.jpg">';
            }
        }

    }
    xmlhttp.open("POST", "getUserName.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send();
}