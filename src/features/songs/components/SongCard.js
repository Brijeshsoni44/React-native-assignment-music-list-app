import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../../shared/constants/colors';

const SongCard = ({ song, onPress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    setIsLoading(true);
    await onPress();
    setIsLoading(false);
  };

  if (!song?.trackName) return null;

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.container} 
      disabled={isLoading}
    >
      <Image 
        source={{ uri: song.artworkUrl100 || 'https://via.placeholder.com/100' }} 
        style={styles.artwork} 
      />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {song.trackName || 'Unknown Track'}
        </Text>
        <Text style={styles.artist}>
          {song.artistName || 'Unknown Artist'}
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
        ) : (
          <Text style={styles.album}>
            {song.collectionName || 'Unknown Album'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 2,
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 4,
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  album: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  loader: {
    marginTop: 4,
  }
});

export default SongCard;
