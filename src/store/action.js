import { DELETE_CHAIR, SELECTED_CHAIR, SELECTING_CHAIR } from "./constants";

const actDeletechair=(soGhe)=>{
    return{
        type: DELETE_CHAIR,
        payload: soGhe,
    };
};
const actSelectingchair=(soGhe)=>{
    return{
        type: SELECTING_CHAIR,
        payload: soGhe,
    };
};

const actSelectedchair=(soGhe)=>{
    return{
        type: SELECTED_CHAIR,
        payload: soGhe,
    };
};

export {actDeletechair,actSelectingchair,actSelectedchair};
