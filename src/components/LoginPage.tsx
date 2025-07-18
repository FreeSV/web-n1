import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'فرمت ایمیل صحیح نیست';
    }
    
    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 6) {
      newErrors.password = 'رمز عبور باید حداقل ۶ کاراکتر باشد';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoginSuccess(true);
      
      // Redirect to home after success
      setTimeout(() => {
        onNavigate('home');
      }, 1500);
    } catch (error) {
      setErrors({ general: 'خطا در ورود. لطفاً دوباره تلاش کنید.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-100 animate-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto text-center">
            <div className="backdrop-blur-xl bg-white/95 rounded-3xl p-8 border border-white/60 shadow-3xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">ورود موفق!</h2>
              <p className="text-gray-600">در حال انتقال به صفحه اصلی...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
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
            
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                <AlertCircle className="text-red-500 ml-3" size={20} />
                <span className="text-red-700 text-sm">{errors.general}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:ring-2 focus:ring-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white ${
                      errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                    }`}
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="ml-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pl-12 pr-12 border-2 rounded-xl focus:ring-2 focus:ring-red-500 transition-all bg-white/80 backdrop-blur-sm hover:border-gray-300 focus:bg-white ${
                      errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-red-500'
                    }`}
                    placeholder="رمز عبور خود را وارد کنید"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="ml-1" />
                    {errors.password}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500 w-4 h-4 transition-colors" 
                  />
                  <span className="mr-2 text-sm text-gray-600">مرا به خاطر بسپار</span>
                </label>
                <button type="button" className="text-sm text-red-600 hover:text-red-700 transition-colors hover:underline">
                  فراموشی رمز عبور؟
                </button>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    در حال ورود...
                  </div>
                ) : (
                  'ورود'
                )}
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">یا</span>
                </div>
              </div>
              
              <button
                type="button"
                className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center"
              >
                <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5 ml-2" />
                ورود با گوگل
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                حساب کاربری ندارید؟{' '}
                <button 
                  onClick={() => onNavigate('signup')}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors hover:underline"
                >
                  ثبت نام کنید
                </button>
              </p>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => onNavigate('home')}
                className="w-full text-gray-600 hover:text-gray-800 py-2 font-medium transition-colors flex items-center justify-center hover:bg-gray-50 rounded-lg"
              >
                <ArrowLeft size={16} className="ml-2" />
                بازگشت به صفحه اصلی
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;