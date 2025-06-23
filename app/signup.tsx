import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';

export default function SignUpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.signUpBox}>
        <Text style={styles.title}>Join PlantCare Today </Text>
        <Text style={styles.subtitle}>Create Your PlantCare Account</Text>

        <TextInput placeholder="Name" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} />

        <Text style={styles.switchText}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={() => router.push('/login')}>Log In</Text>
        </Text>

        <Text style={styles.or}>or</Text>

        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/images/google.png')} style={styles.image} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
           <Image source={require('../assets/images/fb.png')} style={styles.image} />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}  onPress={() => router.push('/login')}>
          <Text style={styles.buttonText} >Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#d3d3d3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signUpBox: {
    backgroundColor: '#e0efe2',
    borderRadius: 25,
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  switchText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#444',
  },
  linkText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  or: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#888',
  },
  image:{
    width:25,
    height:25,
    marginLeft:10,
  },
  socialButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection:'row',
  },
  socialText: {
     textAlign: 'center',
     marginLeft:50,
    color: '#444',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
