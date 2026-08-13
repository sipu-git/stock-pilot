import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Snackbar,
  TextInput,
} from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";

import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "../validation/changePasswordSchema";
import { useChangePassword } from "../hooks/useChangePassword";

export default function ChangePasswordScreen() {
  const navigation = useNavigation();

  const mutation = useChangePassword();

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
  });

  const {
    control,
    handleSubmit,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (
    data: ChangePasswordFormData
  ) => {
    mutation.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setSnackbar({
            visible: true,
            message:
              "Password changed successfully",
          });

          setTimeout(() => {
            navigation.goBack();
          }, 1000);
        },

        onError: (error: any) => {
          setSnackbar({
            visible: true,
            message:
              error?.response?.data?.message ??
              "Unable to change password",
          });
        },
      }
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <Controller
          control={control}
          name="currentPassword"
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label="Current Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showCurrent}
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={
                      showCurrent
                        ? "eye-off"
                        : "eye"
                    }
                    onPress={() =>
                      setShowCurrent(
                        !showCurrent
                      )
                    }
                  />
                }
              />

              <HelperText
                type="error"
                visible={!!error}
              >
                {error?.message}
              </HelperText>
            </>
          )}
        />

        <Controller
          control={control}
          name="newPassword"
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label="New Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showNew}
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={
                      showNew
                        ? "eye-off"
                        : "eye"
                    }
                    onPress={() =>
                      setShowNew(!showNew)
                    }
                  />
                }
              />

              <HelperText
                type="error"
                visible={!!error}
              >
                {error?.message}
              </HelperText>
            </>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({
            field: { onChange, value },
            fieldState: { error },
          }) => (
            <>
              <TextInput
                label="Confirm Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showConfirm}
                mode="outlined"
                right={
                  <TextInput.Icon
                    icon={
                      showConfirm
                        ? "eye-off"
                        : "eye"
                    }
                    onPress={() =>
                      setShowConfirm(
                        !showConfirm
                      )
                    }
                  />
                }
              />

              <HelperText
                type="error"
                visible={!!error}
              >
                {error?.message}
              </HelperText>
            </>
          )}
        />

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            Update Password
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbar.visible}
        onDismiss={() =>
          setSnackbar({
            visible: false,
            message: "",
          })
        }
      >
        {snackbar.message}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },

  buttonContainer: {
    marginTop: 20,
  },
});