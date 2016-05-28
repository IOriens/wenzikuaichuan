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
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

// import components
import Main from './components/Main'
import Upload from './components/Upload'
import ListItem from './components/ListItem'

let $$ = (id) => {
  return document.getElementById(id)
}

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Upload}/>
      <Route path="/upload" component={Upload}/>
      <Route path="/listItem" component={ListItem}/>
    </Route>
  </Router>
)
 
render(router, $$('main'))