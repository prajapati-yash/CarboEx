import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerContent } from "./pages/DrawerContent";
import Calculator from "./pages/Calculator";
import HomeScreen from "./pages/HomeScreen";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import { Image } from "react-native";
import Resource from "./pages/ResourcesScreen";
import { TotalSum } from "./Api/emissionCalculate";
import BuyCredit from "./pages/BuyCredit";
import SellCredit from "./pages/SellCredit";
import ProposalDetails from "./pages/proposalDetails";
import SignUP from "./pages/signUP";
import UploadCertificate from "./pages/uploadCertificate";
import SellCredits from "./pages/sellCredits";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 130,
                  height: 70,
                  marginLeft: -19,
                  marginTop: -6,
                }}
                source={require("./assets/carboex.png")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Resource"
          component={Resource}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 130,
                  height: 70,
                  marginLeft: -19,
                  marginTop: -6,
                }}
                source={require("./assets/carboex.png")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Calculator"
          component={Calculator}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 130,
                  height: 70,
                  marginLeft: -19,
                  marginTop: -6,
                }}
                source={require("./assets/carboex.png")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="ContactUs"
          component={ContactUs}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 130,
                  height: 70,
                  marginLeft: -19,
                  marginTop: -6,
                }}
                source={require("./assets/carboex.png")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 130,
                  height: 70,
                  marginLeft: -19,
                  marginTop: -6,
                }}
                source={require("./assets/carboex.png")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="proposalDetails"
          component={ProposalDetails}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 130,
                  height: 70,
                  marginLeft: -19,
                  marginTop: -6,
                }}
                source={require("./assets/carboex.png")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="uploadCertificate"
          component={UploadCertificate}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 130,
                  height: 70,
                  marginLeft: -19,
                  marginTop: -6,
                }}
                source={require("./assets/carboex.png")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="signUP"
          component={SignUP}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 130,
                  height: 70,
                  marginLeft: -19,
                  marginTop: -6,
                }}
                source={require("./assets/carboex.png")}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="sellCredits"
          component={SellCredits}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 130,
                  height: 70,
                  marginLeft: -19,
                  marginTop: -6,
                }}
                source={require("./assets/carboex.png")}
              />
            ),
          }}
        />
        <Drawer.Screen name="BuyCredit" component={BuyCredit} />
        <Drawer.Screen name="SellCredit" component={SellCredit} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
