import { configureStore } from '@reduxjs/toolkit';

import AuthSlice from './Slice/AuthSlice';

export const store = configureStore({
    reducer: {
        auth: AuthSlice
    }
});
