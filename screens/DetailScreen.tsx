import { Result } from "@coveo/headless";
import React from "react";
import { Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, List } from "react-native-paper";

function currencyFormat(num: any) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default function DetailScreen(props: { movie: Result }) {
  const { movie } = props;

  return (
    <ScrollView
      style={{ backgroundColor: Platform.OS === "web" ? "inherit" : "#333357" }}
    >
      <Card
        elevation={50}
        style={{ maxWidth: 1080, margin: "auto", backgroundColor: "#333357" }}
      >
        <Card.Cover
          style={{
            height: 500,
            backgroundColor: "#333357",
            paddingVertical: 40,
          }}
          source={{ uri: movie.raw["movieimage"] as string }}
          resizeMode="contain"
        ></Card.Cover>
        <Card.Content>
          <Card.Title
            title={movie.title}
            subtitle={movie.excerpt}
            subtitleNumberOfLines={10}
            titleStyle={{ color: "white" }}
            subtitleStyle={{ color: "white" }}
          ></Card.Title>

          <List.Section>
            <List.Item
              title="Score"
              description={
                movie.raw["moviescore"]
                  ? (movie.raw["moviescore"] as any)
                  : "Unknown"
              }
              titleStyle={{ color: "white" }}
              descriptionStyle={{ color: "white" }}
            />
            <List.Item
              title="Director(s)"
              description={
                movie.raw["moviedirector"]
                  ? ((movie.raw["moviedirector"] as any).join(", ") as string)
                  : "Unknown"
              }
              titleStyle={{ color: "white" }}
              descriptionStyle={{ color: "white" }}
            />
            <List.Item
              title="Genre(s)"
              description={
                movie.raw["moviegenre"]
                  ? (movie.raw["moviegenre"] as any).join(", ")
                  : "Unknown"
              }
              titleStyle={{ color: "white" }}
              descriptionStyle={{ color: "white" }}
            />
            <List.Item
              title="Actors"
              description={
                movie.raw["movieactors"]
                  ? (movie.raw["movieactors"] as any).join(", ")
                  : "Unknown"
              }
              titleStyle={{ color: "white" }}
              descriptionStyle={{ color: "white" }}
            />
            <List.Item
              title="Box Office"
              description={
                movie.raw["movieboxoffice"]
                  ? (currencyFormat(movie.raw["movieboxoffice"]) as any)
                  : "Unknown"
              }
              titleStyle={{ color: "white" }}
              descriptionStyle={{ color: "white" }}
            />
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
