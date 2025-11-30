"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState, useEffect } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import { useSettings } from "@/app/context/SettingsContext";

function ContactForm() {
  const { t, language } = useSettings();
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
      <div className="max-w-3xl rounded-lg border p-3 lg:p-5 transition-all duration-300" style={{ 
        color: 'var(--text-primary)',
        borderColor: 'var(--border-color)'
      }}>
        <p className="text-sm transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>{t('contact.subtitle')}</p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">{t('contact.name')}: </label>
            <input
              className="w-full border rounded-md focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              style={{ 
                backgroundColor: 'var(--background-tertiary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              type="text"
              maxLength="100"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">{t('contact.email')}: </label>
            <input
              className="w-full border rounded-md focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              style={{ 
                backgroundColor: 'var(--background-tertiary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
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
            {error.email && <p className="text-sm text-red-400">Please provide a valid email!</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">
              {t('contact.phone')}: <span className="text-sm transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>{t('contact.phoneOptional')}</span>
            </label>
            <input
              className="w-full border rounded-md focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              style={{ 
                backgroundColor: 'var(--background-tertiary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              type="tel"
              maxLength="20"
              placeholder="01012345678"
              value={userInput.phone}
              onChange={(e) => setUserInput({ ...userInput, phone: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">{t('contact.message')}: </label>
            <textarea
              className="w-full border rounded-md focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              style={{ 
                backgroundColor: 'var(--background-tertiary)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              maxLength="500"
              name="message"
              required={true}
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            {error.required && <p className="text-sm text-red-400">
              {language === 'ar' ? 'جميع الحقول مطلوبة!' : 'All fields are required!'}
            </p>}
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              role="button"
              onClick={handleSendMail}
              disabled={isLoading}
            >
              {
                isLoading ?
                <span>{t('contact.sending')}</span>:
                <span className="flex items-center gap-1">
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