import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Button, Text } from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/videos/Walk', {
          responseType: 'arraybuffer',
        });

        const videoBlob = new Blob([response.data], { type: 'video/mkv' });
        const uri = URL.createObjectURL(videoBlob);

        setVideoUri(uri);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePlayButtonClick = () => {
    setShouldPlay(true);
  };

  const handleStopButtonClick = () => {
    setShouldPlay(false);
  };

  const renderVideo = () => {
    if (shouldPlay && videoUri) {
      return (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            shouldPlay={shouldPlay}
            isLooping
            onError={(error) => console.error('Video Error:', error)}
            onLoad={() => console.log('Video Loaded')}
          />
          <View style={styles.contentContainer}>
          </View>
          <Button title="Stop" onPress={handleStopButtonClick} />
        </View>
      );
    } else {
      return (
        <Button title="Play Video" onPress={handlePlayButtonClick} />
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderVideo()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: "100%",
    height: "100%",
  },
  video: {
    flex: 1,
  },
  contentContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
