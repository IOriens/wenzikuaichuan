import React from 'react'
import Item from '../components/Item'
import Config from 'Config'

class ListItem extends React.Component {
    constructor() {
        super()
        this.state = {
            messages: []
        }
    }

    removeItem (item) {
        let messages = this.state.messages
        for(const i in messages) {
            if(messages[i].time === item) {
                messages.splice(i,1)
                return messages
            }
        }
        return messages
    }

    handleDeletion (request, time) {
        // let that = this
        fetch(`${Config.serverURL}/Items`,request).then(           
             (res) => {
                // console.log('hello')
                // console.log(res)                
                let messages = this.removeItem(time)
                this.setState({messages: messages})
            }            
        )
    }

    componentDidMount() {
        var url = `${Config.serverURL}/Items`
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = (error) => {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || (xhr.status == 304)) {
                    // console.log(xhr.responseText)

                    this.setState({
                        // messages: xhr.responseText
                        messages: JSON.parse(xhr.responseText)
                    })
                    
                } else {
                   throw(error)
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
                <ul className="messages">{this.state.messages.reverse().map((item)=> {
                    return <Item key={item.time} item={item} handleDeletion={this.handleDeletion.bind(this)}/>
                })}</ul>
            </div>
        )
    }
}

export default ListItem