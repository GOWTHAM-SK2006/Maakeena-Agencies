import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  Layers,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Phone,
  Plane,
  Radio,
  Send,
  Shield,
  ShieldCheck,
  Star,
  Truck,
  User,
  Warehouse,
  X,
  Zap
} from "lucide-react";
import useMotion from "./motion.js";
import "./styles.css";

// Business Constants
const COMPANY_NAME = "Maakeenaa Agencies";
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
const whatsappHref = `https://wa.me/${BUSINESS_PHONE_1.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Hello Maakeenaa Agencies (Mahindra Logistics Partner), I would like to enquire about logistics and transportation services."
)}`;

const services = [
  {
    id: "ptl",
    number: "01",
    title: "Part Truck Load (PTL)",
    tagline: "Flexible & Economical Consignment Freight",
    description:
      "Move medium-to-large cargo economically without booking an entire truck. Powered by Mahindra Logistics' dense line-haul schedule with scheduled dispatch, guaranteed space, and zero transit delays across pan-India routes.",
    icon: Truck,
    badge: "Most Popular",
    features: [
      "Scheduled nationwide line-haul movements",
      "Consolidated economical freight rates",
      "Robust cargo handling & damage-free transit",
      "Ideal for industrial goods, textiles & machinery"
    ]
  },
  {
    id: "express-surface",
    number: "02",
    title: "Express Surface",
    tagline: "Fast & Tech-Enabled Highway Transit",
    description:
      "Time-definite road express transportation powered by the innovative Rivigo by Mahindra Logistics relay trucking model. Ensures reduced turnaround times, superior reliability, and driver fatigue elimination for rapid interstate shipments.",
    icon: Zap,
    badge: "Time-Definite",
    features: [
      "High-speed highway relay logistics network",
      "Real-time GPS telematics & temperature monitoring",
      "Consistent transit times with minimal road halt",
      "Seamless interstate documentation & GST compliances"
    ]
  },
  {
    id: "express-air",
    number: "03",
    title: "Express Air Freight",
    tagline: "Next-Flight-Out Priority Cargo",
    description:
      "For mission-critical, time-sensitive freight. Connects major commercial airports and metropolitan distribution centers nationwide with prioritized airport handling, fast-track customs clearance, and prompt destination handoff.",
    icon: Plane,
    badge: "Priority Speed",
    features: [
      "Same-day & next-day delivery to key metro hubs",
      "Dedicated air consignment tracking & security",
      "Handles high-value, perishable & critical spare parts",
      "Direct airport-to-door delivery integration"
    ]
  },
  {
    id: "door-delivery",
    number: "04",
    title: "Parcel Pickup & Door Delivery",
    tagline: "Comprehensive End-to-End Last-Mile Service",
    description:
      "Complete hassle-free doorstep service. We collect your packages right from your factory, warehouse, office, or residence in Coimbatore and deliver directly to the recipient's doorstep across 19,000+ pin codes in India.",
    icon: Package,
    badge: "First & Last Mile",
    features: [
      "Scheduled doorstep pickup from Coimbatore & surroundings",
      "Safe packaging support and pallet strapping",
      "Complete delivery across 19,000+ postal pin codes",
      "Instant electronic proof of delivery (e-POD)"
    ]
  }
];

const stats = [
  { value: "19,000+", label: "Pin Codes Covered", detail: "Pan-India comprehensive serviceability" },
  { value: "1,100+", label: "Active Fleet Trucks", detail: "Line haul & mid-mile network" },
  { value: "24/7", label: "Operations & Dispatch", detail: "Round-the-clock booking & support" },
  { value: "Lowest", label: "DEPS Benchmark", detail: "Damage, Excess, Pilferage, Shortage min." }
];

const corePillars = [
  {
    title: "Technology",
    desc: "End-to-end digital shipment visibility, GPS truck tracking, automated dispatch alerts, and digital consignment management.",
    icon: Zap
  },
  {
    title: "Network",
    desc: "Integrated pan-India line-haul and hub network servicing 19,000+ pin codes in tier-1, tier-2, and remote tier-3 destinations.",
    icon: Globe
  },
  {
    title: "People",
    desc: "Experienced freight handlers, verified professional drivers, and dedicated customer advisors led personally by D. Vadivel.",
    icon: User
  },
  {
    title: "Performance",
    desc: "Strict adherence to service-level agreements (SLAs), time-definite delivery targets, and lowest industry DEPS ratings.",
    icon: Award
  }
];

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80",
    title: "Express Line-Haul Highway Fleet",
    tag: "Fleet & Transit",
    caption: "Heavy commercial haulage connecting North-South corridors with safety and speed."
  },
  {
    url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    title: "Modern Multi-Client Fulfillment Hub",
    tag: "Warehousing",
    caption: "Spacious staging, palletized storage, and systematic consignment sorting."
  },
  {
    url: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=1200&q=80",
    title: "Commercial Air Cargo Operations",
    tag: "Express Air",
    caption: "Priority airport tarmac loading for expedited long-distance delivery."
  },
  {
    url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    title: "Intermodal Container Terminal Hub",
    tag: "Infrastructure",
    caption: "High-volume cargo staging and interstate logistics interchange."
  },
  {
    url: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80",
    title: "Door-to-Door First & Last Mile Fleet",
    tag: "Last Mile",
    caption: "Doorstep pickup in Coimbatore and prompt delivery across Indian postal zones."
  },
  {
    url: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
    title: "Digital Consignment Verification",
    tag: "Quality Control",
    caption: "Barcode scanning, weight audit, and safe packaging inspection before dispatch."
  }
];

const faqs = [
  {
    q: "What is the relationship between Maakeenaa Agencies, Mahindra Logistics, and Rivigo?",
    a: "Maakeenaa Agencies (Proprietor: D. Vadivel) is an authorized trusted logistics partner of Mahindra Logistics and Rivigo by Mahindra Logistics. Through this partnership, we provide our customers direct access to Mahindra Logistics' nationwide tech-enabled network of 1,100+ trucks and 19,000+ pin code reach, backed by personalized local booking and dispatch service in Coimbatore."
  },
  {
    q: "What freight services can I book through Maakeenaa Agencies?",
    a: "We offer comprehensive freight solutions including Part Truck Load (PTL), Express Surface transport, Express Air cargo, parcel pickup from your premises, and guaranteed door-to-door delivery across India."
  },
  {
    q: "How does doorstep parcel pickup work?",
    a: "Simply call or message us on WhatsApp with your pickup location in or around Coimbatore, consignment type, and approx weight. Our dispatch team will schedule a pickup vehicle directly to your warehouse, factory, or office, weigh and tag the cargo, and hand over your booking receipt."
  },
  {
    q: "Where is the Maakeenaa Agencies hub and office located?",
    a: "Our hub is located at 407/24, Lineman Thottam, Meenatchiamman Nagar, Ottarpalayam, Coimbatore - 641016 (near Sulur Bypass). You can visit in person or view live directions on the Google Map integrated on this page."
  },
  {
    q: "What are your operating hours and how can I track my shipment?",
    a: "We operate 24 Hours (Open 24/7). You can reach out day or night for booking, dispatch, rate quotes, or consignment status. Every shipment is backed by Mahindra Logistics' telematics system for complete visibility."
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedGallery, setSelectedGallery] = useState(null);
  
  // Interactive Booking Form state
  const [calcService, setCalcService] = useState("Part Truck Load (PTL)");
  const [calcOrigin, setCalcOrigin] = useState("Coimbatore, Tamil Nadu");
  const [calcDest, setCalcDest] = useState("");
  const [calcWeight, setCalcWeight] = useState("");

  useMotion();

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const query = `Hello Maakeenaa Agencies (D. Vadivel), I would like a quote for:\n- Service: ${calcService}\n- From: ${calcOrigin}\n- Destination: ${calcDest || "Pan India"}\n- Weight/Parcel: ${calcWeight || "To be discussed"}\nPlease share pricing and schedule.`;
    window.open(`https://wa.me/${BUSINESS_PHONE_1.replace(/\D/g, "")}?text=${encodeURIComponent(query)}`, "_blank");
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Why Choose Us", href: "#why-us" },
    { label: "Partners", href: "#partners" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <div className="site-wrapper">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="top-banner">
        <div className="container banner-inner">
          <div className="banner-left">
            <span className="live-pulse">
              <span className="pulse-ring"></span>
              <span className="pulse-dot"></span>
            </span>
            <span className="banner-text">
              <strong className="status-label">Hub Operations Active (24/7):</strong>
              <strong className="status-label-mobile">Operations Active 24/7</strong>
              <span className="location-label"> {SHORT_ADDRESS}</span>
              <span className="location-label-mobile">Coimbatore Hub</span>
            </span>
          </div>
          <div className="banner-right">
            <span className="partner-chip">
              <ShieldCheck size={14} className="chip-icon" />
              <span className="partner-text-desktop">Partner of Mahindra Logistics & Rivigo</span>
              <span className="partner-text-mobile">Mahindra Logistics Partner</span>
            </span>
            <span className="banner-divider">|</span>
            <a href={phoneHref1} className="banner-phone primary-phone">
              <Phone size={13} /> {BUSINESS_PHONE_1_DISPLAY}
            </a>
            <span className="banner-divider secondary-divider">|</span>
            <a href={phoneHref2} className="banner-phone secondary-phone">
              <Phone size={13} /> {BUSINESS_PHONE_2_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* 2. CORPORATE HEADER & NAVIGATION */}
      <header className="site-header">
        <div className="container header-container">
          <a href="#home" className="corporate-brand" aria-label="Maakeenaa Agencies Home">
            <div className="brand-logo-badge">
              <Truck size={24} strokeWidth={2.4} />
            </div>
            <div className="brand-titles">
              <span className="brand-name">MAAKEENAA AGENCIES</span>
              <span className="brand-partner-sub">
                <span className="partner-highlight">MAHINDRA LOGISTICS</span> PARTNER
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="desktop-navigation" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="nav-item">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="header-actions">
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn btn-outline-nav">
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a href="#quote" className="btn btn-primary-nav">
              Get Quote <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              className="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav-drawer ${mobileMenuOpen ? "drawer-open" : ""}`}>
          <div className="mobile-nav-inner">
            <div className="mobile-nav-head">
              <div className="brand-titles">
                <span className="brand-name">MAAKEENAA AGENCIES</span>
                <span className="brand-partner-sub">MAHINDRA LOGISTICS PARTNER</span>
              </div>
              <button
                type="button"
                className="close-drawer"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="mobile-links">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  <ArrowRight size={16} />
                </a>
              ))}
            </div>
            <div className="mobile-drawer-footer">
              <p className="mobile-drawer-contact-title">Direct Booking Line (24/7)</p>
              <a href={phoneHref1} className="mobile-contact-call">
                <Phone size={18} /> {BUSINESS_PHONE_1_DISPLAY}
              </a>
              <a href={phoneHref2} className="mobile-contact-call">
                <Phone size={18} /> {BUSINESS_PHONE_2_DISPLAY}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 3. HERO SECTION */}
        <section className="hero-section" id="home">
          <div className="hero-backdrop">
            <div className="hero-gradient-overlay"></div>
            <div className="hero-grid-pattern"></div>
          </div>

          <div className="container hero-container">
            <div className="hero-content reveal-left">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                OFFICIAL LOGISTICS & TRANSPORTATION WEBSITE
              </div>

              <h1 className="hero-heading">
                Maakeenaa Agencies
                <span className="hero-subheading-block">
                  Your Trusted Logistics & Transportation Partner.
                </span>
              </h1>

              <p className="hero-description">
                Delivering all-India enterprise freight and cargo solutions in authorized partnership with{" "}
                <strong>Mahindra Logistics</strong> and <strong>Rivigo</strong>. Serving 19,000+ pin codes
                with scheduled Part Truck Load (PTL), Express Surface, and Priority Air Cargo.
              </p>

              <div className="hero-cta-group">
                <a href="#quote" className="btn btn-primary btn-lg">
                  Book a Shipment <ArrowUpRight size={18} />
                </a>
                <a href={phoneHref1} className="btn btn-secondary btn-lg">
                  <Phone size={18} /> Call {BUSINESS_PHONE_1_DISPLAY}
                </a>
                <a href="#services" className="btn btn-ghost btn-lg">
                  Explore Services <ArrowDownRight size={18} />
                </a>
              </div>

              {/* Verified Partner Bar */}
              <div className="hero-partner-credential">
                <div className="cred-icon">
                  <ShieldCheck size={26} />
                </div>
                <div className="cred-text">
                  <strong>D. Vadivel · Proprietor, Maakeenaa Agencies</strong>
                  <span>Authorized Partner: Mahindra Logistics & Rivigo Network · Coimbatore Hub</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card with High-Impact Badges */}
            <div className="hero-visual reveal-right">
              <div className="visual-card-wrap">
                <div className="visual-image-frame">
                  <img
                    src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=85"
                    alt="Maakeenaa Agencies - Mahindra Logistics heavy haul fleet"
                    className="visual-img"
                    loading="eager"
                  />
                  <div className="visual-overlay"></div>

                  <div className="visual-badge-top">
                    <span className="badge-label">PAN-INDIA CONNECTIVITY</span>
                    <strong className="badge-value">19,000+ Pin Codes</strong>
                  </div>

                  <div className="visual-badge-bottom">
                    <div className="carrier-tag">
                      <Truck size={18} />
                      <span>MAHINDRA LOGISTICS FLEET</span>
                    </div>
                    <div className="carrier-sub">1,100+ Line Haul & Mid-Mile Trucks</div>
                  </div>
                </div>

                {/* Floating Metric Card 1 */}
                <div className="floating-metric-card float-card-1">
                  <div className="f-icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="f-title">24/7 Operations</span>
                    <span className="f-desc">Non-stop dispatch & monitoring</span>
                  </div>
                </div>

                {/* Floating Metric Card 2 */}
                <div className="floating-metric-card float-card-2">
                  <div className="f-icon-gold">
                    <Shield size={20} />
                  </div>
                  <div>
                    <span className="f-title">Lowest DEPS</span>
                    <span className="f-desc">Safe & undamaged transit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. KEY METRICS STATS BAR */}
          <div className="container stats-strip">
            <div className="stats-grid stagger">
              {stats.map((s, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-number">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-detail">{s.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. OFFICIAL PARTNERSHIP SPOTLIGHT SECTION */}
        <section className="partners-section" id="partners">
          <div className="container">
            <div className="partners-card reveal">
              <div className="partners-header">
                <div className="section-eyebrow">
                  <span className="eyebrow-line"></span>
                  STRATEGIC ALLIANCE & NETWORK POWER
                </div>
                <h2 className="section-title">
                  Partnered with India’s Logistics Giants: <br />
                  <span className="text-gradient">Mahindra Logistics & Rivigo</span>
                </h2>
                <p className="section-subtitle">
                  Maakeenaa Agencies combines localized Coimbatore customer dedication with the pan-India
                  technological infrastructure of Mahindra Logistics and Rivigo.
                </p>
              </div>

              <div className="partner-detail-grid">
                <div className="partner-box">
                  <div className="partner-badge-head">
                    <Building2 size={24} className="text-orange" />
                    <div>
                      <h3 className="partner-name">Mahindra Logistics</h3>
                      <span className="partner-role">Integrated Supply Chain Solutions</span>
                    </div>
                  </div>
                  <p className="partner-body-text">
                    Mahindra Logistics is one of India’s largest 3PL and transportation providers, operating
                    with a legacy of trust, corporate governance, and nationwide multi-modal connectivity.
                  </p>
                  <ul className="partner-list">
                    <li><Check size={16} /> Pan-India line-haul and hub-and-spoke infrastructure</li>
                    <li><Check size={16} /> Complete enterprise compliance and safety standards</li>
                    <li><Check size={16} /> Trusted by thousands of leading manufacturing & retail brands</li>
                  </ul>
                </div>

                <div className="partner-box">
                  <div className="partner-badge-head">
                    <Zap size={24} className="text-orange" />
                    <div>
                      <h3 className="partner-name">Rivigo by Mahindra Logistics</h3>
                      <span className="partner-role">Technology-Enabled Freight Network</span>
                    </div>
                  </div>
                  <p className="partner-body-text">
                    Rivigo by Mahindra Logistics is a technology-enabled logistics and supply chain solutions
                    provider, delivering reliable, efficient, and scalable transportation services across India.
                    Backed by technology and a strong network, we help businesses move better, faster and smarter.
                  </p>
                  <ul className="partner-list">
                    <li><Check size={16} /> Groundbreaking relay trucking model for faster road transit</li>
                    <li><Check size={16} /> Advanced GPS telematics and complete shipment visibility</li>
                    <li><Check size={16} /> Reduced driver transit fatigue for safer, timely deliveries</li>
                  </ul>
                </div>
              </div>

              <div className="partnership-footer-quote">
                <p>
                  <strong>TECHNOLOGY · NETWORK · PEOPLE · PERFORMANCE = DELIVERING EXCELLENCE</strong>
                </p>
                <span>Authorized Hub Registration · Ottarpalayam, Coimbatore - 641016</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ABOUT MAAKEENAA AGENCIES */}
        <section className="about-section" id="about">
          <div className="container about-container">
            <div className="about-image-column reveal-left">
              <div className="about-img-frame">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
                  alt="High standard warehousing and freight logistics hub"
                  className="about-hero-img"
                  loading="lazy"
                />
                <div className="about-experience-stamp">
                  <div className="stamp-num">24/7</div>
                  <div className="stamp-text">Active Operations & Dispatch Support</div>
                </div>
              </div>
            </div>

            <div className="about-text-column reveal-right">
              <div className="section-eyebrow">
                <span className="eyebrow-line"></span>
                ABOUT OUR ENTERPRISE
              </div>
              <h2 className="section-title">
                Committed to Moving Your Business Forward with Reliability & Speed.
              </h2>
              <p className="lead-paragraph">
                <strong>Maakeenaa Agencies</strong>, founded and managed by <strong>D. Vadivel</strong>,
                is Coimbatore’s premier logistics partner providing businesses, factories, and individuals
                with direct access to India’s most robust freight and transportation network.
              </p>
              <p className="body-paragraph">
                Whether you are transporting critical machinery parts, bulk agricultural goods, textile consignments,
                e-commerce packages, or urgent documents, we ensure smooth pickup from your doorstep, seamless interstate
                movement, and guaranteed on-time delivery across 19,000+ pin codes.
              </p>

              {/* 4 Pillars Grid */}
              <div className="pillars-grid stagger">
                {corePillars.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={i} className="pillar-item">
                      <div className="pillar-icon">
                        <Icon size={18} />
                      </div>
                      <div className="pillar-content">
                        <h4 className="pillar-title">{pillar.title}</h4>
                        <p className="pillar-desc">{pillar.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="about-action-row">
                <a href="#contact" className="btn btn-primary">
                  Meet Proprietor D. Vadivel <ArrowRight size={16} />
                </a>
                <a href={phoneHref1} className="btn btn-outline">
                  <Phone size={16} /> Direct Inquiry: {BUSINESS_PHONE_1_DISPLAY}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. OUR SERVICES */}
        <section className="services-section" id="services">
          <div className="container">
            <div className="section-header-center reveal">
              <div className="section-eyebrow">
                <span className="eyebrow-line"></span>
                ENTERPRISE LOGISTICS SOLUTIONS
              </div>
              <h2 className="section-title">
                Comprehensive Logistics & Transportation Services
              </h2>
              <p className="section-subtitle">
                Engineered for speed, security, and cost efficiency. Choose from our specialized offerings
                designed to fit every cargo dimension, budget, and delivery timeline.
              </p>
            </div>

            <div className="services-grid-cards stagger">
              {services.map((srv) => {
                const Icon = srv.icon;
                return (
                  <div key={srv.id} className="service-card-premium">
                    <div className="card-top-bar">
                      <span className="card-service-num">{srv.number}</span>
                      <span className="card-badge">{srv.badge}</span>
                    </div>

                    <div className="card-icon-wrap">
                      <Icon size={28} className="service-icon" />
                    </div>

                    <h3 className="card-title">{srv.title}</h3>
                    <p className="card-tagline">{srv.tagline}</p>
                    <p className="card-desc">{srv.description}</p>

                    <div className="card-features-list">
                      <h4 className="features-head">Service Highlights:</h4>
                      <ul>
                        {srv.features.map((feat, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={15} className="feat-check" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="card-action-bar">
                      <a
                        href={`https://wa.me/${BUSINESS_PHONE_1.replace(/\D/g, "")}?text=${encodeURIComponent(
                          `Hello Maakeenaa Agencies, I would like to book or inquire about *${srv.title}*.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary-service"
                      >
                        Enquire for {srv.title} <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Service Banner */}
            <div className="service-all-india-banner reveal">
              <div className="banner-icon-side">
                <Globe size={32} />
              </div>
              <div className="banner-copy-side">
                <h3>All India Logistics and Transport Services</h3>
                <p>
                  Including parcel pickup from your premises and door-to-door delivery across 19,000+ pin codes in India.
                  Guaranteed safe transit, transparent documentation, and continuous consignment updates.
                </p>
              </div>
              <div className="banner-action-side">
                <a href="#quote" className="btn btn-primary">
                  Instant Freight Quote <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 8. WHY CHOOSE US / ADVANTAGES */}
        <section className="why-us-section" id="why-us">
          <div className="container">
            <div className="why-us-header reveal">
              <div className="section-eyebrow light">
                <span className="eyebrow-line"></span>
                THE MAAKEENAA ADVANTAGE
              </div>
              <h2 className="section-title light">
                Why Industry Leaders Choose <br />
                <span className="text-orange">Maakeenaa Agencies</span>
              </h2>
              <p className="section-subtitle light">
                We bridge the gap between large enterprise scale and personalized operational accountability.
                Here is why our clients trust us repeatedly for their mission-critical freight.
              </p>
            </div>

            <div className="why-grid stagger">
              <div className="why-card">
                <div className="why-icon-box">
                  <Globe size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">01</span>
                  <h3 className="why-title">19,000+ Pin Codes Pan-India</h3>
                  <p className="why-text">
                    Comprehensive serviceability reaching commercial capitals, manufacturing industrial belts,
                    and remote tier-2 and tier-3 towns across India.
                  </p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <Truck size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">02</span>
                  <h3 className="why-title">1,100+ Trucks Active Fleet</h3>
                  <p className="why-text">
                    Massive network fleet operating across line haul and mid-mile networks ensuring scheduled
                    dispatches, consistent transit times, and zero vehicle shortages.
                  </p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <Radio size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">03</span>
                  <h3 className="why-title">Real-Time Shipment Visibility</h3>
                  <p className="why-text">
                    Advanced GPS telematics and digital dispatch integration give you complete transparency
                    over cargo milestones from origin loading to consignee handoff.
                  </p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <ShieldCheck size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">04</span>
                  <h3 className="why-title">Lowest DEPS Benchmark</h3>
                  <p className="why-text">
                    Industry-leading minimised DEPS (Damage, Excess, Pilferage, Shortage) through rigorous pallet
                    securing, audited transshipment handling, and trained cargo personnel.
                  </p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <User size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">05</span>
                  <h3 className="why-title">Direct Proprietor Accountability</h3>
                  <p className="why-text">
                    No automated call centers. D. Vadivel and his core team in Coimbatore handle your consignments
                    personally, providing direct WhatsApp updates and immediate query resolution.
                  </p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <Clock size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">06</span>
                  <h3 className="why-title">Round-The-Clock 24/7 Service</h3>
                  <p className="why-text">
                    Our Coimbatore hub never sleeps. We accept consignments, schedule night line-hauls, and provide
                    urgent night-time dispatches 24 hours a day, 365 days a year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. INTERACTIVE FREIGHT QUOTE CALCULATOR & BOOKING ASSISTANT */}
        <section className="quote-section" id="quote">
          <div className="container">
            <div className="quote-box-wrap reveal">
              <div className="quote-intro">
                <div className="section-eyebrow">
                  <span className="eyebrow-line"></span>
                  FAST FREIGHT ESTIMATE
                </div>
                <h2 className="quote-title">Book a Shipment or Request an Instant Rate Quote</h2>
                <p className="quote-desc">
                  Select your required freight service, enter your destination and weight details, and our system
                  will prepare an instant WhatsApp enquiry directly to our dispatch desk.
                </p>

                <div className="quote-perks">
                  <div className="perk-item">
                    <CheckCircle2 size={18} className="text-orange" />
                    <span>Free doorstep pickup in Coimbatore</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={18} className="text-orange" />
                    <span>Competitive commercial tariff rates</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={18} className="text-orange" />
                    <span>Instant response within 15 minutes</span>
                  </div>
                </div>

                <div className="quick-call-box">
                  <span className="quick-call-label">Prefer to talk directly right now?</span>
                  <div className="quick-call-buttons">
                    <a href={phoneHref1} className="btn btn-outline-dark">
                      <Phone size={16} /> {BUSINESS_PHONE_1_DISPLAY}
                    </a>
                    <a href={phoneHref2} className="btn btn-outline-dark">
                      <Phone size={16} /> {BUSINESS_PHONE_2_DISPLAY}
                    </a>
                  </div>
                </div>
              </div>

              <div className="quote-form-panel">
                <form onSubmit={handleBookingSubmit} className="quote-form">
                  <h3 className="form-heading">Consignment Details</h3>

                  <div className="form-group">
                    <label htmlFor="service-select">Select Freight Service</label>
                    <select
                      id="service-select"
                      value={calcService}
                      onChange={(e) => setCalcService(e.target.value)}
                      className="form-control"
                    >
                      <option value="Part Truck Load (PTL)">Part Truck Load (PTL)</option>
                      <option value="Express Surface">Express Surface</option>
                      <option value="Express Air Freight">Express Air Freight</option>
                      <option value="Parcel Pickup & Door Delivery">Parcel Pickup & Door Delivery</option>
                      <option value="Full Truck Load (FTL) / Special Consignment">Full Truck Load (FTL)</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="origin-input">Origin Location</label>
                      <input
                        id="origin-input"
                        type="text"
                        value={calcOrigin}
                        onChange={(e) => setCalcOrigin(e.target.value)}
                        className="form-control"
                        placeholder="e.g. Coimbatore, Tamil Nadu"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dest-input">Destination City / Pin Code</label>
                      <input
                        id="dest-input"
                        type="text"
                        value={calcDest}
                        onChange={(e) => setCalcDest(e.target.value)}
                        className="form-control"
                        placeholder="e.g. Mumbai / Delhi / 560001"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="weight-input">Approximate Weight / Package Nature</label>
                    <input
                      id="weight-input"
                      type="text"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                      className="form-control"
                      placeholder="e.g. 50 kg / 4 Cartons / Industrial machinery"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-block btn-lg">
                    <MessageCircle size={18} /> Request Quote on WhatsApp <ArrowRight size={18} />
                  </button>

                  <p className="form-privacy-note">
                    <ShieldCheck size={14} /> Official business desk of D. Vadivel, Maakeenaa Agencies. No spam guaranteed.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 10. CORPORATE LOGISTICS GALLERY */}
        <section className="gallery-section" id="gallery">
          <div className="container">
            <div className="section-header-center reveal">
              <div className="section-eyebrow">
                <span className="eyebrow-line"></span>
                OPERATIONAL INFRASTRUCTURE
              </div>
              <h2 className="section-title">Logistics & Transportation in Motion</h2>
              <p className="section-subtitle">
                High-standard equipment, dedicated line-haul transport, secure freight handling, and nationwide
                multi-modal execution that power our daily consignments.
              </p>
            </div>

            <div className="gallery-grid stagger">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="gallery-item"
                  onClick={() => setSelectedGallery(img)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View image: ${img.title}`}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedGallery(img)}
                >
                  <img src={img.url} alt={img.title} className="gallery-thumb" loading="lazy" />
                  <div className="gallery-item-overlay">
                    <span className="gallery-tag">{img.tag}</span>
                    <h3 className="gallery-card-title">{img.title}</h3>
                    <p className="gallery-card-caption">{img.caption}</p>
                    <span className="gallery-zoom-cue">
                      <Eye size={16} /> Click to enlarge
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Modal */}
          {selectedGallery && (
            <div className="gallery-modal-backdrop" onClick={() => setSelectedGallery(null)}>
              <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedGallery(null)}
                  aria-label="Close modal"
                >
                  <X size={22} />
                </button>
                <img
                  src={selectedGallery.url}
                  alt={selectedGallery.title}
                  className="modal-full-img"
                />
                <div className="modal-caption-bar">
                  <span className="modal-tag">{selectedGallery.tag}</span>
                  <h3 className="modal-title">{selectedGallery.title}</h3>
                  <p className="modal-desc">{selectedGallery.caption}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 11. FREQUENTLY ASKED QUESTIONS */}
        <section className="faq-section" id="faq">
          <div className="container faq-container">
            <div className="faq-intro-col reveal-left">
              <div className="section-eyebrow">
                <span className="eyebrow-line"></span>
                CUSTOMER KNOWLEDGE BASE
              </div>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="faq-intro-text">
                Got questions before booking your consignment? Here are transparent answers regarding our partnership,
                service scope, transit schedules, and billing.
              </p>

              <div className="faq-contact-card">
                <h4>Need more clarification?</h4>
                <p>Speak directly with D. Vadivel for custom corporate contracts and tailored rate tariffs.</p>
                <a href={phoneHref1} className="btn btn-outline-dark">
                  <Phone size={16} /> Call {BUSINESS_PHONE_1_DISPLAY}
                </a>
              </div>
            </div>

            <div className="faq-accordion-col stagger">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className={`faq-card ${isOpen ? "faq-open" : ""}`}>
                    <button
                      type="button"
                      className="faq-question-btn"
                      onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={20} className="faq-arrow" />
                    </button>
                    {isOpen && (
                      <div className="faq-answer-panel">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 12. CONTACT & LOCATION SECTION */}
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="section-header-center reveal">
              <div className="section-eyebrow light">
                <span className="eyebrow-line"></span>
                CONNECT WITH OUR HUB
              </div>
              <h2 className="section-title light">
                Get In Touch With Maakeenaa Agencies
              </h2>
              <p className="section-subtitle light">
                Reach our 24/7 booking hub in Coimbatore. Call, email, message on WhatsApp, or visit our office.
              </p>
            </div>

            <div className="contact-cards-grid stagger">
              {/* Card 1: Proprietor */}
              <div className="contact-info-card">
                <div className="card-info-icon">
                  <User size={24} />
                </div>
                <div className="card-info-body">
                  <span className="info-badge">PROPRIETOR</span>
                  <h3 className="info-title">{PROPRIETOR}</h3>
                  <p className="info-sub">Partner · Mahindra Logistics & Rivigo</p>
                  <p className="info-desc">Direct executive management and client relations.</p>
                </div>
              </div>

              {/* Card 2: Contact Numbers */}
              <div className="contact-info-card">
                <div className="card-info-icon">
                  <Phone size={24} />
                </div>
                <div className="card-info-body">
                  <span className="info-badge">24/7 CALL LINES</span>
                  <h3 className="info-title">
                    <a href={phoneHref1} className="contact-link">{BUSINESS_PHONE_1_DISPLAY}</a>
                  </h3>
                  <h3 className="info-title">
                    <a href={phoneHref2} className="contact-link">{BUSINESS_PHONE_2_DISPLAY}</a>
                  </h3>
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="text-link-action">
                    <MessageCircle size={15} /> Message on WhatsApp <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Card 3: Business Hours */}
              <div className="contact-info-card">
                <div className="card-info-icon">
                  <Clock size={24} />
                </div>
                <div className="card-info-body">
                  <span className="info-badge">AVAILABILITY</span>
                  <h3 className="info-title">{BUSINESS_HOURS}</h3>
                  <p className="info-sub">Continuous 365 Days Operation</p>
                  <p className="info-desc">Round-the-clock vehicle dispatch, loading, and transit tracking.</p>
                </div>
              </div>

              {/* Card 4: Email */}
              <div className="contact-info-card">
                <div className="card-info-icon">
                  <Mail size={24} />
                </div>
                <div className="card-info-body">
                  <span className="info-badge">OFFICIAL EMAIL</span>
                  <h3 className="info-title">
                    <a href={`mailto:${BUSINESS_EMAIL}`} className="contact-link email-text">
                      {BUSINESS_EMAIL}
                    </a>
                  </h3>
                  <p className="info-sub">Corporate & Tender Inquiries</p>
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="text-link-action">
                    Send email enquiry <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Address & Embedded Map */}
            <div className="contact-map-wrapper reveal">
              <div className="map-info-banner">
                <div className="map-info-left">
                  <div className="map-marker-icon">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <span className="hub-tag">OFFICIAL REGISTERED HUB & OFFICE</span>
                    <h3 className="hub-name">{COMPANY_NAME}</h3>
                    <p className="hub-address">{FULL_ADDRESS}</p>
                    <p className="hub-coords">GPS Coordinates: 10.998426, 77.062728</p>
                  </div>
                </div>
                <div className="map-info-actions">
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Get Driving Directions <ExternalLink size={16} />
                  </a>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-light"
                  >
                    Open in Google Maps <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              <div className="map-frame-container">
                <iframe
                  title="Google Maps Location of Maakeenaa Agencies in Coimbatore"
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  className="google-map-iframe"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 13. CORPORATE FOOTER */}
      <footer className="site-footer">
        <div className="container footer-content-wrap">
          <div className="footer-top-grid">
            {/* Column 1: Brand Info */}
            <div className="footer-col brand-col">
              <div className="brand-logo-badge footer-logo">
                <Truck size={24} strokeWidth={2.4} />
              </div>
              <h3 className="footer-brand-name">MAAKEENAA AGENCIES</h3>
              <p className="footer-brand-sub">
                Authorized Trusted Logistics Partner of <strong>Mahindra Logistics</strong> and <strong>Rivigo</strong>.
              </p>
              <p className="footer-brand-desc">
                Providing businesses and individuals with nationwide freight connectivity across 19,000+ pin codes.
                Specialized in Part Truck Load (PTL), Express Surface, Air Cargo, and Door-to-Door Delivery.
              </p>
              <div className="footer-proprietor-tag">
                <User size={16} /> Proprietor: <strong>{PROPRIETOR}</strong>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Quick Navigation</h4>
              <ul className="footer-links-list">
                <li><a href="#home">Home Overview</a></li>
                <li><a href="#services">Logistics Services</a></li>
                <li><a href="#about">About Maakeenaa</a></li>
                <li><a href="#why-us">Why Choose Us</a></li>
                <li><a href="#partners">Our Strategic Partners</a></li>
                <li><a href="#gallery">Infrastructure Gallery</a></li>
                <li><a href="#quote">Request a Freight Quote</a></li>
                <li><a href="#contact">Contact & Hub Address</a></li>
              </ul>
            </div>

            {/* Column 3: Services Directory */}
            <div className="footer-col">
              <h4 className="footer-heading">Services Directory</h4>
              <ul className="footer-links-list">
                <li><a href="#services">Part Truck Load (PTL)</a></li>
                <li><a href="#services">Express Surface Transport</a></li>
                <li><a href="#services">Express Air Cargo Priority</a></li>
                <li><a href="#services">Doorstep Parcel Pickup</a></li>
                <li><a href="#services">Pan-India Door-to-Door Delivery</a></li>
                <li><a href="#services">Industrial Consignment Handling</a></li>
                <li><a href="#services">Scheduled Relay Line-Haul</a></li>
              </ul>
            </div>

            {/* Column 4: Contact & Hub */}
            <div className="footer-col">
              <h4 className="footer-heading">Hub & Office</h4>
              <p className="footer-address-text">
                <MapPin size={16} className="inline-icon" /> {FULL_ADDRESS}
              </p>
              <div className="footer-contact-item">
                <Phone size={15} className="inline-icon" />
                <a href={phoneHref1}>{BUSINESS_PHONE_1_DISPLAY}</a>
              </div>
              <div className="footer-contact-item">
                <Phone size={15} className="inline-icon" />
                <a href={phoneHref2}>{BUSINESS_PHONE_2_DISPLAY}</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={15} className="inline-icon" />
                <a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a>
              </div>
              <div className="footer-contact-item">
                <Clock size={15} className="inline-icon" />
                <span>Operating 24 Hours / 7 Days a Week</span>
              </div>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom-bar">
            <div className="footer-copy">
              © {new Date().getFullYear()} <strong>{COMPANY_NAME}</strong>. All rights reserved. Authorized Partner of
              Mahindra Logistics & Rivigo.
            </div>
            <div className="footer-motto">
              Technology · Network · People · Performance = Delivering Excellence
            </div>
            <a href="#home" className="footer-back-to-top" aria-label="Back to top of page">
              Back to Top <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </footer>

      {/* 14. FLOATING QUICK ACTION BAR (WhatsApp & Call) */}
      <div className="floating-actions-container" aria-label="Quick contact links">
        <a
          href={phoneHref1}
          className="floating-btn floating-call-btn"
          aria-label="Call Maakeenaa Agencies now"
          title="Call 24/7: +91 98941 44376"
        >
          <Phone size={22} />
          <span className="floating-text">Call 24/7</span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="floating-btn floating-whatsapp-btn"
          aria-label="Chat with Maakeenaa Agencies on WhatsApp"
          title="WhatsApp D. Vadivel"
        >
          <MessageCircle size={22} />
          <span className="floating-text">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
