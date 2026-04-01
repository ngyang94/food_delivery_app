import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../state/slices/authSlice";
import type { AppDispatch, RootState } from "../state/store";

export default function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector<RootState, AuthState>((state) => state.auth);

  const submit = async () => {
    if (!form.email || !form.password)
      return Alert.alert("Error", "Please enter valid email or password.");
    setIsSubmitting(true);
    try {
      // sign in
      await singInWithEmailAndPassword(form.email, form.password);

      setIsSubmitting(false);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      router.replace("/");
    }
  }, [authState]);

  async function singInWithEmailAndPassword(email: string, password: string) {
    const response: any = await dispatch(loginAsync({ email, password }));
    if (!response.payload && !response.payload?.id) {
      Alert.alert("Error", "Invalid email or password.");
    }
  }

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-20">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => {
          setForm((prev) => ({ ...prev, password: text }));
        }}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign in" isLoading={isSubmitting} onPress={submit} />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-300">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className=" text-primary">
          <Text>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}
