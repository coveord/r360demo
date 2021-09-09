import "fastestsmallesttextencoderdecoder";
import "intl";
import "intl/locale-data/jsonp/en-US";
import { Platform } from "react-native";

if (Platform.OS === "android") {
  if (typeof (Intl as any).__disableRegExpRestore === "function") {
    (Intl as any).__disableRegExpRestore();
  }
}
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import {
  buildFacet,
  buildFieldSortCriterion,
  buildResultList,
  buildResultsPerPage,
  buildSearchBox,
  buildSort,
  Result,
  SortOrder,
} from "@coveo/headless";
import { engine } from "./Engine";
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "./screens/Search";
import AppHeader from "./components/AppHeader";
import DetailScreen from "./screens/DetailScreen";

const searchBoxController = buildSearchBox(engine);
const resultListController = buildResultList(engine, {
  options: {
    fieldsToInclude: [
      "movieactors",
      "movielanguage",
      "moviereleasedate",
      "movieimage",
      "moviedirector",
      "moviegenre",
      "movieactors",
      "movieboxoffice",
      "moviecountry",
      "movielanguage",
      "moviereleasedate",
      "movieruntime",
      "moviescore",
    ],
  },
});
buildResultsPerPage(engine, { initialState: { numberOfResults: 12 } });
buildSort(engine, {
  initialState: {
    criterion: buildFieldSortCriterion("moviescore", SortOrder.Descending),
  },
});
engine.executeFirstSearch();
const facets = [
  {
    title: "Actors",
    facet: buildFacet(engine, { options: { field: "movieactors" } }),
  },
  {
    title: "Country",
    facet: buildFacet(engine, { options: { field: "moviecountry" } }),
  },
  {
    title: "Director",
    facet: buildFacet(engine, { options: { field: "moviedirector" } }),
  },
  {
    title: "Genre",
    facet: buildFacet(engine, { options: { field: "moviegenre" } }),
  },
];

const fontConfig = {
  web: {
    regular: {
      fontFamily: "canada-type-gibson, sans-serif",
      fontWeight: 600,
    },
    medium: {
      fontFamily: "canada-type-gibson, sans-serif",
      fontWeight: 600,
    },
    light: {
      fontFamily: "canada-type-gibson, sans-serift",
      fontWeight: 400,
    },
    thin: {
      fontFamily: "canada-type-gibson, sans-serif",
      fontWeight: 200,
    },
  },
};

export default function App() {
  const Stack = createNativeStackNavigator();

  const isLoadingComplete = useCachedResources();

  const theme = {
    ...DefaultTheme,
    fonts: configureFonts(fontConfig as any),
    colors: {
      primary: "#333357",
      background: "#E5E8E8",
      text: "#282829",
      placeholder: "#FFFFFF",
      backdrop: "#451C5C",
      accent: "#FFFFFF",
    },
  } as ReactNativePaper.Theme;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Browse"
              screenOptions={{
                header: (props) => (
                  <AppHeader
                    {...props}
                    searchBoxController={searchBoxController}
                  />
                ),
              }}
            >
              <Stack.Screen name="Browse">
                {(props) => (
                  <SearchScreen
                    {...props}
                    controllers={{ resultListController }}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="Details">
                {(props) => (
                  <DetailScreen
                    movie={(props.route.params as any).movie as Result}
                  />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }
}
