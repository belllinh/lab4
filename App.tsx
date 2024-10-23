import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthenticatedUserProvider} from './providers/index';
import { RootNavigator } from './navigation/index';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <AuthenticatedUserProvider>
        <PaperProvider>
          <SafeAreaProvider>
              <RootNavigator />
          </SafeAreaProvider>
        </PaperProvider>
      </AuthenticatedUserProvider>
    </ReduxProvider>
  );
}