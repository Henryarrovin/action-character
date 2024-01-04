import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Button, ScrollView } from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [videoUri, setVideoUri] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(false);
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/names');
        setNames(response.data);
      } catch (error) {
        console.error('Error fetching names:', error);
      }
    };

    fetchNames();
  }, []);

  const fetchVideo = async (name) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/videos/${name}`, {
        responseType: 'arraybuffer',
      });

      const videoBlob = new Blob([response.data], { type: 'video/mp4' });
      const uri = URL.createObjectURL(videoBlob);

      setVideoUri(uri);
      setShouldPlay(true);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  const handleStopButtonClick = () => {
    setShouldPlay(false);
  };

  const renderButtons = () => {
    return names.map((name, index) => (
      <Button
      key={index}
      title={name}
      onPress={() => fetchVideo(name)}
      containerStyle={styles.buttonContainer}
    />
    ));
  };

  const renderVideo = () => {
    if (shouldPlay && videoUri) {
      return (
        <View style={styles.videoContainer}>
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode="cover"
            shouldPlay={shouldPlay}
            isLooping
            onError={(error) => console.error('Video Error:', error)}
            onLoad={() => console.log('Video Loaded')}
          />
          <Button title="Stop" onPress={handleStopButtonClick} />
        </View>
      );
    } else {
      return (
        <ScrollView horizontal style={styles.buttonContainer}>
          {renderButtons()}
        </ScrollView>
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
  buttonContainer: {
    flexDirection: 'row',
    margin: 200,
    padding: 200,
  },
});

export default App;
