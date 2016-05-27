import React from 'react'

class Item extends React.Component {
    
    render () {
        var time = this.props.item.time
        var message = this.props.item.message
        
        return (
            <li>
                <h2>{message}</h2>
                <h4>{time}</h4>             
            </li>
        )
    }  
}

export default Item