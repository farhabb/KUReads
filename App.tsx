import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import MyBooksProvider from './context/MyBooksProvider';

const API_KEY = "chhatak::stepzen.net+1000::99db42549937550e582a64b21d2e86870e0c1acdc0161b4aeb2053b633351c4b";

const client = new ApolloClient({
  uri: "https://chhatak.stepzen.net/api/gaudy-bunny/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <MyBooksProvider>
          <Navigation colorScheme={colorScheme} />
          </MyBooksProvider>
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
