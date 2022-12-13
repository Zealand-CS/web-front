import axios from 'axios';

export interface UserAPI {
  id: number;
  nfcCardId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
}

export interface NewUser {
  lastName: string;
  firstName: string;
  email: string;
  nfcCardId: string;
}

export interface UpdatedUser extends NewUser {
  nfcCardId: string;
}
const axiosInstance = axios.create({
  //TODO:
  baseURL: 'https://shifttrackerapi.azurewebsites.net/users',
});

export async function getAllUsers(): Promise<UserAPI[] | undefined> {
  try {
    const { data } = await axiosInstance.get<UserAPI[]>(`/`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(userId: number): Promise<UserAPI | undefined> {
  try {
    const { data } = await axiosInstance.get<UserAPI>(`/${userId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addUser(user: NewUser): Promise<UserAPI | undefined> {
  try {
    const { data } = await axiosInstance.post<UserAPI>('/', user);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(userId: number, user: UpdatedUser): Promise<UserAPI | undefined> {
  try {
    const { data } = await axiosInstance.put<any>(`/${userId}`, user);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteUser(userId: number): Promise<UserAPI | undefined> {
  try {
    const { data } = await axiosInstance.delete<any>(`/${userId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
