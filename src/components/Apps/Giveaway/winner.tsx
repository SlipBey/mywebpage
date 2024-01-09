interface IHistWinner {
  name: string;
  id: number;
}

interface IGiveawayProp {
  name: string;
  histWinner: IHistWinner[];
  resultWinner: string;
}

export const GiveawayWinner: React.FC<IGiveawayProp> = ({
  name,
  histWinner,
  resultWinner,
}) => {
  return (
    <div className="mt-5">
      <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg text-left">
        {name && (
          <div>
            Çekiliş Adı: <strong>{name}</strong>
          </div>
        )}
        <div>
          Geçmiş Kazananlar:{" "}
          {histWinner
            .filter((w) => w.name.length >= 3)
            .map((w) => (
              <strong key={w.id}>
                {w.id - 1}-{w.name}{" "}
              </strong>
            ))}
        </div>
        <div>
          Toplam Çekiliş Sayısı: <strong>{histWinner.length - 1}</strong>
        </div>
        <div>
          Kazanan: <strong>{resultWinner}</strong>{" "}
        </div>
      </div>
    </div>
  );
};
