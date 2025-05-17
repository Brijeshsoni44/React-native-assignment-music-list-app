import React, { useCallback } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { useGetMichaelJacksonSongsQuery } from "../api/songsApi";
import SongCard from "../components/SongCard";
import LoadingIndicator from "../../../shared/components/LoadingIndicator";
import ErrorView from "../../../shared/components/ErrorView";
import { colors } from "../../../shared/constants/colors";

const SongsListScreen = ({ navigation }) => {
  const {
    data: songs = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetMichaelJacksonSongsQuery();

  const handleSongPress = useCallback(
    (song) => {
      navigation.navigate("SongDetail", { song });
    },
    [navigation]
  );

  const renderItem = ({ item }) => (
    <SongCard song={item} onPress={() => handleSongPress(item)} />
  );

  if (isLoading && !isFetching) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <ErrorView 
        message={error?.message || "Failed to load songs"} 
        onRetry={refetch} 
      />
    );
  }

  const keyExtractor = (item, index) => {
    // Use trackId if it exists, otherwise fallback to index
    return item.trackId ? item.trackId.toString() : `item-${index}`;
  };

  return (
    <View style={styles.container}>
    <FlatList
      data={songs}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refetch}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
      contentContainerStyle={styles.listContent}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 16,
  },
});

export default SongsListScreen;
