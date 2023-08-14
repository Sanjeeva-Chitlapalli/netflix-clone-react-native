import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Banner from '../components/banner';
import Row from '../components/row';
import Navbar from '../components/Navbar';
import requests from '../requests';

const Home = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'black' : 'black',
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <Navbar />
      <ScrollView>
        <Banner
          imageURL={
            'https://www.stockvault.net/data/2011/05/31/124348/thumb16.jpg'
          }
          navigation={navigation}
        />
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
        <Row
          title="Action Movies"
          fetchUrl={requests.fetchActionMovies}
          navigation={navigation}
        />
        <Row
          title="Comedy Movies"
          fetchUrl={requests.fetchComedyMovies}
          navigation={navigation}
        />
        <Row
          title="Horror Movies"
          fetchUrl={requests.fetchHorrorMovies}
          navigation={navigation}
        />
        <Row
          title="Romance Movies"
          fetchUrl={requests.fetchRomanceMovies}
          navigation={navigation}
        />
        <Row
          title="Documentaries"
          fetchUrl={requests.fetchDocumentaries}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 60},
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  img: {
    height: 130,
    width: 80,
  },
});

export default Home;
