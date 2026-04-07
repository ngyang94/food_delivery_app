import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { email, location, pencil, phone, profile } from "@/constant/icons";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../state/slices/authSlice";
import { AppDispatch, RootState } from "../state/store";

import * as ImagePicker from "expo-image-picker";

function ProfileInfo({
  icon,
  label,
  value,
  editMode,
  onChangeText,
}: {
  icon: ImageSourcePropType;
  label: string;
  value: string;
  editMode?: boolean;
  onChangeText?: (value: string) => void;
}) {
  return (
    <View className="flex flex-row items-center pb-5 w-full">
      <View className="bg-orange-100 rounded-full p-5">
        <Image source={icon} className="size-10" resizeMode="contain" />
      </View>
      <View className="justify-center pl-5 w-[80%]">
        <View className="pb-2">
          <Text className="font-quicksand-semibold text-gray-500">{label}</Text>
        </View>

        <View className="">
          {editMode ? (
            <TextInput
              value={value}
              onChangeText={(text) => {
                !!onChangeText && onChangeText(text);
              }}
              className="border rounded-full px-3"
            />
          ) : (
            <Text className="font-quicksand-bold">{value}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default function Profile() {
  const auth = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [isEditProfile, setIsEditProfile] = useState(false);

  const [form, setForm] = useState({
    username: auth.username,
    email: auth.email,
    phone: auth.phone,
    address1: auth.address1,
    address2: auth.address2,
  });

  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        username: auth.username,
        email: auth.email,
        phone: auth.phone,
        address1: auth.address1,
        address2: auth.address2,
      };
    });
  }, [auth]);

  function onChangeText(key: string, value: string) {
    setForm((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  async function logout() {
    setIsLoadingLogout(true);
    await dispatch(logoutAsync());
    setIsLoadingLogout(false);
  }

  async function getNewProfileImage() {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  }

  function editProfileButtonHandler() {
    if (isEditProfile) {
      //add validation here
    }
    //if empty, set it back to default value
    if (!form.email.trim()) {
      setForm((prev) => {
        return {
          ...prev,
          email: auth.email,
        };
      });
    }

    if (!form.username.trim()) {
      setForm((prev) => {
        return {
          ...prev,
          username: auth.username,
        };
      });
    }

    if (!form.phone.trim()) {
      setForm((prev) => {
        return {
          ...prev,
          phone: auth.phone,
        };
      });
    }

    if (!form.address1.trim()) {
      setForm((prev) => {
        return {
          ...prev,
          address1: auth.address1,
        };
      });
    }

    if (!form.address2.trim()) {
      setForm((prev) => {
        return {
          ...prev,
          address2: auth.address2,
        };
      });
    }
    setIsEditProfile(!isEditProfile);
  }
  return (
    <SafeAreaView className="px-3 h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomHeader title="Profile" />
        <View className="justify-center items-center mb-10 mt-5">
          <View className="border rounded-full">
            {profileImage != null ? (
              <Image
                source={{ uri: profileImage }}
                className="size-20 rounded-full"
              />
            ) : (
              <Image source={profile} className="size-20 rounded-full" />
            )}

            {isEditProfile && (
              <TouchableHighlight
                className="absolute -bottom-1 -right-1 rounded-full border bg-white p-1"
                onPress={getNewProfileImage}
              >
                <Image source={pencil} className="size-5" />
              </TouchableHighlight>
            )}
          </View>
        </View>
        <ProfileInfo
          icon={profile}
          label="Full Name"
          value={form.username}
          editMode={isEditProfile}
          onChangeText={(text: string) => {
            onChangeText("username", text);
          }}
        />
        <ProfileInfo
          icon={email}
          label="Email"
          value={form.email}
          editMode={isEditProfile}
          onChangeText={(text: string) => {
            onChangeText("email", text);
          }}
        />
        <ProfileInfo
          icon={phone}
          label="Phone number"
          value={form.phone}
          editMode={isEditProfile}
          onChangeText={(text: string) => {
            onChangeText("phone", text);
          }}
        />
        <ProfileInfo
          icon={location}
          label="Address - 1 (Home)"
          value={form.address1}
          editMode={isEditProfile}
          onChangeText={(text: string) => {
            onChangeText("address1", text);
          }}
        />
        <ProfileInfo
          icon={location}
          label="Address - 2 - (Work)"
          value={form.address2}
          editMode={isEditProfile}
          onChangeText={(text: string) => {
            onChangeText("address2", text);
          }}
        />

        <CustomButton
          title={isEditProfile ? "Save Profile" : "Edit Profile"}
          style={
            "bg-orange-100 py-5 rounded-full border border-orange-300 mb-5"
          }
          textStyle={"text-center text-orange-300 font-quicksand-bold"}
          onPress={editProfileButtonHandler}
        />
        <CustomButton
          title="Logout"
          style={
            "bg-red-100 py-5 rounded-full border border-red-300 mb-[140px]"
          }
          textStyle={"text-center text-red-300 font-quicksand-bold"}
          onPress={logout}
          isLoading={isLoadingLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
