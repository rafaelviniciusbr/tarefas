import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function TaskList({data, handleDelete}){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>handleDelete(data)}>
                <Image style={{ width: 70, height: 70 }}
                    source={require('../../../icons/verifica.png')} />
            </TouchableOpacity>
            <View>
                <Text style={styles.task}>{data.task}</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#FFF',
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height: 3,
        }
    },
    task:{
       color: '#121212',
       fontSize: 20,
       paddingLeft: 15,
       paddingRight: 20 
    }
});