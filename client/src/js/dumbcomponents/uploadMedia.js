import React from "react";
import Serialize from "form-serialize";
import Dropzone from "react-dropzone";
import Axios from "axios";



export default class UploadMedia extends React.Component {
 
    //Toimiva ratkaisu mutta redirectaa edelleen
    componentWillMount(){
        Axios.post("http://localhost:3000/prepUpload",{
            ad: this.props.ad.name,
            campaign: this.props.campaign.name
        })
    }

    handleClick(e) {  
        var form = document.getElementById("uploadForm");
        form.submit(function(){
            return false;
        });
        //e.preventDefault();
    }
    
    render() {
        return (
            <div class="lower">
                <form ref='uploadForm' id='uploadForm' action='http://localhost:3000/uploadMedia' method='post' encType="multipart/form-data">
                    <div class="fileUpload btn btn-primary">
                        <span>Select File</span>
                        <input name="file" id="file" type="file" class="upload" />
                    </div>
                    <br />
                    <input onClick={this.handleClick.bind(this)} type="submit" name="submitFile" id="submitFile" class=" btn btn-success" value="Upload file" />
                </form>
            </div>
        );
        /*return (
            <div class="lower">
                <form role="form" class="form" onsubmit="return false;">
                    <div class="form-group">
                        <label for="file">File</label>
                        <input id="file" type="file" class="form-control" />
                    </div>
                    <button onClick={this.handleClick.bind(this)} id="upload" type="button" class="btn btn-primary">Upload</button>
                </form>
                <div id="output" class="container"></div>
            </div>
        );*/
    }
}