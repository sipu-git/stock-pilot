import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Card,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { RootState } from "../../../core/store";


import { useDispatch } from "react-redux";
import { Snackbar } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { updateUser } from "../../auth/store/authSlice";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

type FormData = {
  name: string;
};

export default function EditProfileScreen() {
  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const dispatch = useDispatch();

const navigation = useNavigation();

const mutation = useUpdateProfile();

const [snackbarVisible, setSnackbarVisible] =
  useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const onSubmit = (data: FormData) => {
  mutation.mutate(
    {
      name: data.name,
    },
    {
      onSuccess: (updatedUser) => {
        dispatch(updateUser(updatedUser));

        setSnackbarVisible(true);

        setTimeout(() => {
          navigation.goBack();
        }, 800);
      },

      onError: (error) => {
        console.log(error);
      },
    }
  );
};

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Card mode="contained">
        <Card.Content>

          <View style={styles.avatarContainer}>
            <Avatar.Text
              size={90}
              label={user?.name?.charAt(0).toUpperCase() || "U"}
            />

            <Text
              variant="titleLarge"
              style={styles.userName}
            >
              {user?.name}
            </Text>
          </View>

          <Controller
            control={control}
            name="name"
            rules={{
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  label="Full Name"
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                />

                <HelperText
                  type="error"
                  visible={!!errors.name}
                >
                  {errors.name?.message}
                </HelperText>
              </>
            )}
          />

          <TextInput
            label="Email"
            mode="outlined"
            value={user?.email}
            editable={false}
            style={styles.input}
          />

          {/* <TextInput
            label="Role"
            mode="outlined"
            value={user?.role}
            editable={false}
            style={styles.input}
          /> */}

          <Button
            mode="contained"
    loading={mutation.isPending}
    disabled={mutation.isPending}
    onPress={handleSubmit(onSubmit)}
          >
            Save Changes
          </Button>

        </Card.Content>
      </Card>
      <Snackbar
  visible={snackbarVisible}
  onDismiss={() => setSnackbarVisible(false)}
>
  Profile updated successfully
</Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F7F8FA",
    flexGrow: 1,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },

  userName: {
    marginTop: 12,
    fontWeight: "700",
  },

  input: {
    marginTop: 16,
  },

  button: {
    marginTop: 24,
  },
});