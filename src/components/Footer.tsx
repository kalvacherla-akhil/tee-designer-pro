import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-display font-black text-xl mb-4">
              THREAD<span className="text-accent">STUDIO</span>
            </h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Design your own custom T-shirts with our powerful studio. From idea to doorstep.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/products" className="hover:text-accent transition-colors">All T-Shirts</Link></li>
              <li><Link to="/studio" className="hover:text-accent transition-colors">Design Studio</Link></li>
              <li><Link to="/products" className="hover:text-accent transition-colors">Popular Designs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} ThreadStudio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
