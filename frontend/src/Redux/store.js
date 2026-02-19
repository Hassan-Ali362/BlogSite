import { configureStore } from '@reduxjs/toolkit';
import LoginSlice from './Slices/LoginSlice';
import RegisterSlice from './Slices/RegisterSlice';

const store = configureStore({
    reducer: {
        login: LoginSlice,
        register: RegisterSlice
    }
})

export default store;