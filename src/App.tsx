import React from "react"
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native"
import * as Api from "./services/Api"
import colors from "./colors"

interface Movie {
  _id: string
  title: string
  poster: string
  releaseDate: string
}

interface State {
  loading: boolean
  data: {
    movies: Movie[]
  }
}

export default class App extends React.Component<void, State> {
  state = {
    loading: true,
    data: {
      movies: [],
    }
  }
  componentWillMount() {
    Api.getInitData().then(data => {
      console.debug("getInitData", data)
      this.setState({ data: data.data, loading: false })
    })
  }
  render() {
    const { loading } = this.state
    console.debug(this.state.data)
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} style={styles.content}>
        {loading ? <ActivityIndicator /> : this.renderMovies()}
      </ScrollView>
    )
  }

  renderMovies = () => {
    const { movies } = this.state.data
    return movies.slice(0, 10).map((movie: Movie) => {
      console.debug(`http://fr.web.img3.acsta.net/c_430_580${movie.poster}`)
      return (
        <View key={movie._id} style={styles.movie}>
          <Image style={styles.poster} source={{
            uri: `https://fr.web.img3.acsta.net/c_430_580${movie.poster}`
          }} onError={e => console.debug(e.nativeEvent)} onProgress={e => console.log(e)} />
          <View style={styles.infos}>
            <Text style={styles.text}>{movie.title}</Text>
          </View>
        </View>
      )
    })
  }
}

interface Style {
  content: ViewStyle
  poster: ImageStyle
  movie: ViewStyle
  infos: ViewStyle
  text: TextStyle
}

const styles = StyleSheet.create<Style>({
  content: {
    flex: 1,
    backgroundColor: colors.darkPrimaryColor,
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: "column"
  },
  movie: {
    alignItems: "stretch",
    width: "100%",
    height: 560,
    marginBottom: 30
  },
  infos: {
    backgroundColor: colors.lightPrimaryColor,
    paddingVertical: 40,
    paddingTop: 24,
    paddingHorizontal: 30
  },
  poster: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: "contain"
  },
  text: {
    fontSize: 19,
    lineHeight: 24,
  }
})
