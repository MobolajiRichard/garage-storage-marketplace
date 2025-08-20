import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINTS } from "./endpoints";
import { RegistrationInput } from "@/components/auth/RegistrationForm";
import { LoginInput } from "@/components/auth/LogInForm";
import { Booking, Review, SpaceProps, UserProps } from "@/types";

/**
 * Function to get the correct auth header with the right token
 * @param tokenName this refers to the name of the key used to store the token
 * @returns a correct header with the token
 */
const getHeaders = async (tokenName = "accessToken") => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${await AsyncStorage.getItem(tokenName)}`,
});

//The BE has been deployed and it is available at this URL, if you wish to use the local please update to
// http://localhost:5050/api/v1
const API_URL = "https://garage-storage-marketplace-be-production.up.railway.app/api/v1";
// const API_URL = "http://localhost:5050/api/v1";

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
export async function checkEmail(email: string) {
  return sendRequest({
    url: API_ENDPOINTS.AUTH.CHECK_EMAIL,
    method: "POST",
    data: { email },
  });
}

export async function registerUser(data: RegistrationInput) {
  return sendRequest({
    url: API_ENDPOINTS.AUTH.SIGNUP,
    method: "POST",
    data,
  });
}

export async function loginUser(data: LoginInput) {
  return sendRequest({
    url: API_ENDPOINTS.AUTH.LOGIN,
    method: "POST",
    data,
  });
}

export async function changePassword(data: {
  oldPassword: string;
  newPassword: string;
}) {
  return sendRequest({
    url: API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
    method: "POST",
    data
  });
}

//USER
export async function getUser(): Promise<UserProps> {
  return sendRequest({
    url: API_ENDPOINTS.USER.ME,
    method: "GET",
  });
}

export async function updateUserInformation(data: {
  name?: string;
  profileImage?: string;
  phoneNumber?: string;
}): Promise<UserProps> {
  return sendRequest({
    url: API_ENDPOINTS.USER.ME,
    method: "PATCH",
    data,
  });
}

export async function deleteAccount() {
  return sendRequest({
    url: API_ENDPOINTS.USER.BASE,
    method: "DELETE",
  });
}


//FILE
export async function uploadFile(data: unknown): Promise<string> {
  return sendRequest({
    url: API_ENDPOINTS.FILE.UPLOAD,
    method: "POST",
    data,
  });
}

//SPACES
export async function createSpace(data: unknown): Promise<string> {
  return sendRequest({
    url: API_ENDPOINTS.SPACE.CREATE,
    method: "POST",
    data,
  });
}

export async function fetchMySpaces(): Promise<SpaceProps[]> {
  return sendRequest({
    url: API_ENDPOINTS.SPACE.ME,
    method: "GET",
  });
}

export async function fetchSpace(id: string): Promise<SpaceProps> {
  return sendRequest({
    url: API_ENDPOINTS.SPACE.CREATE + `/${id}`,
    method: "GET",
  });
}

export async function leaveSpaceReview(data: Review) {
  return sendRequest({
    url: API_ENDPOINTS.SPACE.REVIEW.replace(":id", data.spaceId),
    method: "POST",
    data,
  });
}

export async function bookSpace(data: Booking) {
  return sendRequest({
    url: API_ENDPOINTS.SPACE.BOOK.replace(":id", data.spaceId),
    method: "POST",
    data,
  });
}

export async function allSpaces(params: {
  category?: string[];
  country?: string;
  city?: string;
  minPrice?: string;
  maxPrice?: string;
  minRating?: string;
}): Promise<SpaceProps[]> {
  return sendRequest({
    url: API_ENDPOINTS.SPACE.CREATE,
    method: "GET",
    params,
    paramsSerializer: {
      // ensures arrays are sent as ?category=food&category=drinks
      serialize: (p) =>
        new URLSearchParams(p as Record<string, string>).toString(),
    },
  });
}

export async function deleteSpace(id: string) {
  return sendRequest({
    url: API_ENDPOINTS.SPACE.CREATE + `/${id}`,
    method: "DELETE",
  });
}

//BOOKINGS
export async function fetchMyBookings(): Promise<Booking[]> {
  return sendRequest({
    url: API_ENDPOINTS.BOOKINGS.ME,
    method: "GET",
  });
}

export async function cancelBooking(id: string) {
  return sendRequest({
    url: API_ENDPOINTS.BOOKINGS.BASE + `/${id}`,
    method: "DELETE",
  });
}

//NOTIFICATIONS
export async function getMyNotifications(): Promise<Booking[]> {
  return sendRequest({
    url: API_ENDPOINTS.NOTIFICATIONS.ME,
    method: "GET",
  });
}
