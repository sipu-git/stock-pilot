import React, { useEffect, useRef, useState } from "react";
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

import PasswordStrength from "../components/PasswordStrength";

import {
  registerSchema,
  RegisterFormData,
} from "../validation/register.schema";

import { useRegister } from "../hooks/useRegister";

import { AuthStackParamList } from "../../../types/navigation";

type Props = NativeStackScreenProps<
  AuthStackParamList,
  "Register"
>;

const COLORS = {
  primary: "#6D28D9",
  secondary: "#8B5CF6",
  light: "#F5F3FF",
  white: "#FFFFFF",
  text: "#1E1B4B",
  subText: "#6B7280",
  border: "#DDD6FE",
};

export function RegisterScreen({
  navigation,
}: Props) {
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

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
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = ({
    confirmPassword,
    ...payload
  }: RegisterFormData) => {
    registerMutation.mutate(payload, {
      onSuccess: () => {
        setSnackbarMessage(
          "Account created successfully."
        );

        setSnackbarVisible(true);

        setTimeout(() => {
          navigation.goBack();
        }, 1200);
      },

      onError: (error: any) => {
        setSnackbarMessage(
          error?.response?.data?.message ??
            "Registration failed."
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.scroll
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
              <View style={styles.logoCircle}>
                <MaterialCommunityIcons
                  name="account-plus"
                  size={46}
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
                style={styles.subtitle}
              >
                Inventory Management
                System
              </Text>
            </Animated.View>

            <Animated.View
              style={{
                opacity: formOpacity,
              }}
            >
              <Card
                mode="contained"
                style={styles.card}
              >
                <Card.Content>

                  <Text
                    variant="headlineSmall"
                    style={styles.title}
                  >
                    Create Account 🚀
                  </Text>

                  <Text
                    style={
                      styles.description
                    }
                  >
                    Create your account
                    and start managing
                    inventory smarter.
                  </Text>
                                    {/* Name */}

                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <>
                        <TextInput
                          mode="outlined"
                          label="Full Name"
                          value={field.value}
                          onChangeText={field.onChange}
                          autoCapitalize="words"
                          left={
                            <TextInput.Icon
                              icon="account-outline"
                            />
                          }
                          style={styles.input}
                          outlineColor={COLORS.border}
                          activeOutlineColor={
                            COLORS.primary
                          }
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

                  {/* Email */}

                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <>
                        <TextInput
                          mode="outlined"
                          label="Email Address"
                          value={field.value}
                          onChangeText={field.onChange}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          left={
                            <TextInput.Icon
                              icon="email-outline"
                            />
                          }
                          style={styles.input}
                          outlineColor={COLORS.border}
                          activeOutlineColor={
                            COLORS.primary
                          }
                        />

                        <HelperText
                          type="error"
                          visible={!!errors.email}
                        >
                          {errors.email?.message}
                        </HelperText>
                      </>
                    )}
                  />

                  {/* Password */}

                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <>
                        <TextInput
                          mode="outlined"
                          label="Password"
                          value={field.value}
                          onChangeText={field.onChange}
                          secureTextEntry={!showPassword}
                          autoCapitalize="none"
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
                          style={styles.input}
                          outlineColor={COLORS.border}
                          activeOutlineColor={
                            COLORS.primary
                          }
                        />

                        <PasswordStrength
                          password={password}
                        />

                        <HelperText
                          type="error"
                          visible={!!errors.password}
                        >
                          {errors.password?.message}
                        </HelperText>
                      </>
                    )}
                  />

                  {/* Confirm Password */}

                  <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <>
                        <TextInput
                          mode="outlined"
                          label="Confirm Password"
                          value={field.value}
                          onChangeText={field.onChange}
                          secureTextEntry={
                            !showConfirmPassword
                          }
                          autoCapitalize="none"
                          left={
                            <TextInput.Icon
                              icon="shield-lock-outline"
                            />
                          }
                          right={
                            <TextInput.Icon
                              icon={
                                showConfirmPassword
                                  ? "eye-off"
                                  : "eye"
                              }
                              onPress={() =>
                                setShowConfirmPassword(
                                  !showConfirmPassword
                                )
                              }
                            />
                          }
                          style={styles.input}
                          outlineColor={COLORS.border}
                          activeOutlineColor={
                            COLORS.primary
                          }
                        />

                        <HelperText
                          type="error"
                          visible={
                            !!errors.confirmPassword
                          }
                        >
                          {
                            errors.confirmPassword
                              ?.message
                          }
                        </HelperText>
                      </>
                    )}
                  />

                                    <Button
                    mode="contained"
                    onPress={handleSubmit(onSubmit)}
                    loading={registerMutation.isPending}
                    disabled={registerMutation.isPending}
                    buttonColor={COLORS.primary}
                    contentStyle={styles.registerButtonContent}
                    style={styles.registerButton}
                    labelStyle={styles.registerButtonLabel}
                  >
                    {registerMutation.isPending
                      ? "Creating Account..."
                      : "Create Account"}
                  </Button>

                  <Button
                    mode="text"
                    textColor={COLORS.primary}
                    style={styles.loginButton}
                    onPress={() =>
                      navigation.goBack()
                    }
                  >
                    Already have an account? Login
                  </Button>

                </Card.Content>
              </Card>
            </Animated.View>
          </ScrollView>

          <Snackbar
            visible={snackbarVisible}
            duration={3000}
            onDismiss={() =>
              setSnackbarVisible(false)
            }
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
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",

    elevation: 10,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 6,
    },

    shadowOpacity: 0.15,

    shadowRadius: 12,

    marginBottom: 18,
  },

  brand: {
    color: "#FFFFFF",
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    color: "#E9D5FF",
    marginTop: 6,
    textAlign: "center",
    fontSize: 15,
    letterSpacing: 0.3,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,

    elevation: 12,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.08,

    shadowRadius: 18,
  },

  cardContent: {
    paddingTop: 12,
    paddingBottom: 10,
  },

  title: {
    textAlign: "center",
    color: COLORS.text,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    textAlign: "center",
    color: COLORS.subText,
    marginBottom: 24,
    lineHeight: 22,
    fontSize: 14,
  },

  input: {
    marginTop: 10,
    marginBottom: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
  },

  helperText: {
    marginTop: -2,
    marginBottom: 4,
  },

  registerButton: {
    marginTop: 24,
    borderRadius: 16,
    overflow: "hidden",
  },

  registerButtonContent: {
    height: 56,
  },

  registerButtonLabel: {
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.5,
  },

  loginButton: {
    marginTop: 16,
    alignSelf: "center",
  },

  snackbar: {
    backgroundColor: "#1E1B4B",
  },

  footer: {
    alignItems: "center",
    marginTop: 16,
  },

  dividerSpace: {
    height: 10,
  },

  passwordContainer: {
    marginBottom: 6,
  },
});