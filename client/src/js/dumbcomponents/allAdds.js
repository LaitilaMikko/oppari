import React from "react";

export default class AllAdds extends React.Component {



    render() {
        console.log(this.props.adds.adds);
        const adds = this.props.adds.adds;
        const mappedAdds = adds.map((add,key) => <option key={key} value={add._id}>{add.name} "#{add.orderNum}"</option>)
        if (adds.length > 0) {
            return (
                <div class="upper">
                    <h4>Adds for campaign "{this.props.campaign}"</h4>
                    <select size="6">
                        {mappedAdds}
                    </select>
                </div>
            );
        }
        else {
            return(
                <div class="upper">
                    <h4>Adds for campaign "{this.props.campaign}"</h4>
                    <select size="6">
                        <option key="eka" value="null"></option>
                    </select>
                </div>
            );
        }
    }
}