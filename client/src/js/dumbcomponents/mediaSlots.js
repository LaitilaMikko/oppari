/*eslint-env node*/
/*eslint-env browser*/
import React from "react";


export default class MediaSlots extends React.Component {

    constructor() {
        super();
        this.state = {
            slots: [],
            reservations: [],
            saveBtn: false,
            loop: true
        };
    }
    componentDidMount() {
        if (this.props.campaign.screens !== undefined) {
            var screens = this.props.campaign.screens;
            var testi = [];
            for (var i = 1; i <= screens; i++) {
                testi.push(
                    <div onClick={this.handleClick.bind(this)} className="mediaSlot" id={i} key={i}>
                        <img className="slotImg" src="" /><p className="slotNumb">{"#" + i}</p>
                    </div>
                );
            }
            this.setState({ slots: testi });
        }
    }

    componentDidUpdate() {
        if (this.props.medias.fetched === true) {
            var medias = this.props.medias.medias;
            medias.map((media) => {
                if (media.reservedSlots.length > 0) {
                    var slots = media.reservedSlots;
                    slots.map((slot) => {
                        var first = slot.split("-")[0];
                        var last = slot.split("-")[1];
                        document.getElementById(first).children[0].src = media.thumbUrl;
                        for (var i = first; i <= last; i++) {
                            document.getElementById(i).className = "takenMediaSlot";
                        }
                    });
                }
            });
        }
    }
    handleClick(e) {
        var slot = e.target;
        if (slot.className !== "takenMediaSlot" && this.props.medias.selected === true &&
            slot.children[0] !== undefined) {
            e.preventDefault();
            //e.target.className = "takenMediaSlot";
            //var slotImg = e.target.children[0];
            //slotImg.src = this.props.medias.selectedMedia.src;
            this.reserveMediaSlots(slot);
        }
    }

    // EKA YRITYS
    /*countPos (slot) {
        var medias = this.props.medias.medias;
        var selected = this.props.medias.selectedMedia;
        var slotNumb = slot.id;
        var panelWidth = this.props.campaign.screen_width;
        var panelHeight = this.props.campaign.screen_height;
        var displayWidth = this.props.campaign.display_w;
        var displayHeight = this.props.campaign.display_h;
        var rows = displayHeight / panelHeight;
        var x = 0;
        var y = 0;
        medias.map((media) => {
            if (String(media._id) === String(selected.id)) {
                var mediaWidth = media.slots * panelWidth;
                if (slotNumb === "1") {
                    media.pos.push(x + "," + y);
                    if (mediaWidth > displayWidth && this.props.medias.currRow < rows) {
                        this.props.medias.currRow = this.props.medias.currRow + 1;
                        y = panelHeight * this.props.medias.currRow;
                        x = displayWidth;
                        media.pos.push("-" + x + "," + y);
                        if ((mediaWidth - (displayWidth * this.props.medias.currRow)) > displayWidth) {
                            this.props.medias.currRow = this.props.medias.currRow + 1;
                            x = displayWidth * this.props.medias.currRow;
                            y = panelHeight * this.props.medias.currRow;
                            media.pos.push("-" + x + "," + y);
                        }
                    }
                } else {
                    x = (slotNumb - 1) * panelWidth;
                    y = panelHeight * this.props.medias.currRow;
                    media.pos.push(x + "," + y);
                    if ((x + mediaWidth) > displayWidth) {
                        x = mediaWidth - (displayWidth - x);
                        this.props.medias.currRow = this.props.medias.currRow + 1;
                        y = panelHeight * this.props.medias.currRow;
                        media.pos.push("-" + x + "," + y);
                        if ((mediaWidth - x) > displayWidth) {
                            this.props.medias.currRow = this.props.medias.currRow + 1;
                            x = displayWidth * this.props.medias.currRow;
                            y = panelHeight * this.props.medias.currRow;
                            media.pos.push("-" + x + "," + y);
                            if ((mediaWidth - (displayWidth * this.props.medias.currRow)) > displayWidth) {
                                this.props.medias.currRow = this.props.medias.currRow + 1;
                                x = displayWidth * this.props.medias.currRow;
                                y = panelHeight * this.props.medias.currRow;
                                media.pos.push("-" + x + "," + y);
                            }
                        }
                    }
                }
            }
        });
    }*/
    reserveMediaSlots(slot) {
        var screens = this.props.campaign.screens;
        var medias = this.props.medias.medias;
        var selected = this.props.medias.selectedMedia;
        for (var i = 0; i < medias.length; i++) {
            if (medias[i]._id === selected.id) {
                var slots = medias[i].slots;
                var mediaSlots = medias[i].reservedSlots;
                if (((slots - 1) + Number(slot.id)) <= screens) {
                    slot.className = "takenMediaSlot";
                    var slotImg = slot.children[0];
                    slotImg.src = this.props.medias.selectedMedia.src;
                    mediaSlots.push(slot.id + "-" + (Number(slot.id) + (Number(slots - 1))));
                    for (var j = 1; j < slots; j++) {
                        var id = Number(slot.id) + j;
                        var reserved = document.getElementById(id);
                        reserved.className = "takenMediaSlot";
                    }
                } else {
                    console.log("Media takes too many slots!");
                }
            }
        }
    }
    // TOINEN YRITYS
    /*countPos(slot) {
        var panelWidth = this.props.campaign.screen_width;
        var displayWidth = this.props.campaign.display_w;
        var displayHeight = this.props.campaign.display_h;
        var panelHeight = this.props.campaign.screen_height;
        var maxRows = displayHeight / panelHeight;
        var medias = this.props.medias.medias;
        var mediaWidth;
        var pos = [];
        //var row = 1;
        var testi = (slot.id * panelWidth) / displayWidth;
        var row;
        if (testi < 1) {
            row = 1;
        } else {
            row = Math.round(testi, 1);
        }
        var startX = (slot.id - 1) * panelWidth;
        var startY = (row - 1) * panelHeight;
        medias.map((media) => {
            if (media._id == this.props.medias.selectedMedia.id) {
                mediaWidth = media.slots * panelWidth;
            }
        });
        var x;
        var y;
        if (mediaWidth > displayWidth) {
            if (startX == displayWidth) {
                row = row + 1;
                x = 0;
                y = (row - 1) * panelHeight;
                pos.push(x + "," + y);
            } else {
                pos.push(startX + "," + startY);
            }
            while ((mediaWidth - (row * displayWidth)) >= 0 && row < maxRows) {
                row = row + 1;
                x = (displayWidth * (row - 1)) - ((slot.id - 1) * panelWidth);
                y = (row - 1) * panelHeight;
                pos.push("-" + x + "," + y);
            }
        } else if (startX >= displayWidth) {
            row = Math.round((startX / displayWidth), 1);
            if (row < maxRows) {
                x = startX - (displayWidth * row);
                y = row * panelHeight;
                pos.push(x + "," + y);
            }
        } else {
            pos.push(startX + "," + startY);
        }
        console.log(pos);
    }*/

    handleSave(e) {
        e.preventDefault();
        var medias = this.props.medias.medias;
        var ad = this.props.ad.name;
        var campaign = this.props.ad.campaign;
        medias.map((media) => {
            if (media.reservedSlots.length > 0) {
                this.countPos(media);
            }
        });
        this.props.save(medias, campaign, ad);
    }

    countPos(media) {
        var mediaWidth = media.slots * this.props.campaign.screen_width;
        var maxRows = this.props.campaign.display_h / this.props.campaign.screen_height;
        var displayW = this.props.campaign.display_w;
        var slotW = this.props.campaign.screen_width;
        var slotH = this.props.campaign.screen_height;
        var slots = media.reservedSlots;
        var row = 1;
        slots.map((slot) => {
            var first = slot.split("-")[0];
            var x = (first - 1) * slotW;
            if (x >= displayW) {
                row = (Math.round((x / displayW), 1)) + 1;
                x = x - ((row - 1) * displayW);
            }
            var y = (row - 1) * slotH;
            media.pos.push(x + "," + y);
            var toBeShown = mediaWidth - (displayW - x);
            while (toBeShown > 0 && row < maxRows) {
                row = row + 1;
                x = mediaWidth - toBeShown;
                y = (row - 1) * slotH;
                if (x > 0) {
                    media.pos.push("-" + x + "," + y);
                } else {
                    media.pos.push(x + "," + y);
                }
                toBeShown = toBeShown - displayW;
            }
        });
    }

    countRow(first, displayW) {

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
        for (var j = 0; j < reservations.length; j++) {
            reservations[j].reservedSlots = [];
        }
        this.props.erase(this.props.ad.campaign, this.props.ad.name);
    }

    render() {
        return (
            <div className="upper">
                <h4>MediaSlots</h4>
                <div>
                    {this.state.slots}
                </div>
                <br />
                <button disabled={this.state.saveBtn} onClick={this.handleSave.bind(this)}
                    className="btn btn-primary">SAVE
                </button>
                <button onClick={this.handleDel.bind(this)} className="btn btn-danger">ERASE SLOTS</button>
                <br />
                <br />
                {this.props.medias.saved && <p>Slots Saved !</p>}
            </div>
        );
    }
}
