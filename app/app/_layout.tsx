// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import { ClerkProvider } from '@clerk/clerk-expo'
// import { Slot } from 'expo-router'
// import { tokenCache } from '@clerk/clerk-expo/token-cache'
// import { Redirect, Stack } from 'expo-router'
// import { useAuth } from '@clerk/clerk-expo'

// export default function AuthRoutesLayout() {
//   const { isSignedIn } = useAuth()

//   if (isSignedIn) {
//     return <Redirect href={'/'} />
//   }

//   return <Stack />
// }

// import Constants from 'expo-constants';

// // Get the Clerk Publishable Key from app config
// const clerkKey = Constants.expoConfig.extra.pk_test_c291Z2h0LW11c3RhbmctNjguY2xlcmsuYWNjb3VudHMuZGV2JA;

// export default function Layout() {
//   return (
//     <ClerkProvider publishableKey={clerkKey}>
//       <Slot />
//     </ClerkProvider>
//   );
// }


// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   function RootLayoutNav() {
//   return (
//     <ClerkProvider tokenCache={tokenCache}>
//       <Slot />
//     </ClerkProvider>
//   )
// }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="login" options={{ headerShown: false }} />
//         <Stack.Screen name="signup" options={{ headerShown: false }} />
//         <Stack.Screen name="homepage" options={{ headerShown: false }} />
//         <Stack.Screen name="maize" options={{ headerShown: false }} />
//         <Stack.Screen name="pepper" options={{ headerShown: false }} />
//         <Stack.Screen name="chatbot" options={{ headerShown: false }} />
//         <Stack.Screen name="potato" options={{ headerShown: false }} />
//         <Stack.Screen
//     name="diagnose"
//     options={{
//       headerTransparent: true,
//       headerTitle: '',
//       headerShadowVisible: false, // removes bottom border/shadow
//       headerRight: () => (
//         <Ionicons
//           name="close"
//           size={28}
//           color="black"
//           style={{ marginRight: 15 }}
//           onPress={() => router.push('/homepage')}
//       />

      
//     ),
//   }}
// />
//         <Stack.Screen name="cassava" options={{ headerTransparent: true,
//       headerTitle: '',
//       headerShadowVisible: false, // removes bottom border/shadow
//     //   headerRight: () => (
//     //   //   <Ionicons
//     //   //     name="close"
//     //   //     size={30}
//     //   //     color="black"
//     //   //     style={{ marginRight: 15 }}
//     //   //     onPress={() => router.push('/homepage')}
//     //   // />
//     // // ),
//   }}/>


//    <Stack.Screen name="tomato" options={{ headerTransparent: true,
//       headerTitle: '',
//       headerShadowVisible: false, // removes bottom border/shadow
//       // headerRight: () => (
//       //    <Ionicons
//       //     name="close"
//       //     size={30}
//       //     color="black"
//       //     style={{ marginRight: 15 }}
//       //     onPress={() => router.push('/homepage')}
//       // />
//     // ),
//   }}/>
//         {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }


import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { router, Slot, Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { tokenCache } from '@clerk/clerk-expo/token-cache';

const clerkKey = Constants.expoConfig.extra.clerkPublishableKey; // Make sure this is in your app.json

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={clerkKey} tokenCache={tokenCache}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LayoutContent />
        <StatusBar style="auto" />
      </ThemeProvider>
    </ClerkProvider>
  );
}

function LayoutContent() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="homepage" options={{ headerShown: false }} />
      <Stack.Screen name="maize" options={{ headerShown: false }} />
      <Stack.Screen name="pepper" options={{ headerShown: false }} />
      <Stack.Screen name="chatbot" options={{ headerShown: false }} />
      <Stack.Screen name="potato" options={{ headerShown: false }} />
      <Stack.Screen
        name="diagnose"
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShadowVisible: false,
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
      <Stack.Screen
        name="cassava"
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="tomato"
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
