import { createSlice, configureStore } from '@reduxjs/toolkit';

const slice = createSlice({
    name:'slice',
    initialState:{
        login:false
    },
    reducers:{
        setLogin(state,actions){
            state.login = actions.payload
        }
    }
});

const Actions = slice.actions;

const Store = configureStore({
    reducer:slice.reducer
});


export { Actions, Store }