import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { TextInput, Button, Text, Dialog, Portal } from 'react-native-paper'
import axios from 'axios'
import { RootStackParamList } from '../types'
import { globalStyles } from '../styles'

type NewClientProps = StackScreenProps<RootStackParamList, "NewClient">

export default function NewClient({ navigation, route }: NewClientProps) {

    // Form fields
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        if (route.params.client.id) {
            const { name, phone, email, company } = route.params.client

            setName(name)
            setPhone(phone)
            setEmail(email)
            setCompany(company)
        }
    }, [])

    // Save client (DB)
    const saveClient = async () => {
        // Validate
        if (!name || !phone || !email || !company) {
            return setAlert(true)
        }

        // Generate
        const client = {
            name,
            phone,
            email,
            company
        }

        // Check if editing or adding client
        if (route.params.client.id) {
            // Edit client
            try {
                await axios.put(`http://192.168.1.24:3000/clients/${route.params.client.id}`, client)
            } catch (error) {
                console.log(error)
            }
        } else {
            // Save client
            try {
                await axios.post('http://192.168.1.24:3000/clients', client)
            } catch (error) {
                console.log(error)
            }
        }

        // Redirect
        navigation.navigate("Home")

        // Reset form
        setName('')
        setPhone('')
        setEmail('')
        setCompany('')
    }

    return (
        <View style={globalStyles.container}>
            <Text 
            style={globalStyles.title} 
            variant="headlineSmall"
            >
                {route.params.client.id ? 'Edit' : 'Save new'} client
                </Text>

            <TextInput
                label='Name'
                placeholder='Client name'
                onChangeText={text => setName(text)}
                value={name}
                style={styles.input}
            />
            <TextInput
                label='Phone'
                placeholder='Client phone'
                onChangeText={text => setPhone(text)}
                value={phone}
                style={styles.input}
            />
            <TextInput
                label='Email'
                placeholder='Client email'
                onChangeText={text => setEmail(text)}
                value={email}
                style={styles.input}
            />
            <TextInput
                label='Company'
                placeholder="Client's name company"
                onChangeText={text => setCompany(text)}
                value={company}
                style={styles.input}
            />

            <Button icon="pencil-circle" mode='contained' onPress={() => saveClient()}>
                {route.params.client.id ? 'Save changes' : 'Add client'}
            </Button>

            <Portal>
                <Dialog
                    visible={alert}
                    onDismiss={() => setAlert(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">All fields are required</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setAlert(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})