import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3,
  Facebook, Instagram, MapPin, Menu, Package, Phone, Send, ShieldCheck,
  Truck, Warehouse, X, Zap
} from "lucide-react";
import useMotion from "./motion.js";
import "./styles.css";

// Add the verified business phone number here in international format.
// Example: "+919876543210". Leave empty until the owner confirms the number.
const BUSINESS_PHONE = "";
const BUSINESS_EMAIL = ""; // Add only after the owner confirms the email.
const BUSINESS_LOCATION = "Pallapalayam, Coimbatore";
const BUSINESS_COORDINATES = "10.998426,77.062728";
const PLUS_CODE = "X3X7+93H Pallapalayam, Tamil Nadu";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${BUSINESS_COORDINATES}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_COORDINATES}`;
const MAP_EMBED_URL = `https://www.google.com/maps?q=${BUSINESS_COORDINATES}&hl=en&z=16&output=embed`;

const phoneHref = BUSINESS_PHONE ? `tel:${BUSINESS_PHONE}` : "";
const whatsappHref = BUSINESS_PHONE
  ? `https://wa.me/${BUSINESS_PHONE.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Maakeenaa Agencies, I would like to enquire about your transport services.")}`
  : "";

const services = [
  {
    number: "01",
    icon: Truck,
    title: "Domestic Transportation",
    description: "Movement of goods across destinations with a focus on dependable coordination and clear communication.",
    tag: "Goods movement"
  },
  {
    number: "02",
    icon: Package,
    title: "Courier Services",
    description: "A convenient point of contact for courier-related enquiries and delivery requirements.",
    tag: "Courier support"
  },
  {
    number: "03",
    icon: Warehouse,
    title: "Transport Enquiries",
    description: "Speak with the team about your consignment, destination and the service that best fits your needs.",
    tag: "Personal assistance"
  }
];

function Split({ text, base = 0 }) {
  return text.split(" ").map((w, i) => (
    <React.Fragment key={i}><span className="split-w"><span style={{ "--wi": base + i }}>{w}</span></span>{" "}</React.Fragment>
  ));
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  useMotion();

  const closeMenu = () => setMenuOpen(false);
  const navItems = [["Services", "#services"], ["About", "#about"], ["Why us", "#why-us"], ["Contact", "#contact"]];

  return (
    <div className="site-shell">
      <div className="scroll-progress" aria-hidden="true"><i /><Truck size={18} /></div>
      <div className="topbar">
        <div className="container topbar-inner">
          <span><MapPin size={13} /> Pallapalayam, Coimbatore</span>
          <span className="topbar-right"><span className="status-dot" /> Local transport & courier enquiries</span>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="Maakeenaa Agencies home" onClick={closeMenu}>
            <span className="brand-mark"><Truck size={22} strokeWidth={2.2} /></span>
            <span className="brand-copy"><strong>MAAKEENAA</strong><small>AGENCIES</small></span>
          </a>
          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            {navItems.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
            <a className="nav-mobile-cta" href="#contact" onClick={closeMenu}>Get in touch <ArrowUpRight size={15}/></a>
          </nav>
          <a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={16}/></a>
          <button className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid"></div>
          <div className="container hero-content">
            <div className="hero-copy reveal-left">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> TRANSPORT. CONNECT. DELIVER.</div>
              <h1 aria-label="Moving what matters forward."><Split text="Moving what" /><br/><Split text="matters" base={2} /> <em><Split text="forward." base={3} /></em></h1>
              <p className="hero-lede">Your local connection for domestic transportation and courier service enquiries in Coimbatore.</p>
              <div className="hero-actions">
                <a href="#contact" className="button button-orange">Enquire about a shipment <ArrowUpRight size={17}/></a>
                <a href="#services" className="text-link light-link">Explore services <ArrowDownRight size={17}/></a>
              </div>
              <div className="hero-proof">
                <div className="proof-icon"><MapPin size={17}/></div>
                <div><strong>Based in Pallapalayam</strong><span>Serving customers from Coimbatore</span></div>
              </div>
            </div>
            <div className="hero-visual reveal-right">
              <div className="hero-image-wrap">
                <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=85" alt="Freight truck travelling on a highway" />
                <div className="image-shade"></div>
                <div className="image-label"><span className="label-icon"><Truck size={18}/></span><span><small>MAAKEENAA AGENCIES</small><strong>Domestic transport</strong></span></div>
                <div className="image-index">01 <span>/ 03</span></div>
              </div>
              <div className="hero-stamp"><span>LOCAL</span><strong>CONNECT</strong><span>COIMBATORE · INDIA</span></div>
              <div className="orange-orb"></div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>RELIABLE CONNECTIONS START HERE</span><span className="scroll-cue">SCROLL TO EXPLORE <ArrowDownRight size={14}/></span>
          </div>
          <div className="hero-road" aria-hidden="true"><Truck size={26} /></div>
        </section>

        <section className="intro-strip">
          <div className="container intro-inner">
            <p>Every consignment has a destination.<br/><strong>Let’s help you take the next step.</strong></p>
            <div className="intro-location"><MapPin size={19}/><span><small>FIND US IN</small><strong>Pallapalayam, Coimbatore</strong></span></div>
          </div>
        </section>

        <section className="motion-strip" aria-label="Service highlights">
          <div className="motion-track">
            {["DOMESTIC TRANSPORT", "COURIER SERVICES", "PALLAPALAYAM · COIMBATORE", "DOMESTIC TRANSPORT", "COURIER SERVICES", "PALLAPALAYAM · COIMBATORE"].map((item, i) => <span key={i}>{item}<i>✳</i></span>)}
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="eyebrow"><span className="eyebrow-line"></span> WHAT WE DO</div><h2>Transport solutions<br/>for <em>everyday needs.</em></h2></div>
              <p>Explore the services listed for Maakeenaa Agencies. Contact the team to confirm routes, coverage, availability and shipment requirements.</p>
            </div>
            <div className="services-grid stagger">
              {services.map(({number, icon: Icon, title, description, tag}) => (
                <article className="service-card tilt" key={number}>
                  <div className="service-card-top"><span className="service-number">{number}</span><span className="service-icon"><Icon size={23}/></span></div>
                  <div className="service-card-body"><span className="service-tag">{tag}</span><h3>{title}</h3><p>{description}</p></div>
                  <a href="#contact" className="service-link" aria-label={`Enquire about ${title}`}>Enquire <ArrowUpRight size={17}/></a>
                </article>
              ))}
            </div>
            <div className="services-note"><span className="note-mark"><Check size={16}/></span> Need a specific route or delivery detail? Get in touch to check directly with the business.</div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="container about-grid">
            <div className="about-visual reveal-left">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1100&q=85" alt="Organised freight and logistics warehouse" />
              <div className="about-image-caption"><span>01 / OUR APPROACH</span><strong>Clear communication.<br/>Practical support.</strong></div>
              <div className="about-deco"></div>
            </div>
            <div className="about-copy reveal-right">
              <div className="eyebrow"><span className="eyebrow-line"></span> ABOUT MAAKEENAA AGENCIES</div>
              <h2>A local point of contact for <em>moving goods.</em></h2>
              <p className="about-lede">Maakeenaa Agencies is located in Pallapalayam, Coimbatore, under domestic transporters and courier services.</p>
              <p>Whether you are exploring a domestic transport requirement or need information about courier services, reach out to discuss your needs and confirm the details directly with the team.</p>
              <div className="about-points stagger">
                <div><span><MapPin size={17}/></span><p><strong>Local presence</strong><small>Located in Pallapalayam, Coimbatore</small></p></div>
                <div><span><Package size={17}/></span><p><strong>Service enquiries</strong><small>Domestic transportation and courier services</small></p></div>
              </div>
              <a href="#contact" className="button button-dark">Contact the team <ArrowUpRight size={17}/></a>
            </div>
          </div>
        </section>

        <section className="why-section" id="why-us">
          <div className="container why-inner">
            <div className="why-heading reveal-left">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> THE MAAKEENAA DIFFERENCE</div>
              <h2>Good service starts<br/>with a <em>conversation.</em></h2>
              <p>Get in touch with the business to discuss your requirement and understand the available service options.</p>
              <a href="#contact" className="text-link light-link">Start an enquiry <ArrowUpRight size={17}/></a>
            </div>
            <div className="why-list stagger">
              <div className="why-item"><span>01</span><div><ShieldCheck size={22}/><h3>Speak directly</h3><p>Discuss your shipment needs with the business before making arrangements.</p></div></div>
              <div className="why-item"><span>02</span><div><MapPin size={22}/><h3>Local presence</h3><p>Find the business in Pallapalayam, Coimbatore.</p></div></div>
              <div className="why-item"><span>03</span><div><Zap size={22}/><h3>Clear next steps</h3><p>Ask about service availability, charges, timelines and destination coverage.</p></div></div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container faq-grid">
            <div className="reveal-left"><div className="eyebrow"><span className="eyebrow-line"></span> QUICK INFORMATION</div><h2>Questions before<br/><em>you get moving?</em></h2><p className="faq-intro">A few useful things to confirm with the team before booking a service.</p></div>
            <div className="faq-list stagger">
              {[
                ["What services does Maakeenaa Agencies offer?", "The business is listed under Domestic Transporters and Courier Services. Contact the team to confirm the exact services available."],
                ["Where is Maakeenaa Agencies located?", "The business is located in Pallapalayam, Coimbatore (Coordinates: 10°59'54.3\"N 77°03'45.8\"E / Plus Code: X3X7+93H). Use the map below for live directions."],
                ["How can I ask about transport charges?", "Use the contact section to call or message the business once the verified phone number has been added to this website."],
                ["Which locations and routes are covered?", "Route coverage, delivery timelines and availability have not been confirmed. Please check these details directly with the business."]
              ].map(([q,a],i) => <div className={`faq-item ${faqOpen===i?"faq-active":""}`} key={q}>
                <button onClick={() => setFaqOpen(faqOpen===i?-1:i)}><span>{q}</span><ChevronDown size={18}/></button>
                <div className="faq-body"><div><p>{a}</p></div></div>
              </div>)}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-wrap">
            <div className="contact-main reveal-left">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> GET IN TOUCH</div>
              <h2>Have goods<br/>to <em>move?</em></h2>
              <p>Tell Maakeenaa Agencies what you need. Contact details can be updated here once confirmed by the business owner.</p>
              <div className="contact-actions">
                {phoneHref ? <a className="button button-orange" href={phoneHref}><Phone size={17}/> Call the business</a> : <a className="button button-orange" href="#contact-details"><Phone size={17}/> Phone number to be added</a>}
                {whatsappHref ? <a className="button button-outline-light" href={whatsappHref} target="_blank" rel="noreferrer"><Send size={16}/> WhatsApp</a> : <a className="button button-outline-light" href="#contact-details"><Send size={16}/> WhatsApp setup pending</a>}
              </div>
            </div>
            <div className="contact-details stagger" id="contact-details">
              <div className="contact-detail"><span className="detail-icon"><MapPin size={19}/></span><div><small>VISIT OUR LOCATION</small><strong>Pallapalayam, Coimbatore</strong><span className="detail-muted">Near Bypass Road ({PLUS_CODE})</span><a href={MAPS_URL} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={14}/></a></div></div>
              <div className="contact-detail"><span className="detail-icon"><Phone size={19}/></span><div><small>PHONE</small><strong>{BUSINESS_PHONE || "To be confirmed"}</strong><span className="detail-muted">{BUSINESS_PHONE ? "Call for service enquiries" : "Add the owner's verified business number"}</span></div></div>
              <div className="contact-detail"><span className="detail-icon"><Clock3 size={19}/></span><div><small>BUSINESS HOURS</small><strong>To be confirmed</strong><span className="detail-muted">Please contact the business before visiting</span></div></div>
              <div className="contact-detail"><span className="detail-icon"><Send size={19}/></span><div><small>EMAIL</small><strong>{BUSINESS_EMAIL || "To be confirmed"}</strong><span className="detail-muted">Email address not yet provided</span></div></div>
            </div>
          </div>
          <div className="contact-map">
            <iframe title="Map showing Maakeenaa Agencies in Pallapalayam, Coimbatore" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="map-card"><span className="map-pin"><MapPin size={18}/></span><div><small>FIND MAAKEENAA AGENCIES</small><strong>Pallapalayam, Coimbatore</strong><a href={DIRECTIONS_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14}/></a></div></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-top">
          <a href="#home" className="brand footer-brand"><span className="brand-mark"><Truck size={22}/></span><span className="brand-copy"><strong>MAAKEENAA</strong><small>AGENCIES</small></span></a>
          <p>Domestic transportation & courier service enquiries<br/>Pallapalayam, Coimbatore</p>
          <a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={15}/></a>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Maakeenaa Agencies. All rights reserved.</span><span>Designed for clear connections.</span></div>
      </footer>

      <a className="floating-contact" href={whatsappHref || "#contact"} target={whatsappHref ? "_blank" : undefined} rel={whatsappHref ? "noreferrer" : undefined} aria-label="Contact Maakeenaa Agencies"><Send size={20}/></a>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
