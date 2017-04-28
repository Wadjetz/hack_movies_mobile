import React from "react"
import { View, Text } from "react-native"
import * as Api from "./services/Api"

interface State {
  data: {
    movies: any[]
  }
}

export default class App extends React.Component<void, State> {
  state = {
    data: {
      movies: [],
    }
  }
  componentDidMount() {
    Api.getInitData().then(data => {
      console.debug("getInitData", data)
      this.setState({ data: data.data })
    })
  }
  render() {
    console.debug(this.state.data)
    return (
      <View>
        <Text>
          Hello
        </Text>
      </View>
    )
  }
}
