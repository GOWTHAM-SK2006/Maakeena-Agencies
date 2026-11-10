# Maakeenaa Agencies — Static Website

Premium responsive React + Tailwind CSS (v4) website for Maakeenaa Agencies.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Before publishing — owner verification required

Open `src/main.jsx` and update:

- `BUSINESS_PHONE`: configured as `+919894144376` (+91 98941 44376) for direct calls and WhatsApp.
- `BUSINESS_EMAIL`: configured as `maakeenaa.agencies@gmail.com`.
- `BUSINESS_HOURS`: Open 24 Hours (24/7).

## Current business information used

- Business name: Maakeenaa Agencies
- Proprietor: D. Vadivel
- Partnership: Trusted Logistics Partner — Mahindra Logistics & Rivigo
- Services: Part Truck Load (PTL), Express Surface, Express Air, Door-to-Door Parcel Delivery & Pickup across 19,000+ Pin Codes
- Fleet Network: 1,100+ active trucks
- Address: 407/24, Lineman Thottam, Meenatchiamman Nagar, Ottarpalayam, Coimbatore - 641016
- GPS Coordinates: 10°59'54.3"N 77°03'45.8"E (10.998426, 77.062728)
- Phone Numbers: +91 98941 44376 / +91 98946 58961
- Email: maakeenaa.agencies@gmail.com
- Business Hours: Open 24 Hours (24/7)

## Notes

- The website is frontend-only; no backend or database is required.
- The map is a Google Maps search/embed for the locality/business name, not a verified storefront pin.
- Hero and warehouse photos load from Unsplash and require an internet connection.
- Replace stock photos with owner-approved business photos before final client delivery.
- Contact buttons intentionally lead to the contact section until a verified phone number is configured. The floating contact shortcut does the same.

## Motion v2 (animation upgrade)

- `src/motion.js`: one hook (`useMotion`) for scroll reveals, scroll progress, parallax, card tilt and magnetic buttons.
- Truck on top progress bar follows your scroll; a second truck drives along the hero road.
- Headline words rise one by one, cards stagger in and tilt in 3D with a spotlight, FAQ opens smoothly.
- Fixed: the original `.reveal` sections had no script to show them, so they stayed invisible. `useMotion` now handles that.
- All motion switches off for users with "reduce motion" enabled.
