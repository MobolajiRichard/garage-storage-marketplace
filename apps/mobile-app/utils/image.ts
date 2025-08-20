import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { uploadFile } from "@/queries";

/**
 * Compress an image URI until its file size is <= maxSizeBytes.
 * Returns the final manip result (with .uri, .width, .height).
 */
export async function compressToTargetSize(
  uri: string,
  maxSizeBytes = 3 * 1024 * 1024
) {
  // Get original image info (dimensions, size)
  const originalInfo = await FileSystem.getInfoAsync(uri, { size: true });
  const originalSize = (originalInfo as FileSystem.FileInfo & { size: number })
    .size;

  // If the image is already smaller than the target size, return it as is
  if (originalSize <= maxSizeBytes) {
    return { uri, width: 0, height: 0 }; // Return original
  }

  // First attempt: moderate quality reduction with resize if needed
  const resizeOperations = [];

  // Get image dimensions if the file is large (>2MB)
  if (originalSize > 2 * 1024 * 1024) {
    try {
      //   Add resize operation for very large images
      const dimensions = await ImageManipulator.manipulateAsync(
        uri,
        [], // No operations, just to get dimensions
        { format: ImageManipulator.SaveFormat.JPEG }
      );

      // If image is larger than 1080px in either dimension, resize it
      if (dimensions.width > 1080 || dimensions.height > 1080) {
        const maxDimension = Math.max(dimensions.width, dimensions.height);
        const scale = 1080 / maxDimension;

        resizeOperations.push({
          resize: {
            width: Math.round(dimensions.width * scale),
            height: Math.round(dimensions.height * scale),
          },
        });
      }
    } catch (error) {
      console.log("Error getting image dimensions:", error);
      // Continue without resize if there's an error
    }
  }

  // Estimate initial quality based on original size
  let quality = 0.8;
  if (originalSize > 8 * 1024 * 1024)
    quality = 0.6; // Very large files
  else if (originalSize > 4 * 1024 * 1024) quality = 0.7; // Large files

  // First attempt with resize (if applicable) and initial quality
  const firstResult = await ImageManipulator.manipulateAsync(
    uri,
    resizeOperations,
    {
      compress: quality,
      format: ImageManipulator.SaveFormat.JPEG,
    }
  );

  // Check if first attempt succeeded
  const firstInfo = await FileSystem.getInfoAsync(firstResult.uri, {
    size: true,
  });
  if (
    (firstInfo as FileSystem.FileInfo & { size: number }).size <= maxSizeBytes
  ) {
    return firstResult;
  }

  // If first attempt wasn't enough, try more aggressive compression
  // Binary search approach with max 3 iterations (instead of 6)
  let lastResult = firstResult;
  let minQuality = 0.1;
  let maxQuality = quality;

  for (let i = 0; i < 3; i++) {
    // Calculate new quality halfway between min and max
    quality = (minQuality + maxQuality) / 2;

    const result = await ImageManipulator.manipulateAsync(
      uri,
      resizeOperations,
      {
        compress: quality,
        format: ImageManipulator.SaveFormat.JPEG,
      }
    );

    const info = await FileSystem.getInfoAsync(result.uri, { size: true });
    const size = (info as FileSystem.FileInfo & { size: number }).size;

    if (size <= maxSizeBytes) {
      // If current quality produces a file under max size, try higher quality
      minQuality = quality;
      lastResult = result;
      // If we're very close to target size, just return this result
      if (size > maxSizeBytes * 0.9) {
        return result;
      }
    } else {
      // If current quality produces a file over max size, try lower quality
      maxQuality = quality;
      // Still keep track of the result as it might be our best option
      lastResult = result;
    }
  }

  // Return the best result we found
  return lastResult;
}

/**
 * Pick and store images in an array
 * @param setImages 
 * @param images 
 * @param aspect 
 * @returns 
 */
export const pickImage = async (
  setImages: (images: string[]) => void,
  images: string[],
  aspect: [number, number] = [1, 1]
) => {
  try {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "You need to grant access to your photo library to upload a profile picture."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const processedImage = await compressToTargetSize(result.assets[0].uri);
      if (processedImage) {
        setImages([...images, processedImage.uri]);
      } else {
        Alert.alert("Error", "Failed to compress image. Please try again.");
      }
    }
  } catch (error) {
    console.error("Error picking image:", error);
    Alert.alert("Error", "Failed to pick image from gallery");
  }
};


/**
 * convert images to base64 
 * @param image 
 * @returns 
 */
export const imageToBase64 = async (image: string) => {
  const base64 = await fetch(image)
    .then(res => res.blob())
    .then(
      blob =>
        new Promise(resolve => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        })
    );

  return base64;
};

/**
 * upload images to get the url link
 * @param images 
 * @returns 
 */
export const processImages = async (images: string[]) => {
  try {
    return await Promise.all(
      images.map(async uri => {
        const base64 = await imageToBase64(uri);
        if(base64){
            return await uploadFile({base64});
        }
      })
    );
  } catch (error) {
    console.error('Error processing images:', error);
    Alert.alert('Error', 'Failed to process images');
    throw error;
  }

}

