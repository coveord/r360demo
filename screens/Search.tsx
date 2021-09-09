import { Result, ResultList } from "@coveo/headless";
import React, { useState, useEffect } from "react";
import { Dimensions, FlatList, Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Card, List, Divider } from "react-native-paper";
export default function SearchScreen(props: {
  controllers: {
    resultListController: ResultList;
  };
  navigation: any;
}) {
  const { resultListController } = props.controllers;

  const [stateResultList, setStateResultList] = useState(
    resultListController.state
  );
  useEffect(
    () =>
      resultListController.subscribe(() =>
        setStateResultList(resultListController.state)
      ),
    []
  );

  const alignItems: any =
    Platform.OS === "web" && Dimensions.get("window").width > 1500
      ? { alignItems: "center" }
      : {};

  return (
    <FlatList
      keyExtractor={(r: Result) => r.uniqueId}
      style={{
        margin: "auto",
        width: "100%",
        ...alignItems,
      }}
      numColumns={
        Platform.OS === "web" && Dimensions.get("window").width > 1500 ? 3 : 1
      }
      data={stateResultList.results}
      onEndReached={() => resultListController.fetchMoreResults()}
      renderItem={(i) => {
        return (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Details", {
                movie: i.item,
              });
            }}
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 1,
              marginHorizontal: 10,
              marginVertical: 20,
              width:
                Platform.OS === "web" && Dimensions.get("window").width > 1500
                  ? 500
                  : "90%",
            }}
          >
            <Card
              elevation={50}
              style={{
                overflow: "hidden",
                backgroundColor: "#333357",
              }}
            >
              <Card.Cover
                style={{
                  height: 350,
                  paddingVertical: 20,
                  backgroundColor: "#333357",
                }}
                source={{ uri: i.item.raw["movieimage"] as string }}
                resizeMode="contain"
              ></Card.Cover>
              <Card.Content>
                <Card.Title
                  title={i.item.title}
                  subtitle={i.item.excerpt}
                  titleStyle={{ color: "white" }}
                  subtitleStyle={{ color: "white" }}
                ></Card.Title>
                <List.Section>
                  <List.Item
                    title="Genre(s)"
                    titleStyle={{ color: "white" }}
                    descriptionStyle={{ color: "white" }}
                    description={
                      i.item.raw["moviegenre"]
                        ? (i.item.raw["moviegenre"] as any).join(", ")
                        : "Unknown"
                    }
                  />
                </List.Section>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        );
      }}
    ></FlatList>
  );
}
