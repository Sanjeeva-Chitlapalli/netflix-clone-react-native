import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import movieTrailer from 'movie-trailer';
import Row from '../components/row';
import requests from '../requests';
import Navbar from '../components/Navbar';

function PlayerScreen({navigation, route}) {
  const {title} = route.params;
  const [playing, setPlaying] = useState(true);
  const [videoId, setVideoId] = useState('');

  const togglePlaying = () => {
    setPlaying(prev => !prev);
  };
  console.log(title);

  useEffect(() => {
    const handleClick = () => {
      if (title) {
        movieTrailer(title)
          .then(url => {
            // const parsedUrl = new URL(url);
            console.log('Trailer URL:', url);
            const parsedUrl = queryString.parseUrl(url); // Parse query parameters
            const query = parsedUrl.query;
            setVideoId(query.v);
          })
          .catch(error => console.log(error));
      }
    };
    handleClick();
  }, [title]);
  console.log(videoId);
  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <View>
        <YoutubePlayer
          apiKey="AIzaSyAjtyuqb8j0Pq9m2lmIikvROhL6U4eet_Y"
          height={200}
          play={playing}
          videoId={videoId}
          onChangeState={state => {
            if (state === 'ended') {
              setPlaying(false);
              // You can add your own logic here when the video ends
            }
          }}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        navigation={navigation}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        navigation={navigation}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#111'},
  title: {
    marginTop: 10,
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});

export default PlayerScreen;
