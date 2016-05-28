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