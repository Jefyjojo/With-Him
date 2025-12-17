import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-secondary border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="font-heading text-2xl lg:text-3xl text-primary italic">
            Grace
          </Link>
          
          <nav className="flex gap-6 lg:gap-10 items-center">
            <Link 
              to="/" 
              className="font-paragraph text-sm lg:text-base text-secondary-foreground hover:opacity-70 transition-opacity duration-300"
            >
              Home
            </Link>
            <Link 
              to="/testimonies" 
              className="font-paragraph text-sm lg:text-base text-secondary-foreground hover:opacity-70 transition-opacity duration-300"
            >
              Testimonies
            </Link>
            <Link 
              to="/reflections" 
              className="font-paragraph text-sm lg:text-base text-secondary-foreground hover:opacity-70 transition-opacity duration-300"
            >
              Reflections
            </Link>
            <Link 
              to="/#download" 
              className="font-paragraph text-sm lg:text-base px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Get App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
