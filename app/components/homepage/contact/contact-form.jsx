"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState, useEffect } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import { useSettings } from "@/app/context/SettingsContext";

function ContactForm() {
  const { t, language, theme } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    };

    try {
      setIsLoading(true);
      const res = await axios.post(
        `/api/contact`,
        userInput
      );

      toast.success(t('contact.success'));
      setUserInput({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    };
  };

  // Ensure client-side rendering for translation
  if (!mounted) {
    return (
      <div>
        <p className="font-medium mb-5 text-[#16f2b3] text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <p className={`font-medium mb-5 text-[#16f2b3] text-xl ${language === 'en' ? 'uppercase' : ''}`}>{t('contact.title')}</p>
      <div className={`max-w-3xl rounded-xl border p-5 lg:p-6 transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-[#1a1443]/50 border-[#1b2c68a0] hover:border-violet-500/50 shadow-lg'
          : 'bg-white border-gray-200 hover:border-violet-400 shadow-md'
      }`}>
        <p className={`text-sm transition-colors duration-300 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>{t('contact.subtitle')}</p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">{t('contact.name')}: </label>
            <input
              className={`w-full border rounded-lg focus:border-[#16f2b3] focus:ring-2 focus:ring-[#16f2b3]/20 outline-0 transition-all duration-200 px-4 py-2.5 ${
                theme === 'dark'
                  ? 'bg-[#0a0d37] border-[#1b2c68a0] text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">{t('contact.email')}: </label>
            <input
              className={`w-full border rounded-lg focus:border-[#16f2b3] focus:ring-2 focus:ring-[#16f2b3]/20 outline-0 transition-all duration-200 px-4 py-2.5 ${
                theme === 'dark'
                  ? 'bg-[#0a0d37] border-[#1b2c68a0] text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              type="email"
              maxLength="100"
              required={true}
              value={userInput.email}
              onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && <p className="text-sm text-red-500 font-medium">Please provide a valid email!</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">
              {t('contact.phone')}: <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t('contact.phoneOptional')}</span>
            </label>
            <input
              className={`w-full border rounded-lg focus:border-[#16f2b3] focus:ring-2 focus:ring-[#16f2b3]/20 outline-0 transition-all duration-200 px-4 py-2.5 ${
                theme === 'dark'
                  ? 'bg-[#0a0d37] border-[#1b2c68a0] text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              type="tel"
              maxLength="20"
              placeholder="01012345678"
              value={userInput.phone}
              onChange={(e) => setUserInput({ ...userInput, phone: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base font-medium">{t('contact.message')}: </label>
            <textarea
              className={`w-full border rounded-lg focus:border-[#16f2b3] focus:ring-2 focus:ring-[#16f2b3]/20 outline-0 transition-all duration-200 px-4 py-2.5 resize-none ${
                theme === 'dark'
                  ? 'bg-[#0a0d37] border-[#1b2c68a0] text-white placeholder-gray-500'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-3 mt-2">
            {error.required && <p className="text-sm text-red-500 font-semibold">
              {language === 'ar' ? 'جميع الحقول مطلوبة!' : 'All fields are required!'}
            </p>}
            <button
              className="flex items-center gap-2 hover:gap-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 px-8 md:px-12 py-3 md:py-3.5 text-center text-sm md:text-base font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              role="button"
              onClick={handleSendMail}
              disabled={isLoading}
            >
              {
                isLoading ?
                <span>{t('contact.sending')}</span>:
                <span className="flex items-center gap-2">
                  {t('contact.send')}
                  <TbMailForward size={20} />
                </span>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;