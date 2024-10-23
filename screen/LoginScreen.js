import React, { useState,useEffect } from 'react';
import { Text, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import auth from '@react-native-firebase/auth';
import { View, TextInput, Logo, Button, FormErrorMessage } from '../components';
import { Images, Colors } from '../config';
import { useTogglePasswordVisibility } from '../hooks';
import { loginValidationSchema } from '../utils';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';


export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState('');
  const [loading, setLoading] = useState(false);
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      wedClientId: '1005169962417-kc4is9gpfp1kj629j17najh8pk2dihju.apps.googleusercontent.com'    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('Thông tin người dùng:', userInfo);
      const { idToken } = userInfo;
      if (!idToken) {
        throw new Error('Không lấy được idToken từ Google Sign-In');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      console.log('Google Sign-In thành công');
    } catch (error) {  
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Người dùng đã hủy quá trình đăng nhập');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Đăng nhập đang diễn ra');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Dịch vụ Google Play không có sẵn hoặc đã lỗi thời');
      } else {
        console.log('Lỗi đăng nhập Google:', error.message + error.code);
      }
  }
};

  const handleLogin = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      const { user } = await auth().signInWithEmailAndPassword(email, password);
      if (!user.emailVerified) {
        auth().signOut();
        await user.sendEmailVerification();        
        Alert.alert('Xác minh Email', 'Vui lòng kiểm tra email của bạn để xác thực tài khoản trước khi tiếp tục.');
        // console.log(user);
        }
        dispatch(setUser({ id: user.uid, email: user.email, displayname: user.displayName }));
    } catch (error) {
      setErrorState(error.code);
    }
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.logoContainer}>
          <Logo uri={Images.logo} style={styles.logo} />
          <Text style={styles.screenTitle}>Welcome back!</Text>
        </View>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={values => handleLogin(values)}
        >
          {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
            <>
              <TextInput
                name='email'
                leftIconName='email'
                placeholder='Enter email'
                autoCapitalize='none'
                keyboardType='email-address'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              
              <TextInput
                name='password'
                leftIconName='key-variant'
                placeholder='Enter password'
                autoCapitalize='none'
                secureTextEntry={passwordVisibility}
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <FormErrorMessage error={errors.password} visible={touched.password} />
              {errorState !== '' && <FormErrorMessage error={errorState} visible={true} />}
              <Button style={styles.button} onPress={handleSubmit} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
              </Button>
            </>
          )}
        </Formik>
        <View style={styles.SignUpContainer}>
        <Button borderless title='Forgot Password' onPress={() => navigation.navigate('ForgotPassword')} />
        <Button borderless title='Create a new account' onPress={() => navigation.navigate('Signup')} />
         </View>
         {/* <View style={styles.socialContainer}>
          <Button style={[styles.socialButton, styles.googleButton]} onPress={handleGoogleSignIn}>           
            <Text style={styles.socialButtonText}>Google</Text>
          </Button>
          <Button style={[styles.socialButton, styles.appleButton]} onPress={() => {}}>           
            <Text style={styles.socialButtonText}>Apple</Text>
          </Button>
        </View>       */}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingHorizontal: 16 ,paddingTop: 50},
  logoContainer: { alignItems: 'center'}, // more space after the logo
  screenTitle: { fontSize: 32, fontWeight: '700', color: Colors.black, paddingTop: 20 },
  input: { marginVertical: 5, padding: 5, borderRadius: 8, borderColor: Colors.lightGray }, // improve input field appearance
  button: { width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 16, backgroundColor: Colors.orange, padding: 20, borderRadius: 8 },
  buttonText: { fontSize: 20, color: Colors.white, fontWeight: '700' },
  socialContainer: { marginTop: 20, alignItems: 'center',justifyContent:"space-between" ,flexDirection:'row' },
  SignUpContainer: {justifyContent:"space-between" ,flexDirection:'row', marginTop: 10},
  socialButton: { width: '48%', padding: 12, borderRadius: 8, marginBottom: 16, alignItems: 'center' }, // added more padding and spacing
  googleButton: { backgroundColor: '#4285F4' },
  appleButton: { backgroundColor: '#000000' },
  socialButtonText: { color: Colors.white, fontSize: 18, fontWeight: '600' },
  footerText: { marginTop: 20, textAlign: 'center' }, // center-align footer links
});

