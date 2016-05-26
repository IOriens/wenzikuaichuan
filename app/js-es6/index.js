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
import Upload from './components/Upload'
import ListItem from './components/ListItem'

let $$ = (id) => {
  return document.getElementById(id)
}

class App extends Component {
  render() {
    return (
      <div>
        <div className="left">
          <ul>
            <li><Link to="/upload"  activeClassName="active"><svg className="icon icon-cloud-upload"><use xlinkHref="#icon-cloud-upload"></use></svg>上传</Link></li>
            <li><Link to="/listItem" activeClassName="active"><svg className="icon icon-list2"><use xlinkHref="#icon-list2"></use></svg> 显示记录</Link></li>
          </ul>
        </div>
        <div className="right">
          {this.props.children}
        </div>
      </div>
    )
  }
}

// class ListItem extends React.Component {
//     render() {
//       return (
//         <div>
//           <h1>ListItem Here</h1>
//         </div>
//       )
//     }
// }


// class Upload extends React.Component {
//     render() {
//       return (
//         <div>
//           <h1>Upload Here</h1>
//         </div>
//       )
//     }
// }

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="/upload" component={Upload}/>
      <Route path="/listItem" component={ListItem}/>
    </Route>
  </Router>
),
  $$('main'))