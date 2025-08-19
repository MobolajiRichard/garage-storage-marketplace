import axios, { AxiosError, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getHeaders = async (tokenName = "accessToken") => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${await AsyncStorage.getItem(tokenName)}`,
});

const API_URL = " http://localhost:5050/api"

export const sendRequest = async (
  body: AxiosRequestConfig<any>
): Promise<any> => {
  const headers = await getHeaders();

  try {
    const response = await axios({
      ...body,
      url: `${API_URL}${body.url}`,
      headers: {
        ...headers,
        ...(body?.headers || {}),
      },
    });

    return response.data;
  } catch (err: any) {
    throw err;
  }
};
