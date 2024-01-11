import classNames from "classnames";
import React from "react";

interface IQrcodeProp {
  activeTab: string;
  setActiveTab: (activeTab) => void;
}

export const QrcodeButtons: React.FC<IQrcodeProp> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between">
      <button
        className={classNames(
          "py-2 px-5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 rounded-lg dark:hover:bg-gray-800 duration-200",
          { "bg-gray-200 dark:bg-gray-800": activeTab == "url" },
        )}
        onClick={() => setActiveTab("url")}
      >
        URL QR Kodu
      </button>
      <button
        className={classNames(
          "py-2 px-5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 rounded-lg dark:hover:bg-gray-800 duration-200",
          { "bg-gray-200 dark:bg-gray-800": activeTab == "text" },
        )}
        onClick={() => setActiveTab("text")}
      >
        Metin QR Kodu
      </button>
    </div>
  );
};
