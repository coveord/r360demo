import { SearchBox } from "@coveo/headless";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";
import { Appbar, DefaultTheme, Searchbar } from "react-native-paper";

export default function AppHeader(props: {
  searchBoxController: SearchBox;
  navigation: any;
  back?: any;
  route?: any;
}) {
  const { searchBoxController, navigation, back } = props;
  const [stateSearchBox, setStateSearchBox] = useState(
    searchBoxController.state
  );
  useEffect(
    () =>
      searchBoxController.subscribe(() =>
        setStateSearchBox(searchBoxController.state)
      ),
    []
  );
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {Platform.OS === "web" && Dimensions.get("window").width > 1500 ? (
        <Appbar.Content
          title="Coveoflix"
          subtitle="Discover movies"
          onPress={() => {
            searchBoxController.clear();
            searchBoxController.submit();
            navigation.navigate("Browse");
          }}
          color="#fff"
        ></Appbar.Content>
      ) : null}
      {props.route.name === "Details" ? (
        <Appbar.Content
          title={(props.route.params as any).movie.title}
        ></Appbar.Content>
      ) : null}
      {props.route.name === "Browse" ? (
        <Searchbar
          inputStyle={{
            borderColor: DefaultTheme.colors.background,
            borderWidth: Platform.OS === "android" ? 0 : 3,
            color: "#fff",
          }}
          iconColor="#fff"
          value={searchBoxController.state.value}
          placeholder="Search"
          onChangeText={(txt: string) => {
            searchBoxController.updateText(txt);
          }}
          onSubmitEditing={() => {
            searchBoxController.submit();
            navigation.navigate("Browse");
          }}
        ></Searchbar>
      ) : null}
    </Appbar.Header>
  );
}
