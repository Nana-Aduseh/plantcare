import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="homepage" options={{ headerShown: false }} />
        <Stack.Screen name="maize" options={{ headerShown: false }} />
        <Stack.Screen name="pepper" options={{ headerShown: false }} />
        <Stack.Screen name="potato" options={{ headerShown: false }} />
        <Stack.Screen
    name="diagnose"
    options={{
      headerTransparent: true,
      headerTitle: '',
      headerShadowVisible: false, // removes bottom border/shadow
      headerRight: () => (
        <Ionicons
          name="close"
          size={28}
          color="black"
          style={{ marginRight: 15 }}
          onPress={() => router.push('/homepage')}
      />

      
    ),
  }}
/>
        <Stack.Screen name="cassava" options={{ headerTransparent: true,
      headerTitle: '',
      headerShadowVisible: false, // removes bottom border/shadow
    //   headerRight: () => (
    //   //   <Ionicons
    //   //     name="close"
    //   //     size={30}
    //   //     color="black"
    //   //     style={{ marginRight: 15 }}
    //   //     onPress={() => router.push('/homepage')}
    //   // />
    // // ),
  }}/>


   <Stack.Screen name="tomato" options={{ headerTransparent: true,
      headerTitle: '',
      headerShadowVisible: false, // removes bottom border/shadow
      // headerRight: () => (
      //    <Ionicons
      //     name="close"
      //     size={30}
      //     color="black"
      //     style={{ marginRight: 15 }}
      //     onPress={() => router.push('/homepage')}
      // />
    // ),
  }}/>
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
