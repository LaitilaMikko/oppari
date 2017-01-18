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
                testi.push(<div onClick={this.handleClick.bind(this)} class="mediaSlot" id={i} key={i}><p>{"#" + i}</p></div>);
            }
            this.setState({ slots: testi });
        }
    }
    handleClick(e) {
        var slot = e.target;
        if (slot.className != "takenMediaSlot") {        
            e.preventDefault();
            this.thumbToSlot(slot);
            //this.reserveMediaSlots(slot);
            /*if(this.props.medias.selected == true){
                e.target.append(<img src={media.src} className={"mediaImg"}></img>);
            }*/
        }
    }
    thumbToSlot(slot){
        console.log(slot);
        var src = this.props.medias.selectedMedia.src;
        var slotStyle = {backgroundImage: 'url('+src+')'};
        slot.style=slotStyle;
    }


    reserveMediaSlots(slot) {
        var medias = this.props.medias.medias;
        var selected = this.props.medias.selectedMedia;
        for (var i = 0; i < medias.length; i++) {
            if (medias[i]._id == selected.id) {
                var slots = medias[i].slots;
                var mediaSlots = medias[i].reservedSlots;           
                mediaSlots.push(slot.id+"-"+(Number(slot.id)+(Number(slots-1))));
                for (var i = 1; i < slots; i++) {
                    var id = Number(slot.id) + i;
                    var reserved = document.getElementById(id);
                    reserved.className = "takenMediaSlot";
                }
            }
        }
        console.log(mediaSlots);
        /*var testi = this.state.reservations;
        var reservations = {media:selected.id,slots:mediaSlots};
        testi.push(reservations);
        console.log(testi);
        //this.setState({reservations:})*/
    }
    componentDidUpdate() {
        var medias = this.props.medias.medias;

        console.log(this.props.medias.selectedMedia);
    }

    handleSave(e){
        e.preventDefault();
        console.log(document.getElementsByClassName("lol").length);
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
            </div>
        );
    }
}