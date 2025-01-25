import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios'
function Loading({handleClose}) {
    const navigate = useNavigate()
  const steps = [
    "Анализ ваших данных",
    "Создание личного кабинета",
    "Генерация карты здоровья",
    "Составление полной расшифровки",
  ];

  const [progress, setProgress] = useState(Array(steps.length).fill(0)); // Процент выполнения для каждого шага
  const [isLoadingComplete, setIsLoadingComplete] = useState(false); // Контроль завершения загрузки

  useEffect(() => {
    let currentStep = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (currentStep < steps.length) {
          const updated = [...prev];
          updated[currentStep] = 100; // Устанавливаем 100% для текущего шага
          currentStep++;
          return updated;
        } else {
          clearInterval(interval);
          setIsLoadingComplete(true); // Устанавливаем завершение загрузки
          return prev;
        }
      });
    }, 2000); // 2 секунды на каждый шаг

    return () => clearInterval(interval);
  }, [steps.length]);

  const submition = () => {
    // axios.post()
    navigate('/cabinet/new')
  }

  if (isLoadingComplete) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#4a3b82] bg-opacity-95 z-10">
        <div className="w-[400px] bg-[#4a3b82] rounded-2xl shadow-lg p-6 text-center text-white">
          <button className="absolute top-3 right-4 text-white font-bold text-lg" onClick={handleClose}>×</button>
          <h1 className="text-2xl font-semibold mb-4">Матрица Судьбы готова!</h1>
          <p className="text-sm mb-6">
            Чтобы получить все расшифровки матрицы, укажите ваш email адрес.
          </p>
          <p className="text-lg font-bold mb-4">
            Цена со скидкой: <span className="line-through text-gray-300">889 руб.</span>{' '}
            <span className="text-yellow-400">25 руб.</span>
          </p>
          <input
            type="email"
            placeholder="Введите Email адрес"
            className="w-full p-2 rounded-lg mb-4 text-black"
          />
          <button onClick={() => submition()} className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-semibold">
            ОПЛАТИТЬ 25 РУБЛЕЙ
          </button>
          <div className="text-xs text-left mt-4 text-gray-300">
            <label className="block mb-2">
              <input type="checkbox" className="mr-2" /> Заполняя форму я подтверждаю, что мне исполнилось 18 лет все заполненные мною данные верны, а также соглашаюсь с договором{' '}
              <a href="/оферта.pdf" target="_blank" rel="noopener noreferrer" className="underline">
  публичной оферты
</a>

              , политикой обработки персональных данных, тарифами.
            </label>
            <label>
              <input type="checkbox" className="mr-2" /> Согласен на <a href="/ТАРИФЫ.pdf" target="_blank" rel="noopener noreferrer" className="underline">автоматическую подписку</a> 800 рублей каждые 7 дней по истечению пробного периода в 72 часа.
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#4a3b82] bg-opacity-95 z-10">
      <div className="w-[400px] bg-[#4a3b82] rounded-2xl shadow-lg p-6 text-center text-white">
        <button className="absolute top-3 right-4 text-white font-bold text-lg">×</button>
        <h1 className="text-2xl font-semibold mb-2">Подождите...</h1>
        <p className="text-sm mb-6">
          Мы анализируем Ваши данные и подготавливаем все расчёты матрицы судьбы.
        </p>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">{step}</span>
                <span className="text-sm">{progress[index]}%</span>
              </div>
              <div className="w-full h-2 bg-gray-500 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  style={{ width: `${progress[index]}%`, transition: 'width 2s ease' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Loading;