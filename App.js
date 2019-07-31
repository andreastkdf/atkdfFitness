import React from "react"
import { View, Platform } from "react-native"
import AddEntry from "./components/AddEntry"
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./reducers"
import History from "./components/History"
import {
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation"
import { purple, white } from "./utils/colors"
import { FontAwesome, Ionicons } from "@expo/vector-icons"

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

const TabsContainer = createAppContainer(Tabs)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          {/* <AddEntry /> */}
          <View style={{ height: 20 }} />
          <TabsContainer />
        </View>
      </Provider>
    )
  }
}
