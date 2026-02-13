import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from "lucide-react";

import { assets } from "@/lib/assets";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container pt-16 pb-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-12 items-center justify-center overflow-hidden">
                <img src={assets.logos.main} alt="Tiny Triumph Logo" className="h-full w-auto object-contain" />
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dedicated to nurturing your child’s growth, development, and confidence through tailored programs and expert therapies.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/p/Tiny-Triumph-child-development-centre-61566975311848/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Book Appointment", path: "https://api.whatsapp.com/send?phone=919114222044&text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Tiny%20Triumph%20CDC.", isExternal: true },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  {link.isExternal ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">Our Services</h4>
            <ul className="space-y-2">
              {[
                "Occupational Therapy",
                "Speech Therapy",
                "Behaviour Therapy",
                "Physiotherapy",
                "Special Education",
                "Sensory Integration Therapy",
                "Prosthetics & Orthotics",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  UPHC Hospital, Near Sunhat,<br />
                  Chandan Bagicha, Mallikashpur,<br />
                  Balasore, Odisha 756002
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+919114222044" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +91 9114222044
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:gananjalika@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  gananjalika@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Mon - Sun: 08:00 AM - 09:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tiny Triumph Child Development Centre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
