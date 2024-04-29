import React, { Component } from "react";
import ChairItems from "./chairItems";
import {connect} from "react-redux";
import { actDeletechair, resetData,actSelectingchair,acrConFirm,resetNumb } from "../store/action";
 class Hangghe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfSeats: 0,// Khởi tạo giá trị mặc định cho số lượng ghế
      username: "",
      confirmclick: false,
      deleteclick: false
    };
  }
  handleConfirmSelection = () => {
    this.props.confirmChair();
    this.setState({ confirmclick: true,
     }); // Đặt trạng thái confirmclick thành true sau khi xác nhận chọn ghế
  };

  componentDidUpdate(prevProps, prevState) {
    // Kiểm tra sự thay đổi của listchair từ props trước và props hiện tại
    if (prevProps.chair !== this.props.chair || this.state.confirmclick !== prevState.confirmclick || this.state.deleteclick !== prevState.deleteclick) {
      // Nếu có sự thay đổi, gọi hàm render lại danh sách ghế
      this.renderChairList();
      if (this.props.listchairSelect.length === 0) {
        this.props.resetData(); // Reload lại trang
        this.setState ( {
          numberOfSeats: 0,// Khởi tạo giá trị mặc định cho số lượng ghế
          username: "",
          confirmclick: false,
          deleteclick: false
        });
      }
    }
    
  }
  getValueInput=()=>{
    this.props.choosechair(Number(this.state.numberOfSeats));
  };
  
  handleNumberOfSeatsChange = (value, inputType) => {
    if (inputType === "numberOfSeats") {
        this.props.resetNumbChair();
        this.setState({
            numberOfSeats: value,
        });
    } else if (inputType === "username") {
        this.setState({
            username: value,
        },()=>{});
    }
};
deleteChair = (soGhe) => {
  this.props.deleteChair(soGhe);
  this.setState((prevState) => ({
    deleteclick: true,
    numberOfSeats: prevState.numberOfSeats - 1
  }), () => {
    // Gọi hàm để cập nhật checkedSeats trong ChairItems
    // this.props.updateCheckedSeats();
  });
  
};

renderChairSelect = () => {
  if (this.state.confirmclick !== true) {
    return null;
  }
  let buttons = [];
  this.props.chair.forEach((ghe, index) => {
    ghe.danhSachGhe.forEach((c, subIndex) => {
      if (this.props.listchairSelect.includes(c.soGhe)) {
        buttons.push(
          <React.Fragment key={`${index}-${subIndex}`}>
          <button  className="btn btn-danger mr-2 mt-2 ">{c.soGhe}</button>
          <button  className="btn btn-primary mr-2 mt-2 " >{c.gia}$</button>
          <button  className="btn btn-info mr-2 mt-2 " onClick={()=>this.deleteChair(c.soGhe)}>Delete</button>
          <br></br>
          </React.Fragment>
        );
      }
    });
  });
  return buttons;
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
           deleteclick={this.state.deleteclick}
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
                     <input
                       type="text"
                       id="Username"
                       required
                       value={this.state.username}
                       onChange={(e) =>
                         this.handleNumberOfSeatsChange(
                           e.target.value,
                           "username"
                         )
                       }
                     />
                   </div>
                   <div className="agileits-right">
                     <label>
                       {" "}
                       Number of Seats
                       <span>*</span>
                     </label>
                     <input
                       type="number"
                       id="Numseats"
                       required
                       min={1}
                       value={
                         this.state.numberOfSeats === 0
                           ? ""
                           : this.state.numberOfSeats
                       }
                       onChange={(e) =>
                         this.handleNumberOfSeatsChange(
                           e.target.value,
                           "numberOfSeats"
                         )
                       }
                     />
                   </div>
                 </div>
                 <button
                   onClick={() => {
                     this.getValueInput();
                   }}
                 >
                   Start Selecting
                 </button>
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
                 <button
                   onClick={() => {
                     this.handleConfirmSelection();
                   }}
                 >
                   Confirm Selection
                 </button>
               </div>
               {/* //seat layout */}
               {/* details after booking displayed here */}
               <div
                 className="displayerBoxes txt-center"
                 style={{ overflow: "hidden" }}
               >
                 <table className="Displaytable w3ls-table" width="100%">
                   <tbody className="text-align-center">
                     <tr>
                       <th>Name</th>
                       <th>Number of Seats</th>
                       <th>Seats</th>
                     </tr>
                     <tr>
                       <td> {(this.state.confirmclick===true &&  this.props.listchairSelect.length > 0)  ?`${this.state.username}`:""}</td>
                       <td>{(this.state.confirmclick===true &&  this.props.listchairSelect.length > 0) ?`${this.state.numberOfSeats}`:""}</td>
                       <td>
                       {(this.state.confirmclick===true &&  this.props.listchairSelect.length > 0)  ?this.renderChairSelect():""}
                       <textarea  id="" cols="41"  defaultValue={""} ></textarea>
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
    listchairSelect: state.chairReducer.listchairSelect,
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
    },
    confirmChair: ()=>{
      dispatch(acrConFirm());
    },
    resetNumbChair: ()=>{
      dispatch(resetNumb());
    },
    resetData:()=>{
      dispatch(resetData());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Hangghe);