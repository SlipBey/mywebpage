/* eslint-disable @typescript-eslint/no-explicit-any */

import { Layout } from "@/components/Layout";
import classNames from "classnames";
import { NextPage } from "next";
import { useState } from "react";
import { FaWineBottle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const BottlePage: NextPage = () => {
  const [start, setStart] = useState(false);
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");
  const [peoples, setPeoples] = useState([
    {
      name: "",
      id: 1,
    },
  ]);

  const updatePeople = async (e, reference) => {
    reference.name = e.target.value;
    const index = peoples.findIndex((ref) => ref.id == reference.id);
    peoples[index] = reference;
    setPeoples(peoples);
  };

  const onStart = async () => {
    if (start) {
      toast.error("Oyuna zaten başlanmış!");
    } else if (peoples.length < 2) {
      toast.error("Oyuna başlayabilmek için en az 2 kişi olmalısınız.");
    } else {
      setStart(true);
    }
  };

  const removePeople = (peopleId: any) => {
    const updatedPeople = peoples.filter((people) => people !== peopleId);
    setPeoples(updatedPeople);
  };

  const startPlayer = () => {
    const player1 = Math.floor(Math.random() * peoples.length);
    const player2 = Math.floor(Math.random() * peoples.length);
    const question = peoples[player1].name;
    const reply = peoples[player2].name;

    setQuestion(question);
    if (question == reply) {
      const player3 = Math.floor(Math.random() * peoples.length);
      const replyPlayer = peoples[player3].name;

      setReply(replyPlayer);
    } else {
      setReply(reply);
    }
  };

  return (
    <Layout title="Şişe Çevirmece">
      <section className="text-center p-8">
        <div className="mx-auto mb-8 max-w-lg rounded-lg py-10 px-5 text-center bg-white dark:bg-gray-900 sm:px-10">
          <h2 className="relative text-3xl w-full text-center font-bold">
            Şişeyi Çevir
          </h2>

          <div className="mx-auto lg:w-96">
            {(!start && (
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="flex flex-col justify-left text-left items-left w-full">
                  <label>
                    Oyuncular({peoples.length}){" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <div className="flex flex-col gap-3">
                    {peoples.map((r, idx) => (
                      <div
                        className="relative flex flex-row gap-3 w-full items-center"
                        key={idx}
                      >
                        <input
                          type="text"
                          placeholder="İsim"
                          className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
                          onChange={(e) => updatePeople(e, r)}
                          defaultValue={r.name}
                          minLength={3}
                          required
                        />
                        <button
                          className="absolute right-0 p-2"
                          onClick={() => removePeople(r)}
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-full">
                  <button
                    onClick={() =>
                      setPeoples([
                        ...peoples,
                        {
                          name: "",
                          id: peoples.length + 1,
                        },
                      ])
                    }
                    className="bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
                  >
                    Kişi Ekle
                  </button>
                </div>
                <div className="w-full">
                  <button
                    onClick={onStart}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
                  >
                    Oyuna Başla
                  </button>
                </div>
              </div>
            )) || (
              <div className="mt-5">
                <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-left">
                  <h1>
                    <strong>Oyuncular</strong>
                  </h1>
                  <p>
                    {peoples.map((a, idx) => (
                      <span key={idx} className={classNames({})}>
                        {a.name}{" "}
                      </span>
                    ))}
                  </p>
                  {question.length >= 2 && reply.length >= 2 && (
                    <div className="mt-3">
                      <FaWineBottle className="text-3xl text-blue-600" />
                      <p>
                        <strong className="text-gray-300">Soruyu Soran:</strong>
                        <br />{" "}
                        <span className="text-lg font-semibold">
                          {question}
                        </span>
                      </p>
                      <p>
                        <strong className="text-gray-300">
                          Soruyu Cevaplayan:
                        </strong>
                        <br />{" "}
                        <span className="text-lg font-semibold">{reply}</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <button
                    onClick={() => startPlayer()}
                    className="mt-2 bg-green-600 hover:bg-green-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
                  >
                    Çevir
                  </button>
                  <button
                    onClick={() => setStart(false)}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
                  >
                    Oyuncu Ekle
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BottlePage;
