"use client";
import { useState, useEffect } from "react";

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

export default function AdminPage() {
  const [dates, setDates] = useState<DateEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDates();
  }, []);

  async function fetchDates() {
    try {
      const response = await fetch("/api/dates");
      const data = await response.json();

      if (data.success) {
        setDates(data.dates);
        setError(""); // clear any previous error
      } else {
        setError(data.message || "Алдаа гарлаа");
      }
    } catch (err: unknown) {
      // Explicitly cast the error to a string
      const message = err instanceof Error ? err.message : "Алдаа гарлаа";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-violet-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
          <p className="text-rose-600 font-semibold">Уншиж байна...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-violet-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-6 text-center">
            📊 Болзооны удирдлага
          </h1>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-600">
                  🗄️ MongoDB Atlas
                </h3>
                <p className="text-blue-700 text-sm">Cloud Database</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✅ Online
                </span>
                <p className="text-blue-600 text-xs mt-1">
                  valentine-app.dates
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700 text-center">{error}</p>
            </div>
          )}

          <div className="text-center mb-6">
            <p className="text-lg text-rose-700">
              Нийт болзоо:{" "}
              <span className="font-bold text-2xl text-rose-600">
                {dates.length}
              </span>
            </p>
          </div>
        </div>

        {dates.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 text-center">
            <p className="text-rose-600 text-lg">
              Одоогоор болзоо байхгүй байна.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {dates.map((date) => (
              <div
                key={date._id}
                className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-rose-600 mb-2">
                      🆔 Бүртгэл #{date.id}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      📅 {formatDate(date.timestamp)}
                    </p>
                  </div>
                  <div className="mt-2 lg:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        date.dateConfirmed
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {date.dateConfirmed
                        ? "✅ Баталгаажсан"
                        : "❌ Баталгаажаагүй"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <h3 className="font-semibold text-blue-600 mb-2">
                      📅 Огноо
                    </h3>
                    <p className="text-blue-700">
                      {date.date} - {date.day}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <h3 className="font-semibold text-green-600 mb-2">
                      🕐 Цаг
                    </h3>
                    <p className="text-green-700">{date.time}</p>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4">
                  <h3 className="font-semibold text-purple-600 mb-2">
                    🎯 Үйл ажиллагаанууд
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {date.activities.map((activity, index) => (
                      <span
                        key={index}
                        className="bg-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm"
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={fetchDates}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500 text-white font-bold shadow-lg hover:scale-105 transition-transform duration-150"
          >
            🔄 Дахин татах
          </button>
        </div>
      </div>
    </div>
  );
}
