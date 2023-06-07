import { View } from 'react-native'
import React from 'react'
import ProgressLoader from 'rn-progress-loader';


const CustomLoader = ({ loader }) => {
    return (
        <View>
            {loader ?
                <View
                    style={{ backgroundColor: "#06566e", justifyContent: 'center', alignItems: 'center', flex: 1 }}>

                    <ProgressLoader
                        visible={loader}
                        isModal={true} isHUD={true}
                        hudColor={"#ffffff"}
                        color={"#2D75FF"}
                    />
                </View>
                : null
            }
        </View>
    )
}

export default CustomLoader