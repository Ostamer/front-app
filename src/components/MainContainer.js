import React, { useState, useRef } from "react";

const MainContainer = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing the microphone: ", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <p className="text-lg mb-4">Нажмите для записи аудио</p>
        {isRecording ? (
          <button
            onClick={stopRecording}
            className="bg-red-500 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
          >
            Остановить запись
          </button>
        ) : (
          <button
            onClick={startRecording}
            className="bg-blue-500 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          >
            Запись
          </button>
        )}
        {audioUrl && (
          <div className="mt-4">
            <audio controls src={audioUrl}></audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContainer;
