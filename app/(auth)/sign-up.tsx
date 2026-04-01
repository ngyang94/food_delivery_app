import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { userList } from "../dummy_data/dummy_data";

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const submit = async () => {
    if (!form.name || !form.email || !form.password)
      return Alert.alert(
        "Error",
        "Please enter valid name or email or password.",
      );
    setIsSubmitting(true);
    createNewUser(form.name, form.email, form.password);
    Alert.alert("Success", "Your account has been created successfully.");
    router.replace("/sign-in");
  };

  function createNewUser(name: string, email: string, password: string) {
    userList.push({
      id: userList.length + 1,
      name,
      email,
      password,
    });
  }

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-20">
      <CustomInput
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label="Full Name"
      />
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
      <CustomButton title="Sign up" isLoading={isSubmitting} onPress={submit} />

      <View
        className="flex justify-center mt-5 flex-row gap-2"
        style={{ paddingBottom: 50 }}
      >
        <Text className="base-regular text-gray-300">
          Already have an account?{" "}
        </Text>
        <Link href="/sign-in" className=" text-primary">
          Sign In
        </Link>
      </View>
    </View>
  );
}
