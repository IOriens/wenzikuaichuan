import React from 'react'
import Config from 'Config'


class Item extends React.Component {

    handleClick (e) {
        let form = new FormData()      
        form.append('id', this.props.item.time)  
        // console.log(this.props.item.time)

        let request = {
            method: 'delete',
            body: form
        }

        this.props.handleDeletion(request,this.props.item.time)
    }

    getMessage () {
        let message = this.props.item.message
        //http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without        
        if(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(message)) {
            return (<a href={message} target="_blank">{message}</a>)
        } else {
            return message
        }        
    }

    render() {
        var time = new Date(parseInt(this.props.item.time))
        var message = this.props.item.message

        return (
            <li>
                <div className="content">
                    <h2>{this.getMessage()}</h2>
                    <h4>{time.toLocaleString() }</h4>
                </div>
                <button onClick={this.handleClick.bind(this)} >Delete</button>
            </li>
        )
    }
}

export default Item
