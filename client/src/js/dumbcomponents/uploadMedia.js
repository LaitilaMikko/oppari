/*eslint-env node*/
/*eslint-env browser*/
import React from "react";

export default class UploadMedia extends React.Component {
    handleClick (e) {
        e.preventDefault();
        var sWidth = this.props.campaign.screen_width;
        var sHeight = this.props.campaign.screen_height;
        var formdata = new FormData();
        var x = document.getElementById("file");
        if (x.files.length > 0) {
            var file = x.files[0];
            formdata.append("file", file);
            this.props.upload(formdata, this.props.campaign.name, this.props.ad.name, sHeight, sWidth);
            document.getElementById("uploadForm").reset();
        }
    }

    render () {
        return (
            <div className="lower">
                <form ref="uploadForm" id="uploadForm">
                    <div className="fileUpload btn btn-primary">
                        <span>Select File</span>
                        <input name="file" id="file" type="file" className="upload" />
                    </div>
                    <br />
                    <button onClick={this.handleClick.bind(this)} type="submit" name="submitFile"
                         id="submitFile" className=" btn btn-success" value="Upload file">
                         <span className="glyphicon glyphicon-upload"/>&nbsp;UPLOAD FILE
                    </button>
                    {this.props.medias.uploaded && <p className="uploadInfo">&nbsp;&nbsp;Upload succesfull!</p>}
                    {this.props.medias.failed && <p className="uploadFailed">&nbsp;&nbsp;{this.props.medias.reason}</p>}
                </form>
            </div>
        );
    }
}
