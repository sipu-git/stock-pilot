import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import {
  Button,
  Card,
  HelperText,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";

import {
  Controller,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useLogin } from "../hooks/useLogin";

import {
  loginSchema,
  LoginFormData,
} from "../validation/login.schema";

import { AuthStackParamList } from "../../../types/navigation";

type Props = NativeStackScreenProps<
  AuthStackParamList,
  "Login"
>;

const COLORS = {
  primary: "#6D28D9",
  secondary: "#8B5CF6",
  light: "#F5F3FF",
  lighter: "#FAF7FF",
  white: "#FFFFFF",
  text: "#1E1B4B",
  subText: "#6B7280",
  border: "#DDD6FE",
};

export function LoginScreen({
  navigation,
}: Props) {
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] =
    useState(false);

  const [snackbarVisible, setSnackbarVisible] =
    useState(false);

  const [snackbarMessage, setSnackbarMessage] =
    useState("");

  const logoScale = useRef(
    new Animated.Value(0.8)
  ).current;

  const logoOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const formOpacity = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),

        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),

      Animated.timing(formOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (
    data: LoginFormData
  ) => {
    loginMutation.mutate(data, {
      onError: (error: any) => {
        setSnackbarMessage(
          error?.response?.data?.message ??
            "Unable to login."
        );

        setSnackbarVisible(true);
      },
    });
  };

  return (
    <LinearGradient
      colors={[
        COLORS.primary,
        COLORS.secondary,
        COLORS.light,
      ]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={
              styles.scroll
            }
            showsVerticalScrollIndicator={
              false
            }
          >
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  opacity: logoOpacity,
                  transform: [
                    {
                      scale: logoScale,
                    },
                  ],
                },
              ]}
            >
              <View
                style={styles.logoCircle}
              >
                <MaterialCommunityIcons
                  name="package-variant-closed"
                  size={48}
                  color={COLORS.primary}
                />
              </View>

              <Text
                variant="headlineMedium"
                style={styles.brand}
              >
                StockPilot
              </Text>

              <Text
                variant="bodyMedium"
                style={styles.subtitle}
              >
                Inventory Management
                System
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: formOpacity,
                width: "100%",
              }}
            >
              <Card
                mode="contained"
                style={styles.card}
              >
                <Card.Content>

                  <Text
                    variant="headlineSmall"
                    style={
                      styles.welcome
                    }
                  >
                    Welcome Back 👋
                  </Text>

                  <Text
                    style={
                      styles.description
                    }
                  >
                    Sign in to continue
                    managing your
                    inventory.
                  </Text>

                  <Controller
                    control={control}
                    name="email"
                    render={({
                      field,
                    }) => (
                      <>
                        <TextInput
                          mode="outlined"
                          label="Email Address"
                          value={
                            field.value
                          }
                          onChangeText={
                            field.onChange
                          }
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          left={
                            <TextInput.Icon
                              icon="email-outline"
                            />
                          }
                          style={
                            styles.input
                          }
                          outlineColor={
                            COLORS.border
                          }
                          activeOutlineColor={
                            COLORS.primary
                          }
                        />

                        <HelperText
                          type="error"
                          visible={
                            !!errors.email
                          }
                        >
                          {
                            errors.email
                              ?.message
                          }
                        </HelperText>
                      </>
                    )}
                  />

                  <Controller
                    control={control}
                    name="password"
                    render={({
                      field,
                    }) => (
                      <>
                        <TextInput
                          mode="outlined"
                          label="Password"
                          value={
                            field.value
                          }
                          onChangeText={
                            field.onChange
                          }
                          secureTextEntry={
                            !showPassword
                          }
                          left={
                            <TextInput.Icon
                              icon="lock-outline"
                            />
                          }
                          right={
                            <TextInput.Icon
                              icon={
                                showPassword
                                  ? "eye-off"
                                  : "eye"
                              }
                              onPress={() =>
                                setShowPassword(
                                  !showPassword
                                )
                              }
                            />
                          }
                          style={
                            styles.input
                          }
                          outlineColor={
                            COLORS.border
                          }
                          activeOutlineColor={
                            COLORS.primary
                          }
                        />

                        <HelperText
                          type="error"
                          visible={
                            !!errors.password
                          }
                        >
                          {
                            errors
                              .password
                              ?.message
                          }
                        </HelperText>
                                                </>
                      )}
                    />

                    <Button
                      mode="contained"
                      onPress={handleSubmit(onSubmit)}
                      loading={loginMutation.isPending}
                      disabled={loginMutation.isPending}
                      buttonColor={COLORS.primary}
                      contentStyle={styles.loginButtonContent}
                      style={styles.loginButton}
                      labelStyle={styles.loginButtonLabel}
                    >
                      {loginMutation.isPending
                        ? "Signing In..."
                        : "Login"}
                    </Button>

                    <Button
                      mode="text"
                      textColor={COLORS.primary}
                      style={styles.registerButton}
                      onPress={() =>
                        navigation.navigate("Register")
                      }
                    >
                      Don't have an account? Create Account
                    </Button>

                  </Card.Content>
                </Card>
              </Animated.View>
            </ScrollView>

            <Snackbar
              visible={snackbarVisible}
              onDismiss={() =>
                setSnackbarVisible(false)
              }
              duration={3000}
            >
              {snackbarMessage}
            </Snackbar>

          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 28,
  },

  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    marginBottom: 18,
  },

  brand: {
    color: COLORS.white,
    fontWeight: "700",
  },

  subtitle: {
    color: "#E9D5FF",
    marginTop: 6,
    textAlign: "center",
  },

  card: {
    borderRadius: 28,
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },
  },

  welcome: {
    textAlign: "center",
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },

  description: {
    textAlign: "center",
    color: COLORS.subText,
    marginBottom: 24,
    lineHeight: 22,
  },

  input: {
    marginTop: 10,
    backgroundColor: COLORS.white,
  },

  loginButton: {
    marginTop: 22,
    borderRadius: 14,
  },

  loginButtonContent: {
    height: 54,
  },

  loginButtonLabel: {
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  registerButton: {
    marginTop: 16,
  },
});