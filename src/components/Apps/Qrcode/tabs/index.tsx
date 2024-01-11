import React from "react";
import { QrcodeButtons } from "./buttons";

interface IQrcodeProp {
  activeTab: string;
  setActiveTab: (activeTab) => void;
  url: string;
  setURL: (url) => void;
  text: string;
  setText: (text) => void;
  width: string;
  setWidth: (width) => void;
  color: string;
  setColor: (color) => void;
  background: string;
  setBackground: (background) => void;
}

export const AppsQrcodeTabs: React.FC<IQrcodeProp> = ({
  activeTab,
  setActiveTab,
  url,
  setURL,
  text,
  setText,
  width,
  setWidth,
  color,
  setColor,
  background,
  setBackground,
}) => {
  return (
    <div className="my-5 flex flex-col justify-center items-center gap-3 w-full text-left">
      <QrcodeButtons activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "url" && (
        <div className="flex flex-col w-full">
          <label>Yönlendirilecek URL</label>
          <input
            type="text"
            placeholder="Yönlendirilecek URL"
            className="w-full rounded bg-gray-100 p-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
            onChange={(e) => setURL(e.target.value)}
            value={url}
          />
        </div>
      )}
      {activeTab === "text" && (
        <div className="flex flex-col w-full">
          <label>Metin</label>
          <textarea
            placeholder="Yönlendirilecek Yazi"
            className="w-full rounded bg-gray-100 p-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
        </div>
      )}
      <div className="flex flex-col w-full">
        <label>Boyut</label>
        <input
          type="number"
          placeholder="Genişlik & Yükseklik"
          className="w-full rounded bg-gray-100 p-2 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200"
          onChange={(e) => setWidth(e.target.value)}
          value={width}
        />
      </div>
      <div className="flex flex-col w-full">
        <label>QR Rengi</label>
        <input
          type="color"
          className="w-full rounded bg-gray-100 p-2 h-12 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200 hover:cursor-pointer"
          onChange={(e) => setColor(e.target.value)}
          value={color}
        />
      </div>
      <div className="flex flex-col w-full">
        <label>Arkaplan Rengi</label>
        <input
          type="color"
          className="w-full rounded bg-gray-100 p-2 h-12 font-medium text-gray-800 outline-none dark:bg-gray-800 dark:text-gray-200 hover:cursor-pointer"
          onChange={(e) => setBackground(e.target.value)}
          value={background}
        />
      </div>
    </div>
  );
};
