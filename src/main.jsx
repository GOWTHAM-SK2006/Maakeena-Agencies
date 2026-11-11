import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Clock3,
  Globe, MapPin, Menu, Package, Phone, Plane, Send, ShieldCheck,
  Truck, User, Warehouse, X, Zap
} from "lucide-react";
import useMotion from "./motion.js";
import "./styles.css";

const PROPRIETOR = "D. Vadivel";
const BUSINESS_PHONE_1 = "+919894144376";
const BUSINESS_PHONE_1_DISPLAY = "+91 98941 44376";
const BUSINESS_PHONE_2 = "+919894658961";
const BUSINESS_PHONE_2_DISPLAY = "+91 98946 58961";
const BUSINESS_EMAIL = "maakeenaa.agencies@gmail.com";
const BUSINESS_HOURS = "24 Hours (Open 24/7)";
const FULL_ADDRESS = "407/24, Lineman Thottam, Meenatchiamman Nagar, Ottarpalayam, Coimbatore - 641016";
const SHORT_ADDRESS = "Ottarpalayam, Coimbatore - 641016";
const BUSINESS_COORDINATES = "10.998426,77.062728";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${BUSINESS_COORDINATES}`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS_COORDINATES}`;
const MAP_EMBED_URL = `https://www.google.com/maps?q=${BUSINESS_COORDINATES}&hl=en&z=16&output=embed`;

const phoneHref1 = `tel:${BUSINESS_PHONE_1}`;
const phoneHref2 = `tel:${BUSINESS_PHONE_2}`;
const whatsappHref = `https://wa.me/${BUSINESS_PHONE_1.replace(/\D/g, "")}?text=${encodeURIComponent("Hello Maakeenaa Agencies (Mahindra Logistics Partner), I would like to enquire about transport / parcel services.")}`;

const services = [
  {
    number: "01",
    icon: Truck,
    title: "Part Truck Load (PTL)",
    description: "Economical, flexible cargo movement across India with dependable scheduled line-haul and mid-mile network connectivity.",
    tag: "Pan-India PTL"
  },
  {
    number: "02",
    icon: Package,
    title: "Express Surface",
    description: "Time-definite surface transport powered by Rivigo & Mahindra Logistics' tech-enabled fleet for fast, dependable road transit.",
    tag: "Express Surface"
  },
  {
    number: "03",
    icon: Plane,
    title: "Express Air",
    description: "High-priority, expedited cargo air freight connecting major commercial hubs and airports nationwide for time-critical consignments.",
    tag: "Express Air"
  },
  {
    number: "04",
    icon: Warehouse,
    title: "Parcel Pickup & Door Delivery",
    description: "Hassle-free parcel pickup from your doorstep and reliable door-to-door delivery across 19,000+ pin codes pan-India.",
    tag: "Door-to-Door Delivery"
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
  const navItems = [["Services", "#services"], ["About", "#about"], ["Why Us", "#why-us"], ["Contact", "#contact"]];

  return (
    <div className="site-shell">
      <div className="scroll-progress" aria-hidden="true"><i /><Truck size={18} /></div>
      <div className="topbar">
        <div className="container topbar-inner">
          <span><MapPin size={13} /> {SHORT_ADDRESS}</span>
          <span className="topbar-right">
            <span className="status-dot" /> Trusted Logistics Partner of Mahindra Logistics ·{" "}
            <a href={phoneHref1} style={{ color: "inherit", textDecoration: "none" }}>{BUSINESS_PHONE_1_DISPLAY}</a>
            {" · "}
            <a href={phoneHref2} style={{ color: "inherit", textDecoration: "none" }}>{BUSINESS_PHONE_2_DISPLAY}</a>
          </span>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="Maakeenaa Agencies home" onClick={closeMenu}>
            <span className="brand-mark"><Truck size={22} strokeWidth={2.2} /></span>
            <span className="brand-copy">
              <strong>MAAKEENAA AGENCIES</strong>
              <small>MAHINDRA LOGISTICS PARTNER</small>
            </span>
          </a>
          <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
            {navItems.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
            <a className="nav-mobile-cta" href="#contact" onClick={closeMenu}>Book a Shipment <ArrowUpRight size={15}/></a>
          </nav>
          <a className="nav-cta" href="#contact">Book Shipment <ArrowUpRight size={16}/></a>
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
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> OFFICIAL LOGISTICS & TRANSPORTATION WEBSITE</div>
              <h1 aria-label="Maakeenaa Agencies"><Split text="Maakeenaa" /><br/><em><Split text="Agencies" base={1} /></em></h1>
              <p className="hero-tagline" style={{ color: "var(--orange)", fontWeight: 700, fontSize: "17px", margin: "-6px 0 16px", letterSpacing: "-0.01em" }}>Your trusted logistics and transportation partner.</p>
              <p className="hero-lede">All India logistics and transport services by <strong>Maakeenaa Agencies</strong> in partnership with <strong>Mahindra Logistics & Rivigo</strong>. Door-to-door delivery, parcel pickup, PTL, Express Surface & Air across 19,000+ pin codes.</p>
              <div className="hero-actions">
                <a href="#contact" className="button button-orange">Book a shipment <ArrowUpRight size={17}/></a>
                <a href="#services" className="text-link light-link">Key service offerings <ArrowDownRight size={17}/></a>
              </div>
              <div className="hero-proof">
                <div className="proof-icon"><ShieldCheck size={17}/></div>
                <div><strong>D. Vadivel · Maakeenaa Agencies</strong><span>Partner of Mahindra Logistics & Rivigo · 19,000+ Pin Codes</span></div>
              </div>
            </div>
            <div className="hero-visual reveal-right">
              <div className="hero-image-wrap">
                <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=85" alt="Freight truck travelling on a highway" />
                <div className="image-shade"></div>
                <div className="image-label"><span className="label-icon"><Truck size={18}/></span><span><small>MAHINDRA LOGISTICS & RIVIGO PARTNER</small><strong>Maakeenaa Agencies</strong></span></div>
                <div className="image-index">01 <span>/ 04</span></div>
              </div>
              <div className="hero-stamp"><span>MAHINDRA</span><strong>LOGISTICS</strong><span>PARTNER</span></div>
              <div className="orange-orb"></div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>TECHNOLOGY · NETWORK · PEOPLE · PERFORMANCE = DELIVERING EXCELLENCE</span><span className="scroll-cue">SCROLL TO EXPLORE <ArrowDownRight size={14}/></span>
          </div>
          <div className="hero-road" aria-hidden="true"><Truck size={26} /></div>
        </section>

        <section className="intro-strip">
          <div className="container intro-inner">
            <p>All India logistics & transport services.<br/><strong>Powered by Mahindra Logistics & Rivigo network.</strong></p>
            <div className="intro-location"><MapPin size={19}/><span><small>HUB LOCATION</small><strong>{SHORT_ADDRESS}</strong></span></div>
          </div>
        </section>

        <section className="motion-strip" aria-label="Service highlights">
          <div className="motion-track">
            {["MAHINDRA LOGISTICS PARTNER", "RIVIGO TECH NETWORK", "19,000+ PIN CODES PAN INDIA", "1100+ TRUCKS ACTIVE FLEET", "PART TRUCK LOAD (PTL)", "EXPRESS SURFACE", "EXPRESS AIR", "DOOR-TO-DOOR DELIVERY", "MAHINDRA LOGISTICS PARTNER", "RIVIGO TECH NETWORK", "19,000+ PIN CODES PAN INDIA", "1100+ TRUCKS ACTIVE FLEET", "PART TRUCK LOAD (PTL)", "EXPRESS SURFACE", "EXPRESS AIR", "DOOR-TO-DOOR DELIVERY"].map((item, i) => <span key={i}>{item}<i>✳</i></span>)}
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading reveal">
              <div><div className="eyebrow"><span className="eyebrow-line"></span> KEY SERVICE OFFERINGS</div><h2>Technology-enabled<br/><em>logistics solutions.</em></h2></div>
              <p>Backed by Mahindra Logistics & Rivigo, we deliver reliable, efficient, and scalable transportation services across India to help businesses move better, faster and smarter.</p>
            </div>
            <div className="services-grid stagger">
              {services.map(({number, icon: Icon, title, description, tag}) => (
                <article className="service-card tilt" key={number}>
                  <div className="service-card-top"><span className="service-number">{number}</span><span className="service-icon"><Icon size={23}/></span></div>
                  <div className="service-card-body"><span className="service-tag">{tag}</span><h3>{title}</h3><p>{description}</p></div>
                  <a href="#contact" className="service-link" aria-label={`Enquire about ${title}`}>Book Now <ArrowUpRight size={17}/></a>
                </article>
              ))}
            </div>
            <div className="services-note"><span className="note-mark"><Check size={16}/></span> Full India logistics and transport services, including parcel pickup and door-to-door delivery.</div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="container about-grid">
            <div className="about-visual reveal-left">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1100&q=85" alt="Organised freight and logistics warehouse" />
              <div className="about-image-caption"><span>01 / OUR PARTNERSHIP</span><strong>Mahindra Logistics & Rivigo<br/>Delivering Excellence.</strong></div>
              <div className="about-deco"></div>
            </div>
            <div className="about-copy reveal-right">
              <div className="eyebrow"><span className="eyebrow-line"></span> ABOUT MAAKEENAA AGENCIES</div>
              <h2>Moving businesses forward<br/>with <em>world-class reach.</em></h2>
              <p className="about-lede">Maakeenaa Agencies (Proprietor: D. Vadivel) is your trusted logistics partner in Coimbatore, officially partnered with Mahindra Logistics and Rivigo by Mahindra Logistics.</p>
              <p>Rivigo by Mahindra Logistics is a technology-enabled logistics and supply chain solutions provider, delivering reliable, efficient, and scalable transportation services across India. Backed by technology and a strong network, we help businesses move better, faster and smarter.</p>
              <div className="about-points stagger">
                <div><span><Truck size={17}/></span><p><strong>1,100+ Trucks Fleet</strong><small>Operating in line haul & mid-mile network</small></p></div>
                <div><span><Globe size={17}/></span><p><strong>19,000+ Pin Codes</strong><small>Pan-India serviceability and door-to-door delivery</small></p></div>
              </div>
              <a href="#contact" className="button button-dark">Contact D. Vadivel <ArrowUpRight size={17}/></a>
            </div>
          </div>
        </section>

        <section className="why-section" id="why-us">
          <div className="container why-inner">
            <div className="why-heading reveal-left">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> THE MAHINDRA LOGISTICS ADVANTAGE</div>
              <h2>Nationwide reach,<br/><em>unmatched reliability.</em></h2>
              <p>Combining the power of Mahindra Logistics' technology & fleet with personal, dedicated support from Maakeenaa Agencies.</p>
              <a href="#contact" className="text-link light-link">Start an enquiry <ArrowUpRight size={17}/></a>
            </div>
            <div className="why-list stagger">
              <div className="why-item"><span>01</span><div><Globe size={22}/><h3>Pan India Serviceability</h3><p>Serviceability across 19,000+ pin codes pan India with strong nationwide reach & connectivity.</p></div></div>
              <div className="why-item"><span>02</span><div><Truck size={22}/><h3>1,100+ Trucks Large Fleet</h3><p>Operating across line haul & mid-mile network ensuring reliable and timely delivery performance.</p></div></div>
              <div className="why-item"><span>03</span><div><Zap size={22}/><h3>Real-Time Shipment Visibility</h3><p>Advanced technology for complete shipment visibility and tracking from pickup to delivery.</p></div></div>
              <div className="why-item"><span>04</span><div><ShieldCheck size={22}/><h3>Customer-Centric & Lowest DEPS</h3><p>Dedicated customer support, door-to-door care, and comprehensive delivery solutions.</p></div></div>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container faq-grid">
            <div className="reveal-left"><div className="eyebrow"><span className="eyebrow-line"></span> QUICK INFORMATION</div><h2>Questions before<br/><em>you get moving?</em></h2><p className="faq-intro">Key details about our partnership with Mahindra Logistics and service network.</p></div>
            <div className="faq-list stagger">
              {[
                ["What services does Maakeenaa Agencies offer?", "We provide Part Truck Load (PTL), Express Surface, Express Air, parcel pickup, and door-to-door delivery across 19,000+ pin codes across India."],
                ["Is Maakeenaa Agencies an authorized partner of Mahindra Logistics?", "Yes! Maakeenaa Agencies is an authorized trusted logistics partner of Mahindra Logistics and Rivigo by Mahindra Logistics, backed by an active network of 1,100+ trucks."],
                ["Where is the office and hub located?", "Our office is at 407/24, Lineman Thottam, Meenatchiamman Nagar, Ottarpalayam, Coimbatore - 641016 (near Sulur Bypass). Live directions are available on the map below."],
                ["How can I book a shipment or get rate quotes?", "Call or WhatsApp D. Vadivel 24/7 at +91 98941 44376 or +91 98946 58961, or email maakeenaa.agencies@gmail.com for instant quotes and dispatch."]
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
              <div className="eyebrow eyebrow-light"><span className="eyebrow-line"></span> GET IN TOUCH · D. VADIVEL</div>
              <h2>Have goods<br/>to <em>move?</em></h2>
              <p>Your trusted logistics partner for Part Truck Load (PTL), Express Surface, Express Air, parcel pickup, and door-to-door delivery across India.</p>
              <div className="contact-actions">
                <a className="button button-orange" href={phoneHref1}><Phone size={17}/> Call {BUSINESS_PHONE_1_DISPLAY}</a>
                <a className="button button-outline-light" href={whatsappHref} target="_blank" rel="noreferrer"><Send size={16}/> WhatsApp</a>
                <a className="button button-outline-light" href={phoneHref2}><Phone size={17}/> Call {BUSINESS_PHONE_2_DISPLAY}</a>
                <a className="button button-outline-light" href={`mailto:${BUSINESS_EMAIL}`}><Send size={16}/> Email Us</a>
              </div>
            </div>
            <div className="contact-details stagger" id="contact-details">
              <div className="contact-detail"><span className="detail-icon"><User size={19}/></span><div><small>PROPRIETOR & PARTNER</small><strong>{PROPRIETOR}</strong><span className="detail-muted">Partner · Mahindra Logistics & Rivigo</span></div></div>
              <div className="contact-detail"><span className="detail-icon"><MapPin size={19}/></span><div><small>OFFICE & HUB ADDRESS</small><strong>{FULL_ADDRESS}</strong><a href={MAPS_URL} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight size={14}/></a></div></div>
              <div className="contact-detail"><span className="detail-icon"><Phone size={19}/></span><div><small>CONTACT NUMBERS (24/7)</small><strong><a href={phoneHref1} style={{ color: "inherit", textDecoration: "none" }}>{BUSINESS_PHONE_1_DISPLAY}</a>{" / "}<a href={phoneHref2} style={{ color: "inherit", textDecoration: "none" }}>{BUSINESS_PHONE_2_DISPLAY}</a></strong><a href={whatsappHref} target="_blank" rel="noreferrer">Chat on WhatsApp <ArrowUpRight size={14}/></a></div></div>
              <div className="contact-detail"><span className="detail-icon"><Clock3 size={19}/></span><div><small>BUSINESS HOURS</small><strong>{BUSINESS_HOURS}</strong><span className="detail-muted">Round-the-clock booking, dispatch & support</span></div></div>
              <div className="contact-detail"><span className="detail-icon"><Send size={19}/></span><div><small>EMAIL</small><strong>{BUSINESS_EMAIL}</strong><a href={`mailto:${BUSINESS_EMAIL}`}>Send an email <ArrowUpRight size={14}/></a></div></div>
            </div>
          </div>
          <div className="contact-map">
            <iframe title="Map showing Maakeenaa Agencies in Coimbatore" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="map-card"><span className="map-pin"><MapPin size={18}/></span><div><small>MAAKEENAA AGENCIES · MAHINDRA LOGISTICS PARTNER</small><strong>{SHORT_ADDRESS}</strong><a href={DIRECTIONS_URL} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14}/></a></div></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-top">
          <a href="#home" className="brand footer-brand"><span className="brand-mark"><Truck size={22}/></span><span className="brand-copy"><strong>MAAKEENAA AGENCIES</strong><small>MAHINDRA LOGISTICS PARTNER</small></span></a>
          <p>Your Trusted Logistics Partner · Mahindra Logistics & Rivigo<br/>{FULL_ADDRESS}<br/>D. Vadivel: {BUSINESS_PHONE_1_DISPLAY} | {BUSINESS_PHONE_2_DISPLAY}</p>
          <a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={15}/></a>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Maakeenaa Agencies. All rights reserved. Authorized Partner of Mahindra Logistics.</span><span>Technology · Network · People · Performance</span></div>
      </footer>

      <a className="floating-contact" href={whatsappHref} target="_blank" rel="noreferrer" aria-label="Chat with Maakeenaa Agencies on WhatsApp"><Send size={20}/></a>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
