import { Link } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();

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
              to="/mood-scripture" 
              className="font-paragraph text-sm lg:text-base text-secondary-foreground hover:opacity-70 transition-opacity duration-300"
            >
              Scripture
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

            {/* Auth Section */}
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-primary/20 animate-pulse"></div>
            ) : isAuthenticated ? (
              <div className="flex gap-4 items-center">
                <Link 
                  to="/prayer-journal" 
                  className="font-paragraph text-sm lg:text-base text-secondary-foreground hover:opacity-70 transition-opacity duration-300"
                >
                  🙏 Prayer
                </Link>
                <Link 
                  to="/profile" 
                  className="font-paragraph text-sm lg:text-base px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300"
                >
                  {member?.profile?.nickname || 'Profile'}
                </Link>
                <Button
                  onClick={actions.logout}
                  variant="outline"
                  className="font-paragraph text-sm px-4 py-2 border-primary text-primary hover:bg-primary/5"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={actions.login}
                className="font-paragraph text-sm lg:text-base px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              >
                Sign In
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
