import React, { useEffect, useState } from "react";
import s from "./Header.module.sass";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

function Header() {
  const navigate = useNavigate();
  const [path, setPath] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      axios
        .get(`/getUserById/${id}`)
        .then((res) => {
          console.log("res?.data?.subscribe", res?.data?.subscribe);
          if (res?.data?.subscribe == true) {
            setPath(true);
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.clear();
        });
    }
  }, []);
  return (
    <div className={`${s.container} absolute px-10`}>
      <div className={s.logo} onClick={() => navigate("/")}>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/012/986/755/small_2x/abstract-circle-logo-icon-free-png.png"
          alt="Logo"
        />
        <div className={s.logoCol}>
          <h1 className="font-sans">Матрица</h1>
          <h1 className={s.whiteText}>судьбы</h1>
        </div>
      </div>

      <div className={s.nav}>
        <p onClick={() => navigate("/")}>Главная</p>
        <p onClick={() => navigate("/cabinet/old")}>Профиль</p>
        <button onClick={() => navigate("/")}>Рассчитать матрицу</button>
      </div>
      <button onClick={() => navigate(path)} className={s.mobileBtn}>
        Войти
      </button>
    </div>
  );
}

export default Header;
