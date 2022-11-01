import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import Priority from '../../components/Priority';

  
const MyRemindersDB = openDatabase({ name: 'MyRemindersDB' });
const priorityTableName = 'priorities';

const PrioritiesScreen = props => {
const navigation = useNavigation();
const [priorities,setPriority] = useState([]);

useEffect(() => {
  listener = navigation.addListener('focus', () => {
   let results = [];
   MyRemindersDB.transaction(txn => {
   txn.executeSql(
     `SELECT * FROM ${priorityTableName}`,
     [],
     (_, res) => {
     let len = res.rows.length;
     console.log('Length of priorities ' + len);
     if (len>0){
       for(let i = 0; i < len; i++){
         let item = res.rows.item(i);
         results.push({
         id : item.id,
         title: item.title,
         description: item.description,  
         });
       }
       setPriority(results);

     } else{
       setPriority([]);
     } 
     },
     error => {
     console.log('Error getting priorities' + error.message);  
     },
   )  
   });
 });
 return listener;
});


  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={priorities}
          renderItem={({item}) => <Priority post={item}/>}
          keyExtractor={item => item.id}
        />
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add Priority')}
                >
                <Text style={styles.buttonText}>Add Priority</Text>
            </TouchableOpacity>
        </View>
    </View>
    </View>
  );
};

export default PrioritiesScreen;