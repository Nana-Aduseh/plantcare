import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
        <View>
          <Image source={require('../assets/images/plant1.jpg')} style={styles.image} />
        </View>
        <View style={styles.loginBox}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>

        <TextInput placeholder="User Name" style={styles.input} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} />
        <Text style={styles.forgot}>Forgot Password?</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/homepage')}>
          <Text style={styles.buttonText} >Log In</Text>
        </TouchableOpacity>

        <Text style={styles.switchText}>
          Don’t have an account?{' '}
          <Text style={styles.linkText} onPress={() => router.push('/signup')}>Sign up</Text>
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
    height:'100%'
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
    marginTop:5,
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
