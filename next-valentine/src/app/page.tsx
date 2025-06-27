"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const sadGifs = [
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2c3bjljZWM2bmNrZHM3MjVjNDRtMWdqaHk1NDlzNTUxeGhobmkyaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2K5jinAlChoCLS/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHh3aGJ5NnR4ZG11dHF4OWthOGZ3NGVndzloeDZtNXBpem5mYWx4eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xTiTnIilwuFFFpf2Cc/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTRpZXV6bWtqa2ZiZ2hpaTAza25wa2dzbGdmN2Ywank5ZHI3bmxndiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MwOuiiTfWfWgM/giphy.gif",
  "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3J4dzBkNGFnMzB5Z3huaGg5MmlhMTh3bGVhdDZoeGs3OWtpN3RtaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/srVgXpqz5QdTG/giphy.gif",
  "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTBuOXJydHc2amFpa21qMXpjeW5haHBjODRzd2FpcnFzd2JmZnBveCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qUIm5wu6LAAog/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTY4a3h4NXExMTF2aGxlenVmZHVsaWU5ZDBudmg3aTZrZTBlNGg3OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W0c3xcZ3F1d0EYYb0f/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmduZHZ2YmdvcnBtN2YwOWo0bjY3d25kYzl0ZTVnMmZ3czJnMWhieiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/O3JyUHiKqsviE/giphy.gif",
];
const happyGifs = [
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExemZ5MGkxenZsanpvZmNkNGRnMHN3cnM3c3o5bnJmeHRiNGZqanhmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT5LMHxhOfscxPfIfm/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGYwNmNzOGZkY2VzYXM1bmUwd2szNno2aWo3aXZmeTYwOHVuZGMxOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/11sBLVxNs7v6WA/giphy.gif",
  "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXFhbWMza2QxMmlmaXE0bTdrNzN6N3I2ZzB5dmliNHJobXB3YjBkYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tFSqMSMnzPRTAdvKyr/giphy.gif",
];
const messages = [
  "Андуураад дарцан уу?",
  "Яаж байна????",
  "Ээлдээ",
  "Уйллаа шүү",
  "Чи итгэлтэй байна уу??",
  "Айй life-аа гэж",
  "Жаргалааааааааааааа",
];

export default function Home() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [sadGifIndex, setSadGifIndex] = useState(0);
  const [happyGifIndex, setHappyGifIndex] = useState(0);
  const [gif, setGif] = useState(sadGifs[0]);
  const [yesSize, setYesSize] = useState(1);
  const [isHappy, setIsHappy] = useState(false);
  const [started, setStarted] = useState(false);
  const router = useRouter();

  function handleNoClick() {
    if (!started) {
      setStarted(true);
      setGif(sadGifs[0]);
      setMessageIndex(0);
      setSadGifIndex(0);
      setYesSize(1);
      setIsHappy(false);
      return;
    }
    setGif(sadGifs[(sadGifIndex + 1) % sadGifs.length]);
    setSadGifIndex((sadGifIndex + 1) % sadGifs.length);
    setMessageIndex((messageIndex + 1) % messages.length);
    setYesSize((size) => Math.min(size * 1.3, 4));
    setIsHappy(false);
  }

  function handleYesClick() {
    setGif(happyGifs[(happyGifIndex + 1) % happyGifs.length]);
    setHappyGifIndex((happyGifIndex + 1) % happyGifs.length);
    setIsHappy(true);
    setTimeout(() => {
      router.push("/yes");
    }, 1200);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-violet-200 p-4">
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-4 sm:p-8 w-full max-w-md flex flex-col items-center animate-fade-in">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-600 mb-4 sm:mb-6 drop-shadow-lg text-center leading-tight">
          Надтай хамт болзоонд явах уу?
        </h1>
        {started && (
          <div className="w-48 sm:w-56 md:w-64 h-36 sm:h-40 md:h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white/60 mb-6 sm:mb-8 animate-fade-in">
            <img
              src={gif}
              alt="Reaction gif"
              width={256}
              height={192}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        )}
        <div className="flex flex-col gap-4 sm:gap-6 w-full items-center">
          <button
            className="yes-button w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500 text-white font-bold text-base sm:text-lg shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150 mb-2 touch-manipulation"
            style={{ fontSize: `${yesSize}em`, transition: "font-size 0.3s" }}
            onClick={handleYesClick}
            disabled={isHappy}>
            Тэгье
          </button>
          <button
            className="no-button w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-gray-300 via-rose-200 to-pink-200 text-rose-600 font-bold text-base sm:text-lg shadow hover:scale-105 active:scale-95 transition-transform duration-150 border border-rose-200 touch-manipulation"
            onClick={handleNoClick}
            disabled={isHappy}>
            {!started ? "Явкүээээ" : messages[messageIndex]}
          </button>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s both;
        }

        /* Mobile-specific touch improvements */
        @media (max-width: 640px) {
          .touch-manipulation {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }

          button:active {
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}
