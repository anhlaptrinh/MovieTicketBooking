import data from '../MovieTicketBooking/danhSachGhe.json';
import * as Actiontype from "./constants";
const initialState= {
    listchair: data,
    numberchair: 0,
    chaircount:0,
    listchairSelect: []
};

const chairReducer= (state = initialState, action) =>{
  switch (action.type) {
    case "RESET_DATA":
        return {...initialState};
    case Actiontype.SELECTING_CHAIR:
        return {
            ...state,
            numberchair: action.payload
          };
    case Actiontype.SELECT_CHAIR:
      return {
        ...state,
        chaircount: state.chaircount + 1,
        listchairSelect: [...state.listchairSelect, action.payload],
      };
    case Actiontype.UNSELECT_CHAIR:
      state.chaircount = state.chaircount - 1;
      return { ...state };
    case Actiontype.CONFIRM_CHAIR:
        const updatedList = state.listchair.map(chair => {
            if (chair.hang !== "") {
              chair.danhSachGhe.forEach(ghe => {
                if (state.listchairSelect.includes(ghe.soGhe)) {
                  ghe.daDat = true;
                }
               
              });
            }
            return chair;
          });
          return {
            ...state,
            listchair: updatedList
          };
    case "RESET_NUMBERS":
      return{...state,chaircount: action.payload};

    case Actiontype.DELETE_CHAIR:
      
    const upselectlist = state.listchairSelect.filter((v) => v !== action.payload);

    const newchairlist = state.listchair.map(chair => {
      if (chair.hang !== "") {
        chair.danhSachGhe.forEach(ghe => {
          if (ghe.soGhe === action.payload) {
            // Đặt lại trạng thái của ghế về chưa được đặt
            ghe.daDat = false;
          }
        });
      }
      return chair;
    });
      return {
        ...state,
        listchair: newchairlist,
        listchairSelect:upselectlist
      };
        
    default:
      return { ...state };
  }
}
export default chairReducer;