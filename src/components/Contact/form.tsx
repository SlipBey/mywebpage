import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import webhook from "webhook-discord";

export const ContactForm: React.FC = () => {
  const [disabledTrue, setDisabled] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("istek");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedNumber);
  };

  const formatPhoneNumber = (input: string) => {
    const cleaned = ("" + input).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,4})$/);
    if (match) {
      const formatted = `${match[1]} ${match[2]} ${match[3]}`;
      return formatted.trim();
    }
    return input;
  };

  const Hook = new webhook.Webhook(
    "https://ptb.discord.com/api/webhooks/1135216977259008061/0V_Xn8_CpI9B0Djmg8kDMlKQ-CUKsJVgxF9LnhPR4artJUviAu8D6rFoHBskHgZ5zMGK",
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && surname && email && subject && message) {
      const msg = new webhook.MessageBuilder()
        .setName(name + " " + surname)
        .setText(
          `Mail: ${email} - Telefon: ${phoneNumber} - Konu: ${subject} \nMesaj: ${message}`,
        );
      Hook.send(msg);

      setDisabled(!disabledTrue);
      toast.success("Mesajınız başarıyla iletildi!");
    } else {
      toast.error("Lütfen boş alan bırakmayınız!");
    }
  };

  return (
    <form className="grid grid-cols-1 gap-2" onSubmit={onSubmit}>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex flex-col justify-left text-left items-left">
          <label>
            İsminiz <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
            required
            disabled={disabledTrue}
          />
        </div>
        <div className="flex flex-col justify-left text-left items-left">
          <label>
            Soyisminiz <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            onChange={(e) => setSurname(e.target.value)}
            className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
            required
            disabled={disabledTrue}
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex flex-col justify-left text-left items-left">
          <label>
            Mail Adresiniz <span className="text-red-600">*</span>
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
            required
            disabled={disabledTrue}
          />
        </div>
        <div className="flex flex-col justify-left text-left items-left">
          <label>Telefon Numaranız</label>
          <input
            type="tel"
            disabled={disabledTrue}
            maxLength={12}
            minLength={12}
            placeholder="Başına 0 koymayın."
            className="w-64 rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
            pattern="\d{0,3} \d{0,3} \d{0,4} \d{0,4}"
            value={phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col justify-left text-left items-left">
        <label>
          Konu <span className="text-red-600">*</span>
        </label>
        <select
          disabled={disabledTrue}
          onChange={(e) => setSubject(e.target.value)}
          defaultValue="istek"
          className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
          required
        >
          <option value="istek">İstek/Öneri</option>
          <option value="teklif">İş Teklifi</option>
          <option value="bildirim">Geri Bildirim</option>
        </select>
      </div>
      <div className="flex flex-col justify-left text-left items-left">
        <label>
          Mesajınız <span className="text-red-600">*</span>
        </label>
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded bg-gray-100 px-2 py-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
          required
        />
      </div>
      <div>
        <button
          aria-label="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
          disabled={disabledTrue}
        >
          Gönder
        </button>
      </div>
    </form>
  );
};
