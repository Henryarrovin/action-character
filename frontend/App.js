import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';

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
          <View style={styles.stopButtonContainer}>
            <Button title="Stop" onPress={handleStopButtonClick} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {renderButtons()}
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      source={require('C:/Users/Henry/Desktop/action-character/frontend/Interface.jpg')}
      style={styles.container}
    >
      {renderVideo()}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stopButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  button: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'black',
    color: 'white',
  },
});

export default App;
