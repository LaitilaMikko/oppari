import React from "react";

export default class AllAdds extends React.Component {

    handleChange(e) {
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

    }


    render() {
        const adds = this.props.adds.adds;
        const mappedAdds = adds.map((add, key) => <option key={key} value={add._id}>{add.name}"#{add.orderNum}"</option>)
        if (adds.length > 0) {
            return (
                <div class="upper">
                    <h4>Adds for campaign "{this.props.campaign}"</h4>
                    <select onChange={this.handleChange.bind(this)} size="6">
                        {mappedAdds}
                    </select>
                    <button onClick={this.handleCreate.bind(this)}>NEW AD</button>
                    <button onClick={this.handleDelete.bind(this)}>DELETE</button>
                </div>
            );
        }
        else {
            return (
                <div class="upper">
                    <h4>Adds for campaign "{this.props.campaign}"</h4>
                    <select size="6">
                        <option key="eka" value="null"></option>
                    </select>
                    <button onClick={this.handleCreate.bind(this)}>NEW AD</button>
                    <button onClick={this.handleDelete.bind(this)}>DELETE</button>
                </div>
            );
        }
    }
}