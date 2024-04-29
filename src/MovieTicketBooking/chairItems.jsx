import React, { Component } from "react";
import { connect } from "react-redux";
import { actSelectChair, actUnSelectChair } from "../store/action";

class ChairItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedSeats: {},
    };
  }
  
  handleSeatSelect = (event) => {
    if (this.props.deleteclick) {
      // Nếu deleteclick là true, không cho phép chọn hoặc hủy chọn ghế
      return;
    }
    const soGhe = event.target.value;
    const { checkedSeats } = this.state;
    const { numbchair,chaircount } = this.props;
    const updatedCheckedSeats = { ...checkedSeats };
    let updatedSelectedCount = chaircount; // Tạo bản sao của selectedCount

    // Kiểm tra xem số lượng ghế đã chọn có vượt quá hoặc bằng numbchair không
    if (chaircount >= numbchair) {
        // Nếu vượt quá hoặc bằng numbchair, không cho phép chọn thêm ghế
        if (updatedCheckedSeats[soGhe]) {
            // Hủy chọn nếu ô đã được chọn trước đó
            this.props.unSelectChair();
            updatedCheckedSeats[soGhe] = false;
             updatedSelectedCount--; // Giảm selectedCount
        }
    } else {
        // Nếu chưa vượt quá numbchair, cho phép chọn thêm hoặc hủy chọn
        // Nếu chưa vượt quá numbchair, cho phép chọn thêm hoặc hủy chọn
        updatedCheckedSeats[soGhe] = !updatedCheckedSeats[soGhe];
        if(updatedCheckedSeats[soGhe]){
          this.props.selectChair(soGhe);
        } else {
          this.props.unSelectChair();
        }
        updatedSelectedCount += updatedCheckedSeats[soGhe] ? 1 : -1; // Tăng hoặc giảm selectedCount
    }

    this.setState({ selectedCount: updatedSelectedCount, checkedSeats: updatedCheckedSeats },()=>{});
};
componentDidUpdate(prevProps) {
  if (prevProps.listchairSelect !== this.props.listchairSelect) {
    const updatedCheckedSeats = {};

    this.props.getchair.forEach(chair => {
      updatedCheckedSeats[chair.soGhe] = this.props.listchairSelect.includes(chair.soGhe);
    });

    this.setState({ checkedSeats: updatedCheckedSeats });
  }
}
  
  

  render() {
    const { ghe, getchair, index } = this.props;
    const { checkedSeats } = this.state;

    return (
      <>
        <tr>
          <td>{ghe.hang}</td>
          {getchair?.map((ch, index) => (
            <React.Fragment key={ch.soGhe}>
              <td>
                {!/^[A-Za-z]/.test(ch.soGhe) ? (
                  ch.soGhe
                ) : (
                  <input
                    type="checkbox"
                    className="seats"
                    disabled={  ch.daDat }
                    value={ch.soGhe}
                    checked={checkedSeats[ch.soGhe] || false}
                    onChange={this.handleSeatSelect}
                  />
                )}
              </td>
              {index === 4 ? <td className="seatGap"></td> : null}
              {/* Thêm một thẻ <td> rỗng khi index là 4 */}
            </React.Fragment>
          ))}
        </tr>
        {index === 4 ? <tr className="seatVGap"></tr> : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    numbchair: state.chairReducer.numberchair,
    listchairSelect: state.chairReducer.listchairSelect,
    chaircount: state.chairReducer.chaircount,
    listchair: state.chairReducer.listchair
  };
};

const mapDispatchToProps=(dispatch)=>{
  return{
    selectChair: (soGhe)=>{
      dispatch(actSelectChair(soGhe));
    },
    unSelectChair: ()=>{
      dispatch(actUnSelectChair());
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChairItems);
