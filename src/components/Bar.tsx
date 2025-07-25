import React from 'react'
import { Button } from 'react-native-paper'
import { BarProps } from '../types'

export default function Bar({ navigation, route }: BarProps) {

    const handlePress = () => {
        navigation.navigate('NewClient')
    }

    return (
        <Button icon="plus-circle" textColor='#FFF' onPress={() => handlePress()}>
            Client
        </Button>
    )
}