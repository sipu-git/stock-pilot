import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ReportCard from "../components/ReportCard";
import { REPORTS } from "../constants/reports";

import { useAppTheme } from "../../../core/theme/useAppTheme";
import { AppText } from "../../../components/ui";
import { ReportStackParamList } from "../../../types/navigation";

type Props = NativeStackScreenProps<
  ReportStackParamList,
  "ReportsHome"
>;
export default function ReportsHomeScreen({
  navigation,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >
      <FlatList
        data={REPORTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>

            <AppText
              variant="bodyMedium"
              color="secondary"
              style={styles.subtitle}
            >
              View business insights and
              inventory analytics.
            </AppText>
          </>
        }
        renderItem={({ item }) => (
          <ReportCard
            title={item.title}
            description={
              item.description
            }
            icon={item.icon}
            onPress={() =>
              navigation.navigate(
                item.screen,
              )
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
  },

  subtitle: {
    marginTop: 4,
    marginBottom: 24,
  },
});