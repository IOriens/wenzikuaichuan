import React  from 'react'
import Config from 'Config'

class Upload extends React.Component {
    constructor() {
        super()
        this.state = {
            submited: false,
            text: ''
        }
    }

    componentDidMount() {
        let text = sessionStorage.getItem('txt')
        this.setState({ text: text ? text : '' })
    }

    sendData(data) {
        // console.log(data)

        var xhr = new XMLHttpRequest()
        var fd = new FormData()
        var that = this
        for (let name in data) {
            fd.append(name, data[name])
        }

        xhr.addEventListener('load', function (e) {
            this.setState({ submited: true })
        }.bind(that))

        xhr.addEventListener('error', function (e) {
            throw (e)
        })

        xhr.open('POST', `${Config.serverURL}/Items`)
        xhr.send(fd)
    }

    handleSubmit(e) {
        e.preventDefault()
        let data = { item: this.state.text.trim() }
        this.sendData(data)
    }

    handleChange(e) {
        sessionStorage.setItem('txt', e.target.value)
        this.setState({ submited: false, text: e.target.value })
    }

    render() {
        return (
            <div className="upload">
                <h2 className="nav-title">上传信息</h2>
                <form onSubmit={e => this.handleSubmit(e) }>
                    <textarea placeholder="Write something here" onChange={ e => this.handleChange(e) } value={this.state.text}/>
                    <button className="submit-btn" >Submit</button> <span>{this.state.submited ? "Submited" : "Not submited"}</span>
                </form>
            </div>
        )
    }
}

export default Upload

