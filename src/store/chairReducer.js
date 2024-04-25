import data from '../MovieTicketBooking/danhSachGhe.json';
import * as Actiontype from "./constants";
const initialState= {
    listchair: data,
    numberchair: 0,
    listchairSelect: []
};

const chairReducer= (state = initialState, action) =>{
    switch (action.type) {
        case Actiontype.SELECTING_CHAIR:
            state.numberchair=action.payload;
           console.log(typeof state.numberchair);
            return{...state};
        default:
            return {...state};
    }
}
export default chairReducer;