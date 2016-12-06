import React from "react";

export default class MediaSlots extends React.Component {
    
    constructor(){
        super();
        this.state = {
            slots: []
        }
    }


    componentDidMount(){
        if(this.props.campaign.screens != undefined){
            var screens = this.props.campaign.screens;
            var testi=[];
            for (var i = 1; i<=screens;i++){
                testi.push(<div class="mediaSlot" id={i} key={i}><p>{"#"+i}</p></div>);
            }
            this.setState({slots: testi});
        }
    }

    render(){
        return(
            <div class="upper">
                <h4>MediaSlots</h4>
                <div>
                    {this.state.slots}
                </div>
            </div>
        );
    }
}