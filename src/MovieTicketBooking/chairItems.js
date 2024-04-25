import React, { Component } from "react";
import { connect } from "react-redux";

class ChairItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCount: 0,
      checkedSeats: {},

    };
  }

  handleSeatSelect = (event) => {
    const soGhe = event.target.value;
    const { selectedCount, checkedSeats } = this.state;
    const { numbchair } = this.props;

    const updatedCheckedSeats = { ...checkedSeats };
    let updatedSelectedCount = selectedCount; // Tạo bản sao của selectedCount

    // Kiểm tra xem số lượng ghế đã chọn có vượt quá hoặc bằng numbchair không
    if (selectedCount >= numbchair) {
        // Nếu vượt quá hoặc bằng numbchair, không cho phép chọn thêm ghế
        if (updatedCheckedSeats[soGhe]) {
            // Hủy chọn nếu ô đã được chọn trước đó
            updatedCheckedSeats[soGhe] = false;
            updatedSelectedCount--; // Giảm selectedCount
        }
    } else {
        // Nếu chưa vượt quá numbchair, cho phép chọn thêm hoặc hủy chọn
        updatedCheckedSeats[soGhe] = !updatedCheckedSeats[soGhe];
        updatedSelectedCount += updatedCheckedSeats[soGhe] ? 1 : -1; // Tăng hoặc giảm selectedCount
    }

    this.setState({ selectedCount: updatedSelectedCount, checkedSeats: updatedCheckedSeats },()=>{console.log(selectedCount);});
};

  
  

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
                    disabled={ch.daDat}
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
    listchairSelect: state.chairReducer.listchairSelect
  };
};

export default connect(mapStateToProps, null)(ChairItems);
