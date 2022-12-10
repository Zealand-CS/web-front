import axios from 'axios';

export interface UserAPI {
  id: number;
  nfcCardId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
}

const axiosInstance = axios.create({
  //TODO:
  baseURL: 'https://shifttrackerapi.azurewebsites.net',
});

export const mock: UserAPI[] = [
  {
    id: 1,
    nfcCardId: '4548664',
    firstName: 'Adam',
    lastName: 'Cipkala',
    email: 'adamcipkala@gmail.com',
    role: 1,
  },
  {
    id: 2,
    nfcCardId: '4548664',
    firstName: 'Jozo',
    lastName: 'Bob',
    email: 'Jozo@gmail.com',
    role: 1,
  },
  {
    id: 3,
    nfcCardId: '4548664',
    firstName: 'Martin',
    lastName: 'Simon',
    email: 'Martin@gmail.com',
    role: 1,
  },
  {
    id: 4,
    nfcCardId: '4548664',
    firstName: 'Mo',
    lastName: 'Mo',
    email: 'momo@gmail.com',
    role: 1,
  },
];

export async function getAllUsers(): Promise<UserAPI[] | undefined> {
  try {
    const { data } = await axiosInstance.get<UserAPI[]>(`/users`);
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

export async function updateUser(userId: number, user: UserAPI): Promise<UserAPI | undefined> {
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
