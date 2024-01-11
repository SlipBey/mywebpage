import { AppsGiveaway } from "@/components/Apps/Giveaway";
import { GiveawayWinner } from "@/components/Apps/Giveaway/winner";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";
import { useState } from "react";
import { toast } from "react-toastify";

const RandomGiveawayPage: NextPage = () => {
  const [name, setName] = useState("");
  const [peoples, setPeoples] = useState([
    {
      name: "",
      id: 0,
    },
  ]);

  const [resultWinner, setResultWinner] = useState("");
  const [histWinner, setHistWinner] = useState([
    {
      name: "",
      id: 0,
    },
  ]);

  const onSubmit = () => {
    if (!peoples) {
      return toast.error("Kişi boş kalamaz!");
    }
    const result = (num) => {
      const winnerNumber = Math.floor(Math.random() * num);
      const winner = peoples[winnerNumber];

      return winner;
    };
    const numberOfEntries = peoples.length;

    const winner = result(numberOfEntries).name;

    setResultWinner(winner);
    setHistWinner([
      ...histWinner,
      {
        name: winner,
        id: histWinner.length + 1,
      },
    ]);
  };

  return (
    <Layout title="Rastgele Çekiliş Yap">
      <section className="text-center p-8">
        <div className="mx-auto mb-8 max-w-lg rounded-lg py-10 px-5 text-center bg-white dark:bg-gray-900 sm:px-10">
          <h2 className="relative text-3xl w-full text-center font-bold">
            Rastgele Çekiliş Yap
          </h2>

          <AppsGiveaway
            setName={setName}
            peoples={peoples}
            setPeoples={setPeoples}
          />
          <div className="w-full">
            <button
              onClick={() => onSubmit()}
              className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
            >
              Kazananı Belirle
            </button>
          </div>

          {resultWinner.length > 1 && (
            <GiveawayWinner
              name={name}
              histWinner={histWinner}
              resultWinner={resultWinner}
            />
          )}
        </div>
      </section>
    </Layout>
  );
};

export default RandomGiveawayPage;
