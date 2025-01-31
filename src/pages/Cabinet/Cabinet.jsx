import React, { useEffect, useRef, useState } from "react";
import axios from "../../axios";
import { useNavigate, useParams } from "react-router-dom";
import s from "./Cabinet.module.sass";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import DestinyMatrix from "../../components/DestinyMatrix/DestinyMatrix";
import Sovmest from "../../components/Sovmest/Sovmest";



function Cabinet() {
  const id = localStorage.getItem("id");
  const tab = localStorage.getItem("tab")
  const [user, setUser] = useState(null);
  const [matrix, setMatrix] = useState(null);
  const [matrix1, setMatrix1] = useState(null);
  const navigate = useNavigate();
  const matrixRef = useRef();
  const matrixRef2 = useRef();
  const { status } = useParams()

  // Функция для расчёта матрицы
  function calculateMatrix(dob) {
    const [day, month, year] = dob.split(".").map(Number);
  
    function reduceNumber(num) {
      while (num > 22) {
        num = num.toString().split("").reduce((sum, digit) => sum + Number(digit), 0);
      }
      return num;
    }
  
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
    const R1 = reduceNumber(R + M);
    const R2 = reduceNumber(R + L);
    
    return {
      A: reduceNumber(A), B: reduceNumber(B), C: reduceNumber(C), D: reduceNumber(D), E: reduceNumber(E), 
      J: reduceNumber(J), K: reduceNumber(K), L: reduceNumber(L), M: reduceNumber(M),
      O: reduceNumber(O), P: reduceNumber(P), Q: reduceNumber(Q), N: reduceNumber(N),
      S: reduceNumber(S), T: reduceNumber(T),
      F: reduceNumber(F), G: reduceNumber(G), H: reduceNumber(H), I: reduceNumber(I),
      L1: reduceNumber(L1), L2: reduceNumber(L2),
      F1: reduceNumber(F1), F2: reduceNumber(F2), G1: reduceNumber(G1), G2: reduceNumber(G2),
      H1: reduceNumber(H1), H2: reduceNumber(H2), I1: reduceNumber(I1), I2: reduceNumber(I2),
      R: reduceNumber(R), R1, R2
    };
  }

  // function calculateCompatibilityMatrix(matrix1, matrix2) {
  //   const result = {};
  //   for (const key in matrix1) {
  //     if (matrix1.hasOwnProperty(key) && matrix2.hasOwnProperty(key)) {
  //       result[key] = matrix1[key] + matrix2[key];
  //     }
  //   }
  //   return result;
  // }
  const generatePDF = async () => {
    matrixRef2.current.toggleAllSections(true); // Вызываем функцию из дочернего компонента
  
    // Ждём завершения обновления состояния
    await new Promise((resolve) => setTimeout(resolve, 300)); // Убедитесь, что время совпадает с CSS-анимацией
  
    if (matrixRef.current) {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
  
      // Функция для добавления изображения с масштабированием и постраничной разбивкой
      const addImageToPDF = async (canvas, x, y, imgWidth, pdf) => {
        const imgData = canvas.toDataURL("image/png");
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        if (imgHeight <= pageHeight - y) {
          // Если изображение помещается на одну страницу
          pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
        } else {
          // Если изображение не помещается, разбиваем на страницы
          let remainingHeight = canvas.height;
          let yOffset = 0;
  
          while (remainingHeight > 0) {
            const croppedCanvas = document.createElement("canvas");
            croppedCanvas.width = canvas.width;
            croppedCanvas.height = Math.min(canvas.height, (pageHeight - y) * canvas.width / imgWidth);
            const ctx = croppedCanvas.getContext("2d");
  
            ctx.drawImage(canvas, 0, yOffset, canvas.width, croppedCanvas.height, 0, 0, croppedCanvas.width, croppedCanvas.height);
  
            const croppedImgData = croppedCanvas.toDataURL("image/png");
            pdf.addImage(croppedImgData, "PNG", x, y, imgWidth, (croppedCanvas.height * imgWidth) / croppedCanvas.width);
  
            remainingHeight -= croppedCanvas.height;
            yOffset += croppedCanvas.height;
  
            if (remainingHeight > 0) pdf.addPage();
          }
        }
      };
  
      // Секция матрицы
      const matrixCanvas = await html2canvas(matrixRef.current);
      await addImageToPDF(matrixCanvas, 10, 30, 190, pdf);
  
      // Секция карты здоровья
      const chakraContainer = document.querySelector(".chakra-container");
      if (chakraContainer) {
        const chakraCanvas = await html2canvas(chakraContainer);
        pdf.addPage(); // Добавляем новую страницу
        await addImageToPDF(chakraCanvas, 10, 30, 190, pdf);
      }
  
      // Секция описаний
      const resultsSection = document.querySelector(".results-section");
      if (resultsSection) {
        const resultsCanvas = await html2canvas(resultsSection);
        pdf.addPage(); // Новая страница для описаний
        await addImageToPDF(resultsCanvas, 10, 20, 190, pdf);
      }
  
      matrixRef2.current.toggleAllSections(false);
  
      pdf.save("MatrixResults.pdf");
    }
  };
  
  
  
  
  useEffect(() => {
    const tab = localStorage.getItem('tab')
    
    if (id) {
      
      axios.get(`/getUserById/${id}`).then((res) => {
        console.log("data", res.data);
        
        if (res.data && tab != "Совместимость" ) {
          setUser(res.data);
          

          // Расчёт матрицы по дате рождения пользователя
          if(status == 'new'){
            const date = localStorage.getItem('date')
            axios.post(`/updateDate/${id}`, {
              date
            })
            .then(response => {
              if(response.data){
                const result = calculateMatrix(date);
                setMatrix(result);
              }
            })
          }else{
            const result = calculateMatrix(res.data.date);
            setMatrix(result);
            
          }
        }else{
          setUser(res.data);

          if(status == "new"){
            const date1 = localStorage.getItem('date1')
            const date2 = localStorage.getItem('date2')
            axios.post(`/updateDate/${id}`, {
              date1, date2
            })
            .then(response => {
              console.log("upd", response.data);
              
              if(response.data){
                const result = calculateMatrix(date1);
                const result1 = calculateMatrix(date2);
                setMatrix(result);
                setMatrix1(result1);
              }
            })
          }else{
            const result = calculateMatrix(res.data.date1);
            const result1 = calculateMatrix(res.data.date2);
            setMatrix(result)
            setMatrix1(result1)

          }
        }
      });
    } else {
      navigate("/profile");
    }
  }, [status]);

  
  
  
  
  

  const { A, B, C, F, G, D, E, P, Q, N, S, O, L, L1, L2, J, I, I1, I2, K, T, M, H, H1, H2, R, R1, R2, G1, G2, F1, F2 } = matrix || {};


  const sumDigits = (num) => {
    while (num > 22) {
      num = num.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
    }
    return num;
  };
  
  const chakraData = [
    { name: "Сахасрара", value: sumDigits(A + B), color: "bg-purple-500" },
    { name: "Аджна", value: sumDigits(J + S), color: "bg-indigo-500" },
    { name: "Вишудха", value: sumDigits(O + P), color: "bg-blue-400" },
    { name: "Анахата", value: sumDigits(K + T), color: "bg-green-500" },
    { name: "Манипура", value: sumDigits(E), color: "bg-yellow-400" },
    { name: "Свадхистана", value: sumDigits(M + L), color: "bg-orange-400" },
    { name: "Муладхара", value: sumDigits(D + C), color: "bg-red-500" },
  ]; 
  

  return (
    <div className={s.container} style={{ background: 'linear-gradient(90deg, rgba(182, 50, 217, 0.2) 0.11%, rgba(84, 116, 255, 0.1) 100%)' }} >
      {user ? (
        <>
          <h1 className={`${s.name} font-sans text-white mt-[100px]`}>{user?.name}</h1>
          <p className={`${s.email} font-sans text-white`}>{user?.email}</p>
          <h1 className={`${s.name} font-sans text-white mt-5`}>Результаты вашей матрицы</h1>
          {matrix && tab != "Совместимость" && (
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

              <div className={`${s.upper} relative`} style={{ transform: "scale(1)", transformOrigin: "center" }}>
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

          {
            matrix && matrix1 && tab == "Совместимость" &&
            <div className={s.sovm}>

            <div className={`${s.upper} relative`} style={{ transform: "scale(1)", transformOrigin: "center" }}>
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
            <div className={`${s.upper} relative`} style={{ transform: "scale(1)", transformOrigin: "center" }}>
            <div className={s.matrix} ref={matrixRef}>
              <img src="/images/matrix.png"  className="rounded-[50%] absolute z-0 w-[350px]" alt="" />
              <h1 className="absolute top-[160px] left-[17px] text-white font-bold">{matrix1.A}</h1>
              <h1 className="absolute top-[265px] left-[62px] text-black font-bold">{matrix1.I}</h1>
              <h1 className="absolute top-[251px] left-[84px] text-black font-bold text-[8px]">{matrix1.I1}</h1>
              <h1 className="absolute top-[237px] left-[101px] text-black font-bold text-[8px]">{matrix1.I2}</h1>
              <h1 className="absolute top-[10px] left-[168px] text-white font-bold">{matrix1.B}</h1>
              <h1 className="absolute top-[42px] left-[170px] text-white font-medium text-[10px]">{matrix1.P}</h1>
              <h1 className="absolute top-[64px] left-[170.5px] text-white font-medium text-[8px]">{matrix1.K}</h1>
              <h1 className="absolute top-[110px] left-[170px] text-white font-medium text-[8px]">{matrix1.T}</h1>
              <h1 className="absolute top-[94px] left-[244px] text-black font-medium text-[8px]">{matrix1.G1}</h1>
              <h1 className="absolute top-[80px] left-[258px] text-black font-medium text-[8px]">{matrix1.G2}</h1>
              <h1 className="absolute top-[52px] left-[62px] text-black font-bold">{matrix1.F}</h1>
              <h1 className="absolute top-[80px] left-[85px] text-black font-medium text-[10px]">{matrix1.F1}</h1>
              <h1 className="absolute top-[94px] left-[101px] text-black font-medium text-[8px]">{matrix1.F2}</h1>
              <h1 className="absolute top-[52px] left-[272px] text-black font-bold">{matrix1.G}</h1>
              <h1 className="absolute top-[165px] left-[272px] text-white font-medium text-[8px]">{matrix1.L}</h1>
              <h1 className="absolute top-[165px] left-[69px] text-white font-medium text-[8px]">{matrix1.S}</h1>
              <h1 className="absolute top-[164px] left-[49px] text-white font-medium text-[8px]">{matrix1.O}</h1>
              <h1 className="absolute top-[163px] left-[292px] text-black font-medium text-[10px]">{matrix1.Q}</h1>
              <h1 className="absolute top-[165px] left-[218px] text-black font-medium text-[10px]">{matrix1.L1}</h1>
              <h1 className="absolute top-[165px] left-[198px] text-black font-medium text-[10px]">{matrix1.L2}</h1>
              <h1 className="absolute top-[162px] left-[168px] text-black font-medium text-[13px]">{matrix1.E}</h1>
              <h1 className="absolute top-[312px] left-[168px] text-white font-medium text-[13px]">{matrix1.D}</h1>
              <h1 className="absolute top-[268px] left-[273px] text-black font-medium text-[13px]">{matrix1.H}</h1>
              <h1 className="absolute top-[252px] left-[257px] text-black font-medium text-[8px]">{matrix1.H1}</h1>
              <h1 className="absolute top-[238px] left-[243px] text-black font-medium text-[8px]">{matrix1.H2}</h1>
              <h1 className="absolute top-[212px] left-[218px] text-black font-medium text-[7px]">{matrix1.R}</h1>
              <h1 className="absolute top-[233px] left-[208px] text-black font-medium text-[7px]">{matrix1.R1}</h1>
              <h1 className="absolute top-[207px] left-[238px] text-black font-medium text-[6px]">{matrix1.R2}</h1>
              <h1 className="absolute top-[286px] left-[170px] text-black font-medium text-[10px]">{matrix1.N}</h1>
              <h1 className="absolute top-[266px] left-[170px] text-white font-medium text-[8px]">{matrix1.M}</h1>
              <h1 className="absolute top-[165px] left-[119px] text-white font-medium text-[7px]">{matrix1.S}</h1>
              <h1 className="absolute top-[159px] left-[319px] text-white font-bold">{matrix1.C}</h1>
            </div>
          </div>
            </div>
          }
          {
            matrix && matrix1 && tab == "Совместимость" &&
          <h2 className="font-sans text-white font-black text-[24px] mt-[30px]">Общая матрица</h2>
          }

          {
            matrix && matrix1 && tab == "Совместимость" &&
            <div className={`${s.upper} relative`} style={{ marginTop: "50px" ,transform: "scale(1.5)", transformOrigin: "center" }}>
              <div className={s.matrix} ref={matrixRef}>
              <img src="/images/matrix.png"  className="rounded-[50%] absolute z-0 w-[350px]" alt="" />
              <h1 className="absolute top-[160px] left-[17px] text-white font-bold">{matrix1.A + A}</h1>
              <h1 className="absolute top-[265px] left-[62px] text-black font-bold">{matrix1.I + I}</h1>
              <h1 className="absolute top-[251px] left-[84px] text-black font-bold text-[8px]">{matrix1.I1 + I1}</h1>
              <h1 className="absolute top-[237px] left-[101px] text-black font-bold text-[8px]">{matrix1.I2 + I2}</h1>
              <h1 className="absolute top-[10px] left-[168px] text-white font-bold">{matrix1.B + B}</h1>
              <h1 className="absolute top-[42px] left-[170px] text-white font-medium text-[10px]">{matrix1.P + P}</h1>
              <h1 className="absolute top-[64px] left-[170.5px] text-white font-medium text-[8px]">{matrix1.K + K}</h1>
              <h1 className="absolute top-[110px] left-[170px] text-white font-medium text-[8px]">{matrix1.T + T}</h1>
              <h1 className="absolute top-[94px] left-[244px] text-black font-medium text-[8px]">{matrix1.G1 + G1}</h1>
              <h1 className="absolute top-[80px] left-[258px] text-black font-medium text-[8px]">{matrix1.G2 + G2}</h1>
              <h1 className="absolute top-[52px] left-[62px] text-black font-bold">{matrix1.F + F}</h1>
              <h1 className="absolute top-[80px] left-[85px] text-black font-medium text-[10px]">{matrix1.F1 + F1}</h1>
              <h1 className="absolute top-[94px] left-[101px] text-black font-medium text-[8px]">{matrix1.F2 + F2}</h1>
              <h1 className="absolute top-[52px] left-[272px] text-black font-bold">{matrix1.G + G}</h1>
              <h1 className="absolute top-[165px] left-[272px] text-white font-medium text-[8px]">{matrix1.L + L}</h1>
              <h1 className="absolute top-[165px] left-[69px] text-white font-medium text-[8px]">{matrix1.S + S}</h1>
              <h1 className="absolute top-[164px] left-[49px] text-white font-medium text-[8px]">{matrix1.O + O}</h1>
              <h1 className="absolute top-[163px] left-[292px] text-black font-medium text-[10px]">{matrix1.Q + Q}</h1>
              <h1 className="absolute top-[165px] left-[218px] text-black font-medium text-[10px]">{matrix1.L1 + L1}</h1>
              <h1 className="absolute top-[165px] left-[198px] text-black font-medium text-[10px]">{matrix1.L2 + L2}</h1>
              <h1 className="absolute top-[162px] left-[168px] text-black font-medium text-[13px]">{matrix1.E + E}</h1>
              <h1 className="absolute top-[312px] left-[168px] text-white font-medium text-[13px]">{matrix1.D + D}</h1>
              <h1 className="absolute top-[268px] left-[273px] text-black font-medium text-[13px]">{matrix1.H + H}</h1>
              <h1 className="absolute top-[252px] left-[257px] text-black font-medium text-[8px]">{matrix1.H1 + H1}</h1>
              <h1 className="absolute top-[238px] left-[243px] text-black font-medium text-[8px]">{matrix1.H2 + H2}</h1>
              <h1 className="absolute top-[212px] left-[218px] text-black font-medium text-[7px]">{matrix1.R + R}</h1>
              <h1 className="absolute top-[233px] left-[208px] text-black font-medium text-[7px]">{matrix1.R1 + R1}</h1>
              <h1 className="absolute top-[207px] left-[238px] text-black font-medium text-[6px]">{matrix1.R2 + R2}</h1>
              <h1 className="absolute top-[286px] left-[170px] text-black font-medium text-[10px]">{matrix1.N + N}</h1>
              <h1 className="absolute top-[266px] left-[170px] text-white font-medium text-[8px]">{matrix1.M + M}</h1>
              <h1 className="absolute top-[165px] left-[119px] text-white font-medium text-[7px]">{matrix1.S + S}</h1>
              <h1 className="absolute top-[159px] left-[319px] text-white font-bold">{matrix1.C}</h1>
            </div>
            </div>
          }
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
      <div className="results-section">
        {
          tab == "Совместимость" && matrix && matrix1 &&
          <Sovmest ref={matrixRef2} matrix={matrix} matrix1={matrix1} />
        }
        {
          tab != "Совместимость" && matrix &&
        <DestinyMatrix ref={matrixRef2} matrix={matrix} />
        }
      </div>
      <button className={s.output} onClick={generatePDF}>Результаты в PDF</button>
    </div>
  );
}

export default Cabinet;