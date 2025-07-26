import React from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { Button, FAB, Text } from 'react-native-paper'
import { StackScreenProps } from '@react-navigation/stack'
import axios from 'axios'
import { RootStackParamList } from '../types'
import { globalStyles } from '../styles'

type ClientDetailsProps = StackScreenProps<RootStackParamList, "ClientDetails">

export default function ClientDetails({ navigation, route }: ClientDetailsProps) {
    const { id, name, phone, email, company } = route.params.item

    const deleteClient = async () => {
        try {
            const url = `http://192.168.1.24:3000/clients/${id}`
            await axios.delete(url)
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }

    const showConfirmation = () => {
        Alert.alert(
            'Are you sure you want to delete this client?',
            'This action is irreversible and the client will be permanently removed.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: () => deleteClient() }
            ]
        )
    }

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title} variant="headlineSmall">{name}</Text>
            <Text style={styles.text}>Company: {company}</Text>
            <Text style={styles.text}>Email: {email}</Text>
            <Text style={styles.text}>Phone: {phone}</Text>

            <Button
                style={styles.btn}
                mode='contained'
                icon="cancel"
                onPress={() => showConfirmation()}
            >
                Delete client
            </Button>

            <FAB
                icon="pencil"
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NewClient", { client: route.params.item })}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
        fontSize: 18
    },
    btn: {
        marginTop: 100,
        backgroundColor: 'red'
    }
})