import { useTasks } from '@/hooks/use-tasks';
import { Task } from '@/types/Task';
import { TaskStatus } from '@/types/TaskStatus';
import React, { useState } from 'react';
import {
  Alert,
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const { tasksByDate, addTask, updateTaskStatus } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleAddTask = () => {
    if (!title) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'todo',
    };
    addTask(date, newTask);
    setTitle('');
    setDescription('');
  };

  const toggleStatus = (date: string, task: Task) => {
    const newStatus: TaskStatus = task.status === 'todo' ? 'done' : 'todo';
    updateTaskStatus(date, task.id, newStatus);
  };

  const deleteTask = (date: string, taskId: string) => {
    Alert.alert('Supprimer tâche ?', '', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Oui',
        style: 'destructive',
        onPress: () => {
          updateTaskStatus(date, taskId, 'done');
        },
      },
    ]);
  };

  const dates = Object.keys(tasksByDate).sort();

  return (
    <ScrollView className='flex-1 p-4 bg-white'>
      <Text className='text-2xl font-bold mb-4'>Ajouter une tâche</Text>
      <TextInput
        placeholder='Titre'
        value={title}
        onChangeText={setTitle}
        className='border border-gray-300 rounded-md p-2 mb-2'
      />
      <TextInput
        placeholder='Description'
        value={description}
        onChangeText={setDescription}
        className='border border-gray-300 rounded-md p-2 mb-2'
      />
      <TextInput
        placeholder='Date (YYYY-MM-DD)'
        value={date}
        onChangeText={setDate}
        className='border border-gray-300 rounded-md p-2 mb-2'
      />
      <Button title='Ajouter' onPress={handleAddTask} />

      {dates.map((date) => (
        <View key={date} className='mt-6'>
          <Text className='text-xl font-semibold mb-2'>{date}</Text>
          {tasksByDate[date].map((task) => (
            <View
              key={task.id}
              className='flex-row items-center bg-gray-50 p-3 mb-2 rounded-md'
            >
              <TouchableOpacity
                onPress={() => toggleStatus(date, task)}
                className={`w-5 h-5 rounded-full border-2 border-gray-800 mr-3 ${
                  task.status === 'done' ? 'bg-green-500' : ''
                }`}
              />
              <View className='flex-1'>
                <Text
                  className={`text-base ${
                    task.status === 'done' ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {task.title}
                </Text>
                {task.description ? (
                  <Text className='text-sm text-gray-500'>
                    {task.description}
                  </Text>
                ) : null}
              </View>
              <Button
                title='Supprimer'
                color='red'
                onPress={() => deleteTask(date, task.id)}
              />
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
