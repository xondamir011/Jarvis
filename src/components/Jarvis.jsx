// import { useEffect, useRef, useState } from "react";

// export default function JARVIS() {
//   const recognitionRef = useRef(null);
//   const [listening, setListening] = useState(false);
//   const [lang, setLang] = useState("uz-UZ");
//   const [audioLevel, setAudioLevel] = useState(0);
//   const [commandInput, setCommandInput] = useState("");
//   const [commandHistory, setCommandHistory] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Clock update
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Speech Recognition Setup
//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.error("SpeechRecognition not supported");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = false;

//     recognition.onresult = (event) => {
//       const text = event.results[event.results.length - 1][0].transcript.trim();
//       console.log("Recognized:", text);
//       processCommand(text);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech recognition error:", event.error);
//       setListening(false);
//     };

//     recognitionRef.current = recognition;
//   }, [lang]);

//   // Audio level animation
//   useEffect(() => {
//     if (listening) {
//       const interval = setInterval(() => {
//         setAudioLevel(Math.random() * 100);
//       }, 150);
//       return () => clearInterval(interval);
//     } else {
//       setAudioLevel(0);
//     }
//   }, [listening]);

//   // Toggle voice listening
//   const toggleListening = () => {
//     const recognition = recognitionRef.current;
//     if (!recognition) return;

//     if (listening) {
//       recognition.stop();
//       setListening(false);
//     } else {
//       recognition.lang = lang;
//       recognition.start();
//       setListening(true);
//       addToHistory("🎤 Voice mode activated", "system");
//     }
//   };

//   // Add to history
//   const addToHistory = (message, type = "command") => {
//     setCommandHistory(prev => [...prev, { message, type, time: new Date() }]);
//   };

//   // Speak response
//   const speak = (text) => {
//     if ('speechSynthesis' in window) {
//       window.speechSynthesis.cancel(); // Cancel any ongoing speech
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.lang = lang.includes('uz') ? 'ru-RU' : lang;
//       utterance.rate = 1.0;
//       utterance.pitch = 1.0;
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   // Process Command
//   const processCommand = (command) => {
//     const cmd = command.toLowerCase().trim();
//     addToHistory(command, "command");

//     // Vaqt
//     if (cmd.includes('vaqt') || cmd.includes('время') || cmd.includes('time') || cmd.includes('soat')) {
//       const timeStr = currentTime.toLocaleTimeString(lang);
//       const response = `Hozir soat ${timeStr}`;
//       speak(response);
//       addToHistory(response, "response");
//       return;
//     }

//     // Sana
//     if (cmd.includes('sana') || cmd.includes('дата') || cmd.includes('date') || cmd.includes('kun')) {
//       const dateStr = currentTime.toLocaleDateString(lang, { 
//         weekday: 'long', 
//         year: 'numeric', 
//         month: 'long', 
//         day: 'numeric' 
//       });
//       const response = `Bugun ${dateStr}`;
//       speak(response);
//       addToHistory(response, "response");
//       return;
//     }

//     // Hisoblash
//     if (cmd.includes('hisobla') || cmd.includes('hisob') || cmd.includes('calculate') || cmd.includes('вычисл')) {
//       const mathExpression = cmd.replace(/hisobla|hisob|calculate|вычисл|qil|yig'indi|ayir|ko'paytir|bo'l/gi, '').trim();
//       try {
//         // Replace uzbek operators
//         let expr = mathExpression
//           .replace(/plyus|qo'sh/gi, '+')
//           .replace(/minus|ayir/gi, '-')
//           .replace(/ko'paytir/gi, '*')
//           .replace(/bo'l/gi, '/');

//         const result = eval(expr); // eslint-disable-line no-eval
//         const response = `Javob: ${result}`;
//         speak(response);
//         addToHistory(response, "response");
//       } catch (error) {
//         const errorMsg = 'Hisoblashda xatolik. Masalan: "2 plyus 2 hisobla"';
//         speak(errorMsg);
//         addToHistory(errorMsg, "error");
//       }
//       return;
//     }

//     // Qidiruv
//     if (cmd.includes('qidir') || cmd.includes('search') || cmd.includes('найти') || cmd.includes('googleni och')) {
//       const query = cmd.replace(/qidir|search|найти|google|da|ni/gi, '').trim();
//       const response = `Google da ${query} qidirilmoqda`;
//       speak(response);
//       addToHistory(response, "response");
//       window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
//       return;
//     }

//     // YouTube
//     if (cmd.includes('youtube') || cmd.includes('video')) {
//       const query = cmd.replace(/youtube|video|da|ko'rsat|och/gi, '').trim();
//       const response = `YouTube da video ochilmoqda`;
//       speak(response);
//       addToHistory(response, "response");
//       if (query) {
//         window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, '_blank');
//       } else {
//         window.open('https://www.youtube.com/', '_blank');
//       }
//       return;
//     }

//     // Musiqa
//     if (cmd.includes('musiqa') || cmd.includes('music') || cmd.includes('музыка') || cmd.includes('muzikani och')) {
//       const response = 'Musiqa dasturi ochilmoqda';
//       speak(response);
//       addToHistory(response, "response");
//       window.open('https://open.spotify.com/', '_blank');
//       return;
//     }

//     // Wikipedia
//     if (cmd.includes('wikipediya') || cmd.includes('wikipediyani och')) {
//       const query = cmd.replace(/vikipediya|wikipedia|da|haqida/gi, '').trim();
//       const response = `Wikipedia da qidirilmoqda`;
//       speak(response);
//       addToHistory(response, "response");
//       window.open(`https://uz.wikipedia.org/wiki/${encodeURIComponent(query)}`, '_blank');
//       return;
//     }

//     // Ob-havo
//     if (cmd.includes('ob-havo') || cmd.includes('погода') || cmd.includes('weather') || cmd.includes('ob-havoni och')) {
//       const response = 'Ob-havo ma\'lumotlari yuklanmoqda';
//       speak(response);
//       addToHistory(response, "response");
//       window.open('https://www.google.com/search?q=weather', '_blank');
//       return;
//     }

//     if (cmd.includes('telegram') || cmd.includes('телеграм') || cmd.includes('telegram') || cmd.includes('telegram och')) {
//       const response = 'Telegram ochilmoqda';
//       speak(response);
//       addToHistory(response, "response");
//       window.open('https://t.me', '_blank');
//       return;
//     }

//      if (cmd.includes('instagram') || cmd.includes('инстаграм') || cmd.includes('instagram') || cmd.includes('instagram och')) {
//       const response = 'Instagram ochilmoqda';
//       speak(response);
//       addToHistory(response, "response");
//       window.open('https://www.instagram.com', '_blank');
//       return;
//     }

//     // Yangiliklar
//     if (cmd.includes('yangilik') || cmd.includes('новост') || cmd.includes('news')) {
//       const response = 'Yangiliklar ochilmoqda';
//       speak(response);
//       addToHistory(response, "response");
//       window.open('https://news.google.com/', '_blank');
//       return;
//     }

//     // Yordam
//     if (cmd.includes('yordam') || cmd.includes('помощ') || cmd.includes('help')) {
//       const response = 'Men vaqt, sana, hisoblash, qidiruv, YouTube, musiqa va boshqa buyruqlarni bajara olaman';
//       speak(response);
//       addToHistory(response, "response");
//       return;
//     }

//     // Salom
//     if (cmd.includes('salom') || cmd.includes('привет') || cmd.includes('hello') || cmd.includes('assalom')) {
//       const greetings = [
//         'Salom! Men JARVIS. Sizga qanday yordam bera olaman?',
//         'Assalomu alaykum! Buyruqlaringizni kutmoqdaman.',
//         'Salom! Bugun sizga qanday yordam beraman?'
//       ];
//       const response = greetings[Math.floor(Math.random() * greetings.length)];
//       speak(response);
//       addToHistory(response, "response");
//       return;
//     }

//     // Xayr
//     if (cmd.includes('xayr') || cmd.includes('пока') || cmd.includes('bye')) {
//       const farewells = [
//         'Xayr! Kerak bo\'lsa chaqiring.',
//         'Ko\'rishguncha!',
//         'Xayr! Keyingi safar ko\'rishguncha.'
//       ];
//       const response = farewells[Math.floor(Math.random() * farewells.length)];
//       speak(response);
//       addToHistory(response, "response");
//       return;
//     }

//     // Noma'lum buyruq
//     const response = 'Kechirasiz, bu buyruqni tushunmadim. "Yordam" deb ayting.';
//     speak(response);
//     addToHistory(response, "error");
//   };

//   // Handle text command submit
//   const handleCommandSubmit = (e) => {
//     e.preventDefault();
//     if (!commandInput.trim()) return;
//     processCommand(commandInput);
//     setCommandInput("");
//   };

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.key === 'Escape') {
//         setCommandInput("");
//         if (listening) {
//           recognitionRef.current?.stop();
//           setListening(false);
//         }
//       }
//     };
//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, [listening]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');

//         @keyframes pulse-ring {
//           0%, 100% { transform: scale(1); opacity: 1; }
//           50% { transform: scale(1.3); opacity: 0; }
//         }

//         @keyframes rotate {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }

//         @keyframes glow {
//           0%, 100% { box-shadow: 0 0 20px rgba(0, 242, 254, 0.5), 0 0 40px rgba(0, 242, 254, 0.3); }
//           50% { box-shadow: 0 0 40px rgba(0, 242, 254, 0.8), 0 0 80px rgba(0, 242, 254, 0.5); }
//         }

//         @keyframes scan {
//           0% { transform: translateY(-100%); }
//           100% { transform: translateY(100%); }
//         }

//         .orbitron { font-family: 'Orbitron', sans-serif; }
//         .rajdhani { font-family: 'Rajdhani', sans-serif; }
//         .pulse-ring { animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
//         .rotate-slow { animation: rotate 20s linear infinite; }
//         .glow-effect { animation: glow 2s ease-in-out infinite; }
//         .scan-line { animation: scan 2s linear infinite; }

//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       <div className="rajdhani w-[80%] min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white overflow-hidden">

//         {/* Background Effects */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `linear-gradient(rgba(0, 242, 254, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 254, 0.1) 1px, transparent 1px)`,
//             backgroundSize: '50px 50px'
//           }} />
//         </div>

//         <div className="absolute inset-0 opacity-10">
//           <div className="scan-line absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent h-32 blur-sm" />
//         </div>

//         {/* Main Container */}
//         <div className="relative z-10 min-h-screen flex flex-col">

//           {/* Header */}
//           <header className="p-6 border-b border-cyan-900">
//             <div className="max-w-7xl mx-auto flex items-center justify-between">
//               <div>
//                 <h1 className="orbitron text-4xl font-black text-cyan-400 tracking-wider" style={{
//                   textShadow: '0 0 20px rgba(0, 242, 254, 0.8)'
//                 }}>
//                   J.A.R.V.I.S
//                 </h1>
//                 <p className="text-cyan-500 text-sm tracking-widest">
//                   Just A Rather Very Intelligent System
//                 </p>
//               </div>

//               <div className="text-right">
//                 <div className="orbitron text-3xl text-cyan-400 font-bold">
//                   {currentTime.toLocaleTimeString()}
//                 </div>
//                 <div className="text-cyan-500 text-sm">
//                   {currentTime.toLocaleDateString('uz-UZ', { weekday: 'long', month: 'long', day: 'numeric' })}
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Main Content */}
//           <main className="flex-1 flex gap-6 p-6 max-w-7xl mx-auto w-full">

//             {/* Left Panel - Voice Control */}
//             <div className="w-1/2 flex flex-col">

//               {/* Voice Circle */}
//               <div className="flex-1 flex items-center justify-center">
//                 <div className="relative">

//                   {/* Outer Rings */}
//                   {listening && (
//                     <>
//                       <div className="absolute inset-0 border-4 border-cyan-400 rounded-full pulse-ring" style={{
//                         width: '300px', height: '300px', left: '-50px', top: '-50px'
//                       }} />
//                       <div className="absolute inset-0 border-4 border-cyan-400 rounded-full pulse-ring" style={{
//                         width: '300px', height: '300px', left: '-50px', top: '-50px', animationDelay: '0.5s'
//                       }} />
//                     </>
//                   )}

//                   {/* Rotating Ring */}
//                   <div className="absolute inset-0 border-2 border-cyan-500 rounded-full rotate-slow opacity-50" style={{
//                     width: '240px', height: '240px', left: '-20px', top: '-20px',
//                     borderTopColor: 'transparent', borderRightColor: 'transparent'
//                   }} />

//                   {/* Main Circle */}
//                   <div 
//                     className={`relative w-52 h-52 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-300 ${
//                       listening ? 'border-cyan-400 bg-cyan-900 bg-opacity-30 glow-effect' : 'border-cyan-600 bg-gray-900 hover:border-cyan-500'
//                     }`}
//                     onClick={toggleListening}
//                   >
//                     {/* Audio Visualizer */}
//                     {listening && (
//                       <div className="absolute inset-0 flex items-center justify-center gap-1">
//                         {[...Array(12)].map((_, i) => (
//                           <div
//                             key={i}
//                             className="w-1 bg-cyan-400 rounded-full transition-all duration-150"
//                             style={{ height: `${Math.random() * audioLevel}%`, minHeight: '10%' }}
//                           />
//                         ))}
//                       </div>
//                     )}

//                     {/* Microphone Icon */}
//                     <div className={`relative z-10 transition-transform duration-300 ${listening ? 'scale-110' : ''}`}>
//                       <svg className={`w-24 h-24 ${listening ? 'text-cyan-400' : 'text-cyan-600'}`} fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
//                         <path fillRule="evenodd" d="M10 12a4 4 0 01-4-4v-1a1 1 0 00-2 0v1a6 6 0 0012 0v-1a1 1 0 00-2 0v1a4 4 0 01-4 4z" clipRule="evenodd" />
//                         <path d="M9 15v2H7a1 1 0 000 2h6a1 1 0 000-2h-2v-2a8.001 8.001 0 01-2 0z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Status */}
//               <div className="text-center mb-6">
//                 <p className="orbitron text-2xl font-bold text-cyan-400">
//                   {listening ? <span className="animate-pulse">● LISTENING</span> : <span className="text-cyan-600">○ STANDBY</span>}
//                 </p>
//                 <p className="text-cyan-300 mt-2 text-sm">
//                   {listening ? "Awaiting voice input..." : "Click to activate voice recognition"}
//                 </p>
//               </div>

//               {/* Language Selector */}
//               <div className="flex justify-center gap-3">
//                 {[
//                   { code: 'uz-UZ', label: 'UZB', flag: '🇺🇿' },
//                   { code: 'ru-RU', label: 'RUS', flag: '🇷🇺' },
//                   { code: 'en-US', label: 'ENG', flag: '🇺🇸' }
//                 ].map((language) => (
//                   <button
//                     key={language.code}
//                     onClick={() => setLang(language.code)}
//                     className={`px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all border-2 ${
//                       lang === language.code
//                         ? 'bg-cyan-500 bg-opacity-20 border-cyan-400 text-cyan-300'
//                         : 'bg-gray-800 bg-opacity-50 border-cyan-700 text-cyan-600 hover:border-cyan-500'
//                     }`}
//                   >
//                     <span className="text-xl mr-2">{language.flag}</span>
//                     {language.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Right Panel - Command Input & History */}
//             <div className="w-1/2 flex flex-col gap-4">

//               {/* Command Input */}
//               <div className="bg-gray-900 bg-opacity-50 border-2 border-cyan-700 rounded-lg p-6 backdrop-blur-sm">
//                 <h2 className="orbitron text-xl font-bold text-cyan-400 mb-4">COMMAND INTERFACE</h2>

//                 <form onSubmit={handleCommandSubmit}>
//                   <input
//                     value={commandInput}
//                     onChange={(e) => setCommandInput(e.target.value)}
//                     className="w-full px-4 py-3 bg-gray-800 border-2 border-cyan-700 rounded-lg text-cyan-300 focus:outline-none focus:border-cyan-400 transition-colors"
//                     placeholder="Type command..."
//                   />

//                   <button type="submit" className="w-full mt-4 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg 
//                   font-bold text-white transition-colors cursor-pointer orbitron">EXECUTE</button>
//                 </form>

//                 {/* Quick Commands */}
//                 <div className="mt-4 grid grid-cols-2 gap-2">
//                   {['Vaqt', 'Sana', 'wikipediya', 'Yordam', 'YouTube', 'Google', 'Telegram', 'Instagram'].map((cmd) => (
//                     <button
//                       key={cmd}
//                       onClick={() => processCommand(cmd)}
//                       className="px-3 py-2 cursor-pointer bg-gray-800 border border-cyan-700 rounded text-cyan-400 text-sm hover:bg-cyan-900 transition-colors">
//                       {cmd}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Command History */}
//               <div className="flex-1 bg-gray-900 bg-opacity-50 border-2 border-cyan-700 rounded-lg p-6 backdrop-blur-sm overflow-hidden flex flex-col">
//                 <h2 className="orbitron text-xl font-bold text-cyan-400 mb-4">COMMAND HISTORY</h2>

//                 <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2">
//                   {commandHistory.slice().reverse().map((item, i) => (
//                     <div key={i} className={`p-3 rounded ${
//                       item.type === 'command' ? 'bg-cyan-900 bg-opacity-30 border-l-4 border-cyan-400' :
//                       item.type === 'response' ? 'bg-blue-900 bg-opacity-30 border-l-4 border-blue-400' :
//                       item.type === 'error' ? 'bg-red-900 bg-opacity-30 border-l-4 border-red-400' :
//                       'bg-gray-800 bg-opacity-30 border-l-4 border-gray-500'
//                     }`}>
//                       <div className="text-xs text-gray-400">
//                         {item.time.toLocaleTimeString()}
//                       </div>
//                       <div className="text-sm text-cyan-200">
//                         {item.message}
//                       </div>
//                     </div>
//                   ))}

//                   {commandHistory.length === 0 && (
//                     <div className="text-center text-cyan-600 py-8">
//                       No commands yet. Start by saying "Salom" or typing a command.
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </main>

//           {/* Footer */}
//           <footer className="p-4 border-t border-cyan-900 text-center text-cyan-600 text-xs">
//             <p>STARK INDUSTRIES © JARVIS AI SYSTEM v3.0 • Press ESC to clear</p>
//           </footer>
//         </div>

//         {/* Corner Decorations */}
//         <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-600 opacity-50" />
//         <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-600 opacity-50" />
//         <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-cyan-600 opacity-50" />
//         <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-600 opacity-50" />
//       </div>
//     </>
//   );
// }



import { useEffect, useRef, useState } from "react";

export default function JARVIS() {
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [lang, setLang] = useState("uz-UZ");
  const [audioLevel, setAudioLevel] = useState(0);
  const [commandInput, setCommandInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const languageKey = lang.startsWith("uz")
    ? "uz"
    : lang.startsWith("ru")
      ? "ru"
      : "en";

  const translations = {
    uz: {
      time: "Hozir soat", date: "Bugun", answer: "Javob:",
      calcError: "Hisoblashda xatolik. Masalan: 2 plyus 2 hisobla.",
      search: "Google da qidirilmoqda", youtube: "YouTube da video ochilmoqda",
      music: "Musiqa dasturi ochilmoqda", wiki: "Wikipedia da qidirilmoqda",
      weather: "Ob-havo ma'lumotlari yuklanmoqda", telegram: "Telegram ochilmoqda",
      instagram: "Instagram ochilmoqda", news: "Yangiliklar ochilmoqda",
      help: "Men vaqt, sana, hisoblash, qidiruv, YouTube, musiqa va boshqa buyruqlarni bajara olaman.",
      hello: "Salom! Men JARVIS. Sizga qanday yordam bera olaman?",
      bye: "Xayr! Kerak bo'lsa chaqiring.", unknown: "Kechirasiz, bu buyruqni tushunmadim. Yordam deb ayting.",
      voiceOn: "Ovozli rejim yoqildi", listening: "Buyruqni tinglayapman...",
      standby: "Ovozli boshqaruvni boshlash uchun bosing", input: "Buyruq yozing...",
      execute: "BAJARISH", commandInterface: "BUYRUQLAR PANELI",
      history: "BUYRUQLAR TARIXI", empty: 'Hozircha buyruqlar yo‘q. "Salom" deb ayting.',
      clear: "Tozalash"
    },
    ru: {
      time: "Сейчас время", date: "Сегодня", answer: "Ответ:",
      calcError: "Ошибка вычисления. Например: скажите 2 плюс 2 вычислить.",
      search: "Выполняется поиск в Google", youtube: "Открываю видео на YouTube",
      music: "Открываю музыкальное приложение", wiki: "Выполняется поиск в Википедии",
      weather: "Загружаю информацию о погоде", telegram: "Открываю Telegram",
      instagram: "Открываю Instagram", news: "Открываю новости",
      help: "Я могу сообщать время и дату, выполнять вычисления, искать информацию, открывать YouTube, музыку и другие приложения.",
      hello: "Здравствуйте! Я JARVIS. Чем могу помочь?",
      bye: "До свидания! Если понадоблюсь, просто позовите.",
      unknown: "Извините, я не понял команду. Скажите: помощь.",
      voiceOn: "Голосовой режим включён", listening: "Ожидаю команду...",
      standby: "Нажмите, чтобы включить голосовое управление", input: "Введите команду...",
      execute: "ВЫПОЛНИТЬ", commandInterface: "ПАНЕЛЬ КОМАНД",
      history: "ИСТОРИЯ КОМАНД", empty: "Пока нет команд. Скажите «Привет».",
      clear: "Очистить"
    },
    en: {
      time: "The current time is", date: "Today is", answer: "The answer is:",
      calcError: "Calculation error. For example, say calculate 2 plus 2.",
      search: "Searching on Google", youtube: "Opening a video on YouTube",
      music: "Opening the music application", wiki: "Searching on Wikipedia",
      weather: "Loading weather information", telegram: "Opening Telegram",
      instagram: "Opening Instagram", news: "Opening the news",
      help: "I can tell you the time and date, calculate numbers, search the internet, and open YouTube, music and other applications.",
      hello: "Hello! I am JARVIS. How can I help you?",
      bye: "Goodbye! Call me whenever you need help.",
      unknown: "Sorry, I did not understand that command. Say help.",
      voiceOn: "Voice mode activated", listening: "Waiting for your command...",
      standby: "Click to activate voice recognition", input: "Type a command...",
      execute: "EXECUTE", commandInterface: "COMMAND INTERFACE",
      history: "COMMAND HISTORY", empty: 'No commands yet. Say "Hello" to begin.',
      clear: "Clear"
    }
  };

  const t = (key) => translations[languageKey][key];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Speech recognition is recreated whenever the selected language changes.
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      recognitionRef.current = null;
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (!result?.[0]?.transcript) return;
      processCommand(result[0].transcript.trim());
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error !== "no-speech") setListening(false);
    };

    recognition.onend = () => {
      // Do not restart automatically; user can press the microphone again.
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      try { recognition.stop(); } catch { }
      recognitionRef.current = null;
    };
    // Recognition must be rebuilt when the chosen recognition language changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    if (!listening) {
      setAudioLevel(0);
      return;
    }
    const interval = setInterval(() => setAudioLevel(Math.random() * 100), 150);
    return () => clearInterval(interval);
  }, [listening]);

  const addToHistory = (message, type = "command") => {
    setCommandHistory((prev) => [
      ...prev,
      { message, type, time: new Date() }
    ]);
  };

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const voices = window.speechSynthesis.getVoices();
    const selectedLanguage = lang.split("-")[0].toLowerCase();

    const voice = voices.find(
      (v) => v.lang.toLowerCase() === lang.toLowerCase()
    ) || voices.find(
      (v) => v.lang.toLowerCase().startsWith(selectedLanguage + "-")
    );

    if (!voice) {
      addToHistory(
        `${lang} uchun mos ovoz qurilmada topilmadi. Ovoz paketini o'rnatish kerak.`,
        "error"
      );
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const processCommand = (command) => {
    const cmd = command.toLowerCase().trim();
    if (!cmd) return;
    addToHistory(command, "command");

    const respond = (key, extra = "") => {
      const response = `${t(key)}${extra ? ` ${extra}` : ""}`;
      speak(response);
      addToHistory(response, "response");
    };

    // Time
    if (/(vaqt|soat|время|час|time)/i.test(cmd)) {
      respond("time", currentTime.toLocaleTimeString(lang));
      return;
    }

    // Date
    if (/(sana|bugun|kun|дата|сегодня|date|today)/i.test(cmd)) {
      respond("date", currentTime.toLocaleDateString(lang, {
        weekday: "long", year: "numeric", month: "long", day: "numeric"
      }));
      return;
    }

    // Calculator (safe arithmetic parser: only digits and arithmetic operators)
    if (/(hisobla|hisob|calculate|вычисл|посчитай)/i.test(cmd)) {
      let expr = cmd
        .replace(/hisobla|hisob|calculate|вычисл\w*|посчитай|qil/gi, "")
        .replace(/ko'paytir|умножить|times/gi, "*")
        .replace(/bo'l|разделить|divided by/gi, "/")
        .replace(/plyus|qo'sh|плюс|plus/gi, "+")
        .replace(/minus|ayir|минус/gi, "-")
        .trim();

      if (!/^[\d+\-*/().\s]+$/.test(expr)) {
        respond("calcError");
        return;
      }

      try {
        const result = Function(`"use strict"; return (${expr})`)();
        if (!Number.isFinite(result)) throw new Error("Invalid result");
        respond("answer", String(result));
      } catch {
        respond("calcError");
      }
      return;
    }

    // Search
    if (/(qidir|search|найти|поиск|googleni och)/i.test(cmd)) {
      const query = cmd.replace(/qidir|search|найти|поиск|google|da|ni/gi, "").trim();
      respond("search", query);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
      return;
    }

    // YouTube
    if (/(youtube|ютуб|video|видео)/i.test(cmd)) {
      const query = cmd.replace(/youtube|ютуб|video|видео|da|ko'rsat|och/gi, "").trim();
      respond("youtube");
      window.open(
        query
          ? `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
          : "https://www.youtube.com/",
        "_blank", "noopener,noreferrer"
      );
      return;
    }

    if (/(musiqa|music|музыка)/i.test(cmd)) {
      respond("music");
      window.open("https://open.spotify.com/", "_blank", "noopener,noreferrer");
      return;
    }

    if (/(wikipediya|wikipedia|википедия)/i.test(cmd)) {
      const query = cmd.replace(/wikipediya|wikipedia|википедия|da|haqida/gi, "").trim();
      respond("wiki");
      const wikiLang = languageKey;
      window.open(`https://${wikiLang}.wikipedia.org/wiki/${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
      return;
    }

    if (/(ob-havo|погода|weather)/i.test(cmd)) {
      respond("weather");
      window.open("https://www.google.com/search?q=weather", "_blank", "noopener,noreferrer");
      return;
    }

    if (/(telegram|телеграм)/i.test(cmd)) {
      respond("telegram");
      window.open("https://t.me", "_blank", "noopener,noreferrer");
      return;
    }

    if (/(instagram|инстаграм)/i.test(cmd)) {
      respond("instagram");
      window.open("https://www.instagram.com", "_blank", "noopener,noreferrer");
      return;
    }

    if (/(yangilik|новост|news)/i.test(cmd)) {
      respond("news");
      window.open("https://news.google.com/", "_blank", "noopener,noreferrer");
      return;
    }

    if (/(yordam|помощ|help|помоги)/i.test(cmd)) {
      respond("help");
      return;
    }

    if (/(salom|assalom|привет|здравствуй|hello|hi\b)/i.test(cmd)) {
      respond("hello");
      return;
    }

    if (/(xayr|пока|до свидания|bye|goodbye)/i.test(cmd)) {
      respond("bye");
      return;
    }

    respond("unknown");
  };

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      addToHistory("This browser does not support speech recognition.", "error");
      return;
    }

    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      try {
        recognition.lang = lang;
        recognition.start();
        setListening(true);
        addToHistory(t("voiceOn"), "system");
      } catch (error) {
        console.error(error);
        setListening(false);
      }
    }
  };

  const handleLanguageChange = (code) => {
    if (listening) {
      try { recognitionRef.current?.stop(); } catch { }
    }
    setListening(false);
    window.speechSynthesis?.cancel();
    setLang(code);
  };

  const handleCommandSubmit = (event) => {
    event.preventDefault();
    if (!commandInput.trim()) return;
    processCommand(commandInput);
    setCommandInput("");
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        setCommandInput("");
        if (listening) {
          recognitionRef.current?.stop();
          setListening(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [listening]);

  const languages = [
    { code: "uz-UZ", label: "UZB", flag: "🇺🇿" },
    { code: "ru-RU", label: "RUS", flag: "🇷🇺" },
    { code: "en-US", label: "ENG", flag: "🇺🇸" }
  ];

  const quickCommands = ["Vaqt", "Sana", "wikipediya", "Yordam", "YouTube", "Google", "Telegram", "Instagram"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;600;700&display=swap');
        @keyframes pulse-ring { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.3);opacity:0} }
        @keyframes rotate { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(0,242,254,.5),0 0 40px rgba(0,242,254,.3)} 50%{box-shadow:0 0 40px rgba(0,242,254,.8),0 0 80px rgba(0,242,254,.5)} }
        @keyframes scan { 0%{transform:translateY(-100%)} 100%{transform:translateY(100%)} }
        .orbitron{font-family:'Orbitron',sans-serif}.rajdhani{font-family:'Rajdhani',sans-serif}
        .pulse-ring{animation:pulse-ring 2s cubic-bezier(.4,0,.6,1) infinite}
        .rotate-slow{animation:rotate 20s linear infinite}.glow-effect{animation:glow 2s ease-in-out infinite}
        .scan-line{animation:scan 2s linear infinite}
        .scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
        .jarvis-shell{width:100%;min-height:100dvh;overflow-x:hidden}
        .jarvis-main{width:100%;max-width:1280px;margin:0 auto}
        @media(max-width:800px){
          .jarvis-header{padding:18px 16px!important}
          .jarvis-header-inner{gap:12px;align-items:flex-start!important}
          .jarvis-title{font-size:clamp(1.55rem,7vw,2.25rem)!important}
          .jarvis-clock{font-size:clamp(1rem,4vw,1.4rem)!important}
          .jarvis-main{flex-direction:column!important;padding:16px!important;gap:22px!important}
          .jarvis-left,.jarvis-right{width:100%!important}
          .jarvis-left{min-height:430px}
          .jarvis-right{min-height:520px}
          .jarvis-circle-wrap{min-height:270px}
          .jarvis-mic{width:170px!important;height:170px!important}
          .jarvis-mic svg{width:76px!important;height:76px!important}
          .jarvis-ring{width:210px!important;height:210px!important;left:-20px!important;top:-20px!important}
          .jarvis-lang-btn{padding:10px 14px!important;flex:1}
          .jarvis-panel{padding:16px!important}
        }
        @media(max-width:420px){
          .jarvis-header-inner{flex-direction:column!important}
          .jarvis-clock-wrap{text-align:left!important}
          .jarvis-lang-btn{padding:9px 8px!important;font-size:13px}
          .jarvis-main{padding:12px!important}
        }
      `}</style>

      <div className="rajdhani jarvis-shell relative bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(rgba(0,242,254,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,242,254,.1) 1px,transparent 1px)",
            backgroundSize: "50px 50px"
          }} />
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="scan-line absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400 to-transparent h-32 blur-sm" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <header className="jarvis-header p-6 border-b border-cyan-900">
            <div className="jarvis-header-inner max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <h1 className="jarvis-title orbitron text-4xl font-black text-cyan-400 tracking-wider" style={{ textShadow: "0 0 20px rgba(0,242,254,.8)" }}>
                  J.A.R.V.I.S
                </h1>
                <p className="text-cyan-500 text-xs sm:text-sm tracking-widest">
                  Just A Rather Very Intelligent System
                </p>
              </div>
              <div className="jarvis-clock-wrap text-right">
                <div className="jarvis-clock orbitron text-3xl text-cyan-400 font-bold">
                  {currentTime.toLocaleTimeString(lang)}
                </div>
                <div className="text-cyan-500 text-sm">
                  {currentTime.toLocaleDateString(lang, { weekday: "long", month: "long", day: "numeric" })}
                </div>
              </div>
            </div>
          </header>

          <main className="jarvis-main flex-1 flex gap-6 p-6">
            <section className="jarvis-left w-1/2 flex flex-col">
              <div className="jarvis-circle-wrap flex-1 flex items-center justify-center">
                <div className="relative">
                  {listening && <>
                    <div className="jarvis-ring absolute inset-0 border-4 border-cyan-400 rounded-full pulse-ring" style={{ width: 300, height: 300, left: -50, top: -50 }} />
                    <div className="jarvis-ring absolute inset-0 border-4 border-cyan-400 rounded-full pulse-ring" style={{ width: 300, height: 300, left: -50, top: -50, animationDelay: ".5s" }} />
                  </>}
                  <div className="absolute inset-0 border-2 border-cyan-500 rounded-full rotate-slow opacity-50" style={{ width: 240, height: 240, left: -20, top: -20, borderTopColor: "transparent", borderRightColor: "transparent" }} />
                  <button
                    type="button"
                    aria-label={listening ? "Stop voice recognition" : "Start voice recognition"}
                    className={`jarvis-mic relative w-52 h-52 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all duration-300 ${listening ? "border-cyan-400 bg-cyan-900 bg-opacity-30 glow-effect" : "border-cyan-600 bg-gray-900 hover:border-cyan-500"}`}
                    onClick={toggleListening}
                  >
                    {listening && <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-1 bg-cyan-400 rounded-full transition-all duration-150" style={{ height: `${Math.max(10, Math.random() * audioLevel)}%` }} />
                      ))}
                    </div>}
                    <svg className={`relative z-10 w-24 h-24 ${listening ? "text-cyan-400" : "text-cyan-600"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
                      <path fillRule="evenodd" d="M10 12a4 4 0 01-4-4v-1a1 1 0 00-2 0v1a6 6 0 0012 0v-1a1 1 0 00-2 0v1a4 4 0 01-4 4z" clipRule="evenodd" />
                      <path d="M9 15v2H7a1 1 0 000 2h6a1 1 0 000-2h-2v-2a8.001 8.001 0 01-2 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="orbitron text-xl sm:text-2xl font-bold text-cyan-400">
                  {listening ? <span className="animate-pulse">● LISTENING</span> : <span className="text-cyan-600">○ STANDBY</span>}
                </p>
                <p className="text-cyan-300 mt-2 text-sm">
                  {listening ? t("listening") : t("standby")}
                </p>
              </div>

              <div className="flex justify-center gap-2 sm:gap-3">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    type="button"
                    onClick={() => handleLanguageChange(language.code)}
                    className={`jarvis-lang-btn px-6 py-3 rounded-lg font-semibold cursor-pointer transition-all border-2 ${lang === language.code ? "bg-cyan-500 bg-opacity-20 border-cyan-400 text-cyan-300" : "bg-gray-800 bg-opacity-50 border-cyan-700 text-cyan-600 hover:border-cyan-500"}`}
                  >
                    <span className="text-xl mr-2">{language.flag}</span>
                    {language.label}
                  </button>
                ))}
              </div>
            </section>

            <section className="jarvis-right w-1/2 flex flex-col gap-4">
              <div className="jarvis-panel bg-gray-900 bg-opacity-50 border-2 border-cyan-700 rounded-lg p-6 backdrop-blur-sm">
                <h2 className="orbitron text-lg sm:text-xl font-bold text-cyan-400 mb-4">{t("commandInterface")}</h2>
                <form onSubmit={handleCommandSubmit}>
                  <input
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    className="w-full min-w-0 px-4 py-3 bg-gray-800 border-2 border-cyan-700 rounded-lg text-cyan-300 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder={t("input")}
                  />
                  <button type="submit" className="w-full mt-4 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-bold text-white transition-colors cursor-pointer orbitron">
                    {t("execute")}
                  </button>
                </form>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {quickCommands.map((cmd) => (
                    <button
                      key={cmd}
                      type="button"
                      onClick={() => processCommand(cmd)}
                      className="px-3 py-2 cursor-pointer bg-gray-800 border border-cyan-700 rounded text-cyan-400 text-sm hover:bg-cyan-900 transition-colors"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 min-h-64 bg-gray-900 bg-opacity-50 border-2 border-cyan-700 rounded-lg p-6 backdrop-blur-sm overflow-hidden flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <h2 className="orbitron text-lg sm:text-xl font-bold text-cyan-400">{t("history")}</h2>
                  {commandHistory.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setCommandHistory([])}
                      className="text-xs px-3 py-1 rounded border border-cyan-700 text-cyan-400 hover:bg-cyan-900"
                    >
                      {t("clear")}
                    </button>
                  )}
                </div>

                <div className="flex-1 min-h-40 overflow-y-auto scrollbar-hide space-y-2">
                  {commandHistory.slice().reverse().map((item, i) => (
                    <div key={`${item.time.getTime()}-${i}`} className={`p-3 rounded break-words ${item.type === "command" ? "bg-cyan-900 bg-opacity-30 border-l-4 border-cyan-400" : item.type === "response" ? "bg-blue-900 bg-opacity-30 border-l-4 border-blue-400" : item.type === "error" ? "bg-red-900 bg-opacity-30 border-l-4 border-red-400" : "bg-gray-800 bg-opacity-30 border-l-4 border-gray-500"}`}>
                      <div className="text-xs text-gray-400">{item.time.toLocaleTimeString()}</div>
                      <div className="text-sm text-cyan-200">{item.message}</div>
                    </div>
                  ))}
                  {commandHistory.length === 0 && (
                    <div className="text-center text-cyan-600 py-8">{t("empty")}</div>
                  )}
                </div>
              </div>
            </section>
          </main>

          <footer className="p-4 border-t border-cyan-900 text-center text-cyan-600 text-xs">
            <p>STARK INDUSTRIES © JARVIS AI SYSTEM v3.1 • Press ESC to clear</p>
          </footer>
        </div>

        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-600 opacity-50 pointer-events-none" />
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-600 opacity-50 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-cyan-600 opacity-50 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-600 opacity-50 pointer-events-none" />
      </div>
    </>
  );
}