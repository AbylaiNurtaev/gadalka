import React, { useEffect, useRef, useState } from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import s from "./Cabinet.module.sass";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Cabinet() {
  const id = localStorage.getItem("id");
  const [user, setUser] = useState(null);
  const [matrix, setMatrix] = useState(null);
  const navigate = useNavigate();
  const matrixRef = useRef();

  // Функция для расчёта матрицы
  function calculateMatrix(dob) {
    const [day, month, year] = dob.split(".").map(Number);

    const A = day;
    const B = month;
    const C = year.toString().split("").reduce((sum, digit) => sum + Number(digit), 0);
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

  const generatePDF = async () => {
    if (matrixRef.current) {
      const pdf = new jsPDF();
  
      // Секция матрицы
      const matrixCanvas = await html2canvas(matrixRef.current);
      const matrixImgData = matrixCanvas.toDataURL("image/png");
      const imgWidth = 190; // Ширина изображения в PDF
      const imgHeight = (matrixCanvas.height * imgWidth) / matrixCanvas.width; // Пропорциональная высота
  
      pdf.addImage(matrixImgData, "PNG", 10, 30, imgWidth, imgHeight);
  
      // Секция карты здоровья
      const chakraContainer = document.querySelector(".chakra-container"); // Добавим класс для идентификации
      if (chakraContainer) {
        const chakraCanvas = await html2canvas(chakraContainer);
        const chakraImgData = chakraCanvas.toDataURL("image/png");
        const chakraImgHeight = (chakraCanvas.height * imgWidth) / chakraCanvas.width;
  
        pdf.addPage(); // Добавляем новую страницу
        pdf.addImage(chakraImgData, "PNG", 10, 30, imgWidth, chakraImgHeight);
      }
  
      pdf.save("MatrixResults.pdf");
    }
  };
  
  



  useEffect(() => {
    if (id) {
      axios.get(`/getUserById/${id}`).then((res) => {
        if (res.data) {
          setUser(res.data);

          // Расчёт матрицы по дате рождения пользователя
          const result = calculateMatrix("10.02.2000");
          setMatrix(result);
        }
      });
    } else {
      navigate("/profile");
    }
  }, []);

  const { A, B, C, F, G, D, E, P, Q, N, S, O, L, L1, L2, J, I, I1, I2, K, T, M, H, H1, H2, R, R1, R2, G1, G2, F1, F2 } = matrix || {};
  const chakraData = [
    { name: "Сахасрара", value: A + B, color: "bg-purple-500" },
    { name: "Аджна", value: J + S, color: "bg-indigo-500" },
    { name: "Вишудха", value: O + P, color: "bg-blue-400" },
    { name: "Анахата", value: K + T, color: "bg-green-500" },
    { name: "Манипура", value: E, color: "bg-yellow-400" },
    { name: "Свадхистана", value: M + L, color: "bg-orange-400" },
    { name: "Муладхара", value: D + C, color: "bg-red-500" },
  ];

  return (
    <div className={s.container} style={{ background: 'linear-gradient(90deg, rgba(182, 50, 217, 0.2) 0.11%, rgba(84, 116, 255, 0.1) 100%)' }} >
      {user ? (
        <>
          <h1 className={`${s.name} font-sans text-white mt-[100px]`}>{user?.name}</h1>
          <p className={`${s.email} font-sans text-white`}>{user?.email}</p>
          <h1 className={`${s.name} font-sans text-white mt-5`}>Результаты вашей матрицы</h1>
          {matrix && (
            <div className={`${s.block} flex justify-between items-center w-[60%] mt-[50px]`}>
<div className={`${s.karta} chakra-container w-[450px] flex flex-col justify-start items-center`}>
  <h1 className="font-sans text-white font-bold mb-4 w-[100%] text-[20px]">Карта здоровья</h1>
  {chakraData.map((chakra, index) => (
    <div
      key={index}
      className={`flex justify-between items-center w-[100%] p-2 text-white ${chakra.color}`}
    >
      <p className="w-[70%]">{chakra.name}</p>
      <p className="font-bold">{chakra.value}</p>
    </div>
  ))}
</div>

              <div className={`${s.upper} relative`} style={{ transform: "scale(1.5)", transformOrigin: "center" }}>
                <div className={s.matrix} ref={matrixRef}>
                  <img src="/images/matrix.png"  className="rounded-[50%] absolute z-0 w-[350px]" alt="" />
                  <h1 className="absolute top-[160px] left-[17px] text-white font-bold">{A}</h1>
                  <h1 className="absolute top-[265px] left-[62px] text-black font-bold">{I}</h1>
                  <h1 className="absolute top-[251px] left-[84px] text-black font-bold text-[8px]">{I1}</h1>
                  <h1 className="absolute top-[237px] left-[101px] text-black font-bold text-[8px]">{I2}</h1>
                  <h1 className="absolute top-[10px] left-[168px] text-white font-bold">{B}</h1>
                  <h1 className="absolute top-[42px] left-[170px] text-white font-medium text-[10px]">{P}</h1>
                  <h1 className="absolute top-[64px] left-[170.5px] text-white font-medium text-[8px]">{K}</h1>
                  <h1 className="absolute top-[110px] left-[170px] text-white font-medium text-[8px]">{T}</h1>
                  <h1 className="absolute top-[94px] left-[244px] text-black font-medium text-[8px]">{G1}</h1>
                  <h1 className="absolute top-[80px] left-[258px] text-black font-medium text-[8px]">{G2}</h1>
                  <h1 className="absolute top-[52px] left-[62px] text-black font-bold">{F}</h1>
                  <h1 className="absolute top-[80px] left-[85px] text-black font-medium text-[10px]">{F1}</h1>
                  <h1 className="absolute top-[94px] left-[101px] text-black font-medium text-[8px]">{F2}</h1>
                  <h1 className="absolute top-[52px] left-[272px] text-black font-bold">{G}</h1>
                  <h1 className="absolute top-[165px] left-[272px] text-white font-medium text-[8px]">{L}</h1>
                  <h1 className="absolute top-[165px] left-[69px] text-white font-medium text-[8px]">{S}</h1>
                  <h1 className="absolute top-[164px] left-[49px] text-white font-medium text-[8px]">{O}</h1>
                  <h1 className="absolute top-[163px] left-[292px] text-black font-medium text-[10px]">{Q}</h1>
                  <h1 className="absolute top-[165px] left-[218px] text-black font-medium text-[10px]">{L1}</h1>
                  <h1 className="absolute top-[165px] left-[198px] text-black font-medium text-[10px]">{L2}</h1>
                  <h1 className="absolute top-[162px] left-[168px] text-black font-medium text-[13px]">{E}</h1>
                  <h1 className="absolute top-[312px] left-[168px] text-white font-medium text-[13px]">{D}</h1>
                  <h1 className="absolute top-[268px] left-[273px] text-black font-medium text-[13px]">{H}</h1>
                  <h1 className="absolute top-[252px] left-[257px] text-black font-medium text-[8px]">{H1}</h1>
                  <h1 className="absolute top-[238px] left-[243px] text-black font-medium text-[8px]">{H2}</h1>
                  <h1 className="absolute top-[212px] left-[218px] text-black font-medium text-[7px]">{R}</h1>
                  <h1 className="absolute top-[233px] left-[208px] text-black font-medium text-[7px]">{R1}</h1>
                  <h1 className="absolute top-[207px] left-[238px] text-black font-medium text-[6px]">{R2}</h1>
                  <h1 className="absolute top-[286px] left-[170px] text-black font-medium text-[10px]">{N}</h1>
                  <h1 className="absolute top-[266px] left-[170px] text-white font-medium text-[8px]">{M}</h1>
                  <h1 className="absolute top-[165px] left-[119px] text-white font-medium text-[7px]">{S}</h1>
                  <h1 className="absolute top-[159px] left-[319px] text-white font-bold">{C}</h1>
                </div>
            </div>
            
            </div>
          )}
 <div className="mt-[108px] w-[90%] max-w-[700px] p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg shadow-xl">
    <h2 className="text-2xl font-bold text-white mb-6 text-center">Что означают результаты матрицы?</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="flex flex-col items-center text-center">
        <span className="text-purple-400 text-xl font-bold">A (Сахасрара)</span>
        <p className="text-white mt-2 text-sm leading-relaxed">
          Символизирует духовное развитие, интуицию и высшие идеалы. Это вершина вашего роста.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="text-blue-400 text-xl font-bold">B (Аджна)</span>
        <p className="text-white mt-2 text-sm leading-relaxed">
          Отвечает за интеллект, ясность мышления и осознанность. Это ваш внутренний компас.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="text-red-400 text-xl font-bold">C (Муладхара)</span>
        <p className="text-white mt-2 text-sm leading-relaxed">
          Ассоциируется с основой жизни, устойчивостью и безопасностью. Ваше чувство стабильности.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="text-orange-400 text-xl font-bold">D (Свадхистана)</span>
        <p className="text-white mt-2 text-sm leading-relaxed">
          Олицетворяет творчество, эмоции и чувственное восприятие. Источник вдохновения.
        </p>
      </div>
      <div className="flex flex-col items-center text-center sm:col-span-2">
        <span className="text-yellow-400 text-xl font-bold">E (Манипура)</span>
        <p className="text-white mt-2 text-sm leading-relaxed">
          Центр силы, уверенности в себе и личной энергии. Ваш внутренний огонь.
        </p>
      </div>
      </div>
      </div>
    
        </>
      ) : (
        <img
          className={s.loadingGif}
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="Загрузка..."
        />
      )}
      <button className={s.output} onClick={generatePDF}>Результаты в PDF</button>
    </div>
  );
}

export default Cabinet;
