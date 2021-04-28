import React from "react";
import Header from "../Components/Header";
import "./Home.css";

class Home extends React.Component {
    render() {
      return (
        <body class="htmlNoPages">
            <div class="gwd-div-1tnt" id="header-div">
                    <label id="label_1" class="gwd-label-1xit">Vega</label>
                    <div class="gwd-div-1im0">
                    <input type="text" id="text_1" class="gwd-input-116q"/>
                    <button id="button_1" class="gwd-button-rvij">Search</button>
                </div>
                <div class="gwd-div-1b0h">
                    <button id="button_2" class="gwd-button-rr5j gwd-button-1d0r">Login</button>
                    <button id="button_3" class="gwd-button-rr5j gwd-button-iigw">Signup</button>
                </div>
                <div>
                    
                </div>
            </div>
        </body>

      );
    }
}

export default Home;