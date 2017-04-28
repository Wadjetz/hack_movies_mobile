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
        {loading ? <ActivityIndicator /> : this.renderContent()}
      </ScrollView>
    )
  }

  renderMovies = () => {
    const { movies } = this.state.data
    return movies.slice(0, 1).map((movie: Movie) => {
      console.debug(`http://fr.web.img3.acsta.net/c_430_580${movie.poster}`)
      return (
        <View key={movie._id} style={styles.movie}>
          <Image style={styles.poster} source={{
            uri: `https://fr.web.img3.acsta.net/c_430_580${movie.poster}`
          }} />
          <View style={styles.infos}>
            <Text style={styles.text}>{movie.title}</Text>
          </View>
        </View>
      )
    })
  }

  renderContent = () => {
    return (
      <View>
        {this.renderMovies()}
        {this.renderSectionTitle("Prochainement".toUpperCase())}
        {this.renderSection()}
      </View>
    )
  }

  renderSection = () => {
    const { movies } = this.state.data
    return (
      <ScrollView horizontal>
        {movies.slice(1).map(this.renderHorizonal)}
      </ScrollView>
    )
  }

  renderSectionTitle = (title: string) => {
    return (
      <View style={styles.sectionTitleView}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    )
  }

  renderHorizonal = (movie: Movie) => {
    return (
      <View key={movie._id} style={styles.horizontalMovie}>
        <Image style={styles.horizontalPoster} source={{
          uri: `https://fr.web.img3.acsta.net/c_430_580${movie.poster}`
        }} />
        <View style={styles.horizontalInfo}>
          <Text>{movie.title}</Text>
        </View>
      </View>
    )
  }
}

interface Style {
  content: ViewStyle
  horizontalMovie: ViewStyle
  horizontalPoster: ImageStyle
  horizontalInfo: ViewStyle
  poster: ImageStyle
  movie: ViewStyle
  infos: ViewStyle
  text: TextStyle
  sectionTitleView: TextStyle
  sectionTitle: TextStyle
}

const styles = StyleSheet.create<Style>({
  content: {
    flex: 1,
    backgroundColor: colors.darkPrimaryColor,
    paddingTop: 20,
    paddingHorizontal: 10,
    flexDirection: "column"
  },
  horizontalMovie: {
    marginHorizontal: 3,
    width: 240,
    height: 480
  },
  horizontalPoster: {
    width: 240,
    height: 325,
    resizeMode: "contain"
  },
  horizontalInfo: {
    paddingHorizontal: 10,
    width: 240,
    height: 92,
    justifyContent: "center",
    backgroundColor: colors.lightPrimaryColor,
  },
  movie: {
    alignItems: "stretch",
    width: "100%",
    height: 470,
    marginBottom: 30
  },
  infos: {
    backgroundColor: colors.darkPrimaryColor,
    opacity: 0.7,
    paddingVertical: 30,
    paddingHorizontal: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  poster: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: "contain"
  },
  sectionTitleView: {
    padding: 30
  },
  sectionTitle: {
    color: colors.lightPrimaryColor,
    fontSize: 24,
    lineHeight: 32
  },
  text: {
    color: colors.lightPrimaryColor,
    fontSize: 19,
    lineHeight: 24,
  }
})
