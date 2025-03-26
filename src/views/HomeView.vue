<script setup>
import Navbar from '@/components/shared/Navbar.vue'
import { useQuery } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import { RouterLink } from 'vue-router'
import serverInstance from '../../utils/api/instance'
import { buildUrl } from '../../utils/helpers'

const { isLoading: weatherLoading, data: weatherData } = useQuery({
  queryKey: ['weather', 'Lagos'],
  queryFn: async () => {
    const currentDay = dayjs().day()

    try {
      const res = await serverInstance.get(
        buildUrl('/v1/forecast', [
          {
            latitude: '6.4550',
            longitude: '3.3841',
            forecast_days: '7',
            daily: 'temperature_2m_max,precipitation_probability_mean',
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
})
</script>

<template>
  <main class="main">
    <Navbar />

    <div class="cover">
      <div class="container page">
        <h1 class="heading-top">Precise weather</h1>
        <h1 class="heading-bottom">precisely for you</h1>

        <RouterLink to="/weather" class="mt-10 d-inline-block bg-white rounded-lg px-6 py-2"
          >Explore weather</RouterLink
        >

        <div class="week-weather">
          <v-progress-circular v-if="weatherLoading" indeterminate color="#fff" size="30" />
          <div v-if="weatherData" class="first">
            <h4 class="day">{{ dayjs(weatherData?.daily.time[0]).format('dddd') }}</h4>
            <div class="day-temp">
              <p class="day-temp--city">Lagos</p>
              <div class="day-temp--temp">
                <p class="day-temp--deg">
                  {{
                    `${weatherData?.daily.temperature_2m_max[0]}${weatherData?.daily_units.temperature_2m_max}`
                  }}
                </p>
                <img src="../assets/icon-1.svg" alt="" width="90" />
              </div>
            </div>
          </div>

          <div
            v-if="weatherData"
            v-for="(temp, idx) in weatherData?.daily.time.slice(1)"
            :key="idx"
            :class="idx % 2 === 0 ? 'even' : 'odd'"
          >
            <h4 class="day">{{ dayjs(temp).format('dddd') }}</h4>
            <div class="day-temp--temp alt-days">
              <img v-if="idx === 0" src="../assets/icon-2.svg" alt="" width="48" />
              <img v-if="idx === 1" src="../assets/icon-3.svg" alt="" width="48" />
              <img v-if="idx === 2" src="../assets/icon-4.svg" alt="" width="48" />
              <img v-if="idx === 3" src="../assets/icon-5.svg" alt="" width="48" />
              <img v-if="idx === 4" src="../assets/icon-6.svg" alt="" width="48" />
              <img v-if="idx === 5" src="../assets/icon-7.svg" alt="" width="48" />
              <p class="day-temp--deg">
                {{
                  `${weatherData?.daily.temperature_2m_max[idx + 1]}${weatherData?.daily_units.temperature_2m_max}`
                }}
              </p>
              <p class="day-temp--hum">
                {{
                  `${weatherData?.daily.precipitation_probability_mean[idx + 1]}${
                    weatherData?.daily_units.precipitation_probability_mean
                  }`
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  background-image: url('../assets/skyscrapers-high-buildings-new-york-downtown-usa.webp');
  background-position: top center;
  min-height: 100dvh;
}

.cover {
  /* height: calc(100dvh - 64px); */
}

.heading-top,
.heading-bottom {
  color: #1d2939;
  font-size: 36px;
  font-weight: 900;
  margin-top: 100px;
  padding: 0;
  line-height: 1;
  text-transform: uppercase;
}

.heading-bottom {
  margin-top: 0;
  font-size: 32px;
  font-weight: 700;
  text-transform: lowercase;
}

.week-weather {
  margin-top: 56px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 20px;
  background: #323544;
}

.first {
  grid-column: 1/3;
}

.day {
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  color: #bfc1c8;
  border-radius: 20px 20px 0 0;
}

.day-temp {
  height: 240px;
  padding: 30px 20px;
}

.day-temp--city {
  font-size: 18px;
  color: #bfc1c8;
  line-height: 1.5;
  font-weight: 400;
}

.day-temp--temp {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-between; */
  /* gap: 30px; */
}

.day-temp--deg {
  font-size: 56px;
  color: #fff;
  line-height: 1.5;
  font-weight: 700;
}

.even {
  background: #262936;
}

.odd .day,
.even .day {
  border-radius: 0;
}

.alt-days {
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  height: 240px;
}

.alt-days .day-temp--deg {
  font-size: 24px;
  margin-top: 20px;
}

.alt-days .day-temp--hum {
  font-size: 18px;
  color: #bfc1c8;
  line-height: 1.5;
  font-weight: 400;
}

@media (min-width: 576px) {
  .week-weather {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .first {
    grid-column: 1/4;
  }
}

@media (min-width: 1024px) {
  .heading-top {
    font-size: 48px;
  }

  .heading-bottom {
    font-size: 40px;
  }

  .week-weather {
    grid-template-columns: 29% 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  .first {
    grid-column: 1/2;
  }

  .odd:nth-child(3) > .day {
    border-radius: 0 20px 20px 0;
  }
}
</style>
