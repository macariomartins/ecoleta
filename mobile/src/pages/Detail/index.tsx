import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Image, Linking } from 'react-native';
import { Feather as Icon, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Params {
    pointId: number
}

interface Data {
    serializedPoint: {
        image: string,
        image_url: string,
        name: string,
        email: string,
        whatsapp: string,
        city: string,
        uf: string
    },
    items: [{
        title: string
    }]
}

const Detail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as Params;
    const [data, setData] = useState<Data>({} as Data);

    useEffect(() => {
        api.get(`points/${routeParams.pointId}`).then(response => {
            setData(response.data);
        });
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleComposeMail() {
        const options = {
            subject: 'Interesse na coleta de resíduos',
            recipients: [data.serializedPoint.email]
        };

        MailComposer.composeAsync(options);
    }

    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${data.serializedPoint.whatsapp}&text=Tenho interesse na coleta de resíduos.`);
    }

    if (!data.serializedPoint) {
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name='arrow-left' color='#34cb79' size={20} />
                </TouchableOpacity>

                <Image
                    style={styles.pointImage}
                    source={{
                        uri: data.serializedPoint.image_url
                    }}
                />

                <Text style={styles.pointName}>{data.serializedPoint.name}</Text>
                <Text style={styles.pointItems}>
                    {data.items.map(item => item.title).join(', ')}
                </Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>Endereço</Text>
                    <Text style={styles.addressContent}>{data.serializedPoint.city}-{data.serializedPoint.uf}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleWhatsapp}>
                    <FontAwesome name='whatsapp' color='#fff' size={20} />
                    <Text style={styles.buttonText}>Whatsapp</Text>
                </RectButton>
                <RectButton style={styles.button} onPress={handleComposeMail}>
                    <Icon name='mail' color='#fff' size={20} />
                    <Text style={styles.buttonText}>E-mail</Text>
                </RectButton>
            </View>
        </>
    );
}

export default Detail