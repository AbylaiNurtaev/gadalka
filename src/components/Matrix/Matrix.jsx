import React, { useState } from 'react';
import s from './Matrix.module.sass';
import { useNavigate } from 'react-router-dom';

function Matrix() {
  const [results, setResults] = useState(null);
  const navigate = useNavigate()

function calculateMatrix(dob) {
  const [day, month, year] = dob.split('.').map(Number);

  const A = day;
  const B = month;
  const C = year.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
  const D = A + B + C;
  const E = A + B + C + D;
  const J = A + E;
  const K = B + E;
  const L = C + E;
  const M = D + E;
  const O = A + J;
  const P = B + K;
  const Q = L + C;
  const N = M + D;
  const S = J + E;
  const T = K + E;
  const F = A + B;
  const G = B + C;
  const H = C + D;
  const I = D + A;

  const L2 = F + G + H + I;
  const L1 = E + L2;
  const F2 = F + L2;
  const G2 = G + L2;
  const H2 = H + L2;
  const I2 = I + L2;

  const F1 = F + F2;
  const G1 = G + G2;
  const H1 = H + H2;
  const I1 = I + I2;

  const R = M + L;
  const R1 = R + M;
  const R2 = R + L;

  return { A, B, C, D, E, J, K, L, M, O, P, Q, N, S, T, F, G, H, I, L1, L2, F1, F2, G1, G2, H1, H2, I1, I2, R, R1, R2 };
}


  // Обработка формы
  const handleSubmit = (e) => {
    const id = localStorage.getItem('id')

    if(id){
      e.preventDefault();
      const data = new FormData(e.target);
      const name = data.get('name');
      const dateOfBirth = data.get('dob');
      const gender = data.get('gender');
  
      const calculatedResults = calculateMatrix(name, dateOfBirth, gender);
      setResults(calculatedResults);
    }else{
      navigate('/profile')
    }
  };

  return (
    <div className={s.container}>
      {!results ? (
        <>
          <div className={s.tabs}>
            <button className={`${s.tab} ${s.active}`}>Общая</button>
            <button className={s.tab}>Совместимость</button>
            <button className={s.tab}>Финансовая</button>
            <button className={s.tab}>Детская</button>
          </div>
          <form className={s.form} onSubmit={handleSubmit}>
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
            />
            <input
              name="dob"
              type="text"
              placeholder="Дата рождения (дд.мм.гг)"
              className={s.input}
              pattern="\d{2}\.\d{2}\.\d{4}"
              required
            />
            <button type="submit" className={s.button}>
              РАССЧИТАТЬ МАТРИЦУ
            </button>
          </form>
        </>
      ) : (
        <MatrixResult results={results} />
      )}
    </div>
  );
}

// Компонент для отображения результатов
function MatrixResult({ results }) {
  return (
    <div className={s.resultContainer}>
      <h2>Матрица судьбы для {results.name}</h2>
      <p>Дата рождения: {results.dob}</p>
      <p>Пол: {results.gender === 'female' ? 'Женский' : 'Мужской'}</p>
      <p>Число жизненного пути: {results.lifePath}</p>
      <p>Число судьбы: {results.destinyNumber}</p>
      <button
        className={s.button}
        onClick={() => window.location.reload()}
      >
        Вернуться к расчету
      </button>
    </div>
  );
}

export default Matrix;
