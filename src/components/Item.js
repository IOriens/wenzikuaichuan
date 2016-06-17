import React from 'react'

class Item extends React.Component {

    handleDeletion (e) {
        
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
                <button>Delete</button>
            </li>
        )
    }
}

export default Item