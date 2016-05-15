let $$ = (id) => {
  return document.getElementById(id)
}

// let loadDoc = (url, func) => {
//     let xhr = new XMLHttpRequest()
//     xhr.onreadystatechange = () => {
//         if (xhr.readyState == 4) {
//             if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
//                 func(xhr)
//             } else {
//                 console.log('wrong')
//             }
//         }
//     }
//     xhr.open('get', url, true)
//     xhr.send(null)
// }

// let listText = (xhr) => {
//     let data = xhr.responseText
//     data = JSON.parse(data)   
//     let txt = "<table><thead><tr><th>Content</th><th>Time</th></tr></thead><tbody>"    
//     for (let it in data) {
//         if (data.hasOwnProperty(it)) {            
//             txt +="<tr><td>"+ data[it] +"</td><td>" + it +  "</td></tr>"
//         }
//     }    
//     txt += "</tbody></table>"
//     console.log(txt)
//     $$('info').innerHTML = txt
// }

import React, { Component } from 'react'
import { render } from 'react-dom'
class App extends Component {
  render() {
    return (
            <div>
                <div className="left">
                    <ul>
                        <li><a href="#"><svg className="icon icon-cloud-upload"><use xlinkHref="#icon-cloud-upload"></use></svg> 上传</a></li>
                        <li><a href="#"><svg className="icon icon-list2"><use xlinkHref="#icon-list2"></use></svg> 显示记录</a></li>
                    </ul>
                </div>
                <div className="right">
                  
                </div>
            </div>
    )
  }
}


render(
  <App />,
  $$('main')
)