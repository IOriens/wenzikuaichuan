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

    render() {
        var time = new Date(parseInt(this.props.item.time))
        var message = this.props.item.message

        return (
            <li>
                <div className="content">
                    <h2>{message}</h2>
                    <h4>{time.toLocaleString() }</h4>
                </div>
                <button onClick={this.handleClick.bind(this)} >Delete</button>
            </li>
        )
    }
}

export default Item
