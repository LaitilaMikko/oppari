import React from "react";

export default class AddMedias extends React.Component {

    handleDel(e) {
        var imgID = e.target.value;
        this.props.delete(imgID);
    }

    render() {
        var medias = this.props.medias.medias;
        var mappedMedias = [];
        if (medias.length != 0) {
            mappedMedias = medias.map((media, key) =>
                <div key={"div" + key} class="images" >
                    <img id={"Image"+ (key+ 1)} value={media._id} src={media.thumbUrl} key={key} class="mediaImg" />
                    <br />
                    <p>&nbsp;Slots: 1</p>
                    <button value={media._id} onClick={this.handleDel.bind(this)} key={"btn" + key} class="btn btn-danger">
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