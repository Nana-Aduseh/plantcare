import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.replace('/homepage');
    } else {
      router.replace('/login');
    }
  }, [isLoaded, isSignedIn]);

  return null; // You can show a loading spinner here if you want
}
