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