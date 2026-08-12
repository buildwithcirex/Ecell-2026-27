import { Navbar } from './sections/Navbar';
import { Team } from './sections/Team';
import { Footer } from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg-base text-white font-body selection:bg-accent-green selection:text-bg-base">
      <Navbar />
      <main>
        <Team />
      </main>
      <Footer />
    </div>
  );
}

export default App;
