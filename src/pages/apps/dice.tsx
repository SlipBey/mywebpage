import { Layout } from "@/components/Layout";
import { NextPage } from "next";
import { useState } from "react";

import {
  BsFillDice1Fill,
  BsFillDice2Fill,
  BsFillDice3Fill,
  BsFillDice4Fill,
  BsFillDice5Fill,
  BsFillDice6Fill,
} from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { toast } from "react-toastify";

const DiceGiveawayPage: NextPage = () => {
  const [diceNumber, setDiceNumber] = useState(0);
  const [dice, setDice] = useState([]);
  const [click, setClick] = useState(false);

  const onNumber = async (e) => {
    await setDiceNumber(e);
    setDice([]);
    setClick(false);
  };

  const onDice = async () => {
    if (diceNumber > 10) return toast.error("En fazla 10 adet zar atılabilir!");
    setClick(true);
    for (let i = 0; i < diceNumber; i++) {
      let diceInt = Math.floor(Math.random() * 6 + 1);
      switch (diceInt) {
        case 0:
          diceInt = 1;
          break;
        case 1:
          diceInt = 2;
          break;
        case 2:
          diceInt = 3;
          break;
        case 3:
          diceInt = 4;
          break;
        case 4:
          diceInt = 5;
          break;
        case 5:
          diceInt = 6;
          break;
        default:
          diceInt = 0;
      }

      setDice((prevDice) => [...prevDice, diceInt]);
    }
  };

  const getIcon = (num) => {
    let Icon: IconType;
    switch (num) {
      case 1:
        Icon = BsFillDice1Fill;
        break;
      case 2:
        Icon = BsFillDice2Fill;
        break;
      case 3:
        Icon = BsFillDice3Fill;
        break;
      case 4:
        Icon = BsFillDice4Fill;
        break;
      case 5:
        Icon = BsFillDice5Fill;
        break;
      case 6:
        Icon = BsFillDice6Fill;
        break;
      default:
        Icon = BsFillDice1Fill;
        break;
    }
    return <Icon className="w-6 h-6 my-2" />;
  };

  return (
    <Layout title="Zar At">
      <div className="text-center p-8">
        <div className="mx-auto mb-8 max-w-lg rounded-lg py-10 px-5 text-center bg-white dark:bg-gray-900 sm:px-10">
          <h2 className="relative text-3xl w-full text-center font-bold">
            Zar At
          </h2>
          <div className="mx-auto lg:w-96">
            <div className="flex flex-col justify-left text-left items-left w-full">
              <label>
                Atılacak Zar Sayısı <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                onChange={(e) => onNumber(e.target.value)}
                maxLength={1}
                minLength={1}
                placeholder="Lütfen sayı giriniz.."
                className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
                min={1}
                max={9}
                required
              />
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-2">
              <button
                disabled={click}
                onClick={onDice}
                className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white disabled:cursor-not-allowed"
              >
                Zar At
              </button>
            </div>
            <div className="mt-5">
              {dice.length >= 1 && (
                <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-left">
                  <div className="flex gap-2">
                    {dice.map((d, idx) => (
                      <span key={idx}>{getIcon(d)}</span>
                    ))}
                  </div>
                  <div>
                    Atılan Zar Sayısı: <strong>{dice.length}</strong>
                  </div>
                  {dice.map((d, idx) => (
                    <div key={idx}>
                      {idx + 1}.Zar: <strong>{d}</strong>
                    </div>
                  ))}
                  <div>
                    Toplam: <strong>{dice.reduce((a, b) => a + b, 0)}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DiceGiveawayPage;
