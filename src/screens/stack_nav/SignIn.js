import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../utils/CustomButton'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../services/slices/UserSlice'

const SignIn = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [formValue, setFormValue] = useState({ email: "peter@gmail.com", password: "Abcd@123" });
    const [formError, setFormError] = useState({});
    const [isModal, setIsModal] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = () => {
        const validationErrors = validateData();
        setFormError(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const formData = new FormData();
            formData.append('email', formValue.email);
            formData.append('password', formValue.password);
            dispatch(userLogin({ loginData: formData, navigation }))
            // setFormValue({ email: "", password: "" })
        }
    }

    const validateData = () => {
        const error = {};
        const emailRegex = /^([a-zA-Z0-9-.]+)@([a-z]{5,12}).[a-z]{2,4}?$/;
        const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // email validation
        if (!formValue.email) {
            error.email = "*Email is Required!"
        } else if (!emailRegex.test(formValue.email)) {
            error.email = "*Invalid Email Format!"
        }

        // password validation
        if (!formValue.password) {
            error.password = "*Password is Required!";
        } else if (formValue.password.length < 8) {
            error.password = "*Password should be Minimum 8 Characters Long!";
        } else if (!pwRegex.test(formValue.password)) {
            // error.password = "*Password should Contain Alphanumeric and Special Characters without Blank Space!";
            error.password = "*Password should Contain at least 1 Uppercase, Lowercase & Special Character Without Blank Space!";
        }

        return error;
    }

    const disableModal = () => {
        setIsModal(false)
    }

    useEffect(() => {

    }, [])

    return (
        <SafeAreaView style={styles.parent}>
            <ScrollView>
                <View>
                    {/* // head */}
                    <View style={{ marginLeft: 10, marginTop: 10 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("splashsecond")}>
                            <Image style={{ alignItems: "center", width: 20, height: 20 }} source={require('../../assets/icons/nav.png')} />
                        </TouchableOpacity>
                    </View>

                    {/* // head Image */}
                    <View style={{ alignItems: "center" }}>
                        <Image style={styles.headImage} source={require('../../assets/images/header.png')} />
                    </View>

                    {/* // head text */}
                    <Text style={{ textAlign: "center", fontSize: 20, letterSpacing: 1, color: "#3A3D3E", marginBottom: 30 }}>Sign in to continue</Text>

                    {/* // input sections */}
                    <View style={styles.inputGrp}>

                        {/* // email */}
                        <Text style={styles.labels}>Email</Text>
                        <View style={[styles.inputBoxWrap, { height: 40, marginBottom: 30 }]}>
                            <TextInput
                                style={styles.inputBox}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                autoCorrect={false}
                                placeholder={"Enter Your Email"}
                                value={formValue.email}
                                onChangeText={value => setFormValue({ ...formValue, email: value })}
                            />
                            {formError.email ?
                                <Text style={styles.error}>{formError.email}</Text>
                                : null
                            }
                        </View>

                        {/* // password */}
                        <Text style={styles.labels}>Password</Text>
                        <View style={[styles.inputBoxWrap, { position: "relative" }]}>
                            <TextInput
                                style={styles.inputBox}
                                secureTextEntry={showPassword ? false : true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder={"Enter Your Password"}
                                value={formValue.password}
                                onChangeText={value => setFormValue({ ...formValue, password: value })}
                            />

                            <TouchableOpacity style={styles.eye} onPress={() => setShowPassword(!showPassword)}>
                                <Image
                                    style={{ width: 24, height: 24 }}
                                    source={showPassword ? require("../../assets/icons/view.png") : require("../../assets/icons/hide.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        {formError.password ?
                            <Text style={styles.error}>{formError.password}</Text>
                            : null
                        }
                    </View>

                    {/* // buttons */}
                    <View style={{ marginTop: 50 }}>
                        <CustomButton btnText={"Login here"} onPressFunc={handleLogin} />
                    </View>
                </View>
                {/* // modal */}
                {/* <CustomModal isModal={isModal} modalExec={disableModal} textColor={"#000"} /> */}
                {/* <CustomLoader loader={status} /> */}
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    parent: {
        // flex: 1,
        justifyContent: "center",
    },
    headImage: {
        width: 250,
        height: 80,
        marginBottom: 50,
        marginTop: 20,
    },
    inputGrp: {
        marginHorizontal: 28,
        alignSelf: "stretch"
    },
    labels: {
        fontSize: 15,
        marginTop: 10,
        marginLeft: 2,
        marginBottom: 10,
        color: "#3A3D3E",
    },
    inputBoxWrap: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#2D75FF',
    },
    inputBox: {
        paddingLeft: 10,
        marginRight: 45,
        paddingVertical: 5,
    },
    eye: {
        position: "absolute",
        top: 2,
        right: 10,
        padding: 5,
    },
    sepWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
    },
    separator: {
        flex: 1,
        height: 1,
        marginHorizontal: 20,
        backgroundColor: 'black',
    },
    error: {
        color: "#f00",
        marginLeft: 10,
        marginTop: 3,
        fontSize: 12,
    }
})

export default SignIn
