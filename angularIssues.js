function populateTable() {
    var table = document.getElementById("issueData");
    var tableRows = table.getElementsByTagName('tr');
    var rowCount = table.rows.length;

    var d = new Date();
    d.setDate(d.getDate() - 7);
    var month = d.getUTCMonth() + 1;
    var date = d.getUTCDate() + 1;
    var hours = d.getUTCHours();
    var minutes = d.getUTCMinutes();
    var seconds = d.getUTCSeconds();

    var monthStr;
    var dateStr;
    var hoursStr;
    var minutesStr;
    var secondsStr;

    monthStr = month < 10 ? "0" + month : month;
    dateStr = date < 10 ? "0" + date : date;
    hoursStr = hours < 10 ? "0" + hours : hours;
    minutesStr = minutes < 10 ? "0" + minutes : minutes;
    secondsStr = seconds < 10 ? "0" + seconds : seconds;

    var dateString = d.getUTCFullYear() + "-" +
                     monthStr + "-" +
                     dateStr + "T" +
                     hoursStr + ":" +
                     minutesStr + ":" +
                     secondsStr + "Z";

    document.getElementById("tableTitle").innerHTML = "<b>Angular Issues Since " + dateString + "</b>";

    for (var x=rowCount-1; x>0; x--) {
       table.removeChild(tableRows[x]);
    }

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://api.github.com/repos/angular/angular/issues?since=" + dateString, false);
    xmlHttp.send(null);
    var jsonObj = JSON.parse(xmlHttp.responseText);

    for(var x=0; x<jsonObj.length; x++)
    {
        rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        if(!jsonObj[x].title)
        {
            row.insertCell(0).innerHTML = "";
        } else {
            row.insertCell(0).innerHTML = JSON.stringify(jsonObj[x].title);
        }

        if(!jsonObj[x].body)
        {
            row.insertCell(1).innerHTML = "";
        } else {
            row.insertCell(1).innerHTML = JSON.stringify(jsonObj[x].body);
        }

        if(!jsonObj[x].user)
        {
            row.insertCell(2).innerHTML = "";
        } else if(!jsonObj[x].user.login) {
            row.insertCell(2).innerHTML = "";
        } else {
            row.insertCell(2).innerHTML = JSON.stringify(jsonObj[x].user.login);
        }

        if(!jsonObj[x].assignee)
        {
            row.insertCell(3).innerHTML = "";
        } else if(!jsonObj[x].assignee.login) {
            row.insertCell(3).innerHTML = "";
        } else {
            row.insertCell(3).innerHTML = JSON.stringify(jsonObj[x].assignee.login);
        }
    }
}

function onLoad() {
    console.log("Load complete");
}