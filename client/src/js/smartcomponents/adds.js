import React from "react";
import { connect } from "react-redux";
import Header from "../dumbcomponents/header";

@connect((store) =>{
    return {
        adds: store.Adds
    };
})


export default class Adds extends React.Component {
    render(){
        return(
            <div>
            <Header title="Adds" location="FrontPage->Adds" />
            <h4>Adds</h4>
            </div>
        );
    }
}