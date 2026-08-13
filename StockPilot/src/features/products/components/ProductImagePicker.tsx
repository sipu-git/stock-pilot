import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import {
  Button,
  IconButton,
  Surface,
  Text,
} from "react-native-paper";

interface ProductImagePickerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

const MAX_IMAGES = 5;

const ProductImagePicker = ({
  images,
  onImagesChange,
}: ProductImagePickerProps) => {
  const askPermission = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const gallery =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (
      !camera.granted ||
      !gallery.granted
    ) {
      Alert.alert(
        "Permission Required",
        "Camera and Gallery permissions are required."
      );

      return false;
    }

    return true;
  };

  const openCamera = async () => {
    const allowed = await askPermission();

    if (!allowed) return;

    const result =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.8,
      });

    if (!result.canceled) {
      addImage(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const allowed = await askPermission();

    if (!allowed) return;

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: MAX_IMAGES,
      });

    if (!result.canceled) {
      const selected = result.assets.map(
        (asset) => asset.uri
      );

      addMultipleImages(selected);
    }
  };

  const showPicker = () => {
    Alert.alert(
      "Select Image",
      "Choose image source",
      [
        {
          text: "Camera",
          onPress: openCamera,
        },
        {
          text: "Gallery",
          onPress: openGallery,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const addImage = (uri: string) => {
    if (images.length >= MAX_IMAGES) {
      Alert.alert(
        "Limit Reached",
        `Maximum ${MAX_IMAGES} images allowed.`
      );

      return;
    }

    onImagesChange([...images, uri]);
  };

  const addMultipleImages = (
    newImages: string[]
  ) => {
    const updated = [
      ...images,
      ...newImages,
    ].slice(0, MAX_IMAGES);

    onImagesChange(updated);
  };

  const removeImage = (
    index: number
  ) => {
    const updated = images.filter(
      (_, i) => i !== index
    );

    onImagesChange(updated);
  };

  return (
    <View>

      <Button
        mode="outlined"
        icon="camera"
        onPress={showPicker}
      >
        Add Images
      </Button>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      >
        {images.map((image, index) => (
          <Surface
            key={index}
            style={styles.imageContainer}
            elevation={1}
          >
            <Image
              source={{ uri: image }}
              style={styles.image}
            />

            <IconButton
              icon="close-circle"
              size={20}
              style={styles.remove}
              onPress={() =>
                removeImage(index)
              }
            />
          </Surface>
        ))}
      </ScrollView>

      <Text
        variant="bodySmall"
        style={styles.helper}
      >
        {images.length}/{MAX_IMAGES} Images Selected
      </Text>

    </View>
  );
};

export default ProductImagePicker;

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
  },

  imageContainer: {
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },

  image: {
    width: 100,
    height: 100,
  },

  remove: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#fff",
  },

  helper: {
    marginTop: 12,
    opacity: 0.7,
  },
});