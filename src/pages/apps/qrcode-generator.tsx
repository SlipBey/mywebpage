import { AppsQrcodeTabs } from "@/components/Apps/Qrcode/tabs";
import { Layout } from "@/components/Layout";
import { NextPage } from "next";
import QRCode from "qrcode.react";
import { useState } from "react";

const QrCodePage: NextPage = () => {
  const [activeTab, setActiveTab] = useState("url");

  const [url, setURL] = useState("https://www.slipyme.com");
  const [text, setText] = useState("Bu bir örnek metindir.");
  const [width, setWidth] = useState("150");
  const [color, setColor] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");

  const downloadQRCode = () => {
    const canvas = document.getElementById(
      "qrcode-canvas",
    ) as HTMLCanvasElement;

    if (canvas) {
      const url = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = url;
      a.download = "slipbey-qrcode.png";

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
    }
  };

  return (
    <Layout title="QR Oluşturucu">
      <section className="text-center p-8">
        <div className="mx-auto mb-8 max-w-lg rounded-lg py-10 px-5 text-center bg-white dark:bg-gray-900 sm:px-10">
          <h2 className="relative text-3xl w-full text-center font-bold">
            QR Kod Oluşturucu
          </h2>
          <div className="mt-5">
            <AppsQrcodeTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              url={url}
              setURL={setURL}
              text={text}
              setText={setText}
              width={width}
              setWidth={setWidth}
              color={color}
              setColor={setColor}
              background={background}
              setBackground={setBackground}
            />
            <h2 className="relative text-2xl w-full text-center font-bold">
              QR Kod
            </h2>
            <div className="flex justify-center my-3">
              <QRCode
                id="qrcode-canvas"
                value={activeTab === "url" ? url : text}
                size={Number(width)}
                bgColor={background}
                fgColor={color}
              />
            </div>
            <button
              onClick={() => downloadQRCode()}
              className="mt-2 bg-blue-600 hover:bg-blue-700 w-full p-3 rounded-lg font-semibold text-lg duration-200 text-white"
            >
              İndir
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default QrCodePage;
