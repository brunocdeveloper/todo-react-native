import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const hasTask = tasks.find((items) => items.title === newTaskTitle);

    if (!!hasTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((prevTasks) => [...prevTasks, task]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(
      tasks.map((items) => ({
        ...items,
        ...(items.id === id && {
          done: !items.done,
        }),
      }))
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => "none",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            setTasks((prevTask) => prevTask.filter((item) => item.id !== id)),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
