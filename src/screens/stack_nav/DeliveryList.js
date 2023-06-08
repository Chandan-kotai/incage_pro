import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../utils/CustomButton';
import CustomLoader from '../../utils/CustomLoader';
import { userLogout } from '../../services/slices/UserSlice';

const DeliveryList = ({ navigation, route }) => {
  // console.log("delivery list =>", route?.params?.data);
  const { status } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();


  return (
    <SafeAreaView style={styles.parent}>
      <View style={{}}>

        {/* nav Panel */}
        <View style={styles.navbar}>

          {/* nav */}
          <View style={styles.headWrap}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image style={{ width: 20, height: 20, marginLeft: 15 }} source={require("../../assets/icons/nav.png")} />
            </TouchableOpacity >
          </View>

          {/* log out */}
          <View>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(userLogout(navigation))}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* delivery list */}
        <View style={styles.headingWrap}>
          <Text style={{ fontSize: 20, color: "#000", marginLeft: 20, fontWeight: "bold" }}>Delivery List</Text>
          <TouchableOpacity onPress={() => navigation.navigate("scanner")}>
            <Image style={{ width: 28, height: 28 }} source={require("../../assets/icons/qr-code.png")} />
          </TouchableOpacity>
        </View>
        {route?.params?.data?.length ?
          <FlatList
            data={route?.params?.data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <View>
                {index === 0 ? <View style={{ marginTop: 10 }}></View> : null}
                <TouchableOpacity onPress={() => navigation.navigate("map", { data: item })}>
                  <View style={styles.listWrap}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Image style={styles.boxImage} source={require("../../assets/images/package.png")} />
                      <View style={{ marginLeft: 5 }}>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                          <Text style={styles.heading}>Product Code: </Text>
                          <Text style={{ fontSize: 13, }}>{item?.product_code}</Text>
                        </View>

                        <Text style={styles.heading}>Address: </Text>
                        <Text numberOfLines={4} style={{ width: 170, fontSize: 13, marginLeft: 5 }}>{item?.address}</Text>

                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                {index === route?.params?.data?.length - 1 ? <View style={{ marginBottom: (40 * route?.params?.data?.length) + 20 }}></View> : null}
              </View>
            )}
          />
          :
          <View style={{ alignItems: "center", justifyContent: "center", height: "75%" }}>
            <Text style={{ color: "#000", fontSize: 26 }}>No Records Yet !</Text>
            <Text style={{ color: "#000", fontSize: 12 }}>Please Scan to Update the Records.</Text>
          </View>
        }
      </View>
      <CustomLoader loader={status} />
    </SafeAreaView>
  )
}

export default DeliveryList

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
    marginVertical: 15,
  },
  headWrap: {
    alignSelf: "flex-start"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#2D75FF",
    borderRadius: 8,
  },
  listWrap: {
    shadowColor: "#033EAE",
    borderColor: "#BACEF4",
    shadowOffset: {
      width: 5,
      height: 10
    },
    shadowOpacity: 0.50,
    shadowRadius: 15,
    elevation: 10,
    borderRadius: 8,
    backgroundColor: "#EAF1FF",
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20
  },
  headingWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 20,
    marginTop: 10,
  },
  heading: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000"
  },
  boxImage: {
    shadowColor: "#828283",
    shadowOffset: {
      width: 5,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    width: 100,
    height: 100,
    marginHorizontal: 10,
  }
})