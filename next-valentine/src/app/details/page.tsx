"use client";
import { useState } from "react";

export default function DetailsPage() {
  const [showWarnings, setShowWarnings] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-violet-200">
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-lg flex flex-col items-center animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-6 drop-shadow-lg text-center">
          Болзооны дэлгэрэнгүй мэдээлэл
        </h1>

        <div className="w-full space-y-6">
          {/* Date Details Section */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border border-rose-200 shadow-lg">
            <h2 className="text-2xl font-bold text-rose-600 mb-4 text-center">
              📅 Болзооны мэдээлэл
            </h2>
            <div className="space-y-3 text-rose-700">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🕐</span>
                <span className="font-semibold">Цаг: 14:00</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <span className="font-semibold">
                  Үйл ажиллагаа: Кино үзэх + Кофе
                </span>
              </div>
              <div className="flex items-center gap-3 ">
                <span className="text-2xl ml-2">📍</span>
                <span className="font-semibold">
                  Хаана эхэлж уулзахаа DM-ээр ярилцацгаая!
                </span>
              </div>
            </div>
          </div>

          {/* Warnings Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 shadow-lg">
            <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">
              ⚠️ Чухал анхааруулга
            </h2>
            <div className="flex flex-col items-center space-y-4 text-orange-700">
              <div className="flex w-[350px] items-start gap-3">
                <span className="text-2xl mt-1">😳</span>
                <div>
                  <span className="font-semibold">
                    Энэ бол бидний анхны болзоо!
                  </span>
                  <p className="text-sm mt-1">
                    Би бага зэрэг ичимхий байж магадгүй
                  </p>
                </div>
              </div>
              <div className="flex w-[350px] items-start gap-3">
                <span className="text-2xl mt-1">🧑</span>
                <div>
                  <span className="font-semibold">
                    Хэтэрхий өндөр хүлээлт битгий тавиарай!
                  </span>
                  <p className="text-sm mt-1">
                    Би байдаг л нэг монгол залуу шүү хха
                  </p>
                </div>
              </div>
              <div className="flex w-[350px] items-start gap-3">
                <span className="text-2xl mx-2 mt-1">🌡️</span>
                <div>
                  <span className="font-semibold">Маргааш 29 градус°</span>
                  <p className="text-sm mt-1">
                    Нарны тосоо мосоо түрхэхээ мартваа
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Excited Message */}
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl p-6 border border-violet-200 shadow-lg">
            <h2 className="text-2xl font-bold text-violet-600 mb-4 text-center">
              Маргааш гүнжийг харах нь!
            </h2>
            <div className="text-center space-y-3 text-violet-700">
              <p className="text-lg font-semibold"></p>
              <div className="flex justify-center mt-4">
                <img
                  src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemZ5MGkxenZsanpvZmNkNGRnMHN3cnM3c3o5bnJmeHRiNGZqanhmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT5LMHxhOfscxPfIfm/giphy.gif"
                  alt="Excited gif"
                  className="w-32 h-32 rounded-full object-cover border-4 border-violet-200 shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 text-gray-700 font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-150 border border-gray-300"
          >
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
      `}</style>
    </div>
  );
}
