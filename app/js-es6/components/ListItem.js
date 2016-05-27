import React from 'react'



class ListItem extends React.Component {
    constructor() {
        super()
        this.state = {
            fistName: "oriens"
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
                        fistName: (xhr.responseText)
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
                <h1>{this.state.fistName}</h1>
            </div>
        )
    }
}

export default ListItem