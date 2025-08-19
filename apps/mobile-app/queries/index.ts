import axios, {  AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINTS } from "./endpoints";
import { RegistrationInput } from "@/components/auth/RegistrationForm";
import { LoginInput } from "@/components/auth/LogInForm";


/**
 * Function to get the correct auth header with the right token
 * @param tokenName this refers to the name of the key used to store the token
 * @returns a correct header with the token
 */
const getHeaders = async (tokenName = "accessToken") => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${await AsyncStorage.getItem(tokenName)}`,
});

const API_URL = "http://localhost:5050/api/v1"

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


//AUTH
export async function checkEmail(email:string) {
  return sendRequest({
    url: API_ENDPOINTS.AUTH.CHECK_EMAIL,
    method: 'POST',
    data:{email},
  });
}

export async function registerUser(data:RegistrationInput) {
  return sendRequest({
    url: API_ENDPOINTS.AUTH.SIGNUP,
    method: 'POST',
    data,
  });
}

export async function loginUser(data:LoginInput) {
  return sendRequest({
    url: API_ENDPOINTS.AUTH.LOGIN,
    method: 'POST',
    data,
  });
}

//USER
export async function getUser() {
  return sendRequest({
    url: API_ENDPOINTS.USER.ME,
    method: 'GET'
  });
}