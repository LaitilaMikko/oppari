import React from "react";

export default class Header extends React.Component {
    render () {
        return (
            <div>
                <h1 className="title">{this.props.title}</h1>
                <p>{this.props.location}</p>
            </div>
        );
    }
}
