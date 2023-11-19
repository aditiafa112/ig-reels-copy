import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading() {
  return (
    <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" color="#000" />
      <Text>Loading...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
