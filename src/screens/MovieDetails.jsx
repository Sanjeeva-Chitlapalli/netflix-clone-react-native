import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Row from '../components/row';
import requests from '../requests';
import Navbar from '../components/Navbar';

function MovieDetails({navigation}) {
  const [movie, setMovie] = useState({});
  const route = useRoute();
  const {itemId} = route.params;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${itemId}?api_key=a02bafb31f306201f84291bb2407cdc8`,
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [itemId]);

  const handlePlayClick = () => {
    const title = movie?.title || movie?.name || movie?.original_name;
    navigation.navigate('Player', { title });
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`,
        }}
        style={styles.banner}>
        <View style={styles.bannerContents}>
          <Text style={styles.bannerTitle}>
            {movie?.title || movie?.name || movie?.original_name}
          </Text>
          <View style={styles.buttonAndDescriptionContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={handlePlayClick}>
                <Text style={styles.buttonText}>Play</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.myListButton}>
                <Text style={styles.buttonText}>My List</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.bannerDescription}>
              {truncate(movie?.overview, 70)}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.trendingRow}>
        <Row
          title="Trending Now"
          fetchUrl={requests.fetchTrending}
          navigation={navigation}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  banner: {
    height: 300,
    justifyContent: 'flex-end',
  },
  bannerContents: {
    padding: 20,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  buttonAndDescriptionContainer: {
    flexDirection: 'column',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  myListButton: {
    backgroundColor: '#333',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  bannerDescription: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  trendingRow: {
    marginTop: 50,
  },
});

export default MovieDetails;
