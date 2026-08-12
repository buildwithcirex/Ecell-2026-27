import { Navbar } from './sections/Navbar';
import { Logo } from './components/ui/logo';
import { Team } from './sections/Team';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg-base text-white font-body selection:bg-accent-green selection:text-bg-base">
      <Logo />
      <Navbar />
      <main>
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;
