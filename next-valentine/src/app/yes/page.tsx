"use client";
import { useState, useRef } from "react";

const DEFAULT_ACTIVITIES = [
  "Кино үзэх",
  "Кофе уух",
  "Паркaар зугаалах",
  "Хоол идэх",
  "Тоглоомын төв орох",
];

export default function YesPage() {
  const [activities, setActivities] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [warning, setWarning] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const available = DEFAULT_ACTIVITIES.filter(
    (a) =>
      !activities.includes(a) && a.toLowerCase().includes(input.toLowerCase())
  );

  function addActivity(activity: string) {
    if (!activity.trim() || activities.includes(activity)) return;
    setActivities([...activities, activity]);
    setInput("");
    setDropdown(false);
    inputRef.current?.focus();
  }

  function removeActivity(activity: string) {
    setActivities(activities.filter((a) => a !== activity));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activities.length || !time) {
      setWarning("Бүх талбарыг бөглөнө үү!");
      return;
    }
    setWarning("");
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-rose-100 to-violet-200">
      <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 sm:p-12 w-full max-w-md flex flex-col items-center animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-rose-600 mb-6 drop-shadow-lg text-center">
          Явмаар байгааг чинь мэдсиймаа!
        </h1>
        {!submitted ? (
          <form
            className="w-full flex flex-col gap-6"
            onSubmit={handleSubmit}
            autoComplete="off">
            <div>
              <label className="block text-lg font-semibold text-rose-500 mb-2">
                Ямар activity хийх вэ?
              </label>
              <div className="flex flex-wrap gap-2 mb-2 min-h-[44px]">
                {activities.map((activity) => (
                  <span
                    key={activity}
                    className="flex items-center bg-gradient-to-r from-rose-400 via-pink-400 to-violet-400 text-white px-3 py-1 rounded-full shadow-md animate-pop-in">
                    {activity}
                    <button
                      type="button"
                      onClick={() => removeActivity(activity)}
                      className="ml-2 text-white/80 hover:text-white/100 focus:outline-none"
                      aria-label="Remove activity">
                      ×
                    </button>
                  </span>
                ))}
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 min-w-[120px] bg-transparent outline-none text-rose-600 placeholder:text-rose-300 px-2 py-1"
                  placeholder="Activity сонгох эсвэл нэмэх..."
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setDropdown(true);
                  }}
                  onFocus={() => setDropdown(true)}
                  onBlur={() => setTimeout(() => setDropdown(false), 150)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && input.trim()) {
                      e.preventDefault();
                      addActivity(input.trim());
                    }
                  }}
                />
              </div>
              {dropdown &&
                (available.length > 0 ||
                  (input && !activities.includes(input))) && (
                  <div className="absolute z-20 mt-1 w-full max-w-md bg-white/90 border border-rose-200 rounded-xl shadow-lg overflow-hidden animate-fade-in">
                    {available.map((a) => (
                      <div
                        key={a}
                        className="px-4 py-2 cursor-pointer hover:bg-rose-100 text-rose-600 text-base"
                        onMouseDown={() => addActivity(a)}>
                        {a}
                      </div>
                    ))}
                    {input &&
                      !activities.includes(input) &&
                      !DEFAULT_ACTIVITIES.includes(input) && (
                        <div
                          className="px-4 py-2 cursor-pointer hover:bg-violet-100 text-violet-600 text-base font-semibold"
                          onMouseDown={() => addActivity(input)}>
                          ➕ '{input}' нэмэх
                        </div>
                      )}
                  </div>
                )}
            </div>
            <div>
              <label className="block text-lg font-semibold text-rose-500 mb-2">
                Хэдэн цагт уулзах вэ?
              </label>
              <input
                type="time"
                className="w-full rounded-lg border border-rose-200 px-4 py-2 text-rose-600 bg-white/80 focus:ring-2 focus:ring-rose-300 focus:outline-none shadow-sm"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            {warning && (
              <div className="text-rose-600 font-bold text-center animate-shake">
                {warning}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-violet-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-150">
              Илгээх
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <h2 className="text-2xl font-bold text-rose-600">
              Баярлалаа! Удахгүй уулзая 💖
            </h2>
            <div className="w-64 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-white/60">
              <img
                src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2l6OGp4dHlta3kyZTB1dDFrdXJ5OTZrbGlpOGNhYmc0cHMxZ2RxNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Xft2d1ir6iMAzMju3K/giphy.gif"
                alt="Happy gif"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes pop-in {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pop-in {
          animation: pop-in 0.2s cubic-bezier(0.4, 2, 0.6, 1) both;
        }
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
        @keyframes shake {
          10%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          80% {
            transform: translateX(4px);
          }
          30%,
          50%,
          70% {
            transform: translateX(-8px);
          }
          40%,
          60% {
            transform: translateX(8px);
          }
        }
        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}
