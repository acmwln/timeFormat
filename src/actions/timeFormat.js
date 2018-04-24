import types from '../constants/actionType';
import {formateHotelRoom} from '../dataModels/formatData';
import _ from "lodash"


//请求酒店房型接口
export const reqHotelRoom = () => (dispatch, getState) => {
    formateHotelRoom().then(data =>{
        dispatch({
            type: types.HOTELDETAIL_ROOM_SUCCESS,
            payload: {
                data: {...data},
                showErrorPage: false,
                showRoomLoading: false
            }
        });
    })
    .catch(err=>{
        dispatch({
            type: types.HOTELDETAIL_ROOM_FAILURE,
            payload: {
                showErrorPage: true,
                showRoomLoading: false
            }
        })
        
    })
}