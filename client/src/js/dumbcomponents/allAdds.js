/*eslint-env node*/
/*eslint-env browser*/
import React from "react";
import { browserHistory } from "react-router";

export default class AllAdds extends React.Component {
    constructor () {
        super();
        this.state = {
            selectedIndex: null
        };
    }

    handleChange (e) {
        var index = e.nativeEvent.target.selectedIndex;
        this.setState({ selectedIndex: index });
        this.findSelectedAdd(e.target.value);
    }

    findSelectedAdd (id) {
        var adds = this.props.adds.adds;
        for (var i = 0; i < adds.length; i++) {
            if (adds[i]._id === id) {
                this.props.curr(adds[i]);
            }
        }
    }

    handleCreate () {
        this.props.startCreate();
    }

    handleDelete () {
        var add = this.props.adds.currAdd;
        this.props.deleteAdd(add._id, add.name, add.campaign);
    }

    handleUp () {
        var index = this.state.selectedIndex;
        this.handleOrder("Up", index);
    }

    handleDown () {
        var index = this.state.selectedIndex;
        this.handleOrder("Down", index);
    }

    handleMedias () {
        browserHistory.push("/medias");
    }

    handleOrder (action, index) {
        if (action === "Up") {
            if (index > 0) {
                var curr = this.props.adds.adds[index]._id;
                var next = this.props.adds.adds[index - 1]._id;
                var currAddOrder;
                var nextAddOrder;
                currAddOrder = index;
                nextAddOrder = index + 1;
                this.props.changeOrder(curr, next, action, currAddOrder, nextAddOrder);
            }
        } else if (action === "Down") {
            if ((index + 1) < this.props.adds.adds.length) {
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

    render () {
        const adds = this.props.adds.adds;
        const mappedAdds = adds.map((add) =>
            <option key={add.orderNum} value={add._id}>{add.name}   #{add.orderNum}</option>
        );
        if (adds.length > 0) {
            return (
                <div className="upper">
                    <h4>Ads for campaign "{this.props.campaign}"</h4>
                    <div className="selectHolder">
                        <select id="adds" onChange={this.handleChange.bind(this)} size="6">
                            {mappedAdds}
                        </select>
                        <div className="arrows">
                            <p onClick={this.handleUp.bind(this)}><span className="glyphicon glyphicon-arrow-up" /></p>
                            <p onClick={this.handleDown.bind(this)}><span className="glyphicon glyphicon-arrow-down" /></p>
                        </div>
                    </div>
                    <br />
                    <button className="btn btn-success" onClick={this.handleCreate.bind(this)}>
                        <span className="glyphicon glyphicon-ok"/>&nbsp;NEW AD
                    </button>
                    <button className="btn btn-danger" disabled={!this.props.adds.edit}
                        onClick={this.handleDelete.bind(this)}>
                        <span className="glyphicon glyphicon-trash"/>&nbsp;DELETE
                    </button>
                    <button className="btn btn-primary" disabled={!this.props.adds.edit}
                        onClick={this.handleMedias.bind(this)}>
                        <span className="glyphicon glyphicon-forward"/>&nbsp;MEDIAS
                    </button>
                </div>
            );
        } else {
            return (
                <div className="upper">
                    <h4>Adds for campaign "{this.props.campaign}"</h4>
                    <select id="adds" size="6"/>
                    <br />
                    <button className="btn btn-success" onClick={this.handleCreate.bind(this)}>
                        <span className="glyphicon glyphicon-ok"/>&nbsp;NEW AD
                    </button>
                </div>
            );
        }
    }
}
