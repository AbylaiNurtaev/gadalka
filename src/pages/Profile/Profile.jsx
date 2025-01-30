import React, { useState } from 'react';
import axios from '../../axios';
import s from './Profile.module.sass'
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [isLogin, setIsLogin] = useState(true); // Флаг для переключения между логином и регистрацией
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [emailForReset, setEmailForReset] = useState(''); // Храним email для сброса пароля
  const [isResetPassword, setIsResetPassword] = useState(false); // Флаг для переключения на форму сброса пароля

  // Обработка переключения между формами
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' }); // Очистить поля
    setIsResetPassword(false); // Возвращаемся к стандартным формам
  };

  const resetPassword = async () => {
    try {
      console.log(formData.email)
      const response = await axios.post('/resetPassword', { email: emailForReset });
      alert(response.data.message);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      alert('Произошла ошибка при восстановлении пароля');
    }
  };
  
  // Обновление полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Функция логина
  const login = async (e) => {
    e.preventDefault(); // Предотвращает перезагрузку страницы
    try {
      const { email, password } = formData;
      const response = await axios.post('/login', { email, password });
      console.log('Login Success:', response.data);
      localStorage.setItem('id', response?.data?._id)
      navigate('/cabinet/old')
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
    }
  };

  // Функция регистрации
  const register = async (e) => {
    e.preventDefault(); // Предотвращает перезагрузку страницы
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    try {
      const { email, password, name } = formData;
      const response = await axios.post('/register', { email, password, name });
      console.log('Register Success:', response.data);
      localStorage.setItem('id', response.data._id)
      toggleForm();
      navigate('/')
    } catch (error) {
      console.error('Register Error:', error.response?.data || error.message);
      alert("Пользователь с таким email уже существует")
    }
  };

  // Функция для сброса пароля
  const sendPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/res/${emailForReset}`);
      console.log('Password reset request sent:', response.data);
      alert('Инструкции по сбросу пароля отправлены на вашу почту!');
      setIsResetPassword(false); // Возвращаемся на форму логина
    } catch (error) {
      console.error('Password reset error:', error.response?.data || error.message);
      alert('Ошибка при отправке инструкций');
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-[100%] h-screen"
      style={{
        background: 'linear-gradient(90deg, rgba(182, 50, 217, 0.2) 0.11%, rgba(84, 116, 255, 0.1) 100%)',
      }}
    >
      <div className={`w-[500px] bg-white rounded-[30px] p-8 shadow-lg ${s.block}`}>
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Войти в аккаунт' : 'Регистрация'}
        </h2>

        {/* Форма для сброса пароля */}
        {isResetPassword ? (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="emailForReset">
                Введите ваш email для сброса пароля
              </label>
              <input
                id="emailForReset"
                name="emailForReset"
                type="email"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                placeholder="Введите email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              onClick={resetPassword}
            >
              Отправить инструкции
            </button>
          </div>
        ) : (
          <form onSubmit={isLogin ? login : register}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Имя пользователя
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Введите имя пользователя"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Введите ваш email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Введите пароль"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                  Подтвердите пароль
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Подтвердите пароль"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
        )}

        {isLogin && (
          <p className="text-center text-sm mt-4">
            Забыли пароль?
            <button
              onClick={() => setIsResetPassword(true)}
              className="text-blue-500 underline ml-1 focus:outline-none"
            >
              Восстановить
            </button>
          </p>
        )}

        <p className="text-center text-sm mt-4">
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <button
            onClick={toggleForm}
            className="text-blue-500 underline ml-1 focus:outline-none"
          >
            {isLogin ? 'Зарегистрируйтесь' : 'Войдите'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Profile;
