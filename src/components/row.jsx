import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import FastImage from 'react-native-fast-image';

function Row({title, fetchUrl, navigation}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const base_url = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const renderMoviePoster = ({item}) => (
    <TouchableOpacity
      style={styles.posterContainer}
      onPress={() =>
        navigation.navigate('Details', {
          itemId: item?.id,
        })
      }>
      {loading || !item.poster_path ? (
        <View style={[styles.rowPoster, styles.loading]}>
          {/* Skeleton loader */}
        </View>
      ) : (
        <FastImage
          style={styles.rowPoster}
          source={{
            uri: `${base_url}${item.poster_path}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={item => item.id.toString()}
        renderItem={renderMoviePoster}
        contentContainerStyle={styles.rowPosters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginLeft: 20,
    color: '#e6e6e6',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowPosters: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  rowPoster: {
    width: 135,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  posterContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  loading: {
    backgroundColor: '#ddd',
    width: 180,
    height: 300,
    marginRight: 10,
    borderRadius: 10,
    opacity: 0.7,
    marginRight: 10,
    alignSelf: 'flex-start',
  },
});

export default Row;
