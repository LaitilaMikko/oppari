import React from "react";

export default class MediaSlots extends React.Component {

    constructor() {
        super();
        this.state = {
            slots: [],
            reservations: [],
            saveBtn: false
        }
    }
    componentDidUpdate() {
        if (this.props.medias.fetched == true) {
            var medias = this.props.medias.medias;
            medias.map((media) => {
                if (media.reservedSlots.length > 0) {
                    var slots = media.reservedSlots;
                    slots.map((slot) => {
                        var first = slot.split("-")[0];
                        var last = slot.split("-")[1];
                        document.getElementById(first).children[0].src = media.thumbUrl;
                        for (var i = first; i <= last; i++) {
                            console.log(i);
                            document.getElementById(i).className = "takenMediaSlot";
                        }
                    })
                }
            });
        }
        /*if (slots.length != null) {
            if (slots.length != 0) {
                this.setState({ saveBtn: true });
            }
        }*/
        /*if(this.props.medias.fetched == true){
            var medias = this.props.medias.medias;
            for (var i = 0; i < medias.length; i++){
                if(medias[i].reservedSlots.length > 0){
                    var slots = medias[i].reservedSlots;
                    for(var j = 0; j < slots.length; j++){
                        var last = slots[j].split("-")[1];
                        var first = slots[j].split("-")[0]; 
                        document.getElementById(first).children[0].src = medias[i].thumbUrl;
                        for(var k = first; k <= last; k++){
                            console.log(first + "-" + last);                                               
                            document.getElementById(k).className = "takenMediaSlot";
                        }                       
                    }
                }
            }
        }*/
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

    }

    handleSave(e) {
        e.preventDefault();
        var medias = this.props.medias.medias;
        var ad = this.props.ad.name;
        var campaign = this.props.ad.campaign;
        this.props.save(medias, campaign, ad);

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
        for (var i = 0; i < reservations.length; i++) {
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
                <button disabled={this.state.saveBtn} onClick={this.handleSave.bind(this)} class="btn btn-primary">SAVE</button>
                <button onClick={this.handleDel.bind(this)} class="btn btn-danger">ERASE SLOTS</button>
                <br />
                <br />
                {this.props.medias.saved && <p>Slots Saved !</p>}
            </div>
        );
    }
}