import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#AFF6FF",
    alignItems: "center",
  },
  centerView: {
    alignItems: "center",
    backgroundColor: "#AFF6FF",
  },
  view_title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: "5%",
  },
  text_title: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    color: "#fff",
  },

  mainBox: {
    // flex: 1,
    width: responsiveWidth(90),
    // height: responsiveHeight(59),
    backgroundColor: "#ffffff",
    // marginTop: "15%",
    borderRadius: 36,
    paddingBottom: "4%",
    marginVertical: "5%",
  },
  boxHeader: {
    // marginTop: "8%",
    alignItems: "center",
  },
  boxBody: {
    alignItems: "center",
    // marginTop: "8%",
  },
  calculateHeader: {
    flex:1,
    width: responsiveWidth(90),
    // height: responsiveHeight(20),
    textAlign: "center",
  },
  image1: {
    // flex: 1,
    width: responsiveWidth(90),
    height: responsiveHeight(20),
    opacity: 1,
    justifyContent:"center",
    alignItems: "center",
  },
  calculateBody: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6%",
  },
  header_text: {
    fontSize: responsiveFontSize(4),
    fontWeight: "bold",
    // alignItems: "center",
    textAlign: "center",
    // marginTop: "11%",
    // marginBottom: "11%",
    color: "#AEF5DC",
  },
  input_text: {
    fontSize: responsiveFontSize(2),
  },
  input_box: {
    height: responsiveHeight(4),
    width: responsiveWidth(72),
    borderColor: "black",
    borderWidth: 1,
    marginTop: "3%",
    marginBottom: "3%",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  calculate_button: {
    height: responsiveHeight(6),
    width: responsiveWidth(82),
    backgroundColor: "#4681f4",
    borderRadius: 8,
    // marginTop: "4%",
    justifyContent: "center",
  },
  calculate_button_text: {
    textAlign: "center",
    marginTop: "1%",
    marginBottom: "1%",
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.5),
  },
});

export default styles;
