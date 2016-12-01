import React from "react";
import Serialize from "form-serialize";

export default class UploadMedia extends React.Component {

    handleUpload(e){
        e.preventDefault();
        var form = document.getElementById("uploadFile");
        var data = Serialize(form,{hash:true});
        console.log(data);
    }


    render(){
        return(
            <div class="lower">
                <h4>Upload MediaFiles</h4>
                <form id="uploadFile" encType="multipart/form-data">
                    <div class="upload">
                        <input name="sampleFile" type="file" class="upload" />
                    </div>
                    <br/>
                    <input onClick={this.handleUpload.bind(this)} type="submit" defaultValue="UploadFile" class="btn btn-success"/>
                </form>
            </div>
        );
    }
}