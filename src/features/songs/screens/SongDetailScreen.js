import React, { useEffect, useState } from 'react';
import { 
  View, 
  ScrollView, 
  Image, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  SafeAreaView 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setCurrentSong, clearCurrentSong } from '../../songs/api/songsSlice';
import { colors } from '../../../shared/constants/colors';

const SongDetailScreen = ({ route }) => {
  const { song } = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        dispatch(setCurrentSong(song));
        // Simulate loading (remove in production)
        await new Promise(resolve => setTimeout(resolve, 300));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      dispatch(clearCurrentSong());
    };
  }, [dispatch, song]);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: song.artworkUrl100?.replace('100x100bb', '600x600bb') || 'https://via.placeholder.com/600' }} 
          style={styles.artwork}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
        />
        {imageLoading && (
          <ActivityIndicator 
            size="large" 
            color={colors.primary} 
            style={styles.imageLoader}
          />
        )}
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{song.trackName || 'Unknown Track'}</Text>
        <Text style={styles.artist}>{song.artistName || 'Unknown Artist'}</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Album:</Text>
          <Text style={styles.detailValue}>{song.collectionName || 'Unknown Album'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Genre:</Text>
          <Text style={styles.detailValue}>{song.primaryGenreName || 'Unknown Genre'}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Release Date:</Text>
          <Text style={styles.detailValue}>
            {song.releaseDate ? new Date(song.releaseDate).toLocaleDateString() : 'Unknown Date'}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>
            {song.trackPrice ? `${song.trackPrice} ${song.currency}` : 'Not available'}
          </Text>
        </View>
        
        {song.previewUrl && (
          <View style={styles.previewContainer}>
            <Text style={styles.previewText}>Preview available</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  artwork: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    alignSelf: 'center',
  },
  imageLoader: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: colors.textPrimary,
    width: 120,
  },
  detailValue: {
    flex: 1,
    color: colors.textSecondary,
  },
  previewContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 5,
    alignItems: 'center',
  },
  previewText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default SongDetailScreen;
