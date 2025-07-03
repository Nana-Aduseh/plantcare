// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
// import { router } from 'expo-router';

// export default function SignUpScreen() {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.signUpBox}>
//         <Text style={styles.title}>Join PlantCare Today </Text>
//         <Text style={styles.subtitle}>Create Your PlantCare Account</Text>

//         <TextInput placeholder="Name" style={styles.input} />
//         <TextInput placeholder="Email" style={styles.input} />
//         <TextInput placeholder="Password" secureTextEntry style={styles.input} />

//         <Text style={styles.switchText}>
//           Already have an account?{' '}
//           <Text style={styles.linkText} onPress={() => router.push('/login')}>Log In</Text>
//         </Text>

//         <Text style={styles.or}>or</Text>

//         <TouchableOpacity style={styles.socialButton}>
//           <Image source={require('../assets/images/google.png')} style={styles.image} />
//           <Text style={styles.socialText}>Continue with Google</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.socialButton}>
//            <Image source={require('../assets/images/fb.png')} style={styles.image} />
//           <Text style={styles.socialText}>Continue with Facebook</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button}  onPress={() => router.push('/login')}>
//           <Text style={styles.buttonText} >Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#d3d3d3',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   signUpBox: {
//     backgroundColor: '#e0efe2',
//     borderRadius: 25,
//     padding: 20,
//     width: '100%',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     width: '100%',
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   switchText: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#444',
//   },
//   linkText: {
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   or: {
//     textAlign: 'center',
//     marginVertical: 10,
//     color: '#888',
//   },
//   image:{
//     width:25,
//     height:25,
//     marginLeft:10,
//   },
//   socialButton: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     paddingVertical: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//     flexDirection:'row',
//   },
//   socialText: {
//      textAlign: 'center',
//      marginLeft:50,
//     color: '#444',
//     fontWeight: 'bold',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });







// import React from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Image,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { router } from 'expo-router';
// import { useSignUp } from '@clerk/clerk-expo';

// export default function SignUpScreen() {
//   const { isLoaded, signUp, setActive } = useSignUp();

//   const [name, setName] = React.useState('');
//   const [emailAddress, setEmailAddress] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [pendingVerification, setPendingVerification] = React.useState(false);
//   const [code, setCode] = React.useState('');
//   const [loading, setLoading] = React.useState(false);

//   const onSignUpPress = async () => {
//     if (!isLoaded) return;
//     setLoading(true);
//     try {
//       await signUp.create({
//         emailAddress,
//         password,
//         // Clerk doesn’t have a 'name' field in create, 
//         // you'd set user metadata after sign-up if needed
//       });
//       await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
//       setPendingVerification(true);
//     } catch (err) {
//       const message = err.errors?.[0]?.message || 'Sign-up failed';
//       Alert.alert('Error', message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onVerifyPress = async () => {
//     if (!isLoaded) return;
//     setLoading(true);
//     try {
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
//       if (signUpAttempt.status === 'complete') {
//         await setActive({ session: signUpAttempt.createdSessionId });
//         router.replace('/homepage'); // or wherever
//       } else {
//         Alert.alert('More steps needed to complete sign-up.');
//         console.log(signUpAttempt);
//       }
//     } catch (err) {
//       const message = err.errors?.[0]?.message || 'Verification failed';
//       Alert.alert('Error', message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (pendingVerification) {
//     return (
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.signUpBox}>
//           <Text style={styles.title}>Verify your email</Text>
//           <TextInput
//             placeholder="Enter verification code"
//             value={code}
//             onChangeText={setCode}
//             style={styles.input}
//           />
//           <TouchableOpacity onPress={onVerifyPress} style={styles.button} disabled={loading}>
//             {loading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>Verify</Text>
//             )}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.signUpBox}>
//         <Text style={styles.title}>Join PlantCare Today</Text>
//         <Text style={styles.subtitle}>Create Your PlantCare Account</Text>

//         <TextInput
//           placeholder="Name"
//           style={styles.input}
//           value={name}
//           onChangeText={setName}
//           autoCapitalize="words"
//         />
//         <TextInput
//           placeholder="Email"
//           style={styles.input}
//           value={emailAddress}
//           onChangeText={setEmailAddress}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         />
//         <TextInput
//           placeholder="Password"
//           secureTextEntry
//           style={styles.input}
//           value={password}
//           onChangeText={setPassword}
//         />

//         <Text style={styles.switchText}>
//           Already have an account?{' '}
//           <Text style={styles.linkText} onPress={() => router.push('/login')}>
//             Log In
//           </Text>
//         </Text>

//         <Text style={styles.or}>or</Text>

//         <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Google Login coming soon')}>
//           <Image source={require('../assets/images/google.png')} style={styles.image} />
//           <Text style={styles.socialText}>Continue with Google</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Facebook Login coming soon')}>
//           <Image source={require('../assets/images/fb.png')} style={styles.image} />
//           <Text style={styles.socialText}>Continue with Facebook</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, loading && { opacity: 0.7 }]}
//           onPress={onSignUpPress}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.buttonText}>Sign Up</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#d3d3d3',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   signUpBox: {
//     backgroundColor: '#e0efe2',
//     borderRadius: 25,
//     padding: 20,
//     width: '100%',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 12,
//     width: '100%',
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   switchText: {
//     textAlign: 'center',
//     marginTop: 20,
//     color: '#444',
//   },
//   linkText: {
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   or: {
//     textAlign: 'center',
//     marginVertical: 10,
//     color: '#888',
//   },
//   image: {
//     width: 25,
//     height: 25,
//     marginLeft: 10,
//   },
//   socialButton: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     paddingVertical: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//     flexDirection: 'row',
//   },
//   socialText: {
//     textAlign: 'center',
//     marginLeft: 50,
//     color: '#444',
//     fontWeight: 'bold',
//   },
//   button: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });


import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useSignIn, useAuth } from '@clerk/clerk-expo';

export default function LoginScreen() {
  const { signIn, setActive, isLoaded: signInLoaded } = useSignIn();
  const { isSignedIn, isLoaded: authLoaded } = useAuth();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (authLoaded && isSignedIn) {
      router.replace('/homepage'); // redirect if already signed in
    }
  }, [authLoaded, isSignedIn]);

  if (!authLoaded || !signInLoaded || isSignedIn) {
    // Show loading until auth state and signIn hook are ready, or redirect happens
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Checking authentication...</Text>
      </View>
    );
  }

  const onSignInPress = async () => {
    if (!signInLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/homepage');
      } else {
        Alert.alert('Sign-in incomplete', 'Please complete additional steps.');
        console.log(signInAttempt);
      }
    } catch (err) {
      const message = err.errors?.[0]?.message || 'Failed to sign in.';
      Alert.alert('Error', message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Image source={require('../assets/images/plant1.jpg')} style={styles.image} />
      </View>

      <View style={styles.loginBox}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>

        <TextInput
          placeholder="User Name or Email"
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          value={emailAddress}
          onChangeText={setEmailAddress}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.forgot} onPress={() => router.push('/forgot-password')}>
          Forgot Password?
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={onSignInPress}
          disabled={!signInLoaded || loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.switchText}>
          Don’t have an account?{' '}
          <Text style={styles.linkText} onPress={() => router.push('/signup')}>
            Sign up
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginBox: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 600,
    padding: '65%',
    borderRadius: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    marginTop: 25,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#E5E4E2',
    borderRadius: 15,
    padding: 12,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  forgot: {
    alignSelf: 'flex-end',
    color: '#6c8c6b',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 5,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#444',
  },
  linkText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});
