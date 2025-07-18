import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, MessageCircle, Mail, Phone, MapPin, ChevronDown, Play, Users, Star, ArrowLeft } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        const video = document.getElementById('heroVideo') as HTMLVideoElement;
        if (video) {
          // Try to play with sound after user interaction
          video.muted = false;
          video.volume = 0.7;
          setIsVideoMuted(false);
          video.play().catch(e => {
            console.log('Video play failed:', e);
            // Fallback to muted if unmuted fails
            video.muted = true;
            setIsVideoMuted(true);
            video.play();
          });
        }
      }
    };

    const initializeVideo = async () => {
      const video = document.getElementById('heroVideo') as HTMLVideoElement;
      if (video) {
        // Set video properties for better mobile support
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
        video.muted = true;
        video.volume = 0.7;
        video.loop = true;
        video.autoplay = true;

        // Try to play the video
        try {
          await video.play();
          console.log('Video started playing');
        } catch (error) {
          console.log('Autoplay failed:', error);
        }

        video.addEventListener('loadstart', () => {
          console.log('Video loading started');
        });

        video.addEventListener('canplay', () => {
          console.log('Video can start playing');
        });

        video.addEventListener('error', (e) => {
          console.error('Video error:', e);
        });

        // Handle volume fade on scroll
        const handleScroll = () => {
          if (!video.muted && hasUserInteracted) {
            const fadePoint = window.innerHeight * 0.5;
            const newVolume = Math.max(0, 0.7 - (window.scrollY / fadePoint) * 0.7);
            video.volume = newVolume;
          }
        };

        window.addEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    initializeVideo();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [hasUserInteracted]);

  const toggleVideoSound = () => {
    const video = document.getElementById('heroVideo') as HTMLVideoElement;
    if (video) {
      if (video.muted) {
        video.muted = false;
        video.volume = 0.7;
        setIsVideoMuted(false);
        setHasUserInteracted(true);
      } else {
        video.muted = true;
        setIsVideoMuted(true);
      }
    }
  };
  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden" dir="rtl">
      {/* Header */}
      <header className="relative z-50 backdrop-blur-xl bg-white/90 border-b border-red-100 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <img 
                src="https://raw.githubusercontent.com/proxit-git/website/main/logo.png" 
                alt="قهرمانان زندگی" 
                className="h-12 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-red-600">قهرمانان زندگی بخش</h1>
                <p className="text-sm text-gray-600">آینده‌ای روشن، امروز آغاز می‌شود</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">خانه</button>
              <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">درباره ما</button>
              <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">رویدادها</button>
              <button onClick={() => setCurrentPage('home')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">نظرات</button>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium px-4 py-2 rounded-full border border-gray-300 hover:border-red-600"
                >
                  ورود
                </button>
                <button 
                  onClick={() => setCurrentPage('signup')}
                  className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-medium"
                >
                  ثبت نام
                </button>
              </div>
              <button 
                onClick={handleContactClick}
                className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition-colors font-medium"
              >
                تماس با ما
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-red-600 transition-colors font-medium text-right">خانه</button>
                <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-red-600 transition-colors font-medium text-right">درباره ما</button>
                <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-red-600 transition-colors font-medium text-right">رویدادها</button>
                <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-red-600 transition-colors font-medium text-right">نظرات</button>
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => { setCurrentPage('login'); setIsMenuOpen(false); }}
                    className="text-gray-700 hover:text-red-600 transition-colors font-medium px-4 py-2 rounded-full border border-gray-300 hover:border-red-600 text-center"
                  >
                    ورود
                  </button>
                  <button 
                    onClick={() => { setCurrentPage('signup'); setIsMenuOpen(false); }}
                    className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors font-medium text-center"
                  >
                    ثبت نام
                  </button>
                </div>
                <button 
                  onClick={handleContactClick}
                  className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition-colors font-medium w-fit"
                >
                  تماس با ما
                </button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Conditional Page Rendering */}
      {currentPage === 'home' && (
        <>

      {/* Hero Section with Video Background */}
      <section id="home" className="relative h-screen overflow-hidden">
        <video
          id="heroVideo"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls={false}
          style={{ 
            transform: `translateY(${scrollY * 0.5}px)`,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          onLoadedData={() => {
            const video = document.getElementById('heroVideo') as HTMLVideoElement;
            if (video) {
              video.play().catch(e => console.log('Video play failed:', e));
            }
          }}
        >
          <source src="https://raw.githubusercontent.com/proxit-git/website/main/ORG.mp4" type="video/mp4" />
          <source src="https://raw.githubusercontent.com/proxit-git/website/main/ORG.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Audio control overlay */}
        <div className="absolute bottom-8 right-8 z-30">
          <button
            onClick={toggleVideoSound}
            className="bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-all shadow-lg border border-white/30"
          >
            <span className="text-xl">
              {isVideoMuted ? '🔇' : '🔊'}
            </span>
          </button>
        </div>
        
        {/* Click to unmute hint */}
        {isVideoMuted && !hasUserInteracted && (
          <div className="absolute bottom-8 left-8 z-30">
            <div className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/30 animate-pulse">
              <span className="text-sm">برای شنیدن صدا کلیک کنید</span>
            </div>
          </div>
        )}
      </section>

      {/* Hero Title Section with Glass Effect */}
      <section className="relative -mt-32 z-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-white/95 rounded-3xl p-8 md:p-12 border border-white/60 shadow-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                خوش آمدید به <span className="text-red-600">قهرمانان زندگی بخش</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                آینده‌ای روشن، امروز آغاز می‌شود. ما تیمی از قهرمانان هستیم که برای ساخت دنیای بهتر تلاش می‌کنیم.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setCurrentPage('signup')}
                  className="bg-red-600 text-white px-8 py-4 rounded-full hover:bg-red-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
                >
                  همین الان شروع کنید
                </button>
                <a 
                  href="#about"
                  className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-full hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 font-semibold"
                >
                  بیشتر بدانید
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              درباره <span className="text-red-600">قهرمانان زندگی</span>
            </h2>
            
            <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 md:p-12 border border-white/50 shadow-3xl">
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                ما تیمی از افراد خلاق و پرانگیزه هستیم که با هدف ایجاد تغییرات مثبت در جامعه تشکیل شده‌ایم. 
                هدف ما کمک به افراد برای رسیدن به بهترین نسخه از خودشان و ساخت آینده‌ای روشن‌تر است.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">تیم دانشجویی</h3>
                  <p className="text-gray-600">متشکل از دانشجویان با انگیزه</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Star className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">تعهد و ایمان</h3>
                  <p className="text-gray-600">تعهد به ارائه بهترین خدمات</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <ArrowLeft className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">آینده نگری</h3>
                  <p className="text-gray-600">نگاه به آینده و نوآوری مداوم</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MessageCircle className="text-red-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">ارتباط مؤثر</h3>
                  <p className="text-gray-600">برقراری ارتباط قوی با جامعه</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-red-50 to-white animate-gradient-reverse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              رویدادهای <span className="text-red-600">پیش رو</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Event Card */}
              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 border border-white/50 shadow-3xl hover:shadow-2xl transition-all transform hover:scale-105">
                <div className="mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop&crop=center"
                    alt="هکاتون مشهد" 
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                </div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">معرفی پروژه در هکاتون مشهد</h3>
                    <p className="text-red-600 font-medium">۲۶ تیر ۱۴۰۴</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-red-600" size={20} />
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  معرفی پروژه قهرمانان زندگی بخش در رویداد هکاتون مشهد و ارائه راه‌حل‌های نوآورانه برای چالش‌های اجتماعی
                </p>
                <button className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
                  اطلاعات بیشتر
                </button>
              </div>

              {/* Placeholder for more events */}
              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 border border-white/50 shadow-3xl">
                <div className="flex items-center justify-center h-48 bg-gray-100 rounded-2xl mb-4">
                  <Calendar className="text-gray-400" size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">رویداد بعدی</h3>
                <p className="text-gray-600 mb-4">به زودی اعلام خواهد شد</p>
                <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-full font-semibold cursor-not-allowed">
                  منتظر بمانید
                </button>
              </div>

              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 border border-white/50 shadow-3xl">
                <div className="flex items-center justify-center h-48 bg-gray-100 rounded-2xl mb-4">
                  <Calendar className="text-gray-400" size={48} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">رویداد بعدی</h3>
                <p className="text-gray-600 mb-4">به زودی اعلام خواهد شد</p>
                <button className="w-full bg-gray-300 text-gray-500 py-3 rounded-full font-semibold cursor-not-allowed">
                  منتظر بمانید
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-red-50 via-white to-red-100 animate-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              نقشه <span className="text-red-600">راه آینده</span>
            </h2>
            
            <div className="text-center mb-16">
              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 border border-white/50 shadow-3xl max-w-4xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                   برنامه‌ریزی دقیق و مرحله‌ای برای رسیدن به اهداف بلندمدت تیم قهرمانان زندگی بخش. 
                  هر فاز شامل اهداف مشخص، فعالیت‌های کلیدی و شاخص‌های موفقیت است.
                </p>
              </div>
            </div>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-gradient-to-b from-red-300 via-red-500 to-red-700 rounded-full shadow-lg"></div>
              
              {/* Phase 1 */}
              <div className="relative flex items-center mb-16">
                <div className="w-1/2 pr-8 text-right">
                  <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 border border-white/50 shadow-3xl hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-end mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">فاز اول: راه‌اندازی و پایه‌گذاری</h3>
                        <p className="text-red-600 font-medium">تیر ۱۴۰۴ - مهر ۱۴۰۴</p>
                      </div>
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4 shadow-lg">
                        <Play className="text-red-600" size={24} />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      مرحله بنیادی پروژه که شامل تشکیل تیم اصلی، تعریف ماموریت و چشم‌انداز، و راه‌اندازی زیرساخت‌های اولیه است.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-red-50 p-3 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-1">🎯 اهداف کلیدی:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• تشکیل تیم مرکزی ۱۰ نفره</li>
                          <li>• طراحی هویت بصری و برند</li>
                          <li>• راه‌اندازی وب‌سایت و شبکه‌های اجتماعی</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-1">📊 شاخص‌های موفقیت:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• ۵۰۰ فالوور در شبکه‌های اجتماعی</li>
                          <li>• برگزاری ۳ جلسه آموزشی</li>
                          <li>• تکمیل ۱۰۰٪ مستندات پروژه</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-xl z-10"></div>
                <div className="w-1/2"></div>
              </div>
              
              {/* Phase 2 */}
              <div className="relative flex items-center mb-16">
                <div className="w-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-xl z-10"></div>
                <div className="w-1/2 pl-8">
                  <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 border border-white/50 shadow-3xl hover:shadow-2xl transition-all">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center ml-4 shadow-lg">
                        <Users className="text-red-600" size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">فاز دوم: گسترش و توسعه</h3>
                        <p className="text-red-600 font-medium">آبان ۱۴۰۴ - اسفند ۱۴۰۴</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      مرحله رشد و توسعه که در آن فعالیت‌ها به سایر شهرها گسترش یافته و پروژه‌های جدید راه‌اندازی می‌شود.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-green-50 p-3 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-1">🚀 اهداف کلیدی:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• گسترش به ۵ شهر جدید</li>
                          <li>• راه‌اندازی ۳ پروژه اجتماعی</li>
                          <li>• تشکیل شبکه داوطلبان</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-1">📈 شاخص‌های موفقیت:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• ۲۰۰۰ عضو فعال</li>
                          <li>• ۱۰ رویداد موفق</li>
                          <li>• ۵۰ داوطلب آموزش‌دیده</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Phase 3 */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 border border-white/50 shadow-3xl hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-end mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">فاز سوم: تأثیرگذاری و پایداری</h3>
                        <p className="text-red-600 font-medium">فروردین ۱۴۰۵ - شهریور ۱۴۰۵</p>
                      </div>
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4 shadow-lg">
                        <Star className="text-red-600" size={24} />
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      مرحله بلوغ و تأثیرگذاری که در آن پروژه به یک نهاد مستقل و پایدار تبدیل شده و الگویی برای سایرین می‌شود.
                    </p>
                    <div className="space-y-3">
                      <div className="bg-yellow-50 p-3 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-1">🌟 اهداف کلیدی:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• همکاری با ۱۰ سازمان بزرگ</li>
                          <li>• راه‌اندازی صندوق حمایتی</li>
                          <li>• تأسیس مرکز آموزش رهبری</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-xl">
                        <h4 className="font-semibold text-gray-800 mb-1">🏆 شاخص‌های موفقیت:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• ۱۰۰۰۰ نفر تحت تأثیر مستقیم</li>
                          <li>• ۲۰ پروژه اجتماعی فعال</li>
                          <li>• خودکفایی مالی ۱۰۰٪</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-xl z-10"></div>
                <div className="w-1/2"></div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 border border-white/50 shadow-3xl max-w-2xl mx-auto">
                <p className="text-gray-600 italic">
                  "هر مرحله از این نقشه راه با دقت طراحی شده و قابل تنظیم است. 
                  ما متعهد به شفافیت کامل در گزارش پیشرفت و دستیابی به اهداف تعریف شده هستیم."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section id="reviews" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-red-50 via-white to-red-100 animate-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
              نظرات <span className="text-red-600">حامیان</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 border border-white/50 shadow-3xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-gray-400" size={24} />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-semibold text-gray-900">نظرات کاربران</h4>
                    <p className="text-sm text-gray-600">به زودی</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  نظرات و پیام‌های حمایت از طرف کاربران و حامیان پروژه در اینجا نمایش داده خواهد شد.
                </p>
                <div className="flex text-gray-400">
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 border border-white/50 shadow-3xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-gray-400" size={24} />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-semibold text-gray-900">پیام‌های حمایت</h4>
                    <p className="text-sm text-gray-600">به زودی</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  پیام‌های حمایت و انگیزه بخش از طرف افراد و سازمان‌های مختلف در اینجا قرار خواهد گرفت.
                </p>
                <div className="flex text-gray-400">
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-6 border border-white/50 shadow-3xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-gray-400" size={24} />
                  </div>
                  <div className="mr-4">
                    <h4 className="font-semibold text-gray-900">بازخورد کاربران</h4>
                    <p className="text-sm text-gray-600">به زودی</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  بازخورد‌های مثبت و سازنده از طرف کاربران و شرکت‌کنندگان در رویدادهای ما در اینجا نمایش داده می‌شود.
                </p>
                <div className="flex text-gray-400">
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                  <Star size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section (Replaced Stats) */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-white via-red-50 to-white animate-gradient-reverse"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 md:p-12 border border-white/50 shadow-3xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                <span className="text-red-600">به زودی</span> آغاز می‌شود
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                آمار و اطلاعات مفصل درباره فعالیت‌ها و دستاوردهای تیم قهرمانان زندگی به زودی در اینجا قرار خواهد گرفت.
              </p>
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center mb-6">
                  <img 
                    src="https://raw.githubusercontent.com/proxit-git/website/main/logo.png" 
                    alt="قهرمانان زندگی بخش" 
                    className="h-12 w-auto ml-4"
                  />
                  <div>
                    <h3 className="text-2xl font-bold">قهرمانان زندگی بخش</h3>
                    <p className="text-gray-300">آینده‌ای روشن، امروز آغاز می‌شود</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  ما تیمی از قهرمانان هستیم که برای ساخت آینده‌ای بهتر تلاش می‌کنیم. 
                  هدف ما کمک به افراد برای رسیدن به بهترین نسخه از خودشان است.
                </p>
                <div className="flex space-x-4 space-x-reverse">
                  <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors">
                    <MessageCircle size={20} />
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors">
                    <Mail size={20} />
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors">
                    <Phone size={20} />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6">لینک‌های مفید</h4>
                <ul className="space-y-3">
                  <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">خانه</a></li>
                  <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">درباره ما</a></li>
                  <li><a href="#events" className="text-gray-300 hover:text-white transition-colors">رویدادها</a></li>
                  <li><a href="#reviews" className="text-gray-300 hover:text-white transition-colors">نظرات</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6">تماس با ما</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Mail size={16} className="ml-3" />
                    <span>@mmd_ask</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Phone size={16} className="ml-3" />
                    <span>+98 903 016 0091</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin size={16} className="ml-3" />
                    <span>مشهد، دانشگاه علوم پزشکی یمشهد، ساختمان خوارزمی، دانشکده پرستاری و مامایی</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 text-center">
              <p className="text-gray-400">
                © 1404 قهرمانان زندگی بخش. تمام حقوق محفوظ است.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Login Page */}
      {currentPage === 'login' && (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-8">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-red-100 animate-gradient"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-md mx-auto">
              <div className="backdrop-blur-xl bg-white/95 rounded-3xl p-8 border border-white/60 shadow-3xl hover:shadow-2xl transition-all duration-300">
                <div className="text-center mb-8">
                  <img 
                    src="https://raw.githubusercontent.com/proxit-git/website/main/logo.png" 
                    alt="قهرمانان زندگی بخش" 
                    className="h-16 w-auto mx-auto mb-4 hover:scale-105 transition-transform duration-300"
                  />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">ورود به حساب</h2>
                  <p className="text-gray-600">به خانواده قهرمانان زندگی بپیوندید</p>
                </div>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white"
                      placeholder="example@email.com"
                      dir="ltr"
                      required
                      required
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white"
                      placeholder="رمز عبور خود را وارد کنید"
                      required
                      required
                      required
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 transition-colors" />
                      <span className="mr-2 text-sm text-gray-600">مرا به خاطر بسپار</span>
                    </label>
                    <button type="button" className="text-sm text-red-600 hover:text-red-700 transition-colors hover:underline">فراموشی رمز عبور؟</button>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    ورود
                  </button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">یا</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      حساب کاربری ندارید؟{' '}
                      <button 
                        onClick={() => setCurrentPage('signup')}
                        className="text-red-600 hover:text-red-700 font-medium transition-colors hover:underline"
                      >
                        ثبت نام کنید
                      </button>
                    </p>
                  </div>
                </form>
                
                <div className="mt-6 text-center">
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className="text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center mx-auto"
                  >
                    <ArrowLeft size={16} className="ml-2" />
                    بازگشت به خانه
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Page */}
      {currentPage === 'login' && (
        <LoginPage onNavigate={setCurrentPage} />
      )}
      
      {/* Signup Page */}
      {currentPage === 'signup' && (
        <SignupPage onNavigate={setCurrentPage} />
      )}
    </div>
  );
}

export default App;