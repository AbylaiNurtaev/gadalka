import React from "react";
import s from "./Otmena.module.sass";

function Otmena() {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Отменить подписку</h3>

      <div className={s.buttons}>
        <button className={`${s.button} ${s.email}`}>Email</button>
        {/* <button className={`${s.button} ${s.card}`}>Карта</button> */}
      </div>

      <form className={s.form}>
        <input
          type="email"
          className={s.input}
          placeholder="Введите email адрес"
        />
        <button type="submit" className={s.submitButton}>
          Отменить
        </button>
      </form>
    </div>
  );
}

export default Otmena;
