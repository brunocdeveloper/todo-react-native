import React from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatListProps,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { ItemWrapper } from "./ItemWrapper";
import TaskItem from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export interface TaskEditing {
  taskId: number;
  taskNewTitle: string;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  handleEditTask: (task: TaskEditing) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  handleEditTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              item={item}
              index={index}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              handleEditTask={handleEditTask}
            />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}
