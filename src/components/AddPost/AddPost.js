import React, { Component } from 'react';
import './AddPost.scss';


class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_url: '',
            imgArr: []
        }
    }

    checkUploadResult = (error, resultEvent) => {
        if (resultEvent.event === 'success') {
            this.setState({ imgArr: [...this.state.imgArr, resultEvent.info.secure_url] });
            this.setState({ image_url: resultEvent.info.secure_url })
        }
        console.log(this.state.imgArr);
    }

    render() {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: 'dytja9xnd',
            uploadPreset: 'travels',
            sources: ['local', 'url', 'dropbox', 'facebook', 'instagram']
        },
            (error, result) => { this.checkUploadResult(error, result) })
        return (
            <div id="addPost">
                <textarea name="postContent" id="postContent" cols="30" rows="10"></textarea>
                <button onClick={() => widget.open()}>Add Images</button>
                <button onClick={() => console.log(this.state.image_url)}>Submit Post</button>
            </div>
        )
    }
}

export default AddPost;