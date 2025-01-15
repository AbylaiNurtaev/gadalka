import React, { useState } from 'react';
import s from './Matrix.module.sass';
import { useNavigate } from 'react-router-dom';

function Matrix() {
  const [activeTab, setActiveTab] = useState('Общая'); // Хранит активную вкладку
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const renderForm = () => {
    switch (activeTab) {
      case 'Общая':
        return (
          <form className={s.form}>
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
              name="dob"
              type="text"
              placeholder="Дата рождения (дд.мм.гг)"
              className={s.input}
              pattern="\d{2}\.\d{2}\.\d{4}"
              required
              onChange={(e) => localStorage.setItem('date', e.target.value)}
            />
            <button
              type="submit"
              className={s.button}
              onClick={() => navigate('/cabinet/new')}
            >
              РАССЧИТАТЬ МАТРИЦУ
            </button>
          </form>
        );
      case 'Совместимость':
        return (
          <form className={s.form}>
            <select name="gender1" className={s.input} required>
              <option value="female">Женский пол</option>
              <option value="male">Мужской пол</option>
            </select>
            <input
              name="dob1"
              type="text"
              onChange={(e) => localStorage.setItem('date1', e.target.value)}
              placeholder="Дата рождения 1 (дд.мм.гг)"
              className={s.input}
              pattern="\d{2}\.\d{2}\.\d{4}"
              required
            />
            <select name="gender2" className={s.input} required>
              <option value="male">Мужской пол</option>
              <option value="female">Женский пол</option>
            </select>
            <input
              name="dob2"
              type="text"
              onChange={(e) => localStorage.setItem('date2', e.target.value)}
              placeholder="Дата рождения 2 (дд.мм.гг)"
              className={s.input}
              pattern="\d{2}\.\d{2}\.\d{4}"
              required
            />
            <button
              type="submit"
              className={s.button}
              onClick={() => navigate('/cabinet/new')}
            >
              РАССЧИТАТЬ СОВМЕСТИМОСТЬ
            </button>
          </form>
        );
      case 'Финансовая':
      case 'Детская':
        return (
          <form className={s.form}>
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
              name="dob"
              type="text"
              placeholder="Дата рождения (дд.мм.гг)"
              className={s.input}
              pattern="\d{2}\.\d{2}\.\d{4}"
              required
            />
            <button
              type="submit"
              className={s.button}
              onClick={() => navigate('/cabinet/new')}
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
                onClick={() => {setActiveTab(tab); localStorage.setItem('tab', tab)}}
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
