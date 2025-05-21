import 'dotenv/config';

export default {
  expo: {
    name: 'pokemon-tcg-scanner',
    slug: 'pokemon-tcg-scanner',
    version: '1.0.0',
    extra:{
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY
    },
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
      infoPlist: {
        NSCameraUsageDescription: 'Pokemon TCG Scanner needs access to your Camera.',
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      permissions: ['android.permission.CAMERA'],
      package: 'com.anonymous.pokemontcgscanner',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      [
        'expo-camera',
        {
          cameraPermission: 'Allow Pokemon TCG Scanner to access your camera.',
        },
      ],
      'expo-sqlite',
    ],
    extra: {
      API_URL: process.env.API_URL, // Example of using a .env variable
    },
  },
};
