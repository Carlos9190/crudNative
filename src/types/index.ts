import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type RootStackParamList = {
  Home: undefined
  NewClient: { client: Client }
  ClientDetails: { item: Client }
}

export type BarProps = {
  navigation: StackNavigationProp<any>
  route: RouteProp<any, any>
}

export type Client = {
  id: string
  name: string
  phone: string
  email: string
  company: string
}