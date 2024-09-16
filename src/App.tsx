import React, { useState } from 'react';
import './App.css';

// Weather veri tipini tanımlayın
interface WeatherData {
    main: {
        temp: number;
    };
    weather: {
        description: string;
        icon: string;
        main: string;
    }[];
    wind: {
        speed: number;
    };
    name: string;
}

function App() {
    const [city, setCity] = useState(''); // Arama alanındaki şehir adı
    const [weather, setWeather] = useState<WeatherData | null>(null); // Hava durumu verisi
    const [error, setError] = useState(''); // Hata mesajı
    const ApiKey = '5db5a191a956b4422cf7673bc5fc48c0';
    const Url = 'https://api.openweathermap.org/data/2.5/weather';

    // Hava durumunu API'den çekmek için fonksiyon
    const fetchWeather = async () => {
        if (city === '') {
            setError('Lütfen bir şehir adı girin');
            return;
        }

        try {
            const response = await fetch(`${Url}?q=${city}&appid=${ApiKey}&units=metric`);
            const data = await response.json();

            if (data.cod === '404') {
                setError('Şehir bulunamadı.');
                setWeather(null); // Önceki sonuçları temizle
            } else {
                setWeather(data);
                setError(''); // Hata mesajını temizle
            }
        } catch (error) {
            console.error('Hata:', error);
            setError('Veri çekme sırasında bir hata oluştu.');
        }
    };

    return (
        <>
            <div className="container">
                <div className="search-area">
                    <input
                        type="text"
                        placeholder="Şehir Adı"
                        value={city}
                        onChange={(e) => setCity(e.target.value)} // Şehir adını güncelle
                    />
                    <button onClick={fetchWeather}>Ara</button>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {weather && (
                    <div className="search-result">
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <h3>{weather.main.temp} °C</h3>
                        <h4>{weather.name}</h4>
                        <h5>{weather.weather[0].main}</h5>
                        <h5>Rüzgar Hızı: {weather.wind.speed} m/s</h5>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
