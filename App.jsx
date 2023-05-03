import { StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config/firebase";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Landing from "./screens/Landing";
import HomeList from "./screens/HomeList";
import AddHome from "./screens/AddHome";
import ListingPage from "./screens/ListingPage";
import UpdateListing from "./screens/UpdateListing";
import LoginSignUp from "./screens/LoginSignUp";
import UserProfile from "./screens/UserProfile";
import Reviews from "./screens/Reviews";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import DebugAccount from "./screens/DebugAccount";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import Search from "./screens/Search";
import Chat from "./screens/Chat";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const { currentUser, setCurrentUser } = useAuth();
  return currentUser ? (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Landing" component={Landing} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Homes" component={HomeList} />
            <Tab.Screen name="List a home" component={AddHome} />
            <Tab.Screen name="Listing Page" component={ListingPage} />
            <Tab.Screen name="Login/Sign up" component={LoginSignUp} />
            <Tab.Screen name="My Profile" component={UserProfile} />
            <Tab.Screen name="Chat" component={Chat} />
            <Tab.Screen name="UpdateListing" component={UpdateListing} />
            <Tab.Screen name="Reviews" component={Reviews} />
            <Tab.Screen name="Debug" component={DebugAccount} />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  ) : (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="LoginSignUp" component={LoginSignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
