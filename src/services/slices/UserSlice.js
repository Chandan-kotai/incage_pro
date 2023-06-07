import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Toast from 'react-native-toast-message';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BaseUrl = "http://192.168.1.14/smart_lock_pro/api";

export const userLogin = createAsyncThunk('/user-sign-in.php', async ({ loginData, navigation }, { rejectWithValue }) => {
    const config = {
        method: "post",
        url: `${BaseUrl}/user-sign-in.php`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: loginData,
    }

    try {
        const res = await axios(config);
        // console.log("response =>", res?.data);
        if (res?.data?.status === true) {
            Toast.show({
                type: 'success',
                text1: "🎉 Login Successfull",
                text2: "Welcome "+ res?.data?.user_details?.name
            });

            await AsyncStorage.setItem("@user", JSON.stringify(res?.data?.user_details));
            await AsyncStorage.setItem("@token", JSON.stringify(res?.data?.token));


            navigation.replace("scanner");
            return res?.data;
        }else{
            Toast.show({
                type: 'error',
                text1: "Login Failed!",
                text2: res?.data?.message
            });
            return res?.data;
        }
    } catch (exc) {
        Toast.show({
            type: 'error',
            text1: "Something Went Wrong!",
            text2: "Please Try Again"
        })
        return rejectWithValue(exc.response.data);
    }
})


export const getDeviceInfo = createAsyncThunk('/get-device.php', async ({ formData, navigation }, { rejectWithValue }) => {
    const config = {
        method: "post",
        url: `${BaseUrl}/get-device.php`,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: formData,
    }

    try {
        const res = await axios(config);
        // console.log("response =>", res?.data);
        if (res?.data?.status === true) {
            Toast.show({
                type: 'success',
                text1: "🎉 Device Info Fetched",
                text2: res?.data?.message
            });            
            navigation.navigate("connect");
            return res?.data;
        }else{
            Toast.show({
                type: 'error',
                text1: "Device Info Fetch Unsuccessful!",
                text2: res?.data?.message
            });
            return res?.data;
        }
    } catch (exc) {
        Toast.show({
            type: 'error',
            text1: "Something Went Wrong!",
            text2: "Please Try Again"
        })
        return rejectWithValue(exc.response.data);
    }
})


const UserSlice = createSlice({
    name: "userSlice",
    initialState: {
        status: false,
        user: null,
        token: null,
        device_info: null,
        lock_status: null,
    },
    reducers: {
        userLogout(state, { payload }) {
            Alert("log out");
        },
        setLockStatus(state, { payload }) {
            state.lock_status = payload;
        }
    },
    extraReducers: builder => {

        // user log in promise states
        builder.addCase(userLogin.pending, (state) => {
            state.status = true;
        })
        builder.addCase(userLogin.fulfilled, (state, { payload }) => {
            state.status = false;
            state.user = payload.user_details;
            state.token = payload.token;
        })
        builder.addCase(userLogin.rejected, (state, { payload }) => {
            state.status = false;
        })


        // get device info promise states
        builder.addCase(getDeviceInfo.pending, (state) => {
            state.status = true;
        })
        builder.addCase(getDeviceInfo.fulfilled, (state, { payload }) => {
            state.status = false;
            state.device_info = payload.device_info;
        })
        builder.addCase(getDeviceInfo.rejected, (state, { payload }) => {
            state.status = false;
        })
    }
});

export const { userLogout, setLockStatus } = UserSlice.actions;
export default UserSlice.reducer;