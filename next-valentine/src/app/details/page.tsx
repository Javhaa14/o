"use client";
import { useEffect, useState } from "react";

interface DateEntry {
  _id: string;
  id: number;
  timestamp: string;
  activities: string[];
  time: string;
  dateConfirmed: boolean;
  date: string;
  day: string;
}

export default function DetailsPage() {
  const [latest, setLatest] = useState<DateEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.dates.length > 0) {
          setLatest(data.dates[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-violet-200 p-4">
        <div className="text-rose-600 font-bold text-lg sm:text-xl animate-pulse">
          Уншиж байна...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-violet-200 p-4">
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-4 sm:p-8 w-full max-w-lg flex flex-col items-center animate-fade-in">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-rose-600 mb-4 sm:mb-6 drop-shadow-lg text-center leading-tight">
          Болзооны дэлгэрэнгүй мэдээлэл
        </h1>

        <div className="w-full space-y-4 sm:space-y-6">
          {/* Date Details Section */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-rose-200 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-rose-600 mb-3 sm:mb-4 text-center">
              📅 Болзооны мэдээлэл
            </h2>
            <div className="space-y-2 sm:space-y-3 text-rose-700">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">🗓️</span>
                <span className="font-semibold text-sm sm:text-base">
                  {latest
                    ? `${latest.date} - ${latest.day}`
                    : "2025.06.27 - Бямба гариг"}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl">🕐</span>
                <span className="font-semibold text-sm sm:text-base">
                  Цаг: {latest ? latest.time : "14:00"}
                </span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl mt-1">🎯</span>
                <span className="font-semibold text-sm sm:text-base">
                  Үйл ажиллагаа:{" "}
                  {latest && latest.activities.length > 0
                    ? latest.activities.join(", ")
                    : "Кино үзэх + Кофе"}
                </span>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl mt-1">📍</span>
                <span className="font-semibold text-sm sm:text-base">
                  Хаана эхэлж уулзахаа DM-ээр ярилцацгаая!
                </span>
              </div>
            </div>
          </div>

          {/* Warnings Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 sm:p-6 border border-yellow-200 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-3 sm:mb-4 text-center">
              ⚠️ Чухал анхааруулга
            </h2>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4 text-orange-700">
              <div className="flex w-full max-w-[350px] items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl mt-1">😳</span>
                <div>
                  <span className="font-semibold text-sm sm:text-base">
                    Энэ бол бидний анхны болзоо!
                  </span>
                  <p className="text-xs sm:text-sm mt-1">
                    Би бага зэрэг ичимхий байж магадгүй
                  </p>
                </div>
              </div>
              <div className="flex w-full max-w-[350px] items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl mt-1">🧑</span>
                <div>
                  <span className="font-semibold text-sm sm:text-base">
                    Хэтэрхий өндөр хүлээлт битгий тавиарай!
                  </span>
                  <p className="text-xs sm:text-sm mt-1">
                    Би байдаг л нэг монгол залуу шүү хха
                  </p>
                </div>
              </div>
              <div className="flex w-full max-w-[350px] items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl mt-1">❗</span>
                <div>
                  <span className="font-semibold text-sm sm:text-base">
                    Анхаар!
                  </span>
                  <p className="text-xs sm:text-sm mt-1">
                    Хэрэв Жаргал хэтэрхий хөөрхөн байвал өөрийн эрхгүй үнсчихэж
                    магадгүй!!!
                  </p>
                </div>
              </div>
              <div className="flex w-full max-w-[350px] items-start gap-2 sm:gap-3">
                <span className="text-xl sm:text-2xl mt-1">🌡️</span>
                <div>
                  <span className="font-semibold text-sm sm:text-base">
                    Маргааш 29 градус°
                  </span>
                  <p className="text-xs sm:text-sm mt-1">
                    Нарны тосоо мосоо түрхэхээ мартваа
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Excited Message */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-violet-200 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-violet-600 mb-3 sm:mb-4 text-center">
              Маргааш гүнжийг харах нь!
            </h2>
            <div className="text-center space-y-3 text-violet-700">
              <div className="flex justify-center mt-3 sm:mt-4">
                <img
                  src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemZ5MGkxenZsanpvZmNkNGRnMHN3cnM3c3o5bnJmeHRiNGZqanhmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT5LMHxhOfscxPfIfm/giphy.gif"
                  alt="Excited gif"
                  width={128}
                  height={128}
                  className="w-24 sm:w-32 h-24 sm:h-32 rounded-full object-cover border-4 border-violet-200 shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="w-full py-2 sm:py-3 rounded-xl bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 text-gray-700 font-bold text-base sm:text-lg shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150 border border-gray-300 touch-manipulation">
            Буцах
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
