import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextInputMask} from 'react-native-masked-text';

type FormData = {
  email: string;
  password: string;
  phoneNumber: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter your email to login. It should be a valid email.')
    .required('Please enter your email to login. It should be a valid email.'),
  password: yup
    .string()
    .min(
      8,
      'Please enter your password to login. It should be at least 8 characters.',
    )
    .max(
      16,
      'Please enter your password to login. It should be at most 16 characters.',
    )
    .matches(
      /[a-zA-Z]/,
      'Please enter your password to login. It should contain at least one letter.',
    )
    .matches(
      /[0-9]/,
      'Please enter your password to login. It should contain at least one number.',
    )
    .matches(
      /[!@#$%^&*()_+\-=\]{};':"\\|,.<>/?]/,
      'Please enter your password to login. It should contain at least one special character.',
    )
    .required('Please enter your password to login.'),
  phoneNumber: yup
    .string()
    .transform(value => value.replace(/[^\d]/g, ''))
    .required('Please enter your phone number.'),
});

function App(): JSX.Element {
  const {control, handleSubmit, formState} = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data.email);
    console.log(data.password);
    console.log(data.phoneNumber);
  };
  const {errors, isValid} = formState;
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.View}>
          <Text style={styles.title}>Sign in to your accont</Text>
          <Text style={styles.title}>{}</Text>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  placeholder="Email"
                  style={styles.TextInput}
                  onChangeText={onChange}
                  value={value}
                />
                <Text style={styles.Error}>{errors.email?.message}</Text>
              </>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <>
                <TextInput
                  placeholder="Password"
                  style={styles.TextInput}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={true}
                />
                <Text style={styles.Error}>{errors.password?.message}</Text>
              </>
            )}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({field: {onChange, value}}) => (
              <>
                <TextInputMask
                  type={'cel-phone'}
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  }}
                  placeholder="telephone number"
                  style={styles.TextInput}
                  onChangeText={onChange}
                  value={value}
                />
                <Text style={styles.Error}>{errors.phoneNumber?.message}</Text>
              </>
            )}
          />
        </View>
        <TouchableOpacity
          style={isValid ? styles.submit_on : styles.submit_off}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.TextSubmit}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '90%',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  TextSubmit: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  submit_on: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
  },
  submit_off: {
    opacity: 0.5,
    backgroundColor: 'gray',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
  },
  Error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
