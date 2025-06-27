"use client";
import { useState } from "react";

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function testEmail() {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        message: 'Серверт холбогдоход алдаа гарлаа!',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-violet-200">
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md flex flex-col items-center animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-6 drop-shadow-lg text-center">
          🧪 Имэйл тест
        </h1>
        
        <p className="text-center text-rose-700 mb-8">
          Gmail тохиргоог шалгаж, тест имэйл илгээх
        </p>

        <button
          onClick={testEmail}
          disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-lg shadow-lg transition-transform duration-150 mb-6 ${
            loading 
              ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed"
              : "bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500 text-white hover:scale-105"
          }`}>
          {loading ? "⏳ Тест хийж байна..." : "🧪 Имэйл тест хийх"}
        </button>

        {result && (
          <div className={`w-full rounded-2xl p-6 border-2 ${
            result.success 
              ? "bg-green-50 border-green-200" 
              : "bg-red-50 border-red-200"
          }`}>
            <h3 className={`font-bold text-lg mb-3 ${
              result.success ? "text-green-700" : "text-red-700"
            }`}>
              {result.success ? "✅ Амжилттай!" : "❌ Алдаа гарлаа"}
            </h3>
            
            <p className={`mb-3 ${
              result.success ? "text-green-600" : "text-red-600"
            }`}>
              {result.message}
            </p>

            {result.error && (
              <div className="bg-gray-100 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700 font-mono">
                  <strong>Алдаа:</strong> {result.error}
                </p>
              </div>
            )}

            {result.details && (
              <div className="bg-gray-100 rounded-lg p-3">
                <h4 className="font-semibold text-gray-700 mb-2">Дэлгэрэнгүй:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>📧 Имэйл: {result.details.user || 'Тодорхойгүй'}</li>
                  <li>🔑 Нууц үгийн урт: {result.details.passLength} тэмдэгт</li>
                  <li>🔧 Сервер: smtp.gmail.com:587</li>
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-center">
          <a 
            href="/"
            className="text-rose-600 hover:text-rose-700 font-semibold">
            ← Үндсэн хуудас руу буцах
          </a>
        </div>
      </div>
    </div>
  );
} 