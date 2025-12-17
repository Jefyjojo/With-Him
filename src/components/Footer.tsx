export default function Footer() {
  return (
    <footer className="w-full bg-secondary border-t border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-heading text-xl text-primary italic">Grace</p>
            <p className="font-paragraph text-sm text-secondary-foreground/70">
              Your spiritual companion for daily encouragement
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <p className="font-paragraph text-sm text-secondary-foreground/70">
              © {new Date().getFullYear()} Grace. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a 
                href="#" 
                className="font-paragraph text-sm text-secondary-foreground hover:opacity-70 transition-opacity duration-300"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="font-paragraph text-sm text-secondary-foreground hover:opacity-70 transition-opacity duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
