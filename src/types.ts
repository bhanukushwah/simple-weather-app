export interface ISelectedCityProps {
  name: string
  isFavourite: boolean
}

export interface ICityProps {
  name: string
  isSelected: boolean
}

export interface IWeatherStateProps {
  cities: any[]
  selectedCities: ISelectedCityProps[]
  selectedCity: ISelectedCityProps
}

export interface IWeatherInfoProps {
  name: string
  main: {
    temp: number
    pressure: number
    humidity: number
  }
}
