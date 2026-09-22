import Starfield from './components/Starfield';
import TechStack from './components/TechStack';
import PdfModal from './components/PdfModal'; // Import Modal
import ContactModal from './components/ContactModal';
import { useState } from 'react';
import './App.css';

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false); // State mở Contact

  return (
    <div className='page'>
      <Starfield />
      <div className='vignette' />

      <header className='nav'>
        <button className='nav-link-btn' onClick={() => setIsContactOpen(true)}>
          Contact
        </button>{' '}
        <button className='nav-link-btn' onClick={() => setIsResumeOpen(true)}>
          Resume
        </button>
      </header>

      <main className='hero'>
        <h1 className='hero-name'>DO TRAN ANH TUAN</h1>
        <p className='hero-bio'>
          Hey, I&apos;m Tuan — you can call me Andrew. I&apos;m obsessed with large-scale systems,
          and I love turning a messy idea into something that&apos;s fast, secure, and built to
          scale.
        </p>
        <TechStack />
      </main>

      {/* Modal Contact */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      {/* Modal Resume */}
      <PdfModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        pdfUrl={process.env.PUBLIC_URL + '/resume.pdf'}
      />
    </div>
  );
}

export default App;
