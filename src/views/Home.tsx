import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Button, FAB, List, Text } from 'react-native-paper'
import axios from 'axios'
import { Client, RootStackParamList } from '../types'
import { globalStyles } from '../styles'

const initialClient: Client = {
  id: '',
  name: '',
  phone: '',
  email: '',
  company: ''
}

type HomeProps = StackScreenProps<RootStackParamList, "Home">

export default function Home({ navigation }: HomeProps) {

  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    const getClients = async () => {
      try {
        const result = await axios.get('http://192.168.1.24:3000/clients')
        setClients(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    getClients()
  }, [clients])

  return (
    <View style={globalStyles.container}>

      <Button icon="plus-circle" onPress={() => navigation.navigate("NewClient", { client: initialClient })}>
        New client
      </Button>

      <Text style={globalStyles.title} variant="headlineSmall">{clients.length ? 'Clients' : 'No clients yet'}</Text>

      <FlatList
        data={clients}
        keyExtractor={client => (client.id)}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.company}
            onPress={() => navigation.navigate("ClientDetails", { item })}
          />
        )}
      />

      <FAB
        icon="plus"
        style={globalStyles.fab}
        onPress={() => navigation.navigate("NewClient", { client: initialClient })}
      />
    </View>
  )
}