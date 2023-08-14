import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import requests from '../requests';

const Banner = ({navigation}) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(requests.fetchTopRated);
        if (!response.ok) {
          console.error('Network response not ok:', response);
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setMovie(data.results[randomIndex]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handlePlayClick = movie => {
    const title = movie?.title || movie?.name || movie?.original_name;
    navigation.navigate('Player', {title});
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <View style={styles.bannerContainer}>
      <ImageBackground
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
        }} // Use the appropriate image property
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.bannerContents}>
          <Text style={styles.title}>
            {loading
              ? 'Loading...'
              : movie?.title || movie?.name || movie?.original_name}
          </Text>
          <View style={styles.bannerButtons}>
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => handlePlayClick(movie)}
              disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? 'Loading...' : 'Play'}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.myListButton}>
              <Text style={styles.buttonText}>My List</Text>
            </TouchableOpacity> */}
          </View>
          <Text style={styles.description}>
            {loading ? 'Loading...' : truncate(movie?.overview, 70)}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    height: 250,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bannerContents: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bannerButtons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  playButton: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  myListButton: {
    backgroundColor: '#333',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 16,
    color: 'white',
  },
});

export default Banner;
