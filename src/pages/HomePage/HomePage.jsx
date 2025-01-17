import React from 'react';
import Matrix from '../../components/Matrix/Matrix';
import s from './HomePage.module.sass'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const id = localStorage.getItem('id')
  const navigate = useNavigate()

  return (
    <>
      <div className="w-full h-[800px]">
        <div
          className="h-full w-full bg-cover bg-center flex flex-col justify-start items-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/bg.png')",
          }}
        >
          <h1 className={`mt-[120px] text-white font-black text-[70px] font-sans ${s.title}`}>Матрица Судьбы</h1>

          <p className={`text-white font-sans text-[23px] ${s.par}`}>Узнайте свое предназначение, сильную сторону, таланты и</p>
          <p className={`text-white font-sans text-[23px] mb-[50px] ${s.par}`}>предрасположенности и начните менять свою жизнь к лучшему!</p>
          <Matrix></Matrix>
        </div>
      </div>

      <div className={s.bottomBlock} style={{ background: 'linear-gradient(90deg, rgba(182, 50, 217, 0.2) 0.11%, rgba(84, 116, 255, 0.1) 100%)' }}      >
          <div className={s.block1}>
            <div className={s.left}>
              <h1 className='text-white font-black text-[40px]'>Что такое</h1>
              <h1 style={{ color: "#b632d9" }} className='font-black text-[40px]'>Матрица Cудьбы?</h1>
              <p className='mt-4'>Матрица судьбы это система самопознания, основанная на сочетании нумерологии, астрологии и Таро.</p>
              <p className='mt-4'>Матрица судьбы — позволяет понять собственное предназначение, для чего вы существуете и что должны делать, чтобы выполнить волю Вселенной. Осознавая своё предназначение, человек получает возможность расслабиться и развиваться в гармонии с самим собой.</p>
              <p className='mt-4'>У каждого человека есть личная программа. Она зависит от даты рождения и, рассчитав её, можно понять, почему не удаётся достичь успеха в определённых сферах, какое направление для собственного развития выбрать для того, чтобы преуспеть.</p>
              <button>Рассчитать матрицу</button>
            </div>

            <img src="https://matricaonline.com/m_dark/img/about-img_01.webp" alt="" />

          </div>
          <div className={s.block2}>
          <img src="/images/girl.jpeg" alt="" />
            <div className={s.left}>
              <h1 className='text-white font-black text-[40px]'>Когда помогает</h1>
              <h1 style={{ color: "#b632d9" }} className='font-black text-[40px]'>Матрица Cудьбы?</h1>
              <p className='font-semibold text-[24px] mt-6'>Самореализация</p>
              <p className='mt-2'>Поймите свои сильные стороны и жизненные ориентиры, чтобы уверенно двигаться к своим целям и раскрыть свой потенциал.</p>
              <p className='font-semibold text-[24px] mt-6'>Внутренняя гармония</p>
              <p className='mt-2'>Обретите баланс между своими желаниями, возможностями и действиями, научитесь слышать свой внутренний голос.</p>
              <p className='font-semibold text-[24px] mt-6'>Карьерный рост</p>
              <p className='mt-2'>Найдите свои ключевые области успеха, определите стратегию достижения целей и увеличьте доход, работая в удовольствие.</p>
              <button>Рассчитать матрицу</button>
            </div>



          </div>
      </div>
    </>
  );
}

export default HomePage;
