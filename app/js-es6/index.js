let $$ = (id) => {
    return document.getElementById(id)
}

let loadDoc = (url, func) => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                func(xhr)
            } else {
                console.log('wrong')
            }
        }
    }
    xhr.open('get', url, true)
    xhr.send(null)
}

let listText = (xhr) => {
    let data = xhr.responseText
    data = JSON.parse(data)   
    let txt = "<table><thead><tr><th>Content</th><th>Time</th></tr></thead><tbody>"    
    for (let it in data) {
        if (data.hasOwnProperty(it)) {            
            txt +="<tr><td>"+ data[it] +"</td><td>" + it +  "</td></tr>"
        }
    }    
    txt += "</tbody></table>"
    console.log(txt)
    $$('info').innerHTML = txt
}