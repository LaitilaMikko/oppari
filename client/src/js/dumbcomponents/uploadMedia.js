import React from "react";
import Serialize from "form-serialize";



export default class UploadMedia extends React.Component {

    handleUpload(e) {
        e.preventDefault();
        var file = document.getElementById("fileinput").files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log(reader.result);
        }

        reader.readAsDataURL(file);
    }


    render() {
        return (
            <div class="lower">
                <form id='uploadForm'>
                    <input className="btn btn-success" id="fileinput" type="file" />
                    <input className="btn btn-primary" type="button" defaultValue="Upload" onClick={this.handleUpload.bind(this)}/>
                </form>
            </div>
        );
    }
}