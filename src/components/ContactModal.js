import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaPhoneAlt, FaFacebook, FaGitlab } from 'react-icons/fa';
import './ContactModal.css';

const contacts = [
  {
    name: 'Email',
    value: 'tuando24101997@gmail.com',
    href: 'mailto:tuando24101997@gmail.com',
    icon: FaEnvelope,
    color: '#EA4335',
  },
  //   {
  //     name: 'LinkedIn',
  //     value: 'linkedin.com/in/tuan',
  //     href: 'https://linkedin.com/in/your-profile',
  //     icon: FaLinkedin,
  //     color: '#0A66C2',
  //   },
  {
    name: 'GitLab',
    value: 'gitlab.com/dotrananhtuan', // 2. Đường dẫn & thông tin GitLab
    href: 'https://gitlab.com/dotrananhtuan',
    icon: FaGitlab,
    color: '#FC6D26', // Màu cam thương hiệu của GitLab
  },
  {
    name: 'Phone',
    value: '(+84) 378 670 813',
    href: 'tel:+84378670813',
    icon: FaPhoneAlt,
    color: '#34A853',
  },
  {
    name: 'Facebook',
    value: 'facebook.com/tuannhagao',
    href: 'https://facebook.com/tuannhagao',
    icon: FaFacebook,
    color: '#1877F2',
  },
];

function ContactModal({ isOpen, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      // Khi isOpen từ true -> false, kích hoạt animation đóng
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 250); // Thời gian khớp với thời gian animation CSS (250ms)
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  if (!shouldRender) return null;

  return (
    <div className={`modal-overlay ${isClosing ? 'fade-out' : 'fade-in'}`} onClick={handleClose}>
      <div
        className={`contact-modal-content ${isClosing ? 'scale-down' : 'scale-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className='modal-close' onClick={handleClose} aria-label='Close'>
          &times;
        </button>
        <h2 className='contact-title'>Get in Touch</h2>

        <div className='contact-grid'>
          {contacts.map(({ name, value, href, icon: Icon, color }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith('http') ? '_blank' : '_self'}
              rel='noreferrer'
              className='contact-card'
              style={{ '--card-accent': color }}
            >
              <div className='contact-icon' style={{ color }}>
                <Icon />
              </div>
              <div className='contact-info'>
                <span className='contact-name'>{name}</span>
                <span className='contact-val'>{value}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactModal;
