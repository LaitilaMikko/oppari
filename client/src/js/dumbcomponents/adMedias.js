import React from "react";

export default class AddMedias extends React.Component {

    handleDel(e) {
        var imgID = e.target.value;
        this.props.delete(imgID);
    }


    //HOXHOX fixaa tämä next !
    handleMediaClick(e){
        var img = e.target;
        if(this.props.medias.firstSelection == true){
            img.className = "mediaImgSelected";
            this.props.selectChanged(img.name, img.src, "first");
        }else if(this.props.medias.selected == true && img.className != "mediaImgSelected"){
            var prevSelection = document.getElementsByClassName("mediaImgSelected")[0];
            prevSelection.className = "mediaImg";
            img.className = "mediaImgSelected";
            this.props.selectChanged(img.name, img.src, "changed");
        }else if(img.className == "mediaImgSelected"){
            img.className = "mediaImg";
            this.props.selectChanged(img.name, img.src, "discard");
        }  
    }

    render() {
        var medias = this.props.medias.medias;
        var mappedMedias = [];
        if (medias.length != 0) {
            mappedMedias = medias.map((media, key) =>
                <div key={key} class="images" >
                    <img onClick={this.handleMediaClick.bind(this)} id={"Image"+ (key+ 1)} name={media._id} src={media.thumbUrl} className="mediaImg" />
                    <br />
                    <p>&nbsp;Slots: {media.slots}</p>
                    <button value={media._id} onClick={this.handleDel.bind(this)} class="btn btn-danger">
                        DELETE
                    </button>
                </div>
            )
        }
        return (
            <div class="center">
                <h4>Medias of ad "{this.props.ad.name}"</h4>
                <div>
                    {mappedMedias}
                </div>
                <br />
            </div>
        );
    }
}