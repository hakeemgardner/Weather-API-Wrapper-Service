# 🌤️ Weather API Wrapper Service

## Overview

The Weather API Wrapper Service is a lightweight Node.js backend application that fetches real-time weather data using an external third-party API (e.g., [Visual Crossing](https://www.visualcrossing.com/weather-api)). To reduce external API calls and improve performance, it uses **Redis** as an in-memory caching layer.

The service stores weather data by **city name** with a cache expiration of **12 hours** (configurable), ensuring fresh data while reducing redundant requests.

---

## 🛠️ Features

- Fetches current weather data from a third-party API.
- Uses Redis to cache responses and minimize API calls.
- Stores cached data using the city name as a key.
- Cache expires automatically after a set time (default: 12 hours).
- Environment variables for flexible configuration.

---

## 🚀 Technologies Used

- **Node.js**
- **Express.js**
- **Redis**
- **Axios** (for HTTP requests)
- **dotenv** (for environment variable management)

---

## 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/weather-api-wrapper.git
   cd weather-api-wrapper
