import React from "react"
import { View, Platform, StatusBar, Dimensions } from "react-native"
import AddEntry from "./components/AddEntry"
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducers"
import History from "./components/History"
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createAppContainer,
  SafeAreaView
} from "react-navigation"
import { purple, white } from "./utils/colors"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import Constants from "expo-constants"
import EntryDetail from "./components/EntryDetail"
import Live from "./components/Live"
import { setLocalNotification } from "./utils/helpers"

const AtkdfStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <SafeAreaView
      style={{ backgroundColor, height: Constants.statusBarHeight }}
    >
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  )
}

const Tabs = createMaterialTopTabNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: "History",
        tabBarIcon: ({ tintcolor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintcolor} />
        )
      }
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: "Add Entry",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    },
    Live: {
      screen: Live,
      navigationOptions: {
        tabBarLabel: "Live",
        tabBarIcon: ({ tintcolor }) => (
          <Ionicons name="ios-speedometer" size={30} color={tintcolor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
)

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      },
      headerTitleStyle: { width: Dimensions.get("window").width }
    }
  }
})

const MainContainer = createAppContainer(MainNavigator)

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AtkdfStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainContainer />
        </View>
      </Provider>
    )
  }
}
