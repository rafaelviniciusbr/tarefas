import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList, Modal, TextInput } from 'react-native';
import TaskList from './src/components/TaskList';
import AsyncStorage from '@react-native-community/async-storage'; 

export default function App(){
  const [task, setTask] = useState([]);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  useEffect(()=>{
    async function loadTasks(){
      const taskStorage = await AsyncStorage.getItem('@tasks');

      if (taskStorage){
        setTask(JSON.parse(taskStorage));
      }
    }

    loadTasks();
  }, []);

  useEffect(()=>{
    async function saveTasks(){
      await AsyncStorage.setItem('@tasks', JSON.stringify(task))
    }
    saveTasks();
  }, [task]);

  function handleAdd(){
    if(input ==='') return;

    const data = {
      key: input,
      task: input
    };

    setTask([...task, data]);
    setOpen(false);
    setInput('');
  }
  const handleDelete = useCallback((data) => {
    const find = task.filter(r => r.key !== data.key);
    setTask(find);

  })

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar
      backgroundColor='#171d31' barStyle="light-content" />
      <View>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>
      <FlatList
      marginHorizontal={10}
      showsHorizontalScrollIndicator={false} 
      data={task}
      keyExtractor={(item) => String(item.key) }
      renderItem={ ({item}) => <TaskList data={item} handleDelete={handleDelete}/>}
      
      />
      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.modal}>
          
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Image style={{ width: 50, height: 50, marginLeft: 5, marginRight: 5 }}
                source={require('./icons/seta-esquerda.png')} />
            </TouchableOpacity> 
            <Text style={styles.modalTitle}>Nova tarefa</Text>           
          </View>
        <View style={styles.modelBody}>
          <TextInput
          multiline ={ true }
          placeholderTextColor="#747474"
          autoCorrect={false}
          placeholder="O que precisa fazer hoje?"
          style={styles.input}
          value={input}
          onChangeText={(texto)=> setInput(texto)}
          />

          <TouchableOpacity style={styles.handleAdd} onPress={handleAdd}>
            <Text style={styles.handleAddText}>Cadastrar</Text>
          </TouchableOpacity>

        </View>

        </SafeAreaView>
      </Modal>

      <TouchableOpacity style={styles.fab} onPress={()=> setOpen(true)}>
        <Image style={{width: 70, height: 70}}
        source={require('./icons/mais.png')} />        
      </TouchableOpacity>
      

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#171d31'
  },
title:{
  marginTop: 10,
  paddingBottom: 10,
  fontSize: 25,
  textAlign:'center',
  color:'#FFF'
},
fab:{
  position: "absolute",
  right: 25,
  bottom: 25,
  elevation: 2,
  zIndex: 9,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowOffset:{
    width: 1,
    height: 3,
  }
},
  modal: {
    flex: 1,
    backgroundColor: '#171d31'
  },
  modalHeader:{
    marginLeft: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center'

  },
  modalTitle:{
    marginLeft: 15,
    fontSize: 23,
    color: '#FFF'
  },
  modalBody:{
    marginTop: 15,

  },
  input:{
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    backgroundColor: '#FFF',
    padding: 9,
    height: 100,
    textAlignVertical: 'top',
    color: '#000',
    borderRadius: 5

  },
  handleAdd:{
    backgroundColor: '#87CEEB',
    marginTop:  10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 40,
    borderRadius: 5
  },
  handleAddText:{
    fontSize: 20,
  }
  
});