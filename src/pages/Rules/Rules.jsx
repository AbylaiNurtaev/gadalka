import React from "react";
import s from "./Rules.module.sass";
import Otmena from "../../components/Otmena/Otmena";

function Rules() {
  return (
    <div className={s.rulesContainer}>
      <div className={s.rulesCard}>
        <div className={s.ruleItem}>
          <div className={s.numberCircle}>1</div>
          <div className={s.ruleContent}>
            <h4 className={s.ruleTitle}>Где я нахожусь в данный момент?</h4>
            <p className={s.ruleText}>
              Это страница по управлению подписками, а также мы ответим на самые
              распространенные вопросы.
            </p>
          </div>
        </div>

        <div className={s.ruleItem}>
          <div className={s.numberCircle}>2</div>
          <div className={s.ruleContent}>
            <h4 className={s.ruleTitle}>
              Почему без моего согласия была совершена оплата?
            </h4>
            <p className={s.ruleText}>
              На сайте Вы оформили пробную подписку, которая продлевается
              автоматически на несколько дней или неделю с помощью рекуррентного
              платежа, с которым вы согласились при оплате.
            </p>
          </div>
        </div>

        <div className={s.ruleItem}>
          <div className={s.numberCircle}>3</div>
          <div className={s.ruleContent}>
            <h4 className={s.ruleTitle}>
              Как это так без подтверждения по смс?
            </h4>
            <p className={s.ruleText}>
              Мы используем рекуррентные платежи, также известные как
              рекарринговые платежи или «автоплатежи» — это возможность
              выполнять регулярные списания денег с банковской карты покупателя
              или электронного кошелька без повторного ввода реквизитов карты и
              без участия плательщика для инициации очередного платежа.
              Рекарринговые платежи используют так же такие компании как Яндекс,
              Google, Amazon, IVI, Netflix и многие другие.
            </p>
          </div>
        </div>
      </div>
      <Otmena />
    </div>
  );
}

export default Rules;
