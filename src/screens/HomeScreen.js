import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import AppRoutes from "../navigation/AppRoutes";
import useAppStore from "../store";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useAppStore();
  console.log("090909090990", userInfo);

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(AppRoutes.AUTHSCREEN)}
      >
        <Text style={styles.text}>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: "#fff",
  },
});
