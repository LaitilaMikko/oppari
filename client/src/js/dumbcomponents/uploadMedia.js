import React from "react";
import Serialize from "form-serialize";
import Dropzone from "react-dropzone";
import Axios from "axios";



export default class UploadMedia extends React.Component {

    handleClick(e) {
        e.preventDefault();
        var sWidth = this.props.campaign.screen_width;
        var sHeight = this.props.campaign.screen_height;    
        var formdata = new FormData();
        var x = document.getElementById("file");
        var file = x.files[0];
        formdata.append("file",file);
        this.props.upload(formdata,this.props.campaign.name,this.props.ad.name,sHeight,sWidth);
        document.getElementById("uploadForm").reset();
    }
    
    render() {
        return (
            <div class="lower">
                <form ref='uploadForm' id='uploadForm'>
                    <div class="fileUpload btn btn-primary">
                        <span>Select File</span>
                        <input name="file" id="file" type="file" class="upload" />
                    </div>
                    <br />
                    <button onClick={this.handleClick.bind(this)} type="submit" name="submitFile" id="submitFile" class=" btn btn-success" value="Upload file"><span class="glyphicon glyphicon-upload"></span>&nbsp;UPLOAD FILE</button>
                    {this.props.medias.uploaded &&<p class="uploadInfo">&nbsp;&nbsp;Upload succesfull!</p>}
                    {this.props.medias.failed &&<p class="uploadfailed">&nbsp;&nbsp;Upload Failed!</p>}
                </form>
            </div>
        );
    }
}