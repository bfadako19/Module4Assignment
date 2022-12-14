import React, {useState} from 'react';
import { View,Text,TextInput,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const database = require('../../components/Handlers/database.js')
const AddPriorityScreen = props => {

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    

const onPriorityAdd =()  => {


    if (!title){
        alert('Please enter a priority title.');
        return
    }
    if (!description){
        alert('Please enter a priority description');
        return
    }
    

    try {
        database.addPriority(title,description);
    } catch (error){
    console.log('Error adding priority ' + error);
    }
    alert(title + 'Added!');
    navigation.navigate('Get Reminders!');
}
    return(
        <View style={styles.container}>
        <View style = {styles.topContainer}>
            <TextInput 
            value = {title}
            onChangeText={value=>setTitle(value)}
            style = {styles.title}
            clearButtonMode = {'while-editing'}
            placeholder = {'Enter Title'}
            placeholderTextColor = {'grey'}
            />
            <TextInput 
            value = {description}
            onChangeText={value=>setDescription(value)}
            style = {styles.description}
            clearButtonMode = {'while-editing'}
            placeholder = {'Enter Description'}
            placeholderTextColor = {'grey'}
            />
            
        </View>
        <View style ={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onPriorityAdd}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
    );

};

export default AddPriorityScreen;