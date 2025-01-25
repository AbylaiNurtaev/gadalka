import React, { useState } from 'react';
import s from './Matrix.module.sass';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios'
function Matrix({openPopup}) {
  const [activeTab, setActiveTab] = useState('Общая'); 
  const navigate = useNavigate();

  const isValidDate = (dateString) => {
    const [day, month, year] = dateString.split('.').map(Number);
    const date = new Date(year, month - 1, day);
    const minDate = new Date(1900, 0, 1); 
    const maxDate = new Date(); 

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date >= minDate &&
      date <= maxDate
    );
  };

  const handleDateInput = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Убираем все нецифровые символы
    if (value.length > 2) value = value.slice(0, 2) + '.' + value.slice(2); // Добавляем первую точку
    if (value.length > 5) value = value.slice(0, 5) + '.' + value.slice(5); // Добавляем вторую точку
    if (value.length > 10) value = value.slice(0, 10); // Ограничиваем длину
    e.target.value = value;
  };

  const handleDateValidation = (e) => {
    const value = e.target.value;
    if (value.length === 10 && !isValidDate(value)) {
      alert('Введите корректную дату между 01.01.1900 и сегодняшним днём!');
      e.target.value = '';
    } else {
      localStorage.setItem(e.target.name, value);
    }
  };

  const handleFormSubmit = (e) => {
    const id = localStorage.getItem('id')
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    if(id){

      axios.post(`/updateDate/${id}`, {
        tab: activeTab
      })
      .then(response => {
        if(response.data){
          console.log("result saved")
        }
      })
      openPopup(); // Вызов функции для открытия попапа
    }else{
      navigate('/profile')
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'Общая':
        return (
          <form className={s.form} onSubmit={handleFormSubmit}>
            <select name="gender" className={s.input} required>
              <option value="female">Женский пол</option>
              <option value="male">Мужской пол</option>
            </select>
            <input
              name="name"
              type="text"
              placeholder="Укажите имя"
              className={s.input}
              required
              onChange={(e) => localStorage.setItem('name', e.target.value)}
            />
            <input
              name="date"
              type="text"
              placeholder="Дата рождения (дд.мм.гггг)"
              className={s.input}
              pattern="\d{2}\.\d{2}\.\d{4}"
              required
              onInput={handleDateInput}
              onBlur={handleDateValidation}
            />
            <button
              type="submit"
              className={s.button}
            >
              РАССЧИТАТЬ МАТРИЦУ
            </button>
          </form>
        );
      case 'Совместимость':
        return (
          <form className={s.form} onSubmit={handleFormSubmit}>
            <select name="gender1" className={s.input} required>
              <option value="female">Женский пол</option>
              <option value="male">Мужской пол</option>
            </select>
            <input
              name="date1"
              type="text"
              placeholder="Дата рождения 1 (дд.мм.гггг)"
              className={s.input}
              pattern="\d{2}\.\d{2}\.\d{4}"
              required
              onInput={handleDateInput}
              onBlur={handleDateValidation}
            />
            <select name="gender2" className={s.input} required>
              <option value="male">Мужской пол</option>
              <option value="female">Женский пол</option>
            </select>
            <input
              name="date2"
              type="text"
              placeholder="Дата рождения 2 (дд.мм.гггг)"
              className={s.input}
              pattern="\d{2}\.\d{2}\.\d{4}"
              required
              onInput={handleDateInput}
              onBlur={handleDateValidation}
            />
            <button
              type="submit"
              className={s.button}
              // onClick={openPopup}
            >
              РАССЧИТАТЬ СОВМЕСТИМОСТЬ
            </button>
          </form>
        );
      case 'Финансовая':
      case 'Детская':
        return (
          <form className={s.form} onSubmit={handleFormSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Укажите имя"
              className={s.input}
              required
              onChange={(e) => localStorage.setItem('name', e.target.value)}
            />
            <select name="gender" className={s.input} required>
              <option value="female">Женский пол</option>
              <option value="male">Мужской пол</option>
            </select>
            <input
              name="date"
              type="text"
              placeholder="Дата рождения (дд.мм.гггг)"
              className={s.input}
              pattern="\d{2}\.\d{2}\.\d{4}"
              required
              onInput={handleDateInput}
              onBlur={handleDateValidation}
            />
            <button
              type="submit"
              className={s.button}
              // onClick={openPopup}
            >
              РАССЧИТАТЬ
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className={s.container}>
      <div className={s.tabs}>
        {['Общая', 'Совместимость', 'Финансовая', 'Детская'].map((tab) => (
          <button
            key={tab}
            className={`${s.tab} ${activeTab === tab ? s.active : ''}`}
            onClick={() => {
              setActiveTab(tab);
              localStorage.setItem('tab', tab);
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      {renderForm()}
    </div>
  );
}

export default Matrix;
