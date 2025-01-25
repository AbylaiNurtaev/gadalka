import React, { forwardRef, useImperativeHandle, useState } from "react";
import _A from '../../A'
import _C from '../../C'
import _D from '../../D'
import _E from '../../E'
import _K from '../../K'
import _L from '../../L'
import _M from '../../M'
import _R2 from '../../R2'



const Sovmest = forwardRef(({ matrix, matrix1, onToggleAll }, ref) => {
  
  
  const {
    A, B, C, F, G, D, E, P, Q, N, S, O, L, L1, L2, J, I, I1, I2,
    K, T, M, H, H1, H2, R, R1, R2, G1, G2, F1, F2
  } = matrix || {};



  let A_result = A + matrix1?.A,
      C_result = C + matrix1?.C,
      D_result = D + matrix1?.D,
      E_result = E + matrix1?.E,
      K_result = K + matrix1?.K,
      L_result = L + matrix1?.L,
      M_result = M + matrix1?.M,
      R2_result = R2 + matrix1?.R2;


  if(A + matrix1?.A > 21){
    A_result = A.toString()
    .split('')  
    .map(Number) 
    .reduce((sum, digit) => sum + digit, 0); 
  }
  if(C + matrix1?.C > 22){
    C_result = C.toString()
    .split('')  
    .map(Number) 
    .reduce((sum, digit) => sum + digit, 0); 
  }
  if(D + matrix1?.D > 22){
    D_result = D.toString()
    .split('')  
    .map(Number) 
    .reduce((sum, digit) => sum + digit, 0); 
  }
  if(E + matrix1?.E > 22){
    E_result = E.toString()
    .split('')  
    .map(Number) 
    .reduce((sum, digit) => sum + digit, 0); 
  }
  if(K + matrix1?.K > 22){
    K_result = K.toString()
    .split('')  
    .map(Number) 
    .reduce((sum, digit) => sum + digit, 0); 
  }
  if(L + matrix1?.L > 22){
    L_result = L.toString()
    .split('')  
    .map(Number) 
    .reduce((sum, digit) => sum + digit, 0); 
  }
  if(M + matrix1?.M > 22){
    M_result = M.toString()
    .split('')  
    .map(Number) 
    .reduce((sum, digit) => sum + digit, 0); 
  }
  if(R2 + matrix1?.R2 > 22){
    R2_result = R2.toString()
    .split('')  
    .map(Number) 
    .reduce((sum, digit) => sum + digit, 0); 
  }


  const found_A = _A.find(item => item.number == A_result);
  const found_D = _D.find(item => item.number === D_result);
  const found_C = _C.find(item => item.number === C_result);
  const found_E = _E.find(item => item.number === E_result);
  const found_K = _K.find(item => item.number === K_result);
  const found_L = _L.find(item => item.number === L_result);
  const found_M = _M.find(item => item.number === M_result);
  const found_R2 = _R2.find(item => item.number === R2_result);

  console.log(found_A, 'found_A')

  const sections = [
    {
      id: 1,
      title: "Личные характеристики",
      key: "personal_purpose",
      values: [{ name: found_A.title, value: found_A.number }],
      description: found_A.description
    },
    {
      id: 2,
      title: "Главная проработка души",
      key: "personal_purpose",
      values: [{ name: found_D.title, value: found_D.number }],
      description: found_D.description
    },
    {
      id: 3,
      title: "Зона комфорта и гармонии",
      key: "personal_purpose",
      values: [{ name: found_C.title, value: found_C.number }],
      description: found_C.description
    },
    {
      id: 4,
      title: "Таланты",
      key: "personal_purpose",
      values: [{ name: found_E.title, value: found_E.number }],
      description: found_E.description
    },
    {
      id: 5,
      title: "Здоровье",
      key: "personal_purpose",
      values: [{ name: found_K.title, value: found_K.number }],
      description: found_K.description
    },
    {
      id: 6,
      title: "Финансы",
      key: "personal_purpose",
      values: [{ name:found_L.title, value: found_L.number }],
      description: found_L.description
    },
    {
      id: 7,
      title: "Профессия",
      key: "personal_purpose",
      values: [{ name: found_M.title, value: found_M.number }],
      description: found_M.description
    },
    {
      id: 8,
      title: "Отношения",
      key: "personal_purpose",
      values: [{ name: found_R2.title, value: found_R2.number }],
      description: found_R2.description
    },
   
  ];

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  const toggleAllSections = (isOpen) => {
    const newState = sections.reduce((acc, section) => {
      acc[section.id] = isOpen;
      return acc;
    }, {});
    setOpenSections(newState);
    if (onToggleAll) onToggleAll(newState); // Сообщаем родителю о новом состоянии
  };
  useImperativeHandle(ref, () => ({
    toggleAllSections, // Делаем эту функцию доступной для родителя
  }));

  return (
    <div className="destiny-matrix-container w-full flex flex-col items-center mt-5">
      <div className="matrix-grid w-[80%] grid grid-cols-1 gap-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="section-container bg-purple-700 rounded-lg p-4 text-white"
          >
            <div
              className="section-title cursor-pointer flex justify-between items-center"
              onClick={() => toggleSection(section.id)}
            >
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <span>{openSections[section.id] ? "−" : "+"}</span>
            </div>
            <div
              className={`description-container transition-max-height duration-300 overflow-hidden w-full ${
                openSections[section.id] ? "min-h-96" : "max-h-0"
              }`}
            >
              <div className="values flex flex-wrap justify-between mt-4">
                {section.values.map((value, idx) => (
                  <div
                    id={idx}
                    className="value-item flex flex-col items-center text-center w-[100%]"
                  >
                    <div className="value-circle w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 font-bold text-lg">
                      {value.value || "-"}
                    </div>
                    <p className="text-sm mt-1">{value.name}</p>
                  </div>
                ))}
              </div>
              <div dangerouslySetInnerHTML={{ __html:  section.description}} className="description text-sm text-gray-300 mt-2 mb-3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
)
export default Sovmest;