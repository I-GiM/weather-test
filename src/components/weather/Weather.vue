<script setup>
import { useQuery } from '@tanstack/vue-query'
import { supabase } from '../../../utils/supabase'
import Dropdown from '../shared/Dropdown.vue'
import Button from '../shared/Button.vue'
import serverInstance from '../../../utils/api/instance'
import { buildUrl } from '../../../utils/helpers'
import { ref, watch, watchEffect } from 'vue'
import dayjs from 'dayjs'
import ExtraWeatherData from './ExtraWeatherData.vue'
import IconHumidity from '../icons/IconHumidity.vue'
import IconWind from '../icons/IconWind.vue'
import IconRain from '../icons/IconRain.vue'
import IconAtmPressure from '../icons/IconAtmPressure.vue'
import IconDay from '../icons/IconDay.vue'
import IconNight from '../icons/IconNight.vue'

const weatherDetails = ref({
  id: 1,
  city: 'Lagos',
  lat: '6.4550',
  long: '3.3841',
  date: { id: 0, day: dayjs().format('dddd, D MMM, YYYY') },
})

const cityList = [
  {
    id: 1,
    city: 'Lagos',
    lat: '6.4550',
    long: '3.3841',
  },
  {
    id: 2,
    city: 'Abuja',
    lat: '9.0667',
    long: '7.4833',
  },
  {
    id: 3,
    city: 'Awka',
    lat: '6.2069',
    long: '7.0678',
  },
  {
    id: 4,
    city: 'Ibadan',
    lat: '7.3964',
    long: '3.9167',
  },
  {
    id: 5,
    city: 'Minna',
    lat: '9.6139',
    long: '6.5569',
  },
  {
    id: 6,
    city: 'Onitsha',
    lat: '6.1667',
    long: '6.7833',
  },
  {
    id: 7,
    city: 'Port Harcourt',
    lat: '4.8242',
    long: '7.0336',
  },
  {
    id: 8,
    city: 'Sokoto',
    lat: '13.0622',
    long: '5.2339',
  },
  {
    id: 9,
    city: 'Kumbotso',
    lat: '11.8900',
    long: '8.5030',
  },
  {
    id: 10,
    city: 'Suleja',
    lat: '9.1806',
    long: '7.1794',
  },
]

// const { isPending, isFetching, isError, data, error } = useQuery({
//   queryKey: ['user'],
//   queryFn: async () => {
//     try {
//       const user = await supabase.auth.getUser()

//       return user
//     } catch (error) {
//       throw error
//     }
//   },
//   refetchOnWindowFocus: false,
//   refetchOnMount: false,
//   staleTime: Infinity,
// })

const { isLoading: weatherLoading, data: weatherData } = useQuery({
  queryKey: ['weather', weatherDetails],
  queryFn: async () => {
    try {
      const res = await serverInstance.get(
        buildUrl('/v1/forecast', [
          {
            latitude: weatherDetails.value.lat,
            longitude: weatherDetails.value.long,
            current:
              'temperature_2m,wind_speed_10m,relative_humidity_2m,rain,pressure_msl,visibility,is_day,cloud_cover',
            hourly:
              'temperature_2m,wind_speed_10m,relative_humidity_2m,rain,pressure_msl,visibility',
            start_hour: (() => {
              if (dayjs().format('dddd, D MMM, YYYY') === weatherDetails.value.date.day) {
                return dayjs().format(`YYYY-MM-DDT${dayjs().hour().toString().padStart(2, '0')}:00`)
              }

              return dayjs(weatherDetails.value.date.day).format(`YYYY-MM-DDT06:00`)
            })(),
            end_hour: (() => {
              if (dayjs().format('dddd, D MMM, YYYY') === weatherDetails.value.date.day) {
                return dayjs().format(
                  `YYYY-MM-DDT${(dayjs().hour() + 4).toString().padStart(2, '0')}:00`,
                )
              }

              return dayjs(weatherDetails.value.date.day).format(`YYYY-MM-DDT10:00`)
            })(),
          },
        ]),
      )

      return res.data
    } catch (error) {
      throw error
    }
  },
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  staleTime: Infinity,
  gcTime: Infinity,
  enabled: !!weatherDetails.value.lat && !!weatherDetails.value.long,
})

const handleDayChange = (idx) => {
  weatherDetails.value.date = { id: idx, day: dayjs().add(idx, 'day').format('dddd, D MMM, YYYY') }
}
</script>

<template>
  <section class="section">
    <v-container class="section-container">
      <v-container class="d-flex flex-column gap-4 ps-0">
        <v-row>
          <div class="d-flex flex-column justify-space-between w-50">
            <v-card width="300px" color="transparent" variant="flat">
              <v-menu transition="scale-transition">
                <template v-slot:activator="{ props }">
                  <v-btn color="transparent" class="dropdown-bt pa-0" v-bind="props">
                    <svg
                      width="30"
                      height="31"
                      viewBox="0 0 30 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 2.32074C10.0307 2.32074 6 6.23949 6 11.0707C6 17.6332 15 27.3207 15 27.3207C15 27.3207 24 17.6332 24 11.0707C24 6.23949 19.9693 2.32074 15 2.32074ZM15 14.1957C13.2257 14.1957 11.7857 12.7957 11.7857 11.0707C11.7857 9.34574 13.2257 7.94574 15 7.94574C16.7743 7.94574 18.2143 9.34574 18.2143 11.0707C18.2143 12.7957 16.7743 14.1957 15 14.1957Z"
                        fill="white"
                      />
                    </svg>

                    <span class="text-h5 font-weight-medium">{{ weatherDetails.city }}</span>

                    <svg
                      width="30"
                      height="31"
                      viewBox="0 0 30 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.5 28.3207L17.5 18.8207L8.5 9.32074"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </v-btn>
                </template>

                <v-list bg-color="#212121">
                  <v-list-item
                    v-for="item in cityList"
                    :key="item.id"
                    @click="
                      () => {
                        weatherDetails.id = item.id
                        weatherDetails.city = item.city
                        weatherDetails.lat = item.lat
                        weatherDetails.long = item.long
                      }
                    "
                  >
                    <v-list-item-title>{{ item.city }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-card-text
                v-if="weatherData?.current.cloud_cover <= 25"
                class="weather-condition pa-0"
                >Clear Sky</v-card-text
              >
              <v-card-text
                v-if="
                  weatherData?.current.cloud_cover > 25 && weatherData?.current.cloud_cover <= 50
                "
                class="weather-condition pa-0"
                >Partly Cloudy</v-card-text
              >
              <v-card-text
                v-if="
                  weatherData?.current.cloud_cover > 50 && weatherData?.current.cloud_cover <= 80
                "
                class="weather-condition pa-0"
                >Mostly Cloudy</v-card-text
              >
              <v-card-text
                v-if="weatherData?.current.cloud_cover > 80"
                class="weather-condition pa-0"
                >Overcast</v-card-text
              >
            </v-card>

            <v-card width="300px" class="pa-0 transparent" variant="flat" color="transparent">
              <v-progress-circular v-if="weatherLoading" indeterminate color="#fff" size="30" />
              <v-card-text v-if="weatherData" class="weather-temp pa-0">{{
                `${weatherData?.current.temperature_2m}${weatherData?.current_units.temperature_2m}`
              }}</v-card-text>
              <v-card-text class="weather-date"> {{ weatherDetails.date.day }} </v-card-text>
            </v-card>
          </div>

          <v-col style="padding-top: 0; padding-bottom: 0" class="pa-0 day-night-icon-contain">
            <span v-if="weatherData?.current.is_day === 1" class="weather-icon">
              <IconDay />
            </span>
            <span v-if="weatherData?.current.is_day === 0" class="weather-icon">
              <IconNight />
            </span>
          </v-col>
        </v-row>

        <v-row class="mt-10" justify="space-between">
          <v-col cols="12" class="pa-0">
            <div class="d-flex align-items-center ga-2">
              <button
                v-for="(day, idx) in ['Today', 'Tomorrow', 'Next 2 days']"
                :key="idx"
                type="button"
                class="day-btn"
                @click="handleDayChange(idx)"
              >
                <p>{{ day }}</p>
                <span v-if="weatherDetails.date.id === idx" class="dot"></span>
              </button>
            </div>

            <div class="d-flex align-center ga-2 mt-6">
              <div v-if="weatherLoading" style="height: 100px">
                <v-progress-circular v-if="weatherLoading" indeterminate color="#fff" size="30" />
              </div>
              <v-card
                v-if="weatherData"
                v-for="(data, i) in weatherData?.hourly.time"
                class="future-weather-card"
              >
                <div :key="i" class="d-flex flex-column ga-2">
                  <span class="future-time">{{ dayjs(data).format('ha') }}</span>
                  <span class="future-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6517 7.3334C11.6566 7.33333 11.6616 7.33333 11.6666 7.33333C13.3235 7.33333 14.6666 8.67647 14.6666 10.3333C14.6666 11.9902 13.3235 13.3333 11.6666 13.3333H4.66659C2.82564 13.3333 1.33325 11.8409 1.33325 10C1.33325 8.26687 2.65591 6.84273 4.34687 6.6818M11.6517 7.3334C11.6615 7.2236 11.6666 7.1124 11.6666 7C11.6666 4.97495 10.025 3.33333 7.99992 3.33333C6.08208 3.33333 4.50814 4.80575 4.34687 6.6818M11.6517 7.3334C11.5835 8.08967 11.2857 8.77973 10.8285 9.33333M4.34687 6.6818C4.45209 6.6718 4.55874 6.66667 4.66659 6.66667C5.41713 6.66667 6.10974 6.91473 6.66692 7.33333"
                        stroke="white"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.99992 3.76979C5.53693 3.10301 4.76717 2.66667 3.89584 2.66667C2.48056 2.66667 1.33325 3.81783 1.33325 5.23786C1.33325 6.10236 1.75847 6.8672 2.41051 7.33333"
                        stroke="white"
                      />
                    </svg>
                  </span>
                </div>

                <span class="future-deg">{{
                  `${weatherData?.hourly.temperature_2m[i]}${weatherData?.hourly_units.temperature_2m}`
                }}</span>
              </v-card>
            </div>
          </v-col>
        </v-row>

        <v-row class="mt-10" justify="space-between">
          <v-col cols="12" class="ps-6 pt-2 temp-conditions">
            <div v-if="weatherLoading" style="height: 100px">
              <v-progress-circular v-if="weatherLoading" indeterminate color="#fff" size="30" />
            </div>

            <template v-if="weatherData">
              <ExtraWeatherData
                :weather-data="`${weatherData?.current.wind_speed_10m}${weatherData?.current_units.wind_speed_10m}`"
                weather-name="Wind"
              >
                <template #icon>
                  <IconWind />
                </template>
              </ExtraWeatherData>

              <ExtraWeatherData
                :weather-data="`${weatherData?.current.relative_humidity_2m}${weatherData?.current_units.relative_humidity_2m}`"
                weather-name="Humidity"
              >
                <template #icon>
                  <IconHumidity />
                </template>
              </ExtraWeatherData>

              <ExtraWeatherData
                :weather-data="`${weatherData?.current.rain}${weatherData?.current_units.rain}`"
                weather-name="Rain"
              >
                <template #icon>
                  <IconRain />
                </template>
              </ExtraWeatherData>
              <ExtraWeatherData
                :weather-data="`${weatherData?.current.pressure_msl}${weatherData?.current_units.pressure_msl}`"
                weather-name="Pressure"
              >
                <template #icon>
                  <IconAtmPressure />
                </template>
              </ExtraWeatherData>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </section>
</template>

<style lang="css" scoped>
.section {
  width: 100%;
}

.section-container {
  max-width: inherit;
}

.day-night-icon-contain {
  min-height: 240px;
}

.weather-icon {
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
  width: 230px;
  height: 240px;
}

.weather-condition {
  font-size: 2rem;
  line-height: 35px;
  font-weight: medium;
}

.weather-temp {
  font-size: 3rem;
  line-height: 1;
  font-weight: medium;
}

.weather-date {
  font-size: 1.25rem;
  line-height: 1;
  font-weight: medium;
  padding: 0;
}

.day-btn {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.dot {
  min-width: 5px;
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 100%;
}

.future-weather-card {
  width: 78px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  justify-content: center;
  padding: 0 24px;
  text-align: center;
  border-radius: 16px;
  background-color: #8a8d934d;
}

.future-time {
  font-size: 10px;
  font-weight: medium;
  line-height: 12px;
  color: white;
}

.future-deg {
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
  color: white;
}

.temp-conditions {
  background-color: #8a8d934d;
  height: 100px;
  border-radius: 16px;
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .section {
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>
