import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Eye,
  Globe,
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
  Truck,
  User,
  X,
  Zap,
  Award
} from "lucide-react";
import useMotion from "./motion.js";
import { LANGUAGES, translations } from "./translations.js";
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

const corePillars = [
  { key: "pillarTech", icon: Zap },
  { key: "pillarNet", icon: Globe },
  { key: "pillarPpl", icon: User },
  { key: "pillarPerf", icon: Award }
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

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const [selectedGallery, setSelectedGallery] = useState(null);

  // Language state persisted in localStorage
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      return localStorage.getItem("maakeenaa_lang") || "EN";
    } catch {
      return "EN";
    }
  });
  const [langOpen, setLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const t = translations[currentLang] || translations.EN;

  const changeLanguage = (code) => {
    setCurrentLang(code);
    try {
      localStorage.setItem("maakeenaa_lang", code);
    } catch {
      // storage quota or private mode fallback
    }
    setLangOpen(false);
  };

  // Close language dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Prevent background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

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
    { label: t.navHome, href: "#home" },
    { label: t.navServices, href: "#services" },
    { label: t.navAbout, href: "#about" },
    { label: t.navWhyUs, href: "#why-us" },
    { label: t.navPartners, href: "#partners" },
    { label: t.navGallery, href: "#gallery" },
    { label: t.navContact, href: "#contact" }
  ];

  const services = [
    {
      id: "ptl",
      number: "01",
      title: "Part Truck Load (PTL)",
      tagline:
        currentLang === "TA" ? "சிக்கனமான கன்சைன்மென்ட் சரக்கு போக்குவரத்து" :
        currentLang === "HI" ? "किफायती और लचीला फ्रेट परिवहन" :
        currentLang === "TE" ? "సౌకర్యవంతమైన మరియు చౌకైన రవాణా" :
        currentLang === "ML" ? "സാമ്പത്തിക ലാഭകരമായ ചരക്ക് ഗതാഗതം" :
        "Flexible & Economical Consignment Freight",
      description:
        currentLang === "TA" ? "முழு லாரியையும் புக் செய்யாமல் குறைந்த செலவில் நடுத்தர முதல் பெரிய சரக்குகளை கொண்டு செல்லலாம். மஹிந்திரா லாஜிஸ்டிக்ஸின் திட்டமிடப்பட்ட இயக்கம் மூலம் குறித்த நேரத்தில் அகில இந்திய டெலிவரி." :
        currentLang === "HI" ? "पूरे ट्रक को बुक किए बिना मध्यम से बड़े माल को किफायती रूप से भेजें। महिंद्रा लॉजिस्टिक्स के मजबूत लाइन-हॉल शेड्यूल द्वारा संचालित।" :
        currentLang === "TE" ? "మొత్తం ట్రక్కును బుక్ చేయకుండానే తక్కువ ఖర్చుతో సరుకును పంపవచ్చు. సమయానికి సురక్షిత రవాణా." :
        currentLang === "ML" ? "മുഴുവൻ ട്രക്കും ബുക്ക് ചെയ്യാതെ തന്നെ മിതമായ നിരക്കിൽ ചരക്ക് അയക്കാം. മഹീന്ദ്ര ലോജിസ്റ്റിക്സിന്റെ സഹായത്തോടെ കൃത്യസമയത്ത് എത്തിക്കുന്നു." :
        "Move medium-to-large cargo economically without booking an entire truck. Powered by Mahindra Logistics' dense line-haul schedule with scheduled dispatch, guaranteed space, and zero transit delays across pan-India routes.",
      icon: Truck,
      badge: currentLang === "TA" ? "மிகவும் பிரபலம்" : currentLang === "HI" ? "सर्वाधिक लोकप्रिय" : currentLang === "TE" ? "అత్యంత ప్రజాదరణ" : currentLang === "ML" ? "ഏറ്റവും ജനപ്രിയം" : "Most Popular",
      features:
        currentLang === "TA" ? [
          "அகில இந்திய அளவிலான திட்டமிடப்பட்ட லாரி இயக்கம்",
          "சிக்கனமான ஒருங்கிணைந்த சரக்கு கட்டணங்கள்",
          "சேதமில்லா மற்றும் பாதுகாப்பான சரக்கு கையாளுதல்",
          "தொழில்துறை உபகரணங்கள், ஜவுளி மற்றும் இயந்திரங்களுக்கு சிறந்தது"
        ] :
        currentLang === "HI" ? [
          "देशव्यापी निर्धारित लाइन-हॉल आवागमन",
          "किफायती समेकित माल भाड़ा दरें",
          "मजबूत माल हैंडलिंग और क्षति-मुक्त पारगमन",
          "औद्योगिक सामान, वस्त्र और मशीनरी के लिए आदर्श"
        ] :
        currentLang === "TE" ? [
          "దేశవ్యాప్త నిర్ణీత లైన్-హాల్ రవాణా",
          "చౌకైన సరుకు రవాణా ఛార్జీలు",
          "సురక్షితమైన మరియు నష్టం లేని రవాణా",
          "పరిశ్రమ సామగ్రి, వస్త్రాలు మరియు యంత్రాలకు అనుకూలం"
        ] :
        currentLang === "ML" ? [
          "രാജ്യവ്യാപകമായ ലൈൻ-ഹോൾ ചരക്ക് നീക്കം",
          "മിതമായ നിരക്കിലുള്ള ചരക്ക് ഗതാഗതം",
          "കേടുപാടുകൾ ഇല്ലാതെ സുരക്ഷിതമായ കൈകാര്യം ചെയ്യൽ",
          "മെഷിനറികൾക്കും തുണിത്തരങ്ങൾക്കും അനുയോജ്യം"
        ] : [
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
      tagline:
        currentLang === "TA" ? "விரைவான நெடுஞ்சாலை எக்ஸ்பிரஸ் போக்குவரத்து" :
        currentLang === "HI" ? "तेज और तकनीक-सक्षम हाईवे पारगमन" :
        currentLang === "TE" ? "వేగవంతమైన రహదారి ఎక్స్‌ప్రెస్ రవాణా" :
        currentLang === "ML" ? "വേഗതയേറിയ റോഡ് എക്സ്പ്രസ്സ് ഗതാഗതം" :
        "Fast & Tech-Enabled Highway Transit",
      description:
        currentLang === "TA" ? "ரிவிகோ பை மஹிந்திரா லாஜிஸ்டிக்ஸின் புதுமையான ரிலே ட்ரக்கிங் மாதிரி மூலம் இயங்கும் விரைவான சாலை போக்குவரத்து. குறைந்த ட்ரான்சிட் நேரம் மற்றும் உயர் நம்பகத்தன்மை." :
        currentLang === "HI" ? "रिविगो बाय महिंद्रा लॉजिस्टिक्स के रिले ट्रकिंग मॉडल द्वारा संचालित समयबद्ध सड़क परिवहन। तेज गति और उच्च विश्वसनीयता।" :
        currentLang === "TE" ? "మహింద్రా లాజిస్టిక్స్ యొక్క రిలే ట్రక్కింగ్ మోడల్ ద్వారా వేగవంతమైన రహదారి రవాణా." :
        currentLang === "ML" ? "മഹീന്ദ്ര ലോജിസ്റ്റിക്സിന്റെ റിലേ ട്രക്കിംഗ് മോഡലിലൂടെ പ്രവർത്തിക്കുന്ന അതിവേഗ റോഡ് ഗതാഗതം." :
        "Time-definite road express transportation powered by the innovative Rivigo by Mahindra Logistics relay trucking model. Ensures reduced turnaround times, superior reliability, and driver fatigue elimination for rapid interstate shipments.",
      icon: Zap,
      badge: currentLang === "TA" ? "நேரக்கட்டுப்பாடு" : currentLang === "HI" ? "समयबद्ध" : currentLang === "TE" ? "సమయపాలన" : currentLang === "ML" ? "സമയബന്ധിതം" : "Time-Definite",
      features:
        currentLang === "TA" ? [
          "அதிவேக நெடுஞ்சாலை ரிலே லாஜிஸ்டிக்ஸ் நெட்வொர்க்",
          "லைவ் ஜிபிஎஸ் கண்காணிப்பு மற்றும் விரைவு போக்குவரத்து",
          "குறைந்த நிறுத்தங்களுடன் விரைவான மாநிலங்களுக்கிடையேயான போக்குவரத்து",
          "சீரான ஜிஎஸ்டி மற்றும் இ-வே பில் நடைமுறைகள்"
        ] :
        currentLang === "HI" ? [
          "हाई-स्पीड हाईवे रिले लॉजिस्टिक्स नेटवर्क",
          "रीयल-टाइम जीपीएस टेलीमैटिक्स और ट्रैकिंग",
          "न्यूनतम रुकावट के साथ त्वरित अंतरराज्यीय पारगमन",
          "सहज अंतरराज्यीय दस्तावेज और जीएसटी अनुपालन"
        ] :
        currentLang === "TE" ? [
          "హై-స్పీడ్ రిలే లాజిస్టిక్స్ నెట్‌వర్క్",
          "రియల్-టైమ్ జీపీఎస్ ట్రాకింగ్",
          "తక్కువ సమయంతో అంతర్రాష్ట్ర రవాణా",
          "సులభమైన జీఎస్టీ డాక్యుమెంటేషన్"
        ] :
        currentLang === "ML" ? [
          "ഹൈ-സ്പീഡ് റിലേ ലോജിസ്റ്റിക്സ് ശൃംഖല",
          "തത്സമയ ജിപിഎസ് നിരീക്ഷണം",
          "കുറഞ്ഞ സമയം കൊണ്ടുള്ള അന്തർസംസ്ഥാന ഗതാഗതം",
          "ലളിതമായ ജിഎസ്ടി ഇ-വേ ബിൽ നടപടികൾ"
        ] : [
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
      tagline:
        currentLang === "TA" ? "அதிவிரைவு விமான சரக்கு சேவை" :
        currentLang === "HI" ? "प्राथमिकता एयर कार्गो सेवा" :
        currentLang === "TE" ? "అత్యవసర విమాన కార్గో సేవ" :
        currentLang === "ML" ? "മുൻഗണനാ എയർ കാർഗോ സർവീസ്" :
        "Next-Flight-Out Priority Cargo",
      description:
        currentLang === "TA" ? "மிகவும் அவசரமான மற்றும் மதிப்புமிக்க சரக்குகளுக்கு. முக்கிய விமான நிலையங்களை இணைக்கும் முன்னுரிமை விமான சரக்கு சேவை." :
        currentLang === "HI" ? "अति-आवश्यक और समय-संवेदनशील माल के लिए। देश भर के प्रमुख हवाई अड्डों और महानगरों को जोड़ता है।" :
        currentLang === "TE" ? "అత్యవసర మరియు విలువైన సరుకుల కోసం వేగవంతమైన ఎయిర్ కార్గో సేవలు." :
        currentLang === "ML" ? "വളരെ അത്യാവശ്യമായ ചരക്കുകൾക്കായി അടുത്ത ഫ്ലൈറ്റിൽ തന്നെ എത്തിക്കുന്ന മുൻഗണനാ എയർ കാർഗോ." :
        "For mission-critical, time-sensitive freight. Connects major commercial airports and metropolitan distribution centers nationwide with prioritized airport handling, fast-track customs clearance, and prompt destination handoff.",
      icon: Plane,
      badge: currentLang === "TA" ? "அதிவேகம்" : currentLang === "HI" ? "उच्च गति" : currentLang === "TE" ? "అధిక ప్రాధాన్యత" : currentLang === "ML" ? "അതിവേഗം" : "Priority Speed",
      features:
        currentLang === "TA" ? [
          "முக்கிய பெருநகரங்களுக்கு ஒரே நாள் மற்றும் அடுத்த நாள் டெலிவரி",
          "விமான சரக்கு பிரத்யேக பாதுகாப்பு மற்றும் கண்காணிப்பு",
          "விலையுயர்ந்த உதிரிபாகங்கள் மற்றும் அவசர சரக்குகளுக்கு ஏற்றது",
          "விமான நிலையத்திலிருந்து நேரடி முகவரிக்கு டெலிவரி"
        ] :
        currentLang === "HI" ? [
          "प्रमुख मेट्रो शहरों में उसी दिन या अगले दिन डिलीवरी",
          "समर्पित एयर कंसाइनमेंट ट्रैकिंग और सुरक्षा",
          "उच्च-मूल्य और महत्वपूर्ण स्पेयर पार्ट्स के लिए उत्तम",
          "सीधे हवाई अड्डे से दरवाजे तक डिलीवरी"
        ] :
        currentLang === "TE" ? [
          "ప్రధాన నగరాలకు అదే రోజు లేదా మరుసటి రోజు డెలివరీ",
          "ఎయిర్ కార్గో ప్రత్యేక ట్రాకింగ్ మరియు భద్రత",
          "విలువైన మరియు అత్యవసర సరుకులకు అనుకూలం",
          "విమానాశ్రయం నుండి నేరుగా డోర్ డెలివరీ"
        ] :
        currentLang === "ML" ? [
          "പ്രധാന മെട്രോ നഗരങ്ങളിലേക്ക് അതേ ദിവസവും അടുത്ത ദിവസവും ഡെലിവരി",
          "പ്രത്യേക എയർ കാർഗോ ട്രാക്കിംഗും സുരക്ഷയും",
          "വിലപിടിപ്പുള്ള സ്പെയർ പാർട്സുകൾക്ക് അനുയോജ്യം",
          "എയർപോർട്ടിൽ നിന്നും നേരിട്ടുള്ള ഡോർ ഡെലിവറി"
        ] : [
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
      tagline:
        currentLang === "TA" ? "உங்கள் வாசலில் பிக்கப் & டோர் டெலிவரி" :
        currentLang === "HI" ? "डोरस्टेप पिकअप और अंतिम मील डिलीवरी" :
        currentLang === "TE" ? "డోర్‌స్టెప్ పికప్ మరియు డోర్ డెలివరీ" :
        currentLang === "ML" ? "ഡോർസ്റ്റെപ്പ് പാഴ്സൽ പിക്കപ്പും ഡോർ ഡെലിവറിയും" :
        "Comprehensive End-to-End Last-Mile Service",
      description:
        currentLang === "TA" ? "முழுமையான தொந்தரவில்லாத டோர்ஸ்டெப் சேவை. கோவையில் உங்கள் தொழிற்சாலை அல்லது அலுவலகத்திலிருந்தே பார்சல்களை பெற்று இந்தியா முழுவதும் 19,000+ பின் கோடுகளுக்கு நேரில் வழங்குகிறோம்." :
        currentLang === "HI" ? "पूरी तरह से परेशानी मुक्त डोरस्टेप सेवा। हम कोयंबटूर में आपके परिसर से पैकेज लेते हैं और भारत के 19,000+ पिन कोडों पर सीधे डिलीवरी करते हैं।" :
        currentLang === "TE" ? "మీ ఫ్యాక్టరీ లేదా ఆఫీస్ వద్ద పికప్ చేసి భారతదేశం అంతటా 19,000+ పిన్ కోడ్లలో డోర్ డెలివరీ అందిస్తాము." :
        currentLang === "ML" ? "കോയമ്പത്തൂരിൽ നിങ്ങളുടെ ഓഫീസിൽ നിന്നോ ഫാക്ടറിയിൽ നിന്നോ പാഴ്സൽ നേരിട്ട് സ്വീകരിച്ച് ഇന്ത്യയിലെ 19,000+ പിൻ കോഡുകളിൽ എത്തിക്കുന്നു." :
        "Complete hassle-free doorstep service. We collect your packages right from your factory, warehouse, office, or residence in Coimbatore and deliver directly to the recipient's doorstep across 19,000+ pin codes in India.",
      icon: Package,
      badge: currentLang === "TA" ? "டோர்-டூ-டோர்" : currentLang === "HI" ? "डोर-टू-डोर" : currentLang === "TE" ? "డోర్-టు-డోర్" : currentLang === "ML" ? "ഡോർ-ടു-ഡോർ" : "First & Last Mile",
      features:
        currentLang === "TA" ? [
          "கோவை மற்றும் சுற்றுவட்டாரப் பகுதிகளில் திட்டமிடப்பட்ட பிக்கப்",
          "பாதுகாப்பான பேக்கிங் மற்றும் பேலட் கட்டமைப்பு ஆதரவு",
          "19,000+ அஞ்சல் பின் கோடுகளுக்கு முழுமையான சேவை",
          "உடனடி டிஜிட்டல் ரசீது மற்றும் e-POD"
        ] :
        currentLang === "HI" ? [
          "कोयंबटूर और आसपास से निर्धारित डोरस्टेप पिकअप",
          "सुरक्षित पैकेजिंग सहायता और पैलेट स्ट्रैपिंग",
          "19,000+ डाक पिन कोडों में सीधी डिलीवरी",
          "तत्काल इलेक्ट्रॉनिक प्रूफ ऑफ डिलीवरी (e-POD)"
        ] :
        currentLang === "TE" ? [
          "కోయంబత్తూరు మరియు పరిసరాల నుండి డోర్‌స్టెప్ పికప్",
          "సురక్షితమైన ప్యాకింగ్ మద్దతు",
          "19,000+ పోస్టల్ పిన్ కోడ్లలో పూర్తి డెలివరీ",
          "తక్షణ ఎలక్ట్రానిక్ ప్రూఫ్ ఆఫ్ డెలివరీ (e-POD)"
        ] :
        currentLang === "ML" ? [
          "കോയമ്പത്തൂരിലും പരിസര പ്രദേശങ്ങളിലും സൗകര്യപ്രദമായ പിക്കപ്പ്",
          "സുരക്ഷിതമായ പാക്കേജിംഗ് പിന്തുണ",
          "19,000+ പോസ്റ്റൽ പിൻ കോഡുകളിൽ നേരിട്ടുള്ള ഡെലിവറി",
          "ഡിജിറ്റൽ പ്രൂഫ് ഓഫ് ഡെലിവറി (e-POD)"
        ] : [
          "Scheduled doorstep pickup from Coimbatore & surroundings",
          "Safe packaging support and pallet strapping",
          "Complete delivery across 19,000+ postal pin codes",
          "Instant electronic proof of delivery (e-POD)"
        ]
    }
  ];

  const faqs = [
    {
      q: currentLang === "TA" ? "மக்கீனா ஏஜென்சீஸ், மஹிந்திரா லாஜிஸ்டிக்ஸ் மற்றும் ரிவிகோ இடையேயான தொடர்பு என்ன?" :
         currentLang === "HI" ? "माकीना एजेंसीज, महिंद्रा लॉजिस्टिक्स और रिविगो के बीच क्या संबंध है?" :
         currentLang === "TE" ? "మాకీనా ఏజెన్సీస్, మహింద్రా లాజిస్టిక్స్ మరియు రివిగో మధ్య సంబంధం ఏమిటి?" :
         currentLang === "ML" ? "മാക്കീന ഏജൻസീസ്, മഹീന്ദ്ര ലോജിസ്റ്റിക്സ്, റിവിഗോ എന്നിവ തമ്മിലുള്ള ബന്ധം എന്താണ്?" :
         "What is the relationship between Maakeenaa Agencies, Mahindra Logistics, and Rivigo?",
      a: currentLang === "TA" ? "மக்கீனா ஏஜென்சீஸ் (உரிமையாளர்: டி. வடிவேல்) மஹிந்திரா லாஜிஸ்டிக்ஸ் மற்றும் ரிவிகோ நிறுவனங்களின் அதிகாரப்பூர்வ அங்கீகரிக்கப்பட்ட கூட்டாளியாகும். 1,100+ வாகனங்கள் மற்றும் 19,000+ பின் கோடு நெட்வொர்க்குடன், கோவையில் சிறந்த நேரடி வாடிக்கையாளர் சேவையை நாங்கள் வழங்குகிறோம்." :
         currentLang === "HI" ? "माकीना एजेंसीज (मालिक: डी. वाडिवेल) महिंद्रा लॉजिस्टिक्स और रिविगो का एक अधिकृत विश्वसनीय साझेदार है। इसके जरिए ग्राहकों को 1,100+ ट्रकों और 19,000+ पिन कोडों का सीधा नेटवर्क मिलता है।" :
         currentLang === "TE" ? "మాకీనా ఏజెన్సీస్ (యజమాని: డి. వాడివేల్) మహింద్రా లాజిస్టిక్స్ & రివిగో యొక్క అధికారిక భాగస్వామి. 1,100+ ట్రక్కులు మరియు 19,000+ పిన్ కోడ్ల ద్వారా సేవలందిస్తున్నాము." :
         currentLang === "ML" ? "മാക്കീന ഏജൻസീസ് (പ്രൊപ്രൈറ്റർ: ഡി. വടിവേൽ) മഹീന്ദ്ര ലോജിസ്റ്റിക്സ്, റിവിഗോ എന്നിവയുടെ ഔദ്യോഗിക പങ്കാളിയാണ്. 1,100+ ട്രക്കുകളും 19,000+ പിൻ കോഡ് ശൃംഖലയും ലഭ്യമാക്കുന്നു." :
         "Maakeenaa Agencies (Proprietor: D. Vadivel) is an authorized trusted logistics partner of Mahindra Logistics and Rivigo by Mahindra Logistics. Through this partnership, we provide our customers direct access to Mahindra Logistics' nationwide tech-enabled network of 1,100+ trucks and 19,000+ pin code reach, backed by personalized local booking and dispatch service in Coimbatore."
    },
    {
      q: currentLang === "TA" ? "மக்கீனா ஏஜென்சீஸ் மூலம் என்னென்ன சேவைகளை முன்பதிவு செய்யலாம்?" :
         currentLang === "HI" ? "माकीना एजेंसीज के माध्यम से कौन सी फ्रेट सेवाएं बुक की जा सकती हैं?" :
         currentLang === "TE" ? "మాకీనా ఏజెన్సీస్ ద్వారా ఏయే రవాణా సేవలను బుక్ చేసుకోవచ్చు?" :
         currentLang === "ML" ? "മാക്കീന ഏജൻസീസ് വഴി ഏതൊക്കെ സേവനങ്ങളാണ് ലഭ്യമാകുന്നത്?" :
         "What freight services can I book through Maakeenaa Agencies?",
      a: currentLang === "TA" ? "Part Truck Load (PTL), எக்ஸ்பிரஸ் சர்பேஸ் சாலை போக்குவரத்து, எக்ஸ்பிரஸ் ஏர் கார்கோ, நேரடி பார்சல் பிக்கப் மற்றும் இந்தியா முழுவதுமான டோர்-டூ-டோர் டெலிவரி ஆகியவற்றை நாங்கள் வழங்குகிறோம்." :
         currentLang === "HI" ? "हम पार्ट ट्रक लोड (PTL), एक्सप्रेस सरफेस, एक्सप्रेस एयर कार्गो, पार्सल पिकअप और पूरे भारत में डोर-टू-डोर डिलीवरी की पेशकश करते हैं।" :
         currentLang === "TE" ? "మేము పార్ట్ ట్రక్ లోడ్ (PTL), ఎక్స్‌ప్రెస్ సర్ఫేస్, ఎక్స్‌ప్రెస్ ఎయిర్, పికప్ మరియు డోర్ డెలివరీ సేవలను అందిస్తున్నాము." :
         currentLang === "ML" ? "പാർട്ട് ട്രക്ക് ലോഡ് (PTL), എക്സ്പ്രസ് സർഫേസ്, എക്സ്പ്രസ് എയർ, പാർസൽ പിക്കപ്പ്, ഡോർ-ടു-ഡോർ ഡെലിവറി എന്നിവ നൽകുന്നു." :
         "We offer comprehensive freight solutions including Part Truck Load (PTL), Express Surface transport, Express Air cargo, parcel pickup from your premises, and guaranteed door-to-door delivery across India."
    },
    {
      q: currentLang === "TA" ? "டோர்ஸ்டெப் பார்சல் பிக்கப் எவ்வாறு செயல்படுகிறது?" :
         currentLang === "HI" ? "डोरस्टेप पार्सल पिकअप कैसे काम करता है?" :
         currentLang === "TE" ? "డోర్‌స్టెప్ పార్సెల్ పికప్ ఎలా పనిచేస్తుంది?" :
         currentLang === "ML" ? "ഡോർസ്റ്റെപ്പ് പാഴ്സൽ പിക്കപ്പ് എങ്ങനെ പ്രവർത്തിക്കുന്നു?" :
         "How does doorstep parcel pickup work?",
      a: currentLang === "TA" ? "உங்கள் இடம், சரக்கு விவரம் மற்றும் எடையுடன் எங்களுக்கு அழைக்கவும் அல்லது வாட்ஸ்அப் செய்யவும். எங்கள் வாகனங்கள் உங்கள் இடத்திற்கு வந்து சரக்கை பெற்று ரசீது வழங்கும்." :
         currentLang === "HI" ? "बस अपने स्थान और माल के वजन के साथ हमें कॉल या व्हाट्सएप करें। हमारी टीम सीधे पिकअप करेगी और रसीद देगी।" :
         currentLang === "TE" ? "మీ వివరాలతో మాకు కాల్ లేదా వాట్సాప్ చేయండి. మా వాహనం నేరుగా మీ వద్దకు వచ్చి సరుకును తీసుకుంటుంది." :
         currentLang === "ML" ? "നിങ്ങളുടെ വിലാസവും ഭാരവും വ്യക്തമാക്കി ഞങ്ങളെ വിളിക്കുകയോ വാട്ട്‌സ്ആപ്പ് ചെയ്യുകയോ ചെയ്യുക. ഞങ്ങളുടെ വാഹനം എത്തി പാഴ്സൽ സ്വീകരിക്കും." :
         "Simply call or message us on WhatsApp with your pickup location in or around Coimbatore, consignment type, and approx weight. Our dispatch team will schedule a pickup vehicle directly to your warehouse, factory, or office, weigh and tag the cargo, and hand over your booking receipt."
    },
    {
      q: currentLang === "TA" ? "மக்கீனா ஏஜென்சீஸ் அலுவலகம் மற்றும் ஹப் எங்கு அமைந்துள்ளது?" :
         currentLang === "HI" ? "माकीना एजेंसीज का हब और कार्यालय कहां स्थित है?" :
         currentLang === "TE" ? "మాకీనా ఏజెన్సీస్ కార్యాలయం మరియు హబ్ ఎక్కడ ఉంది?" :
         currentLang === "ML" ? "മാക്കീന ഏജൻസീസിന്റെ ഓഫീസും ഹബ്ബും എവിടെയാണ് സ്ഥിതി ചെയ്യുന്നത്?" :
         "Where is the Maakeenaa Agencies hub and office located?",
      a: currentLang === "TA" ? "எங்கள் அலுவலகம் 407/24, லைன்மேன் தோட்டம், மீனாட்சியம்மன் நகர், ஒட்டர் பாளையம், கோயம்புத்தூர் - 641016 (சூலூர் பைபாஸ் அருகில்) அமைந்துள்ளது. கூகுள் மேப் வழிகாட்டலை பக்கத்தின் கீழே காணலாம்." :
         currentLang === "HI" ? "हमारा हब 407/24, लाइनमैन थोट्टम, मीनाक्षीअम्मन नगर, ओट्टारपलायम, कोयंबटूर - 641016 में स्थित है। नीचे गूगल मैप पर सीधा रास्ता देखा जा सकता है।" :
         currentLang === "TE" ? "మా కార్యాలయం 407/24, లైన్‌మ్యాన్ తోట్టం, మీనాక్షిఅమ్మన్ నగర్, ఒట్టార్‌పాళయం, కోయంబత్తూర్ - 641016 వద్ద ఉంది." :
         currentLang === "ML" ? "ഞങ്ങളുടെ ഹബ്ബ് 407/24, ലൈൻമാൻ തോട്ടം, മീനാക്ഷി അമ്മൻ നഗർ, ഒട്ടാർപാളയം, കോയമ്പത്തൂർ - 641016 (സൂലൂർ ബൈപാസിന് സമീപം) സ്ഥിതി ചെയ്യുന്നു." :
         "Our hub is located at 407/24, Lineman Thottam, Meenatchiamman Nagar, Ottarpalayam, Coimbatore - 641016 (near Sulur Bypass). You can visit in person or view live directions on the Google Map integrated on this page."
    },
    {
      q: currentLang === "TA" ? "செயல்படும் நேரங்கள் மற்றும் சரக்கு கண்காணிப்பு வசதிகள் என்ன?" :
         currentLang === "HI" ? "आपके संचालन का समय क्या है और शिपमेंट को कैसे ट्रैक करें?" :
         currentLang === "TE" ? "మీ పనివేళలు ఏమిటి మరియు షిప్‌మెంట్‌ను ఎలా ట్రాక్ చేయాలి?" :
         currentLang === "ML" ? "പ്രവർത്തന സമയവും ട്രാക്കിംഗ് സംവിധാനങ്ങളും എന്തൊക്കെയാണ്?" :
         "What are your operating hours and how can I track my shipment?",
      a: currentLang === "TA" ? "நாங்கள் 24 மணி நேரமும் (24/7) செயல்படுகிறோம். எந்த நேரத்திலும் முன்பதிவு மற்றும் விவரங்களை அறியலாம். அனைத்து சரக்குகளும் நவீன ஜிபிஎஸ் மூலம் கண்காணிக்கப்படுகிறது." :
         currentLang === "HI" ? "हम 24 घंटे (24/7) काम करते हैं। आप किसी भी समय बुकिंग या स्थिति के लिए संपर्क कर सकते हैं। पूर्ण जीपीएस ट्रैकिंग उपलब्ध है।" :
         currentLang === "TE" ? "మేము 24 గంటలు (24/7) పనిచేస్తాము. అధునాతన జీపీఎస్ ద్వారా ప్రత్యక్ష ట్రాకింగ్ సదుపాయం కలదు." :
         currentLang === "ML" ? "ഞങ്ങൾ 24 മണിക്കൂറും (24/7) പ്രവർത്തിക്കുന്നു. ഏത് സമയത്തും ബുക്കിംഗിനും വിവരങ്ങൾക്കും ബന്ധപ്പെടാം. തത്സമയ ജിപിഎസ് നിരീക്ഷണം ലഭ്യമാണ്." :
         "We operate 24 Hours (Open 24/7). You can reach out day or night for booking, dispatch, rate quotes, or consignment status. Every shipment is backed by Mahindra Logistics' telematics system for complete visibility."
    }
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
              <strong className="status-label">{t.hubActiveFull}</strong>
              <strong className="status-label-mobile">{t.opsActive}</strong>
              <span className="location-label"> {SHORT_ADDRESS}</span>
              <span className="location-label-mobile">{t.coimbatoreHub}</span>
            </span>
          </div>

          <div className="banner-right">
            <span className="partner-chip">
              <ShieldCheck size={13} className="chip-icon" />
              <span className="partner-text-desktop">{t.partnerBadgeFull}</span>
              <span className="partner-text-mobile">{t.partnerBadgeShort}</span>
            </span>

            <span className="banner-divider">|</span>

            {/* Primary Phone & Language Selector Group */}
            <div className="banner-phone-lang-group">
              <a href={phoneHref1} className="banner-phone primary-phone">
                <Phone size={12} /> {BUSINESS_PHONE_1_DISPLAY}
              </a>

              {/* Language Selector Dropdown */}
              <div className="lang-selector-wrapper" ref={langDropdownRef}>
                <button
                  type="button"
                  className="lang-selector-btn"
                  onClick={() => setLangOpen(!langOpen)}
                  aria-label="Select Language"
                  aria-expanded={langOpen}
                >
                  <Globe size={13} className="lang-globe-icon" />
                  <span className="lang-code-text">{currentLang}</span>
                  <ChevronDown size={11} className={`lang-chevron ${langOpen ? "rotate-180" : ""}`} />
                </button>

                {langOpen && (
                  <div className="lang-dropdown-menu">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        className={`lang-option ${currentLang === lang.code ? "lang-option-active" : ""}`}
                        onClick={() => changeLanguage(lang.code)}
                      >
                        <span className="lang-native">{lang.nativeName}</span>
                        <span className="lang-en-sub">({lang.name})</span>
                        {currentLang === lang.code && <Check size={13} className="lang-check-icon" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <span className="banner-divider secondary-divider">|</span>

            <a href={phoneHref2} className="banner-phone secondary-phone">
              <Phone size={12} /> {BUSINESS_PHONE_2_DISPLAY}
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
              <MessageCircle size={16} /> {t.navWhatsApp}
            </a>
            <a href="#quote" className="btn btn-primary-nav">
              {t.navGetQuote} <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              className="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? "backdrop-visible" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "drawer-open" : ""}`} aria-hidden={!mobileMenuOpen}>
        <div className="mobile-nav-inner">
          <div className="mobile-nav-head">
            <div className="brand-titles">
              <span className="brand-name">MAAKEENAA AGENCIES</span>
              <span className="brand-partner-sub">
                <span className="partner-highlight">MAHINDRA LOGISTICS</span> PARTNER
              </span>
            </div>
            <button
              type="button"
              className="close-drawer"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
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
                <span>{item.label}</span>
                <ArrowRight size={15} />
              </a>
            ))}
          </div>

          <div className="mobile-drawer-footer">
            <div className="mobile-drawer-contact-title">{t.drawerTitle}</div>
            <a href={phoneHref1} className="mobile-contact-call">
              <Phone size={15} /> {BUSINESS_PHONE_1_DISPLAY}
            </a>
            <a href={phoneHref2} className="mobile-contact-call secondary-call">
              <Phone size={15} /> {BUSINESS_PHONE_2_DISPLAY}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-block mobile-wa-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle size={16} /> {t.drawerWhatsAppBtn}
            </a>
          </div>
        </div>
      </div>

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
                {t.officialBadge}
              </div>

              <h1 className="hero-heading">
                {t.heroHeadingMain}
                <span className="hero-subheading-block">{t.heroTagline}</span>
              </h1>

              <p className="hero-description">{t.heroDesc}</p>

              <div className="hero-cta-group">
                <a href="#quote" className="btn btn-primary btn-lg">
                  {t.btnBookShipment} <ArrowUpRight size={18} />
                </a>
                <a href={phoneHref1} className="btn btn-secondary btn-lg">
                  <Phone size={18} /> {t.btnCallNow} {BUSINESS_PHONE_1_DISPLAY}
                </a>
                <a href="#services" className="btn btn-ghost btn-lg">
                  {t.btnExploreServices} <ArrowDownRight size={18} />
                </a>
              </div>

              {/* Verified Partner Bar */}
              <div className="hero-partner-credential">
                <div className="cred-icon">
                  <ShieldCheck size={26} />
                </div>
                <div className="cred-text">
                  <strong>{PROPRIETOR} · {COMPANY_NAME}</strong>
                  <span>{t.credText}</span>
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
                    <span className="badge-label">{t.panIndiaBadge}</span>
                    <strong className="badge-value">{t.pinCodesVal}</strong>
                  </div>

                  <div className="visual-badge-bottom">
                    <div className="carrier-tag">
                      <Truck size={18} />
                      <span>{t.fleetBadgeName}</span>
                    </div>
                    <div className="carrier-sub">{t.fleetBadgeSub}</div>
                  </div>
                </div>

                {/* Floating Metric Card 1 */}
                <div className="floating-metric-card float-card-1">
                  <div className="f-icon">
                    <Clock size={20} />
                  </div>
                  <div>
                    <span className="f-title">{t.ops247Title}</span>
                    <span className="f-desc">{t.ops247Desc}</span>
                  </div>
                </div>

                {/* Floating Metric Card 2 */}
                <div className="floating-metric-card float-card-2">
                  <div className="f-icon-gold">
                    <Shield size={20} />
                  </div>
                  <div>
                    <span className="f-title">{t.lowestDepsTitle}</span>
                    <span className="f-desc">{t.lowestDepsDesc}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. KEY METRICS STATS BAR */}
          <div className="container stats-strip">
            <div className="stats-grid stagger">
              <div className="stat-card">
                <div className="stat-number">19,000+</div>
                <div className="stat-label">{t.stat1Label}</div>
                <div className="stat-detail">{t.stat1Detail}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1,100+</div>
                <div className="stat-label">{t.stat2Label}</div>
                <div className="stat-detail">{t.stat2Detail}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">24/7</div>
                <div className="stat-label">{t.stat3Label}</div>
                <div className="stat-detail">{t.stat3Detail}</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">Lowest</div>
                <div className="stat-label">{t.stat4Label}</div>
                <div className="stat-detail">{t.stat4Detail}</div>
              </div>
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
                  {t.partnersEyebrow}
                </div>
                <h2 className="section-title">
                  {t.partnersTitleLead} <br />
                  <span className="text-gradient">{t.partnersTitleSub}</span>
                </h2>
                <p className="section-subtitle">{t.partnersDesc}</p>
              </div>

              <div className="partner-detail-grid">
                <div className="partner-box">
                  <div className="partner-badge-head">
                    <Building2 size={24} className="text-orange" />
                    <div>
                      <h3 className="partner-name">Mahindra Logistics</h3>
                      <span className="partner-role">{t.partner1Role}</span>
                    </div>
                  </div>
                  <p className="partner-body-text">{t.partner1Desc}</p>
                  <ul className="partner-list">
                    <li><Check size={16} /> {t.partner1Point1}</li>
                    <li><Check size={16} /> {t.partner1Point2}</li>
                    <li><Check size={16} /> {t.partner1Point3}</li>
                  </ul>
                </div>

                <div className="partner-box">
                  <div className="partner-badge-head">
                    <Zap size={24} className="text-orange" />
                    <div>
                      <h3 className="partner-name">Rivigo by Mahindra Logistics</h3>
                      <span className="partner-role">{t.partner2Role}</span>
                    </div>
                  </div>
                  <p className="partner-body-text">{t.partner2Desc}</p>
                  <ul className="partner-list">
                    <li><Check size={16} /> {t.partner2Point1}</li>
                    <li><Check size={16} /> {t.partner2Point2}</li>
                    <li><Check size={16} /> {t.partner2Point3}</li>
                  </ul>
                </div>
              </div>

              <div className="partnership-footer-quote">
                <p>
                  <strong>{t.partnersMotto}</strong>
                </p>
                <span>{t.partnersRegNotice}</span>
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
                  <div className="stamp-text">{t.aboutStampTitle}</div>
                </div>
              </div>
            </div>

            <div className="about-text-column reveal-right">
              <div className="section-eyebrow">
                <span className="eyebrow-line"></span>
                {t.aboutEyebrow}
              </div>
              <h2 className="section-title">{t.aboutTitle}</h2>
              <p className="lead-paragraph">{t.aboutLead}</p>
              <p className="body-paragraph">{t.aboutBody}</p>

              {/* 4 Pillars Grid */}
              <div className="pillars-grid stagger">
                {corePillars.map((pillar) => {
                  const Icon = pillar.icon;
                  const title = t[`${pillar.key}Title`];
                  const desc = t[`${pillar.key}Desc`];
                  return (
                    <div key={pillar.key} className="pillar-item">
                      <div className="pillar-icon">
                        <Icon size={18} />
                      </div>
                      <div className="pillar-content">
                        <h4 className="pillar-title">{title}</h4>
                        <p className="pillar-desc">{desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="about-action-row">
                <a href="#contact" className="btn btn-primary">
                  {t.meetProprietorBtn} <ArrowRight size={16} />
                </a>
                <a href={phoneHref1} className="btn btn-outline">
                  <Phone size={16} /> {t.directInquiryBtn} {BUSINESS_PHONE_1_DISPLAY}
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
                {t.srvEyebrow}
              </div>
              <h2 className="section-title">{t.srvTitle}</h2>
              <p className="section-subtitle">{t.srvSubtitle}</p>
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
                      <h4 className="features-head">{t.srvHighlightsHead}</h4>
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
                        {t.srvEnquirePrefix} {srv.title} <ArrowUpRight size={16} />
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
                <h3>{t.srvAllIndiaTitle}</h3>
                <p>{t.srvAllIndiaDesc}</p>
              </div>
              <div className="banner-action-side">
                <a href="#quote" className="btn btn-primary">
                  {t.srvInstantQuoteBtn} <ArrowRight size={16} />
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
                {t.whyEyebrow}
              </div>
              <h2 className="section-title light">
                {t.whyTitleMain} <br />
                <span className="text-orange">{COMPANY_NAME}</span>
              </h2>
              <p className="section-subtitle light">{t.whySubtitle}</p>
            </div>

            <div className="why-grid stagger">
              <div className="why-card">
                <div className="why-icon-box">
                  <Globe size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">01</span>
                  <h3 className="why-title">{t.whyCard1Title}</h3>
                  <p className="why-text">{t.whyCard1Desc}</p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <Truck size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">02</span>
                  <h3 className="why-title">{t.whyCard2Title}</h3>
                  <p className="why-text">{t.whyCard2Desc}</p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <Radio size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">03</span>
                  <h3 className="why-title">{t.whyCard3Title}</h3>
                  <p className="why-text">{t.whyCard3Desc}</p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <ShieldCheck size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">04</span>
                  <h3 className="why-title">{t.whyCard4Title}</h3>
                  <p className="why-text">{t.whyCard4Desc}</p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <User size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">05</span>
                  <h3 className="why-title">{t.whyCard5Title}</h3>
                  <p className="why-text">{t.whyCard5Desc}</p>
                </div>
              </div>

              <div className="why-card">
                <div className="why-icon-box">
                  <Clock size={26} />
                </div>
                <div className="why-card-content">
                  <span className="why-num">06</span>
                  <h3 className="why-title">{t.whyCard6Title}</h3>
                  <p className="why-text">{t.whyCard6Desc}</p>
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
                  {t.quoteEyebrow}
                </div>
                <h2 className="quote-title">{t.quoteTitle}</h2>
                <p className="quote-desc">{t.quoteDesc}</p>

                <div className="quote-perks">
                  <div className="perk-item">
                    <CheckCircle2 size={18} className="text-orange" />
                    <span>{t.quotePerk1}</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={18} className="text-orange" />
                    <span>{t.quotePerk2}</span>
                  </div>
                  <div className="perk-item">
                    <CheckCircle2 size={18} className="text-orange" />
                    <span>{t.quotePerk3}</span>
                  </div>
                </div>

                <div className="quick-call-box">
                  <span className="quick-call-label">{t.quoteDirectTalk}</span>
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
                  <h3 className="form-heading">{t.quoteFormHeading}</h3>

                  <div className="form-group">
                    <label htmlFor="service-select">{t.quoteLabelService}</label>
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
                      <option value="Full Truck Load (FTL)">Full Truck Load (FTL)</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="origin-input">{t.quoteLabelOrigin}</label>
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
                      <label htmlFor="dest-input">{t.quoteLabelDest}</label>
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
                    <label htmlFor="weight-input">{t.quoteLabelWeight}</label>
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
                    <MessageCircle size={18} /> {t.quoteSubmitBtn} <ArrowRight size={18} />
                  </button>

                  <p className="form-privacy-note">
                    <ShieldCheck size={14} /> {t.quotePrivacyNote}
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
                {t.galleryEyebrow}
              </div>
              <h2 className="section-title">{t.galleryTitle}</h2>
              <p className="section-subtitle">{t.gallerySubtitle}</p>
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
                      <Eye size={16} /> {t.galleryZoomCue}
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
                {t.faqEyebrow}
              </div>
              <h2 className="section-title">{t.faqTitle}</h2>
              <p className="faq-intro-text">{t.faqSubtitle}</p>

              <div className="faq-contact-card">
                <h4>{t.faqClarifyTitle}</h4>
                <p>{t.faqClarifyDesc}</p>
                <a href={phoneHref1} className="btn btn-outline-dark">
                  <Phone size={16} /> {t.btnCallNow} {BUSINESS_PHONE_1_DISPLAY}
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
                {t.contactEyebrow}
              </div>
              <h2 className="section-title light">{t.contactTitle}</h2>
              <p className="section-subtitle light">{t.contactSubtitle}</p>
            </div>

            <div className="contact-cards-grid stagger">
              {/* Card 1: Proprietor */}
              <div className="contact-info-card">
                <div className="card-info-icon">
                  <User size={24} />
                </div>
                <div className="card-info-body">
                  <span className="info-badge">{t.contactProprietorBadge}</span>
                  <h3 className="info-title">{PROPRIETOR}</h3>
                  <p className="info-sub">{t.contactProprietorRole}</p>
                  <p className="info-desc">{t.contactProprietorDesc}</p>
                </div>
              </div>

              {/* Card 2: Contact Numbers */}
              <div className="contact-info-card">
                <div className="card-info-icon">
                  <Phone size={24} />
                </div>
                <div className="card-info-body">
                  <span className="info-badge">{t.contactCallBadge}</span>
                  <h3 className="info-title">
                    <a href={phoneHref1} className="contact-link">{BUSINESS_PHONE_1_DISPLAY}</a>
                  </h3>
                  <h3 className="info-title">
                    <a href={phoneHref2} className="contact-link">{BUSINESS_PHONE_2_DISPLAY}</a>
                  </h3>
                  <a href={whatsappHref} target="_blank" rel="noreferrer" className="text-link-action">
                    <MessageCircle size={15} /> {t.contactCallWhatsApp} <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Card 3: Business Hours */}
              <div className="contact-info-card">
                <div className="card-info-icon">
                  <Clock size={24} />
                </div>
                <div className="card-info-body">
                  <span className="info-badge">{t.contactHoursBadge}</span>
                  <h3 className="info-title">{BUSINESS_HOURS}</h3>
                  <p className="info-sub">{t.contactHoursSub}</p>
                  <p className="info-desc">{t.contactHoursDesc}</p>
                </div>
              </div>

              {/* Card 4: Email */}
              <div className="contact-info-card">
                <div className="card-info-icon">
                  <Mail size={24} />
                </div>
                <div className="card-info-body">
                  <span className="info-badge">{t.contactEmailBadge}</span>
                  <h3 className="info-title">
                    <a href={`mailto:${BUSINESS_EMAIL}`} className="contact-link email-text">
                      {BUSINESS_EMAIL}
                    </a>
                  </h3>
                  <p className="info-sub">{t.contactEmailSub}</p>
                  <a href={`mailto:${BUSINESS_EMAIL}`} className="text-link-action">
                    {t.contactEmailLink} <ArrowUpRight size={14} />
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
                    <span className="hub-tag">{t.hubOfficeTag}</span>
                    <h3 className="hub-name">{COMPANY_NAME}</h3>
                    <p className="hub-address">{FULL_ADDRESS}</p>
                    <p className="hub-coords">{t.hubCoordsLabel}</p>
                  </div>
                </div>
                <div className="map-info-actions">
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    {t.btnDrivingDirections} <ExternalLink size={16} />
                  </a>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-light"
                  >
                    {t.btnOpenGoogleMaps} <ArrowUpRight size={16} />
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
                {t.partnerBadgeFull}
              </p>
              <p className="footer-brand-desc">
                {t.heroDesc}
              </p>
              <div className="footer-proprietor-tag">
                <User size={16} /> Proprietor: <strong>{PROPRIETOR}</strong>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">{t.footerQuickNav}</h4>
              <ul className="footer-links-list">
                <li><a href="#home">{t.navHome}</a></li>
                <li><a href="#services">{t.navServices}</a></li>
                <li><a href="#about">{t.navAbout}</a></li>
                <li><a href="#why-us">{t.navWhyUs}</a></li>
                <li><a href="#partners">{t.navPartners}</a></li>
                <li><a href="#gallery">{t.navGallery}</a></li>
                <li><a href="#quote">{t.navGetQuote}</a></li>
                <li><a href="#contact">{t.navContact}</a></li>
              </ul>
            </div>

            {/* Column 3: Services Directory */}
            <div className="footer-col">
              <h4 className="footer-heading">{t.footerServicesDir}</h4>
              <ul className="footer-links-list">
                {services.map((srv) => (
                  <li key={srv.id}><a href="#services">{srv.title}</a></li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact & Hub */}
            <div className="footer-col">
              <h4 className="footer-heading">{t.footerHubOffice}</h4>
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
                <span>{t.footerOperatingTime}</span>
              </div>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom-bar">
            <div className="footer-copy">
              © {new Date().getFullYear()} <strong>{COMPANY_NAME}</strong>. {t.footerRights}
            </div>
            <div className="footer-motto">{t.footerMotto}</div>
            <a href="#home" className="footer-back-to-top" aria-label="Back to top of page">
              {t.footerBackToTop} <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </footer>

      {/* 14. FLOATING QUICK ACTION BAR (WhatsApp & Call) */}
      <div
        className={`floating-actions-container ${mobileMenuOpen ? "floating-hidden" : ""}`}
        aria-label="Quick contact links"
      >
        <a
          href={phoneHref1}
          className="floating-btn floating-call-btn"
          aria-label="Call Maakeenaa Agencies now"
          title="Call 24/7: +91 98941 44376"
        >
          <Phone size={22} />
          <span className="floating-text">{t.floatingCallText}</span>
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
          <span className="floating-text">{t.floatingWhatsAppText}</span>
        </a>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
