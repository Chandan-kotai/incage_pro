import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../slices/UserSlice';

export default store = configureStore({
    reducer: {
        userSlice: UserSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
});