## React Router Error - Cannot GET [Page Name]
Add this to webpack.config.js：
```
devServer: {
      historyApiFallback: true
}
```
[Configuring Your Server](https://github.com/reactjs/react-router/blob/v1.0.3/docs/guides/basics/Histories.md#configuring-your-server)
[Allow serving one file for all urls (single page app mode) ](https://github.com/BrowserSync/browser-sync/issues/204)
2016-05-26 00:39:26

## Super expression must either be null or a function
Caused by wrong extending class: `React.component`, it should be `React.Component`
2016-05-28 00:50:30

## Parse body in express
[How to retrieve POST query parameters in Express](http://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters-in-express)

## express throws error as `body-parser deprecated undefined extended`
[express throws error as `body-parser deprecated undefined extended`](http://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended)

## Node.js (with express & bodyParser): unable to obtain form-data from post request
[Node.js (with express & bodyParser): unable to obtain form-data from post request](http://stackoverflow.com/questions/26347394/node-js-with-express-bodyparser-unable-to-obtain-form-data-from-post-reques)
In case you need to handle a text-only multipart form, you can use any of the multer methods (`.single()`, `.array()`, `fields()`). Here is an example using `.array()`:
```
var express = require('express')
var app = express()
var multer  = require('multer')
var upload = multer()

app.post('/profile', upload.array(), function (req, res, next) {
  // req.body contains the text fields
})
```

## Usage of Date object

## Upload item in chinese caused problem like this
```
[{"time":"1464513844322","message":"大放送"},{"time":"1464513844325","message":""}]

[{"time":"1464513844322","message":"大放送"},{"time":"1464513844325","message":""},{"time":"1464514117893","message":""}]放送"}]

大放送
5/29/2016, 5:24:04 PM

5/29/2016, 5:24:04 PM
```
This happened because I have open the same link in firefox and chrome. These two browser won't sync while one in root mode and the other not. This seems weird. 


## multi index
```
ERROR in multi index
Module not found: Error: Cannot resolve module 'index2.js' in /home/oriens/own/wzkc/src
 @ multi index
```
change `'index': 'index.js'` in `webpack.config.js` to `'index': './index.js'`

##  arguments[i].apply is not a function

change from
```
plugins.push(
```
to
```
loaders.push(
```

## Communicate from child to parent
We need callback to handle this.
But I forgot to bind `this` in the parent to the annoymous function in a map iterator, this is so triky!! 
