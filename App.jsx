import React, { useContext } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from "./contexts/AuthContext";
import {
  Provider as PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginContext, LoginContextProvider } from "./contexts/LoggedInContext";
import Landing from "./screens/Landing";
import LoginSignUp from "./screens/LoginSignUp";
import UserProfile from "./screens/UserProfile";
import Search from "./screens/Search";
import Chats from "./screens/Chats";
import Chat from "./screens/Chat";
import WishList from "./screens/WishList";
import { ChatContextProvider } from "./contexts/ChatContext";
import Reviews from "./screens/Reviews";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ListingPage from "./screens/ListingPage";
import CommentsList from "./screens/CommentsList";
import RateForm from "./screens/RateForm";
import ErrorPage from "./screens/ErrorPage.jsx";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const ChatsNav = () => {
  return (
    <ChatContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({ title: "" })}
        />
      </Stack.Navigator>
    </ChatContextProvider>
  );
};

const MyStack = () => {
  return (
    <ChatContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="WishList" component={WishList} />
        <Stack.Screen name="ListingPage" component={ListingPage} />
        <Stack.Screen name="Chats" component={Chats} />
        {/* <Stack.Screen name="CommentsList" component={CommentsList} /> */}
        <Stack.Screen name="Reviews" component={Reviews} />
        <Stack.Screen name="RateForm" component={RateForm} />
      </Stack.Navigator>
    </ChatContextProvider>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Search"
        component={MyStack}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Icon name="home-search" size={30} color="#16a34a" />
          ),
          tabBarLabel: () => (
            <Text style={{ color: "black", fontWeight: "thin", fontSize: 12 }}>
              Search
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Liked Homes"
        component={WishList}
        options={{
          tabBarIcon: () => (
            <Icon name="home-heart" size={30} color="#16a34a" />
          ),
          tabBarLabel: () => (
            <Text style={{ color: "black", fontWeight: "thin", fontSize: 12 }}>
              Liked Homes
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={UserProfile}
        options={{
          tabBarIcon: () => <Icon name="account" size={30} color="#16a34a" />,
          tabBarLabel: () => (
            <Text style={{ color: "black", fontWeight: "thin", fontSize: 12 }}>
              My Profile
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="ChatsNav"
        component={ChatsNav}
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name="chat" size={30} color="#16a34a" />,
          tabBarLabel: () => (
            <Text style={{ color: "black", fontWeight: "thin", fontSize: 12 }}>
              Chats
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AuthStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Login" component={LoginSignUp} />
  </Stack.Navigator>
);

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <LoginContextProvider>
          <Navigation />
        </LoginContextProvider>
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
