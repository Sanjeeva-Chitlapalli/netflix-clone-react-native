import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import requests from '../requests';
import FastImage from 'react-native-fast-image';
import Navbar from '../components/Navbar';

function SearchResults({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(requests.fetchActionMovies);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    // Filter movies based on the search query
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setSearchResults(filtered);
  }, [searchQuery, movies]);

  const renderMovieCard = ({item}) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        navigation.navigate('Details', {
          itemId: item?.id,
        });
      }}>
      <FastImage
        source={{
          uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`,
          priority: FastImage.priority.high,
        }}
        style={styles.poster}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={searchResults}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMovieCard}
        contentContainerStyle={styles.movieList}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#4d4d4d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    marginBottom: 20,
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  movieList: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Align columns to the center
  },
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    marginRight: 10,
  },
  poster: {
    width: 135,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default SearchResults;
