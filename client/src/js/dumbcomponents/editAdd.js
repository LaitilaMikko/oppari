import React from "react";

export default class editAdd extends React.Component {
    render(){
        return(
            <div class="lower">
                <p>Edit add {this.props.currAdd.name}</p>
            </div>
        );
    }
}