import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Phone, Mail, MessageCircle, MapPin, 
  CheckCircle2, ArrowRight, Users, Briefcase, 
  Clock, Shield, Wifi, Coffee, Star, Quote
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Types ---
type Page = 'home' | 'spaces' | 'pricing' | 'about' | 'contact' | 'testimonials';

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string, id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'Office Spaces', id: 'spaces' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'About', id: 'about' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setCurrentPage('home')}
        >
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span className={cn("font-bold text-xl tracking-tight", scrolled ? "text-primary" : "text-primary")}>
            ANEX OFFICE
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                currentPage === item.id ? "text-accent" : "text-slate-600"
              )}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('contact')}
            className="btn-primary text-sm py-2 px-5"
          >
            Book a Tour
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t md:hidden flex flex-col p-6 gap-4"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "text-left text-lg font-medium py-2",
                  currentPage === item.id ? "text-accent" : "text-slate-600"
                )}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('contact');
                setIsOpen(false);
              }}
              className="btn-primary w-full mt-2"
            >
              Book a Tour
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <footer className="bg-primary text-slate-300 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-white text-primary rounded flex items-center justify-center font-bold">A</div>
          <span className="text-white font-bold text-lg">ANEX OFFICE</span>
        </div>
        <p className="text-sm leading-relaxed mb-6">
          Premium flexible office spaces in the heart of Durban. Empowering businesses with professional environments and flexible terms.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors"><MessageCircle size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Phone size={20} /></a>
          <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
        <ul className="space-y-4 text-sm">
          <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Home</button></li>
          <li><button onClick={() => setCurrentPage('spaces')} className="hover:text-white">Office Spaces</button></li>
          <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-white">Pricing</button></li>
          <li><button onClick={() => setCurrentPage('about')} className="hover:text-white">About Us</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-6">Our Spaces</h4>
        <ul className="space-y-4 text-sm">
          <li><button onClick={() => setCurrentPage('spaces')} className="hover:text-white">Private Offices</button></li>
          <li><button onClick={() => setCurrentPage('spaces')} className="hover:text-white">Coworking Desks</button></li>
          <li><button onClick={() => setCurrentPage('spaces')} className="hover:text-white">Meeting Rooms</button></li>
          <li><button onClick={() => setCurrentPage('spaces')} className="hover:text-white">Virtual Offices</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-6">Contact Us</h4>
        <ul className="space-y-4 text-sm">
          <li className="flex gap-3 items-start">
            <MapPin size={18} className="text-accent shrink-0" />
            <span>123 Florida Road, Morningside, Durban, 4001</span>
          </li>
          <li className="flex gap-3 items-center">
            <Phone size={18} className="text-accent shrink-0" />
            <span>+27 31 123 4567</span>
          </li>
          <li className="flex gap-3 items-center">
            <Mail size={18} className="text-accent shrink-0" />
            <span>info@anexoffice.co.za</span>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-xs text-center">
      <p>&copy; {new Date().getFullYear()} Anex Office. All rights reserved. Designed for success.</p>
    </div>
  </footer>
);

const WhatsAppButton = () => (
  <a 
    href="https://wa.me/27311234567" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
  >
    <MessageCircle size={28} fill="currentColor" />
  </a>
);

// --- Pages ---

const Home = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="pt-20">
    {/* Hero Section */}
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" 
          alt="Modern Office" 
          className="w-full h-full object-cover brightness-[0.4]"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 section-padding text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Flexible Office Spaces <br />
            <span className="text-accent">in Durban</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-10 leading-relaxed">
            Affordable, fully equipped, and professional workspaces designed to help your business thrive. Move in today with flexible lease terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setPage('contact')} className="btn-primary bg-accent hover:bg-amber-600 text-white border-none text-lg">
              Book a Tour
            </button>
            <button onClick={() => setPage('spaces')} className="btn-secondary border-white text-white hover:bg-white hover:text-primary text-lg">
              View Spaces
            </button>
          </div>
          <div className="mt-12 flex items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-accent" />
              <span>No long-term contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-accent" />
              <span>Fully furnished</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Benefits Section */}
    <section className="bg-white">
      <div className="section-padding">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Anex Office?</h2>
          <p className="text-slate-600">Everything you need to focus on your work, while we take care of the rest.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Clock className="text-accent" />, title: "Flexible Leases", desc: "Monthly, short-term, or long-term options that scale with your business growth." },
            { icon: <Briefcase className="text-accent" />, title: "Fully Furnished", desc: "Ergonomic furniture and modern design. Just bring your laptop and start working." },
            { icon: <Wifi className="text-accent" />, title: "High-Speed Internet", desc: "Reliable, enterprise-grade fiber internet to keep you connected 24/7." },
            { icon: <MapPin className="text-accent" />, title: "Prime Location", desc: "Located in Durban's most vibrant business hubs with easy access and parking." },
            { icon: <Shield className="text-accent" />, title: "24/7 Access", desc: "Work on your own schedule with secure, around-the-clock access to your office." },
            { icon: <Coffee className="text-accent" />, title: "Premium Amenities", desc: "Complimentary coffee, tea, shared kitchens, and professional reception services." },
          ].map((benefit, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50/50 hover:shadow-lg transition-all"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Space Options */}
    <section className="bg-slate-50">
      <div className="section-padding">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Space for Every Ambition</h2>
            <p className="text-slate-600">From solo entrepreneurs to growing teams, we have the perfect workspace for you.</p>
          </div>
          <button onClick={() => setPage('spaces')} className="text-accent font-semibold flex items-center gap-2 hover:gap-3 transition-all">
            View all spaces <ArrowRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80", 
              title: "Private Offices", 
              price: "From R4,500/mo",
              desc: "Enclosed, secure offices for teams of 1-10 people."
            },
            { 
              img: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80", 
              title: "Coworking Spaces", 
              price: "From R1,800/mo",
              desc: "Flexible hot desks or dedicated desks in a shared environment."
            },
            { 
              img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80", 
              title: "Meeting Rooms", 
              price: "From R250/hr",
              desc: "Professional rooms for presentations, pitches, and interviews."
            },
          ].map((space, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="h-64 overflow-hidden">
                <img src={space.img} alt={space.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{space.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{space.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary">{space.price}</span>
                  <button onClick={() => setPage('contact')} className="text-accent font-medium text-sm">Book Tour</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How it Works */}
    <section className="bg-white">
      <div className="section-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>
          {[
            { step: "01", title: "Choose Your Space", desc: "Browse our range of private offices, coworking desks, and meeting rooms." },
            { step: "02", title: "Book a Tour", desc: "Visit our Durban location to see the space and meet the community." },
            { step: "03", title: "Move In", desc: "Sign your flexible agreement and start working the very same day." },
          ].map((item, i) => (
            <div key={i} className="text-center bg-white px-4">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-primary/20">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials Preview */}
    <section className="bg-slate-900 text-white">
      <div className="section-padding">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">What Our Community Says</h2>
            <p className="text-slate-400 mb-8 text-lg">
              Join hundreds of successful entrepreneurs and businesses who call Anex Office their home.
            </p>
            <button onClick={() => setPage('testimonials')} className="btn-secondary border-slate-700 text-white hover:bg-white hover:text-primary">
              Read All Reviews
            </button>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 gap-6">
            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <div className="flex gap-1 mb-4 text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="italic text-slate-300 mb-6">
                "Moving to Anex Office was the best decision for my startup. The professional environment and networking opportunities have been invaluable."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center font-bold">SM</div>
                <div>
                  <h4 className="font-bold">Sarah Mkhize</h4>
                  <p className="text-xs text-slate-500">Founder, TechFlow Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="bg-accent">
      <div className="section-padding text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Elevate Your Workspace?</h2>
        <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
          Limited spaces available in our premium Durban location. Book your tour today and move in immediately.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={() => setPage('contact')} className="bg-white text-accent px-10 py-4 rounded-lg font-bold text-lg hover:bg-slate-100 transition-all">
            Book a Tour Now
          </button>
          <button onClick={() => setPage('pricing')} className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-accent transition-all">
            Request Pricing
          </button>
        </div>
      </div>
    </section>
  </div>
);

const Spaces = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Office Spaces</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Explore our range of professional workspaces in Durban, tailored to your business needs.
        </p>
      </div>

      <div className="space-y-24">
        {/* Private Offices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" 
              alt="Private Office" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-sm">Premium & Secure</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Private Offices</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our private offices provide a quiet, secure, and professional environment for teams of all sizes. Fully furnished and ready for immediate move-in, these offices offer the perfect balance of privacy and community.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>1-10 Person Capacity</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Secure Lockable Door</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Custom Branding Options</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>All Utilities Included</span>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
              <p className="text-sm text-slate-500 mb-1">Ideal for:</p>
              <p className="font-semibold">Startups, Small Businesses, and Corporate Satellite Teams.</p>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setPage('contact')} className="btn-primary">Book a Tour</button>
              <span className="font-bold text-xl">From R4,500/mo</span>
            </div>
          </div>
        </div>

        {/* Coworking Spaces */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          <div className="md:order-2 rounded-3xl overflow-hidden shadow-2xl h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80" 
              alt="Coworking Space" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="md:order-1">
            <span className="text-accent font-bold uppercase tracking-widest text-sm">Collaborative & Flexible</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Coworking Spaces</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Join a vibrant community of professionals in our open-plan coworking areas. Whether you need a hot desk for a few days or a dedicated desk for the month, our coworking options offer maximum flexibility and networking potential.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Hot Desk & Dedicated Desk</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Ergonomic Seating</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>High-Speed Fiber Wifi</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Community Events</span>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
              <p className="text-sm text-slate-500 mb-1">Ideal for:</p>
              <p className="font-semibold">Freelancers, Remote Workers, and Solopreneurs.</p>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setPage('contact')} className="btn-primary">Book a Tour</button>
              <span className="font-bold text-xl">From R1,800/mo</span>
            </div>
          </div>
        </div>

        {/* Meeting Rooms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80" 
              alt="Meeting Room" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="text-accent font-bold uppercase tracking-widest text-sm">Professional & Equipped</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Meeting Rooms</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Impress your clients and host productive team sessions in our fully equipped meeting rooms. Available by the hour or day, our rooms feature the latest AV technology and professional support.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>4-12 Person Capacity</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Smart TVs & Video Conferencing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Whiteboards & Stationary</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle2 size={18} className="text-accent" />
                <span>Catering Options Available</span>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
              <p className="text-sm text-slate-500 mb-1">Ideal for:</p>
              <p className="font-semibold">Client Meetings, Team Workshops, and Interviews.</p>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setPage('contact')} className="btn-primary">Book Now</button>
              <span className="font-bold text-xl">From R250/hr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Pricing = ({ setPage }: { setPage: (p: Page) => void }) => (
  <div className="pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Choose the plan that fits your current needs and scale as you grow. No hidden fees, no long-term commitments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { 
            title: "Coworking Lite", 
            price: "R1,800", 
            period: "/mo", 
            desc: "Perfect for freelancers needing a professional base.",
            features: ["Hot desk access", "High-speed Wifi", "10% Discount on Meeting Rooms", "Access to shared kitchen", "Business hours access"]
          },
          { 
            title: "Dedicated Desk", 
            price: "R2,900", 
            period: "/mo", 
            desc: "Your own permanent desk in a shared office.",
            features: ["Permanent desk & chair", "Lockable storage", "24/7 Access", "4 Hours Meeting Room credits", "Business address service", "High-speed Wifi"],
            popular: true
          },
          { 
            title: "Private Office", 
            price: "R4,500", 
            period: "/mo", 
            desc: "A secure, private space for your team.",
            features: ["Fully furnished private office", "24/7 Secure access", "8 Hours Meeting Room credits", "Business address & mail handling", "Company signage", "All utilities included"]
          },
        ].map((plan, i) => (
          <div 
            key={i} 
            className={cn(
              "relative bg-white p-8 rounded-3xl border transition-all hover:shadow-2xl",
              plan.popular ? "border-accent scale-105 shadow-xl z-10" : "border-slate-100"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
            <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-primary">{plan.price}</span>
              <span className="text-slate-500">{plan.period}</span>
            </div>
            <ul className="space-y-4 mb-10">
              {plan.features.map((f, j) => (
                <li key={j} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle2 size={18} className="text-accent shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setPage('contact')}
              className={cn(
                "w-full py-4 rounded-xl font-bold transition-all",
                plan.popular ? "bg-accent text-white hover:bg-amber-600" : "bg-slate-100 text-primary hover:bg-slate-200"
              )}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>

      <div className="bg-primary rounded-3xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          For larger teams or specific requirements, we offer tailored packages to suit your business perfectly.
        </p>
        <button onClick={() => setPage('contact')} className="btn-primary bg-white text-primary hover:bg-slate-100">
          Request Custom Quote
        </button>
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Empowering Durban's <br /><span className="text-accent">Business Community</span></h1>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            Anex Office was founded with a simple mission: to provide professional, high-quality, and affordable workspaces that help businesses grow. We believe that where you work matters, and that a professional environment should be accessible to everyone—from solo freelancers to established corporate teams.
          </p>
          <p className="text-slate-600 text-lg leading-relaxed">
            Based in the heart of Durban, we are proud to support the local economy by providing flexible infrastructure that allows businesses to scale without the burden of long-term commercial leases.
          </p>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80" 
            alt="Team Meeting" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={32} />
          </div>
          <h3 className="text-xl font-bold mb-4">Our Mission</h3>
          <p className="text-slate-600 text-sm">To provide the most flexible and professional office solutions in Durban, enabling business growth through community and convenience.</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold mb-4">Our Community</h3>
          <p className="text-slate-600 text-sm">We foster a diverse community of professionals, encouraging networking, collaboration, and mutual success.</p>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MapPin size={32} />
          </div>
          <h3 className="text-xl font-bold mb-4">Local Focus</h3>
          <p className="text-slate-600 text-sm">We are deeply rooted in Durban, understanding the local business landscape and providing spaces that reflect the city's vibrant energy.</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-12 md:p-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 italic">"Our goal isn't just to rent desks; it's to build a foundation where Durban's brightest minds can thrive."</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
            <div className="text-left">
              <h4 className="font-bold">Thabo Ndlovu</h4>
              <p className="text-sm text-slate-500">Founder & CEO, Anex Office</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Book a Tour</h1>
            <p className="text-slate-600 text-lg mb-10">
              Ready to see your new office? Fill out the form and our team will get back to you within 24 hours to schedule a visit.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Call Us</h4>
                  <p className="text-slate-600">+27 31 123 4567</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Email Us</h4>
                  <p className="text-slate-600">info@anexoffice.co.za</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Visit Us</h4>
                  <p className="text-slate-600">123 Florida Road, Morningside, Durban, 4001</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-green-50 rounded-3xl border border-green-100 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-green-800 mb-1">Chat on WhatsApp</h4>
                <p className="text-green-700 text-sm">Get instant answers to your questions.</p>
              </div>
              <a 
                href="https://wa.me/27311234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center gap-2"
              >
                <MessageCircle size={20} /> Chat Now
              </a>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Request Received!</h3>
                <p className="text-slate-600 mb-8">Thank you for your interest. One of our space experts will contact you shortly to confirm your tour date.</p>
                <button onClick={() => setSubmitted(false)} className="text-accent font-bold">Send another request</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Full Name</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input required type="tel" placeholder="+27 00 000 0000" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Email Address</label>
                  <input required type="email" placeholder="john@company.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Type of Space</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all appearance-none bg-white">
                    <option>Private Office</option>
                    <option>Coworking Desk</option>
                    <option>Meeting Room</option>
                    <option>Virtual Office</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Preferred Date</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Message (Optional)</label>
                  <textarea rows={4} placeholder="Tell us about your team size or specific needs..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"></textarea>
                </div>
                <button type="submit" className="w-full btn-primary py-4 text-lg">
                  Confirm Tour Request
                </button>
                <p className="text-center text-xs text-slate-400">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => (
  <div className="pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Client Success Stories</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          Hear from the entrepreneurs and businesses that have grown their vision within our walls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: "Sarah Mkhize", role: "Founder, TechFlow Solutions", text: "Moving to Anex Office was the best decision for my startup. The professional environment and networking opportunities have been invaluable." },
          { name: "David Peterson", role: "Creative Director, Pixel Perfect", text: "The meeting rooms are top-notch. I've closed more deals in the last 3 months here than I did all of last year working from home." },
          { name: "Lindiwe Dlamini", role: "Freelance Consultant", text: "I love the flexibility. Some months I need a private office for a big project, other months a hot desk is perfect. Anex makes it easy." },
          { name: "Mark Thompson", role: "Regional Manager, BuildCorp", text: "The location on Florida Road is unbeatable. Our team loves being close to the best cafes and restaurants in Durban." },
          { name: "Ayesha Khan", role: "E-commerce Entrepreneur", text: "The high-speed internet is actually high-speed. No more dropping out of Zoom calls. It's a game changer for my business." },
          { name: "James Wilson", role: "Architect", text: "Clean, modern, and professional. My clients are always impressed when they visit. The reception staff are also incredibly helpful." },
        ].map((t, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <div className="flex gap-1 mb-6 text-accent">
              {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
            </div>
            <Quote className="text-slate-100 mb-4" size={40} />
            <p className="text-slate-700 italic mb-8 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-primary">
                {t.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-bold">{t.name}</h4>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home setPage={setCurrentPage} />;
      case 'spaces': return <Spaces setPage={setCurrentPage} />;
      case 'pricing': return <Pricing setPage={setCurrentPage} />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'testimonials': return <Testimonials />;
      default: return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppButton />
    </div>
  );
}
