import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'

// import components
import Main from './components/Main'
import Upload from './components/Upload'
import ListItem from './components/ListItem'

// import scss
import './scss/style.scss'


let $$ = (id) => {
  return document.getElementById(id)
}

const router = (
  <Router history={browserHistory} >    
    <Route path="/" component={Main}>
      <IndexRoute component={Upload}/>
      <Route path="/upload"  component={Upload} />
      <Route path="/listItem" component={ListItem}/>
    </Route>
  </Router>
)

render(router, $$('main'))