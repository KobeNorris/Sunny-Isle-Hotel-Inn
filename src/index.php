<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="hotellogin" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="StartPage.css">
    <title>Welcome to Sunny Isle</title>
</head>

<body>
    <div class="firstRow">
        <button class="logoButton" onclick="refreshPage()">
            <img class="logo" src=".\images\logo.jpg">
        </button>
        <span class="space"> </span>
        <button class="signinButton" onclick="jump2LI()">
            <img id="userImage" src=".\images\Signin.jpg">
        </button>
    </div>
    <div class="mainContent">
        <p class="slogan">Welcome to Sunny Isle !</p>
        <p class="slogan">And enjoy your vacation !</p>
        <br />
        <button class="informationButton" onclick="jump2RA()">
            Start Trip Now
        </button>
    </div>

</body>
<script type="text/javascript" src="StartPage.js"></script>
</html>