import React, { useState, useEffect } from 'react';
import { Star, Sparkles } from 'lucide-react';

const WishUponStar = () => {
  const [wish, setWish] = useState('');
  const [showStars, setShowStars] = useState(false);
  const [specialMessage, setSpecialMessage] = useState('');
  const [stars, setStars] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  const messages = [
    "ขอให้ความฝันของคุณเป็นจริง ✨",
    "ขอให้ชีวิตสดใสเหมือนดวงดาว ⭐",
    "ขอให้มีความสุขล้นฟ้า 🌟",
    "ขอให้รักสวยงามเหมือนดาวบนฟ้า 💫",
    "ขอให้ชีวิตมีแต่สิ่งมหัศจรรย์ ✨"
  ];

  // สร้างประกายดาวรอบๆ เมาส์
  useEffect(() => {
    const createSparkle = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      setSparkles(prev => [...prev, { x, y, id: Date.now() }]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(sparkle => sparkle.id !== Date.now()));
      }, 1000);
    };

    window.addEventListener('mousemove', createSparkle);
    return () => window.removeEventListener('mousemove', createSparkle);
  }, []);

  const makeWish = () => {
    if (!wish.trim()) return;
    
    setShowStars(true);
    setSpecialMessage(messages[Math.floor(Math.random() * messages.length)]);
    
    // สร้างดาวตก
    const newStars = Array(20).fill(null).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 24 + 12,
      duration: Math.random() * 2 + 1
    }));
    setStars(newStars);

    setTimeout(() => {
      setShowStars(false);
      setStars([]);
    }, 5000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* GIF Background */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('/Stars Background GIF.gif')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8
        }}
      />
      {/* Overlay to ensure content visibility */}
      <div className="fixed inset-0 bg-purple-900/50 backdrop-blur-sm z-1"></div>
      {/* Remove static stars since we have GIF background */}

      {/* ประกายดาวตามเมาส์ */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="fixed pointer-events-none"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animation: 'sparkle-fade 1s forwards'
          }}
        >
          <Sparkles 
            size={16}
            className="text-pink-200"
          />
        </div>
      ))}

      {/* ดาวตก */}
      {showStars && stars.map((star, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            transform: 'rotate(-45deg)',
            animation: `shooting-star ${star.duration}s linear`
          }}
        >
          <Star size={star.size} className="text-yellow-200" />
        </div>
      ))}

      <div className="z-10 text-center">
        {/* หัวข้อ */}
        <h1 className="text-4xl md:text-6xl font-bold mb-8 relative group">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 animate-gradient">
            ✨ สั่งดาวให้เธอ ✨
          </span>
          <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-30 group-hover:opacity-50 blur-lg transition-all duration-500"></span>
        </h1>

        {/* กล่องใส่คำอธิษฐาน */}
        <div className="relative max-w-md w-full group perspective-1000">
          {/* เอฟเฟกต์กรอบเรืองแสง หลายชั้น */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-xl blur-md opacity-30 group-hover:opacity-50 animate-pulse-slow"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-20 group-hover:opacity-40 animate-pulse-slower"></div>
          
          {/* แสงเรืองรอบนอก */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          {/* เนื้อหาหลัก */}
          <div className="relative bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-xl p-8 shadow-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 hover:shadow-purple-500/20 transform-gpu group-hover:translate-z-10">
            <textarea
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="เขียนคำอธิษฐานของคุณ..."
              className="w-full p-6 rounded-xl bg-white/10 text-white placeholder-white/60 mb-6 resize-none h-32 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 text-lg"
              style={{ textShadow: '0 0 8px rgba(255,255,255,0.5)' }}
            />
            
            <button
              onClick={makeWish}
              className="relative w-full overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-80 group-hover/btn:opacity-100 transition-all duration-300"></div>
              <div className="relative px-8 py-4 text-white text-lg font-semibold rounded-xl backdrop-blur-sm transform hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center gap-2">
                <span>ขอพร</span>
                <span className="animate-bounce">✨</span>
              </div>
            </button>
          </div>
        </div>

        {/* ข้อความอวยพร */}
        {showStars && (
          <div className="mt-8 text-2xl md:text-3xl text-white font-bold animate-float">
            {specialMessage}
          </div>
        )}
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .translate-z-10 {
          transform: translateZ(10px);
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 4s infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes shooting-star {
          from {
            transform: translateY(-100%) translateX(-100%) rotate(-45deg);
            opacity: 1;
          }
          to {
            transform: translateY(100%) translateX(100%) rotate(-45deg);
            opacity: 0;
          }
        }

        @keyframes sparkle-fade {
          0% { transform: scale(0); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          100% { transform: scale(0); opacity: 0; }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WishUponStar;
