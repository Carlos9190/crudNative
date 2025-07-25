import 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Home from './src/views/Home'
import NewClient from './src/views/NewClient'
import ClientDetails from './src/views/ClientDetails'
import Bar from './src/components/Bar'

// React Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

// Define design
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1774F2',
    accent: '#0655BF'
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name='Home'
          component={Home}
          options={({ navigation, route }) => ({
            headerLeft: (props) => <Bar {...props}
              navigation={navigation}
              route={route}
            />
          })}
        />
        <Stack.Screen
          name='NewClient'
          component={NewClient}
          options={{
            title: 'New client'
          }}
        />
        <Stack.Screen
          name='ClientDetails'
          component={ClientDetails}
          options={{
            title: 'Client details'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({

})