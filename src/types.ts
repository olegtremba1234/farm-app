export interface FieldData {
  id: string; // Унікальний ідентифікатор поля
  name: string; // Назва поля
  area: number; // Площа поля в гектарах
  crop: string; // Культура
  yieldPerHa: number; // Прогноз врожайності на гектар
  fertilizers: string[]; // Масив вибраних добрив
}

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  feelsLike: number;
  temperatureMin: number;
  temperatureMax: number;
  time: number;
}
