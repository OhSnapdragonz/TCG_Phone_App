import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Svg, { Rect } from 'react-native-svg';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');

// Displays camera view to take a photo of a card or image preview to add to collection after picture is taken
export default function AddCard() {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);

  // Request camera permission
  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  // Check if permission is granted
  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Waiting for camera permission...</Text>
      </View>
    );
  }

  // Position of frame overlay
  const cardWidth = width * 0.8;
  const cardHeight = cardWidth * 1.4;
  const cardX = (width - cardWidth) / 2;
  const cardY = (height - cardHeight) / 2 - 100;

  // Handle taking a photo
  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Display image taken or camera */}
      {photoUri ? (
        <View style={styles.imagePreviewContainer}>
          {/* Image preview */}
          <Image source={{ uri: photoUri }} style={styles.previewImage} />

          {/* TODO: pull data for card info */}
          <Text style={styles.cardName}>Card Name</Text>

          <View style={styles.previewButtonContainer}>
            {/* Retake photo button */}
            <TouchableOpacity onPress={() => setPhotoUri(null)} style={styles.button}>
              <FontAwesome5 name="redo" size={24} color="black" />
            </TouchableOpacity>

            {/* Confirm add to collection button */}
            {/* TODO: add to database on confirm */}
            <TouchableOpacity onPress={() => console.log('Photo confirmed!')} style={styles.button}>
              <FontAwesome5 name="check" size={24} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {/* Camera */}
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing="back"
            photo
          />

          {/* Frame overlay */}
          <Svg style={StyleSheet.absoluteFill}>
            <Rect
              x={cardX}
              y={cardY}
              width={cardWidth}
              height={cardHeight}
              stroke="white"
              strokeWidth="3"
              fill="transparent"
              rx="10"
            />
          </Svg>

          {/* Capture Button */}
          <View style={styles.captureContainer}>
            <TouchableOpacity onPress={takePhoto} style={styles.button}>
              <Feather name="camera" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  captureContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#ffffffcc',
    padding: 20,
    borderRadius: 50,
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
  imagePreviewContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  previewImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'cover',
    marginTop: 20,
  },
  previewButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
