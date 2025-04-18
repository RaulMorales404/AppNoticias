import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Search from '@screens/search/Search';
import Reactions from '@screens/reactions/Reactions';
import { Article } from '@services/interfaces/articlesInterface';
import Details from '@screens/details/Details';

export type RootStackParamList = {
  Likes: undefined;
  Details: {
    dataDetails:Article
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const LikesStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={
        {
          // Ocultar el encabezado por defecto en todas las pantallas
        }
      }>
      <Stack.Screen
        name="Likes"
        component={Reactions}
        options={{
          title: 'Me gusta',
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            marginBottom: 0,
            color: '#2CB3FC',
          },

          headerShown: true, // Mostrar el encabezado solo en la pantalla de búsqueda

          cardStyle: {
            backgroundColor: 'white',
          },
        }}
      />
      <Stack.Screen name="Details" 
      options={{ headerShown: false}}
      component={Details} 
      />
    </Stack.Navigator>
  );
};

export default LikesStackNavigation;
