import axios from 'axios';

export interface ShiftAPI {
  id: number;
  employeeId: number;
  shiftStatus: number;
  createdAt: Date;
}

const axiosInstance = axios.create({
  //TODO:
  baseURL: 'https://shifttrackerapi.azurewebsites.net/shifts',
});

export async function getAllShifts(): Promise<ShiftAPI[] | undefined> {
  try {
    const { data } = await axiosInstance.get<ShiftAPI[]>(`/`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getShiftsById(userId: number): Promise<ShiftAPI[] | undefined> {
  try {
    const { data } = await axiosInstance.get<ShiftAPI[]>(`/user/${userId}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
