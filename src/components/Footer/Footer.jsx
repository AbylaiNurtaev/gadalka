import React from 'react'
import s from './Footer.module.sass'

function Footer() {
  return (
    <div className={s.container}>
        <div className="flex flex-row justify-center items-start w-[90%] gap-[50px]">
            <div className="flex flex-col justify-center items-start w-[300px]">
                <p className='text-white opacity-55 '>ИП СУРИН АНАТОЛИЙ СЕРГЕЕВИЧ</p>
                <p className='text-white opacity-55 '>ИНН 781145682831</p>
            </div>
            <div className="flex flex-col justify-center items-center w-[300px]">
                <p className='text-white opacity-55 '>Телефон: +7 (812) 200-46-02</p>
                <p className='text-white opacity-55 '>Email: matrica-sudby@outlook.com</p>
            </div>
            <div className="flex flex-col justify-center items-center w-[300px]">
                <a className='text-white opacity-55  underline' href='/оферта.pdf'>Тарифы</a>
                <a className='text-white opacity-55  underline' href='/ТАРИФЫ.pdf'>Оферта</a>
            </div>
        </div>
        <p className={`${s.footText} text-white opacity-55`}>Матрица судьбы © 2025. Все права защищены.</p>
    </div>
  )
}

export default Footer
