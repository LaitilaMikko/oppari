import React from "react";
import Serialize from "form-serialize";
export default class editAdd extends React.Component {


    componentDidUpdate() {
        if(this.props.currAdd == {}){
            console.log("tyhjä");
        }else{console.log("tavaraa");}

        if (this.props.currAdd.name != undefined) {
            var add = this.props.currAdd;
            document.getElementById("name").value = add.name;
            document.getElementById("duration").value = add.duration;
            document.getElementById("activated").checked = add.activated;
            document.getElementById("animationIN").value = add.animationIN;
            document.getElementById("animationOUT").value = add.animationOut;
        }
    }

    handleClick(e) {
        e.preventDefault();
        var form = document.getElementById("edit");
        var data = Serialize(form, { hash: true });
        data.isActivated = document.getElementById("activated").checked;
        data.campaign = this.props.currCamp;
        if (this.props.editing == true) {
            console.log("editing");
        } else if (this.props.creating == true) {
            this.props.createAd(data);
        }
    }

    render() {
        return (
            <div class="lower">
                {this.props.title}
                <form id="edit">
                    <p><input id="name" name="name" placeholder="Name" /></p>
                    <p><input id="duration" name="duration" placeholder="Duration" type="number" /></p>
                    <p>Is Activated<input id="activated" type="checkBox" name="activated" /></p>
                    <p>
                        <select id="animationIN" name="animationIN" placeholder="animationIN">
                            <option key={"first"} value={null}>AnimationIN</option>
                            <option key={"second"} value={"fadeIN"}>FadeIN</option>
                        </select>
                        <a>  Animation example</a>
                    </p>
                    <p>
                        <select id="animationOUT" name="animationOUT" placeholder="animationIN">
                            <option key={"first"} value={null}>AnimationOUT</option>
                            <option key={"second"} value={"fadeOUT"}>FadeOUT</option>
                        </select>
                        <a>  Animation example</a>
                    </p>
                    <p><input name="submit" type="submit" defaultValue="SAVE" onClick={this.handleClick.bind(this)} /></p>
                </form>
            </div>
        );
    }
}