import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = () => {
  const navigation = useNavigation();

  const handleSearch = () => {
    navigation.navigate('SearchResults');
  };

  const handleLogoPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={handleLogoPress}>
        <Image
          source={{
            uri: 'https://www.edigitalagency.com.au/wp-content/uploads/Netflix-logo-red-black-png.png',
          }}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Image
            source={require('../assets/search.png')}
            style={styles.searchBtn}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 170,
    height: 70,
    resizeMode: 'contain',
    marginBottom: -30,
    marginTop: -30,
    marginLeft: -40,
    marginRight: -30,
  },
  searchButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Navbar;
