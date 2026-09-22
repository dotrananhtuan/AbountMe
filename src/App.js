import Starfield from './components/Starfield';
import TechStack from './components/TechStack';
import './App.css';

function App() {
  return (
    <div className='page'>
      <Starfield />
      <div className='vignette' />

      <header className='nav'>
        <a href='mailto:tuan@example.com'>Contact</a>
        <a href='/resume.pdf' target='_blank' rel='noreferrer'>
          Resume
        </a>
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
    </div>
  );
}

export default App;
