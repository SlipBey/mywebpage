/* eslint-disable @typescript-eslint/no-explicit-any */

import { FiX } from "react-icons/fi";

interface IGiveawayProp {
  setName: any;
  peoples: any;
  setPeoples: any;
}

export const AppsGiveaway: React.FC<IGiveawayProp> = ({
  setName,
  peoples,
  setPeoples,
}) => {
  const updatePeople = async (e, reference) => {
    reference.name = e.target.value;
    const index = peoples.findIndex((ref) => ref.id == reference.id);
    peoples[index] = reference;
    setPeoples(peoples);
  };

  const removePeople = (peopleId: string) => {
    const updatedPeople = peoples.filter((people) => people !== peopleId);
    setPeoples(updatedPeople);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div className="flex flex-col justify-left text-left items-left w-full">
        <label>Çekiliş İsmi</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Opsiyonel"
          className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
      <div className="flex flex-col justify-left text-left items-left w-full">
        <label>
          Kişiler({peoples.length}) <span className="text-red-600">*</span>
        </label>
        <div className="flex flex-col gap-3">
          {peoples.map((r, idx) => (
            <div className="relative flex flex-row gap-3 w-full items-center" key={idx}>
              <input
                type="text"
                placeholder="İsim"
                className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
                onChange={(e) => updatePeople(e, r)}
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
    </div>
  );
};
