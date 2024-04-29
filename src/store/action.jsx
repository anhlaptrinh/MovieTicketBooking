import { DELETE_CHAIR, SELECTED_CHAIR, SELECTING_CHAIR,SELECT_CHAIR,UNSELECT_CHAIR,CONFIRM_CHAIR } from "./constants";

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
const actSelectChair = (soGhe) => {
    return {
        type: SELECT_CHAIR,
        payload: soGhe,
    }
}

const actUnSelectChair = () => {
    return {
        type: UNSELECT_CHAIR,
        
    }
}
const acrConFirm = () => {
    return {
        type: CONFIRM_CHAIR,
       
    }
}
const resetNumb=()=>{
    return{
        type : "RESET_NUMBERS",
        payload:0,
    }
}
const resetData=()=>{
    return{
        type: "RESET_DATA",
    }
}
export {actDeletechair,actSelectingchair,actSelectedchair,actSelectChair,actUnSelectChair,acrConFirm,resetNumb,resetData};
