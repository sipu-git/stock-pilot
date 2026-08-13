import React from "react";
import { List, Divider } from "react-native-paper";

type Props = {
  title: string;
  description?: string;
  leftIcon: string;
  rightIcon?: string;
  onPress?: () => void;
  showDivider?: boolean;
};

export default function SettingItem({
  title,
  description,
  leftIcon,
  rightIcon = "chevron-right",
  onPress,
  showDivider = true,
}: Props) {
  return (
    <>
      <List.Item
        title={title}
        description={description}
        onPress={onPress}
        left={(props) => (
          <List.Icon
            {...props}
            icon={leftIcon}
          />
        )}
        right={(props) => (
          <List.Icon
            {...props}
            icon={rightIcon}
          />
        )}
      />

      {showDivider && <Divider />}
    </>
  );
}