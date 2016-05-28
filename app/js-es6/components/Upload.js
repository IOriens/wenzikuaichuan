import React  from 'react'

class Upload extends React.Component {
    constructor() {
        super()
        this.state = {
            submited: false,
            text: ''
        }
    }

    sendData (data) {
        var xhr = new XMLHttpRequest()
        var fd = new FormData()
        var that = this
        for(let name in data) {
            fd.append(name, data[name])
        }
        // var info = document.getElementById('info')
        xhr.addEventListener('load', function (e) {
            // info.innerHTML = e.target.responseText
            this.setState({ submited: true })            
        }.bind(that))

        xhr.addEventListener('error', function (e) {
            // info.innerHTML = 'something wrong happend'
            this.setState({ submited: false })
            console.log('something wrong happend')
        })

        xhr.open('POST', 'http://localhost:8081/additem')        
        xhr.send(fd)
    }

    handleSubmit(e) {
        e.preventDefault()
        let data = {item: this.state.text}
        this.sendData(data)                        
    }

    handleChange(e) {        
        this.setState({ submited: false, text: e.target.value})
    }

    render() {
        return (
            <div>
                <h2 className="nav-title">上传信息</h2>
                <form onSubmit={e => this.handleSubmit(e) }>
                    <textarea placeholder="Write something here" onChange={ e => this.handleChange(e) }>

                    </textarea>
                    <button className="submit-btn" >Submit</button> <span>{this.state.submited ? "Submited" : "Not submited"}</span>
                </form>
            </div>
        )
    }
}

export default Upload

