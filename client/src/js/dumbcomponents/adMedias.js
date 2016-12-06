import React from "react";

export default class AddMedias extends React.Component {

    render(){
        var medias = this.props.medias.medias;
        var mappedMedias = [];
        if (medias.length != 0){
            mappedMedias = medias.map((media,key)=><img src={media.thumbUrl} key={key} class="mediaImg"/>)
        }
        return(
            <div class="center">
                <h4>Medias of ad "{this.props.ad.name}"</h4>
                <div>
                    {mappedMedias}
                </div>
            </div>
        );
    }
}