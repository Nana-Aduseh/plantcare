// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform } from 'react-native';
// import { Stack } from 'expo-router'
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (

    
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: 'absolute',
//           },
//           default: {},
//         }),
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: 'Explore',
//           tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
//         }}
//       />
//     </Tabs>
    
//     <Stack>
//       <Stack.Screen name="login" options={{ headerShown: false }} />
//       <Stack.Screen name="signup" options={{ headerShown: false }} />
//       <Stack.Screen name="homepage" options={{ headerShown: false }} />
//       <Stack.Screen name="maize" options={{ headerShown: false }} />
//       <Stack.Screen name="pepper" options={{ headerShown: false }} />
//       <Stack.Screen name="chatbot" options={{ headerShown: false }} />
//       <Stack.Screen name="potato" options={{ headerShown: false }} />
//       <Stack.Screen
//         name="diagnose"
//         options={{
//           headerTransparent: true,
//           headerTitle: '',
//           headerShadowVisible: false,
//           headerRight: () => (
//             <Ionicons
//               name="close"
//               size={28}
//               color="black"
//               style={{ marginRight: 15 }}
//               onPress={() => router.push('/homepage')}
//             />
//           ),
//         }}
//       />
//       <Stack.Screen
//         name="cassava"
//         options={{
//           headerTransparent: true,
//           headerTitle: '',
//           headerShadowVisible: false,
//         }}
//       />
//       <Stack.Screen
//         name="tomato"
//         options={{
//           headerTransparent: true,
//           headerTitle: '',
//           headerShadowVisible: false,
//         }}
//       />
//       <Stack.Screen name="+not-found" />
//     </Stack>
//   );
// }

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}


