import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

export type BarProps = {
  navigation: StackNavigationProp<any>
  route: RouteProp<any, any>
}