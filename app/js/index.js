'use strict';

var $$ = function $$(id) {
    return document.getElementById(id);
};

var loadDoc = function loadDoc(url, func) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                func(xhr);
            } else {
                console.log('wrong');
            }
        }
    };
    xhr.open('get', url, true);
    xhr.send(null);
};

var listText = function listText(xhr) {
    var data = xhr.responseText;
    data = JSON.parse(data);
    var txt = "<table><thead><tr><th>Content</th><th>Time</th></tr></thead><tbody>";
    for (var it in data) {
        if (data.hasOwnProperty(it)) {
            txt += "<tr><td>" + data[it] + "</td><td>" + it + "</td></tr>";
        }
    }
    txt += "</tbody></table>";
    console.log(txt);
    $$('info').innerHTML = txt;
};