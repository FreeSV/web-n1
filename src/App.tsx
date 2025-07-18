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
                alt="قهرمانان زندگی بخش" 
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
              درباره <span className="text-red-600">قهرمانان زندگی بخش</span>
            </h2>
            
            <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 md:p-12 border border-white/50 shadow-3xl">
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                ما تیمی از افراد خلاق و پرانگیزه هستیم که با هدف ایجاد تغییرات مثبت در جامعه و بخش‌های مختلف تشکیل شده‌ایم. 
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
                  معرفی پروژه قهرمانان زندگی در رویداد هکاتون مشهد و ارائه راه‌حل‌های نوآورانه برای چالش‌های اجتماعی
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
          
          {/* Two-Part Plans Section */}
          <div className="grid lg:grid-cols-2 gap-12 mt-16">
            {/* Part 1: Strategic Plans */}
            <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 border border-white/50 shadow-3xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Star className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">برنامه‌های استراتژیک</h3>
                <p className="text-gray-600">نقشه راه کلان و اهداف بلندمدت</p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-2xl border border-red-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center ml-4">
                      <span className="text-white font-bold">۱</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">توسعه سازمانی</h4>
                      <p className="text-red-600 font-medium">۱۴۰۴ - ۱۴۰۵</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full ml-3"></div>
                      تشکیل تیم‌های تخصصی در بخش‌های مختلف
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full ml-3"></div>
                      ایجاد شبکه همکاری با سازمان‌های مرتبط
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full ml-3"></div>
                      توسعه زیرساخت‌های فناوری و ارتباطات
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center ml-4">
                      <span className="text-white font-bold">۲</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">گسترش جغرافیایی</h4>
                      <p className="text-blue-600 font-medium">۱۴۰۵ - ۱۴۰۶</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-3"></div>
                      حضور فعال در ۱۰ شهر بزرگ کشور
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-3"></div>
                      تأسیس دفاتر منطقه‌ای و نمایندگی‌ها
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-3"></div>
                      ایجاد شبکه داوطلبان محلی
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center ml-4">
                      <span className="text-white font-bold">۳</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">تأثیرگذاری ملی</h4>
                      <p className="text-green-600 font-medium">۱۴۰۶ و بعد</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full ml-3"></div>
                      تبدیل به الگوی ملی برای سازمان‌های مشابه
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full ml-3"></div>
                      همکاری با نهادهای دولتی و خصوصی
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full ml-3"></div>
                      ایجاد تأثیر مثبت در سطح ملی
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Part 2: Operational Plans */}
            <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 border border-white/50 shadow-3xl">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">برنامه‌های عملیاتی</h3>
                <p className="text-gray-600">فعالیت‌های روزانه و پروژه‌های کوتاه‌مدت</p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center ml-4">
                      <Calendar className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">رویدادهای ماهانه</h4>
                      <p className="text-purple-600 font-medium">هر ماه</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full ml-3"></div>
                      برگزاری کارگاه‌های آموزشی تخصصی
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full ml-3"></div>
                      جلسات شبکه‌سازی و تبادل تجربه
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full ml-3"></div>
                      رویدادهای فرهنگی و اجتماعی
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center ml-4">
                      <Play className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">پروژه‌های فعال</h4>
                      <p className="text-orange-600 font-medium">در حال اجرا</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full ml-3"></div>
                      پلتفرم آموزش آنلاین قهرمانان
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full ml-3"></div>
                      شبکه حمایت از کارآفرینان جوان
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full ml-3"></div>
                      مرکز مشاوره و راهنمایی تحصیلی
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-6 rounded-2xl border border-teal-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center ml-4">
                      <ArrowLeft className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">اهداف کوتاه‌مدت</h4>
                      <p className="text-teal-600 font-medium">۶ ماه آینده</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-teal-500 rounded-full ml-3"></div>
                      جذب ۵۰۰ عضو جدید فعال
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-teal-500 rounded-full ml-3"></div>
                      راه‌اندازی ۳ پروژه اجتماعی جدید
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-teal-500 rounded-full ml-3"></div>
                      برگزاری اولین کنفرانس سالانه
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Tracking */}
          <div className="mt-16 text-center">
            <div className="backdrop-blur-xl bg-white/90 rounded-3xl p-8 border border-white/50 shadow-3xl max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">پیشرفت کلی پروژه</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">۲۵٪</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">برنامه‌های استراتژیک</h4>
                  <p className="text-gray-600 text-sm">در مرحله اولیه اجرا</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">۶۰٪</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">برنامه‌های عملیاتی</h4>
                  <p className="text-gray-600 text-sm">در حال پیشرفت مناسب</p>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl font-bold">۴۰٪</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">پیشرفت کلی</h4>
                  <p className="text-gray-600 text-sm">بر اساس تمام شاخص‌ها</p>
                </div>
              </div>
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                <p className="text-gray-700 italic">
                  "تمام برنامه‌ها با نظارت مستمر و ارزیابی دوره‌ای اجرا می‌شوند. 
                  گزارش‌های پیشرفت به‌صورت ماهانه منتشر و با جامعه به اشتراک گذاشته می‌شود."
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
                  ما تیمی از قهرمانان هستیم که برای ساخت آینده‌ای بهتر در بخش‌های مختلف تلاش می‌کنیم. 
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
        </>
      )}
      
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
                  <p className="text-gray-600">به خانواده قهرمانان زندگی بخش بپیوندید</p>
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
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white"
                      placeholder="رمز عبور خود را وارد کنید"
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
                    <p className="text-gray-600">
                      حساب کاربری ندارید؟{' '}
                      <button 
                        type="button"
                        onClick={() => setCurrentPage('signup')}
                        className="text-red-600 hover:text-red-700 font-medium hover:underline transition-colors"
                      >
                        ثبت نام کنید
                      </button>
                    </p>
                  </div>
                </form>
                
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft size={16} className="ml-2" />
                    بازگشت به صفحه اصلی
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Signup Page */}
      {currentPage === 'signup' && (
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">ثبت نام</h2>
                  <p className="text-gray-600">به خانواده قهرمانان زندگی بخش بپیوندید</p>
                </div>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نام</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white"
                        placeholder="نام شما"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نام خانوادگی</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white"
                        placeholder="نام خانوادگی"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white"
                      placeholder="example@email.com"
                      dir="ltr"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white"
                      placeholder="09123456789"
                      dir="ltr"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white"
                      placeholder="رمز عبور قوی انتخاب کنید"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تکرار رمز عبور</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white"
                      placeholder="رمز عبور را مجدداً وارد کنید"
                      required
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 mt-1 transition-colors" required />
                    <span className="mr-2 text-sm text-gray-600">
                      با <button type="button" className="text-red-600 hover:underline">قوانین و مقررات</button> و <button type="button" className="text-red-600 hover:underline">حریم خصوصی</button> موافقم
                    </span>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    ثبت نام
                  </button>
                  
                  <div className="text-center">
                    <p className="text-gray-600">
                      قبلاً ثبت نام کرده‌اید؟{' '}
                      <button 
                        type="button"
                        onClick={() => setCurrentPage('login')}
                        className="text-red-600 hover:text-red-700 font-medium hover:underline transition-colors"
                      >
                        وارد شوید
                      </button>
                    </p>
                  </div>
                </form>
                
                <div className="mt-8 text-center">
                  <button 
                    onClick={() => setCurrentPage('home')}
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft size={16} className="ml-2" />
                    بازگشت به صفحه اصلی
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;