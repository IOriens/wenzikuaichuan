import React from 'react'
import Item from '../components/Item'


class ListItem extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
    }

    componentDidMount() {
        var url = "http://localhost:8081/listItem"
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 304)) {
                    // console.log(xhr.responseText)

                    this.setState({
                        // messages: xhr.responseText
                        messages: JSON.parse(xhr.responseText)
                    })
                    
                } else {
                    console.log('error')
                }
            }
        }        
        xhr.open('get', url, true)
        xhr.send(null)
    }

    render() {
        return (
            <div>
                <h2 className="nav-title">显示记录</h2>
                <ul className="messages">{this.state.messages.map(function (item) {
                    return <Item key={item.time} item={item}/>
                })}</ul>
            </div>
        )
    }
}

export default ListItem