import {createSlice} from '@reduxjs/toolkit'
const initialState={
    UserPresent:false,
    UserName:"monk",
}
const loggingSlice = createSlice({
    name:"logging",
    initialState,
    reducers:{
        LoggingUser:(state,action)=>{
            return {
                ...state,UserPresent:action.payload.UserPresent,UserName:action.payload.UserName,currentPath:action.payload.path,
            }
        },

    }
})
export const {LoggingUser} = loggingSlice.actions;
export default loggingSlice.reducer;