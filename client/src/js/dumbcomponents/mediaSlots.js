import React from "react";

export default class MediaSlots extends React.Component {

    constructor() {
        super();
        this.state = {
            slots: [],
            reservations: []
        }
    }


    componentDidMount() {
        if (this.props.campaign.screens != undefined) {
            var screens = this.props.campaign.screens;
            var testi = [];
            for (var i = 1; i <= screens; i++) {
                testi.push(<div onClick={this.handleClick.bind(this)} className="mediaSlot" id={i} key={i}><img className="slotImg" src=""></img><p className="slotNumb">{"#" + i}</p></div>);
            }
            this.setState({ slots: testi });
        }
    }
    handleClick(e) {
        var slot = e.target;
        if (slot.className != "takenMediaSlot" && this.props.medias.selected == true) {
            e.preventDefault();
            e.target.className = "takenMediaSlot";
            var slotImg = e.target.children[0];
            slotImg.src = this.props.medias.selectedMedia.src;
            this.reserveMediaSlots(slot);

        }
    }



    reserveMediaSlots(slot) {
        var screens = this.props.campaign.screens;
        var medias = this.props.medias.medias;
        var selected = this.props.medias.selectedMedia;
        for (var i = 0; i < medias.length; i++) {
            if (medias[i]._id == selected.id) {
                var slots = medias[i].slots;
                var mediaSlots = medias[i].reservedSlots;
                mediaSlots.push(slot.id + "-" + (Number(slot.id) + (Number(slots - 1))));
                if (((slots - 1) + Number(slot.id)) <= screens) {
                    for (var i = 1; i < slots; i++) {
                        var id = Number(slot.id) + i;
                        var reserved = document.getElementById(id);
                        reserved.className = "takenMediaSlot";

                    }
                } else {
                    console.log("Media takes too many slots!");
                }
            }
        }
        console.log(mediaSlots);

    }

    handleSave(e) {
        e.preventDefault();
        var medias = this.props.medias.medias;
        var ad = this.props.ad.name;
        var campaign = this.props.ad.campaign;
        this.props.save(medias,campaign,ad);
        
    }
    handleDel(e) {
        e.preventDefault();
        var screens = this.props.campaign.screens;
        for (var i = 1; i <= screens; i++) {
            var slot = document.getElementById(i);
            slot.className = "mediaSlot";
            slot.children[0].src = "";

        }
        var reservations = this.props.medias.medias;
        for (var i = 0; i<reservations.length; i++){
            reservations[i].reservedSlots = [];
        }
        this.props.erase(this.props.ad.campaign, this.props.ad.name);

    }




    render() {
        return (
            <div class="upper">
                <h4>MediaSlots</h4>
                <div>
                    {this.state.slots}
                </div>
                <br />
                <button onClick={this.handleSave.bind(this)} class="btn btn-primary">SAVE</button>
                <button onClick={this.handleDel.bind(this)} class="btn btn-danger">ERASE SLOTS</button>
            </div>
        );
    }
}