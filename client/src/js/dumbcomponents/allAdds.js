import React from "react";
import { browserHistory } from "react-router";

export default class AllAdds extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: null
        }
    }


    
    handleChange(e) {
        
        var index = e.nativeEvent.target.selectedIndex;
        this.setState({ selectedIndex: index });
        this.findSelectedAdd(e.target.value);
    }

    findSelectedAdd(id) {
        var adds = this.props.adds.adds;
        for (var i = 0; i < adds.length; i++) {
            if (adds[i]._id == id) {
                this.props.curr(adds[i]);
            }
        }
    }

    handleCreate() {
        this.props.startCreate();
    }

    handleDelete() {
        var add = this.props.adds.currAdd;
        this.props.deleteAdd(add._id);
    }

    handleUp() {
        var index = this.state.selectedIndex;
        this.handleOrder("Up", index);
    }

    handleDown() {
        var index = this.state.selectedIndex;
        this.handleOrder("Down", index);
    }

    handleMedias(){
        browserHistory.push("/medias");
    }

    handleOrder(action, index) {
        if (action == "Up") {
            if (index > 0) {
                var adds = this.props.adds.adds;
                var curr = this.props.adds.adds[index]._id;
                var next = this.props.adds.adds[index - 1]._id;
                var currAddOrder;
                var nextAddOrder;
                currAddOrder = index;
                nextAddOrder = index + 1;
                this.props.changeOrder(curr, next, action, currAddOrder, nextAddOrder);
            }
        } else if (action == "Down") {
            if ((index + 1) < this.props.adds.adds.length) {
                var adds = this.props.adds.adds;
                var curr = this.props.adds.adds[index]._id;
                var prev = this.props.adds.adds[index + 1]._id;
                var currAddOrder;
                var prevAddOrder;
                prevAddOrder = index + 1;
                currAddOrder = index + 2;
                this.props.changeOrder(curr, prev, action, currAddOrder, prevAddOrder);
            }
        }
    }

    render() {
        const adds = this.props.adds.adds;
        const mappedAdds = adds.map((add) => <option key={add.orderNum} value={add._id}>{add.name}   #{add.orderNum}</option>)
        if (adds.length > 0) {
            return (
                <div class="upper">
                    <h4>Ads for campaign "{this.props.campaign}"</h4>
                    <div class="selectHolder">
                        <select id="adds" onChange={this.handleChange.bind(this)} size="6">
                            {mappedAdds}
                        </select>
                        <div class="arrows">
                            <p onClick={this.handleUp.bind(this)}>&#x21E7;</p>
                            <p onClick={this.handleDown.bind(this)}>&#x21E9;</p>
                        </div>
                    </div>
                    <br />
                    <button onClick={this.handleCreate.bind(this)}>NEW AD</button>
                    <button disabled={!this.props.adds.edit} onClick={this.handleDelete.bind(this)}>DELETE</button>
                    <button disabled={!this.props.adds.edit} onClick={this.handleMedias.bind(this)}>MEDIAS</button>
                </div>
            );
        }
        else {
            return (
                <div class="upper">
                    <h4>Adds for campaign "{this.props.campaign}"</h4>
                    <select id="adds" size="6">
                    </select>
                    <br />
                    <button onClick={this.handleCreate.bind(this)}>NEW AD</button>
                </div>
            );
        }
    }
}