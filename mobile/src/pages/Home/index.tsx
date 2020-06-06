import React, { useState, useEffect } from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

import styles from './styles';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Home = () => {
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');


    /** Carregamento das Unidades Federativas */
    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials.sort());
        });
    }, []);

    /** Carregamento das cidades de uma UF */
    useEffect(() => {
        if (selectedUf !== '0') {
            axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`).then(response => {
                const citiesNames = response.data.map(city => city.nome);
                setCities(citiesNames);
            });
        }
    }, [selectedUf]);


    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            selectedUf,
            selectedCity
        });
    }

    function handleSelectedUf(uf: string) {
        setSelectedUf(uf);
    }

    function handleSelectedCity(city: string) {
        setSelectedCity(city);
    }

    return (
        <ImageBackground
            style={styles.container}
            source={require('../../assets/home-background.png')}
            imageStyle={{
                width: 274,
                height: 368
            }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu Marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
            </View>

            <View>
                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione sua UF',
                        value: '0',
                        color: '#d2d2d2'
                    }}
                    items={
                        ufs.map(uf => ({
                            label: uf,
                            value: uf
                        }))
                    }
                    onValueChange={(uf) => handleSelectedUf(uf)}
                    style={{
                        inputIOS: {
                            fontSize: 16,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 4,
                            color: 'black',
                            paddingRight: 30, // to ensure the text is never behind the icon
                            marginTop: 8
                        },
                        inputAndroid: {
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderWidth: 0.5,
                            borderColor: 'gray',
                            borderRadius: 8,
                            color: 'black',
                            paddingRight: 30, // to ensure the text is never behind the icon
                            marginTop: 8
                        },
                        iconContainer: {
                            top: 5,
                            right: 15,
                        },
                    }}
                    Icon={() => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'transparent',
                                    borderTopWidth: 6,
                                    borderTopColor: 'gray',
                                    borderRightWidth: 6,
                                    borderRightColor: 'transparent',
                                    borderLeftWidth: 6,
                                    borderLeftColor: 'transparent',
                                    width: 0,
                                    height: 0,
                                    marginTop: 15
                                }}
                            />
                        );
                    }}
                    useNativeAndroidPickerStyle={false}
                />

                <RNPickerSelect
                    placeholder={{
                        label: 'Selecione sua cidade',
                        value: '0',
                        color: '#d2d2d2'
                    }}
                    items={
                        cities.map(city => ({
                            label: city,
                            value: city
                        }))
                    }
                    onValueChange={(city) => handleSelectedCity(city)}
                    style={{
                        inputIOS: {
                            fontSize: 16,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            borderWidth: 1,
                            borderColor: 'gray',
                            borderRadius: 4,
                            color: 'black',
                            paddingRight: 30, // to ensure the text is never behind the icon
                            marginTop: 8
                        },
                        inputAndroid: {
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            borderWidth: 0.5,
                            borderColor: 'gray',
                            borderRadius: 8,
                            color: 'black',
                            paddingRight: 30, // to ensure the text is never behind the icon
                            marginTop: 8
                        },
                        iconContainer: {
                            top: 5,
                            right: 15,
                        },
                    }}
                    Icon={() => {
                        return (
                            <View
                                style={{
                                    backgroundColor: 'transparent',
                                    borderTopWidth: 6,
                                    borderTopColor: 'gray',
                                    borderRightWidth: 6,
                                    borderRightColor: 'transparent',
                                    borderLeftWidth: 6,
                                    borderLeftColor: 'transparent',
                                    width: 0,
                                    height: 0,
                                    marginTop: 15
                                }}
                            />
                        );
                    }}
                    useNativeAndroidPickerStyle={false}
                />
            </View>

            <View style={styles.footer}>
                <RectButton
                    style={styles.button}
                    onPress={handleNavigateToPoints}
                >
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name='arrow-right' color='#fff' size={24} />
                        </Text>
                    </View>

                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
}

export default Home