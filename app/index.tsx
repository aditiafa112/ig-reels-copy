import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Page = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Page</Text>
      <Link href={"/Stories"} asChild>
        <Button title="Go to Stories" />
      </Link>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
