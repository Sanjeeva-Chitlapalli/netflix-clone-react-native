import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import MovieDetails from './screens/MovieDetails';
import PlayerScreen from './screens/PlayerScreen';
import {View, StyleSheet} from 'react-native';
import SearchResults from './screens/SearchResults';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={MovieDetails} />
          <Stack.Screen name="Player" component={PlayerScreen} />
          <Stack.Screen name="SearchResults" component={SearchResults} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', // Set the background color here
  },
});

export default App;
