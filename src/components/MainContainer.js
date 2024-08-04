import React, { useState } from "react";

const MainContainer = () => {
  const [inputText, setInputText] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTextAndGetPdf = async () => {
    if (!inputText) return;

    try {
      const response = await fetch("https://myfirstapp-w2u6.onrender.com/api/upload-audio/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (response.ok) {
        const pdfBlob = await response.blob();
        setPdfUrl(URL.createObjectURL(pdfBlob));
      } else {
        console.error("Ошибка отправки текста");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <p className="text-lg mb-4">Введите текст для создания заявки</p>
        <textarea
          value={inputText}
          onChange={handleTextChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          rows="4"
          placeholder="Введите текст здесь..."
        ></textarea>
        <button
          onClick={handleTextAndGetPdf}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Отправить текст и получить PDF
        </button>
        {pdfUrl && (
          <div className="mt-4">
            <a
              href={pdfUrl}
              download="transcription.pdf"
              className="bg-yellow-500 text-white p-2 mt-2 rounded-lg"
            >
              Скачать PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
