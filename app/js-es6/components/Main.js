import React from 'react'
import { Link } from 'react-router'

class Main extends React.Component {
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

export default Main