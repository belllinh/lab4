import React, { useState } from 'react';
import { StyleSheet, Text,Alert } from 'react-native';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import { passwordResetSchema } from '../utils';
import { Colors } from '../config';
import { View, TextInput, Button, FormErrorMessage } from '../components';

export const ForgotPasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');

  const handleSendPasswordResetEmail = values => {
    const { email } = values;

    auth().sendPasswordResetEmail(email)
      .then(() => Alert.alert('Message','Password Reset Email sent.'))
      .catch(error => setErrorState(error.message));
  };

  return (
    <View isSafe style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.screenTitle}>Reset your password</Text>
      </View>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={passwordResetSchema}
        onSubmit={values => handleSendPasswordResetEmail(values)}
      >
        {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
          <>
            <TextInput
              name='email'
              left='email'
              placeholder='Enter email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
            />
            <FormErrorMessage error={errors.email} visible={touched.email} />
            {errorState !== '' && <FormErrorMessage error={errorState} visible={true} />}
            <Button style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Send Reset Email</Text>
            </Button>
          </>
        )}
      </Formik>
      <Button
        style={styles.borderlessButtonContainer}
        borderless
        title='Go back to Login'
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 12 },
  innerContainer: { alignItems: 'center' },
  screenTitle: { fontSize: 32, fontWeight: '700', color: Colors.black, paddingTop: 20 },
  button: { width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 8, backgroundColor: Colors.orange, padding: 10, borderRadius: 8 },
  buttonText: { fontSize: 20, color: Colors.white, fontWeight: '700' },
  borderlessButtonContainer: { marginTop: 16, alignItems: 'center', justifyContent: 'center' }
});
