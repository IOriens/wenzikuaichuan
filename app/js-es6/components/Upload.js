import  React  from 'react'

class Upload extends React.Component {
    render() {
        return (
            <div>
                <h2 className="nav-title">上传信息</h2>
                <textarea placeholder="Write something here"> 
                    
                </textarea>
                <button className="submit-btn">Submit</button> 
            </div>
        )
    }
} 

export default Upload

