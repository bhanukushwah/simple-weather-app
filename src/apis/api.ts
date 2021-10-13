import { WEATHER_API_KEY } from '../constants/constants'
import { axiosInstance } from '../services/axios'
import { IWeatherInfoProps } from '../types'

/**
 *
 * @param city - name of the city
 * @returns - return weather info of the city
 */

export const getWeatherInfoByCity = async (city: string): Promise<IWeatherInfoProps> => {
  try {
    const response = await axiosInstance.get(`/weather?q=${city}&appid=${WEATHER_API_KEY}`)
    return response.data
  } catch (error) {
    throw new Error('Error while getting weather info!!')
  }
}
