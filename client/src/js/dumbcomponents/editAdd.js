import React from "react";
import Serialize from "form-serialize";
import { browserHistory } from "react-router";

export default class editAdd extends React.Component {

    constructor(){
        super();
        this.state = {
            InClass : "",
            OutClass: "",
            render: true
        }
    }

    componentDidMount() {
        this.setState({render: true});
        this.fillInputs();
    }

    componentDidUpdate() {
        if (this.state.render == true){
            this.fillInputs();
        }
    }

    fillInputs() {
        if (this.props.editing == true) {
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
        data.orderNum = this.props.adds.adds.length + 1;
        if (this.props.editing == true) {
            this.props.editAdd(this.props.currAdd._id, data);
        } else if (this.props.creating == true) {
            this.props.createAd(data);
        }
    }
    handleINAnim(e){
        this.setState({InClass:"animated "+ e.target.value});
        setTimeout(() => {
           this.setState({InClass:"animated"}); 
        }, 1000);
        this.setState({render: false});
    }
    handleOUTAnim(e){
        this.setState({OutClass:"animated "+ e.target.value});
        setTimeout(() => {
            this.setState({OutClass:"animated"});
        }, 1000);
        this.setState({render: false});
    }

    render() {
        return (
            <div class="lower">
                {this.props.title}
                <form id="edit">
                    <p><input id="name" name="name" placeholder="Name" /></p>
                    <p><input id="duration" name="duration" placeholder="Duration" type="number" /></p>
                    <p>Is Activated<input id="activated" type="checkBox" name="activated" /></p>
                    <div>
                        <select onChange={this.handleINAnim.bind(this)} id="animationIN" name="animationIN" placeholder="animationIN">
                            <option key={"first"} value={null}>AnimationIn</option>
                            <option key={"second"} value={"fadeIn"}>fadeIn</option>
                            <option key={"third"} value={"bounceIn"}>bounceIn</option>
                        </select>
                        <p id="InExample" className={this.state.InClass}>&nbsp;&nbsp;&nbsp;AnimationIN example</p>
                    </div>
                    <div>
                        <select onChange={this.handleOUTAnim.bind(this)} id="animationOUT" name="animationOUT" placeholder="animationIN">
                            <option key={"first"} value={null}>AnimationOut</option>
                            <option key={"second"} value={"fadeOut"}>fadeOut</option>
                            <option key={"third"} value={"bounceOut"}>bounceOut</option>
                        </select>
                        <p id="OutExample" className={this.state.OutClass}>&nbsp;&nbsp;&nbsp;AnimationOUT example</p>
                    </div>
                    <p><button class="btn btn-success" name="submit" type="submit" onClick={this.handleClick.bind(this)}><span class="glyphicon glyphicon-ok"></span>&nbsp;SAVE</button></p>
                </form>
            </div>
        );
    }
}