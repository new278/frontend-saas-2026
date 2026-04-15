'use client'
import React, { useState } from 'react'
import SimpleSelect from '../../components/ui/SimpleSelect'
import ContactModal from './ContactModal'
import { ChatBoxManage } from '../chat-bot/ChatBotManage'
import { Headset } from 'lucide-react'
import { Button } from '@/src/components/ui/button'
import ImageIcons from '@/src/components/ui/ImageIcons'

const Footer = () => {
  const linkItems = [
    'Online banking service advertisement',
    'Advertising practices',
    'Your privacy policies',
    'Sitemap',
    'Careers',
    'tasting',
  ]

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'es', label: 'Español' },
  ]

  const countryOptions = [
    { value: 'in', label: 'India' },
    { value: 'us', label: 'USA' },
    { value: 'gb', label: 'UK' },
  ]

  const currencyOptions = [
    { value: 'usd', label: 'USD' },
    { value: 'inr', label: 'INR' },
    { value: 'eur', label: 'EUR' },
  ]

  const [language, setLanguage] = useState('en')
  const [country, setCountry] = useState('in')
  const [currency, setCurrency] = useState('usd')
  const [showModal, setShowModal] = useState(false)

    const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const toggleModal = () => {
    setIsChatModalOpen((prev) => !prev);
  };
   const [minimise, setMinimise] = useState(false);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="top-row">
          <div className="selectors">
            <SimpleSelect
              className="selector border px-2 py-2 rounded border-base-200 cursor-pointer"
              options={languageOptions}
              value={language}
              onChange={setLanguage}
              placeholder="English"
            />
            <SimpleSelect
              className="selector border px-2 py-2 rounded border-base-200 cursor-pointer"
              options={countryOptions}
              value={country}
              onChange={setCountry}
              placeholder="India"
            />
            <SimpleSelect
              className="selector border px-2  py-2 rounded border-base-200 cursor-pointer"
              options={currencyOptions}
              value={currency}
              onChange={setCurrency}
              placeholder="USD"
            />
          </div>
        </div>

        <div className="divider" />

        <div className="links-section">
          {[0, 1, 2].map((r) => (
            <div className="links-row" key={r}>
              {linkItems.map((t, i) => (
                <a key={i} href="#" className="link-item">
                  {t}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="center-cta">
          <Button onClick={() => setShowModal(true)}>Contact Us</Button>
        </div>

        <ContactModal isOpen={showModal} onClose={() => setShowModal(false)} />

        <div className="social-row">
          <div className="social-icons">
            <a href="#" aria-label="facebook" className="bg-primary text-white p-2 rounded-full">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.2v-3h2.2V9.1c0-2.2 1.3-3.5 3.3-3.5.96 0 1.96.17 1.96.17v2.2h-1.12c-1.1 0-1.44.68-1.44 1.37V12h2.45l-.39 3h-2.06v7A10 10 0 0022 12z"/></svg>
            </a>
            <a href="#" aria-label="youtube" className="bg-primary text-white p-2 rounded-full">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23 7s-.2-1.5-.8-2.2c-.7-.9-1.6-.9-2-1C16.6 3 12 3 12 3s-4.6 0-8.2.8c-.4.1-1.3.1-2 .9C1.2 5.6 1 7 1 7S0.8 9 .8 10.1 1 13 1 13s.2 1.4.8 2.1c.7.9 1.6.9 2 1C7.4 17 12 17 12 17s4.6 0 8.2-.8c.4-.1 1.3-.1 2-.9.6-.7.8-2.1.8-2.1s.2-1.9.2-3.1S23 7 23 7zM9.5 12.6V7.4L15 10l-5.5 2.6z"/></svg>
            </a>
            <a href="#" aria-label="tiktok" className="bg-primary text-white p-2 rounded-full">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9 3v10.2A4.8 4.8 0 1014 18V7h4V3h-9z"/></svg>
            </a>
            <a href="#" aria-label="twitter" className="bg-primary text-white p-2 rounded-full">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 5.9c-.6.3-1.2.5-1.9.7.7-.4 1.3-1 1.6-1.7-.6.4-1.3.7-2.1.9C18.3 5 17.2 4.5 16 4.5c-2 0-3.6 1.6-3.6 3.6 0 .3 0 .7.1 1C9.3 9.8 6.3 8 4.4 5.4c-.4.7-.6 1.4-.6 2.2 0 1.6.8 2.9 2 3.7-.5 0-1-.1-1.4-.4v.1c0 2.1 1.5 3.8 3.4 4.2-.3.1-.6.2-.9.2-.2 0-.4 0-.6-.1.4 1.2 1.5 2.1 2.8 2.1-1 .8-2.2 1.2-3.4 1.2H6c1.3.8 2.8 1.2 4.4 1.2 5.3 0 8.2-4.4 8.2-8.2v-.4c.6-.4 1.2-1 1.7-1.6-.5.2-1 .4-1.6.5.6-.4 1.1-1 1.6-1.6z"/></svg>
            </a>
          </div>
        </div>

        {/* Chatbot */}
        <div className="bg-primary text-white rounded-full fixed right-5 bottom-5 z-50 shadow-lg">
          <div onClick={toggleModal} className="chat-btn">

            <Headset />
            {/* <Image
              src={"/live-chat.png"}
              width={40}
              height={40}
              alt="Chat bot icon"
              className="h-10 w-10 rounded-full"
            /> */}
          </div>
          {isChatModalOpen && (
            <ChatBoxManage
              isOpen={isChatModalOpen}
              setMinimise={setMinimise}
              setIsChatModalOpen={setIsChatModalOpen}
            />
          )}
        </div>

        <div className="partners-row">
          <div className="partners">
            <ImageIcons.IconBankImg size={40} />
            <ImageIcons.IconBitcoinImg size={60} />
            <ImageIcons.IconPayoneerImg size={60} />
            <ImageIcons.IconPaypalImg size={50} />
            <ImageIcons.IconSbiImg size={50} />
          </div>
        </div>

        <div className="copyright">© 2000 - 2025 All rights reserved.</div>
      </div>

      <style jsx>{`
        .site-footer {
          background: #eaf6f0; /* pastel mint */
          color: #13393a;
          padding: 36px 20px 48px;
          font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
          font-size: 13px;
        }

        .container { max-width: 1100px; margin: 0 auto; text-align: center; }

        .top-row { padding-top: 8px; }
        .selectors { display: inline-flex; gap: 12px; margin-bottom: 12px; }

        .selector { 
          background: #fff; 
          color: #13393a; 
          padding: 8px 14px; 
          border-radius: 8px; 
          border: 1px solid rgba(19,57,58,0.08);
          box-shadow: 0 2px 6px rgba(19,57,58,0.04);
          font-size: 13px;
          min-width: 120px;
        }

        .divider { height: 1px; background: rgba(19,57,58,0.12); margin: 14px auto 16px; width: 70%; }

        .links-section { margin: 6px 0 8px; }
        .links-row { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; padding: 6px 0; }
        .link-item { color: #123b3b; text-decoration: none; opacity: 0.85; transition: color .15s, opacity .15s; }
        .link-item:hover { color: #1f6feb; opacity: 1; }

        .center-cta { margin: 12px 0 18px; }

        .social-row { margin-top: 8px; }
        .social-icons { display:flex; gap:18px; justify-content:center; align-items:center; }
        .chat-btn { width:64px; height:64px; border-radius:999px; display:flex; align-items:center; justify-content:center;  box-shadow:0 10px 30px rgba(47,106,106,0.18); cursor:pointer; }

        .partners-row { margin: 18px 0 12px; }
        .partners { display:flex; gap:26px; justify-content:center; flex-wrap:wrap; align-items:center }
        .partner-pill { background: #fff; padding:8px 14px; border-radius:20px; color:#2b3a3f; box-shadow:0 4px 12px rgba(16,24,40,0.06); font-weight:700; font-size:14px }

        .copyright { color:#123b3b; margin-top:10px; font-size:13px }

        @media (max-width: 640px) {
          .links-row { gap: 12px; }
          .selector { padding: 6px 10px; min-width: 90px }
          .partner-pill { padding:6px 8px; font-size:13px }
          .divider { width: 92%; }
        }
      `}</style>
    </footer>
  )
}

export default Footer