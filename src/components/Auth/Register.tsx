import React, { useState, useEffect, useRef } from 'react';
import axiosInstance from '@/libs/axios';
import { faker } from '@faker-js/faker';

declare global {
  interface Window {
    turnstile: {
      render: (
        element: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void },
      ) => void;
    };
  }
}

const Register: React.FC = () => {
  const [login, setLogin] = useState(faker.internet.userName());
  const [surname, setSurname] = useState(faker.name.lastName());
  const [name, setName] = useState(faker.name.firstName());
  const [patronymic, setPatronymic] = useState(faker.name.middleName());
  const [email, setEmail] = useState(faker.internet.email());
  const [phone, setPhone] = useState(faker.phone.number());
  const [country, setCountry] = useState(faker.address.country());
  const [postalCode, setPostalCode] = useState(faker.address.zipCode());
  const [region, setRegion] = useState(faker.address.state());
  const [city, setCity] = useState(faker.address.city());
  const [street, setStreet] = useState(faker.address.streetAddress());
  const [building, setBuilding] = useState(faker.address.buildingNumber());
  const [block, setBlock] = useState(faker.address.secondaryAddress());
  const [apartment, setApartment] = useState(faker.address.secondaryAddress());
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [message, setMessage] = useState('');
  const turnstileRef = useRef<HTMLDivElement | null>(null);

  const resetForm = () => {
    setLogin('');
    setSurname('');
    setName('');
    setPatronymic('');
    setEmail('');
    setPhone('');
    setCountry('');
    setPostalCode('');
    setRegion('');
    setCity('');
    setStreet('');
    setBuilding('');
    setBlock('');
    setApartment('');
    setCaptchaToken(null);
    setTermsChecked(false);
  };

  useEffect(() => {
    if (turnstileRef.current) {
      const renderCaptcha = () => {
        if (window.turnstile) {
          window.turnstile.render(turnstileRef.current!, {
            sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
            callback: (token: string) => setCaptchaToken(token),
          });
        }
      };

      if (!window.turnstile) {
        const script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.onload = renderCaptcha;
        document.body.appendChild(script);
      } else {
        renderCaptcha();
      }
    }
  }, [turnstileRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/custom/v1/register', {
        username: login,
        email,
        password: faker.internet.password(),
        middleName: patronymic,
        firstName: name,
        lastName: surname,
        phone,
        building,
        country,
        zipCode: postalCode,
        region,
        city,
        street,
        house: building,
        apartment,
        captchaToken,
      });

      if (response.data.code === 200) {
        setMessage(`Registration successful! User ID: ${response.data.id}`);
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <section id="Register" className="mt-3">
      <div className="container p-0 md:p-4">
        <div className="bg-main-background md:rounded-3xl">
          <div className="flex items-center justify-center gap-5 pt-10 mb-6">
            <span className="inline-block transform rotate-45 border-4 border-solid border-main-dark-violet w-2 h-2" />
            <h2 className="inline-block text-center text-3xl font-bold text-main-dark-violet">
              Регистрация
            </h2>
            <span className="inline-block transform -rotate-45 border-4 border-solid border-main-dark-violet w-2 h-2" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:gap-10 px-4 sm:px-10">
              <div className="w-full md:w-1/2 ">
                <div className="mb-3">
                  <label
                    htmlFor="login-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Логин
                  </label>
                  <input
                    id="login-input"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="surname-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Фамилия
                  </label>
                  <input
                    id="surname-input"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="name-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Имя
                  </label>
                  <input
                    id="name-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="patronymic-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Отчество
                  </label>
                  <input
                    id="patronymic-input"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Email
                  </label>
                  <input
                    id="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="phone-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Телефон
                  </label>
                  <input
                    id="phone-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="  +7..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="mb-3">
                  <label
                    htmlFor="country-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Страна
                  </label>
                  <input
                    id="country-input"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="postal-code-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Индекс
                  </label>
                  <input
                    id="postal-code-input"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="region-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Регион
                  </label>
                  <input
                    id="region-input"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="city-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Город/населенный пункт
                  </label>
                  <input
                    id="city-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="street-input"
                    className="block mb-2 text-sm font-medium text-main-text"
                  >
                    Улица
                  </label>
                  <input
                    id="street-input"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    type="text"
                    placeholder=" ..."
                    className="block p-2 text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet w-full"
                  />
                </div>
                <div className="flex justify-between mb-2 gap-3">
                  <div>
                    <label
                      htmlFor="building-input"
                      className="block mb-2 text-sm font-medium text-main-text"
                    >
                      Дом
                    </label>
                    <input
                      id="building-input"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                      type="text"
                      placeholder=" ..."
                      className="block p-2 w-full text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="block-input"
                      className="block mb-2 text-sm font-medium text-main-text"
                    >
                      Корпус
                    </label>
                    <input
                      id="block-input"
                      value={block}
                      onChange={(e) => setBlock(e.target.value)}
                      type="text"
                      placeholder=" ..."
                      className="block p-2 w-full text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="apartment-input"
                      className="block mb-2 text-sm font-medium text-main-text"
                    >
                      Квартира
                    </label>
                    <input
                      id="apartment-input"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      type="text"
                      placeholder=" ..."
                      className="block p-2 w-full text-gray-900 border border-main-light-violet rounded-2xl bg-white text-xs focus:outline-none focus:ring focus:ring-main-light-violet"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row md:gap-10 px-4 sm:px-10 pb-10 md:pb-0">
              <div className="w-full md:w-1/2 text text-center md:text-left">
                <div className="flex justify-center md:justify-start">
                  <button
                    type="button"
                    className="text-main-orange text-sm font-medium1 underline"
                    onClick={resetForm}
                  >
                    Очистить форму
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-x-5 mb-6">
                  <div
                    ref={turnstileRef}
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                  />
                </div>
                <div className="flex items-center mb-5">
                  <input
                    id="terms-checkbox"
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-gray-900 border-main-light-violet accent-main-dark-violet"
                  />
                  <label
                    htmlFor="terms-checkbox"
                    className="ms-2 text-xs font-medium text-main-text"
                  >
                    Я принимаю условия использования <br />и политику
                    конфиденциальности
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 w-full md:w-1/2 rounded-full uppercase text-xs mb-12"
                >
                  Регистрация
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
