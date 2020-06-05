var dat = new Date();
var nianD = dat.getFullYear();
var yueD = dat.getMonth(); 
var tianD = dat.getDate(); 
var choosedId;

add();

function add() {
    document.getElementById('date').innerHTML = "";

    var nian = dat.getFullYear();
    var yue = dat.getMonth();
    var tian = dat.getDate();
    var arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    document.getElementById('nian').innerText = nian;
    document.getElementById('yue').innerText = arr[yue];

    var setDat = new Date(nian, yue + 1, 1 - 1); 
    var setTian = setDat.getDate();
    var setZhou = new Date(nian, yue, 1).getDay();

    for (var i = 0; i < setZhou; i++) {
        var li = document.createElement('li');
        document.getElementById('date').appendChild(li);
    }

    for (var i = 1; i <= setTian; i++) {
        var li = document.createElement('li');
        li.innerText = i;
        if (nian == nianD && yue == yueD && i == tianD) {
            li.className = "active";
        } else {
            li.className = "hover";
        }

        document.getElementById('date').appendChild(li);
    }

    var ul = document.getElementById("date"); //Catch the block user clicks
    var lis = ul.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            if (this.innerHTML != "") {
                var chooseD = this.innerHTML;
                var chooseM = document.getElementById("yue").innerHTML;
                var chooseY = document.getElementById("nian").innerHTML;
                document.getElementById(choosedId).value = chooseY + " " + chooseM + " " + chooseD;
                document.getElementById("data").setAttribute('style', 'display: none;');
                document.getElementById("transback").setAttribute('style', 'display: none;');
            }
        }
    }
}

document.getElementById("nextM").onclick = function () {
    dat.setMonth(dat.getMonth() + 1);
    add();
};
document.getElementById("prevM").onclick = function () {
    dat.setMonth(dat.getMonth() - 1); 
    add();
}
document.getElementById("nextY").onclick = function () {
    dat.setYear(dat.getFullYear() + 1); 
    add();
}
document.getElementById("prevY").onclick = function () {
    dat.setYear(dat.getFullYear() - 1); 
    add();
}

function TurnTime(boxId) {
    document.getElementById("data").setAttribute('style', 'display: block;');
    document.getElementById("transback").setAttribute('style', 'display: block;');
    choosedId = boxId;
}