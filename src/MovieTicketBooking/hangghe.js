import React, { Component } from "react";
import ChairItems from "./chairItems";
import {connect} from "react-redux";
import { actDeletechair, actSelectingchair } from "../store/action";
 class Hangghe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSeats: 0,// Khởi tạo giá trị mặc định cho số lượng ghế
      username: ""
    };
  }

  handleNumberOfSeatsChange = (event) => {
    this.setState({
      numberOfSeats: event.target.value // Cập nhật giá trị của trường input vào state
    });
  };
   renderChairList = () => {
     const { chair } = this.props;
     return chair?.map((ghe, index) => {
       return (
         <ChairItems
           key={index}
           ghe={ghe}
           getchair={ghe.danhSachGhe}
           index={index}
         />
       );
     });
   };
   render() {
     return (
       <>
         <div>
           <h1>Movie Seat Selection</h1>
           <div className="container">
             <div className="w3ls-reg">
               {/* input fields */}
               <div className="inputForm">
                 <h2>fill the required details below and select your seats</h2>
                 <div className="mr_agilemain">
                   <div className="agileits-left">
                     <label>
                       {" "}
                       Name
                       <span>*</span>
                     </label>
                     <input type="text" id="Username" required />
                   </div>
                   <div className="agileits-right">
                     <label>
                       {" "}
                       Number of Seats
                       <span>*</span>
                     </label>
                     <input type="number" id="Numseats" required min={1}
                     value={this.state.numberOfSeats===0?"":this.state.numberOfSeats} 
                     onChange={this.handleNumberOfSeatsChange}  />
                   </div>
                 </div>
                 <button onClick={()=>{this.props.choosechair(Number(this.state.numberOfSeats))}}>Start Selecting</button>
               </div>
               {/* //input fields */}
               {/* seat availabilty list */}
               <ul className="seat_w3ls">
                 <li className="smallBox greenBox">Selected Seat</li>
                 <li className="smallBox redBox">Reserved Seat</li>
                 <li className="smallBox emptyBox">Empty Seat</li>
               </ul>
               {/* seat availabilty list */}
               {/* seat layout */}
               <div
                 className="seatStructure txt-center"
                 style={{ overflowX: "auto" }}
               >
                 <p id="notification" />
                 <table id="seatsBlock">
                   <tbody>{this.renderChairList()}</tbody>
                 </table>
                 <div className="screen">
                   <h2 className="wthree">Screen this way</h2>
                 </div>
                 <button>Confirm Selection</button>
               </div>
               {/* //seat layout */}
               {/* details after booking displayed here */}
               <div
                 className="displayerBoxes txt-center"
                 style={{ overflow: "hidden" }}
               >
                 <table className="Displaytable w3ls-table" width="100%">
                   <tbody>
                     <tr>
                       <th>Name</th>
                       <th>Number of Seats</th>
                       <th>Seats</th>
                     </tr>
                     <tr>
                       <td>
                         <textarea id="nameDisplay" defaultValue={""} />
                       </td>
                       <td>
                         <textarea id="NumberDisplay" defaultValue={""} />
                       </td>
                       <td>
                         <textarea id="seatsDisplay" defaultValue={""} />
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
           <div className="copy-wthree">
             <p>
               © 2018 Movie Seat Selection . All Rights Reserved | Design by
               <a href="http://w3layouts.com/" target="_blank">
                 W3layouts
               </a>
             </p>
           </div>
         </div>
       </>
     );
   }
 }
const mapStateToProps=(state)=>{
  return{
    chair: state.chairReducer.listchair
  };
}
const mapDispatchToProps=(dispatch)=>{
  return{
    choosechair: (number)=>{
      dispatch(actSelectingchair(number));
    },
    deleteChair: (soGhe)=>{
      dispatch(actDeletechair(soGhe));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Hangghe);