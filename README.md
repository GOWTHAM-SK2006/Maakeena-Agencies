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

- `BUSINESS_PHONE`: the verified business phone in international format, e.g. `+919876543210`. This enables the Call and WhatsApp actions.
- `BUSINESS_EMAIL`: only if the owner confirms an email address.
- `BUSINESS_ADDRESS`: replace with the exact owner-confirmed address if available.
- `MAP_QUERY`: update to the confirmed map listing/place if the current search does not locate the correct pin.
- Business hours, route coverage, delivery timelines, pricing, fleet, and service promises should only be added after the owner confirms them.

## Current business information used

- Business name: Maakeenaa Agencies
- Business categories from the supplied listing: Domestic Transporters and Courier Services
- Locality: Edayapalayam, Coimbatore
- Listing rating supplied by the user: 4.1 / 5 from 29 ratings (not displayed as a website testimonial)

Exact street address, phone, email, operating hours, routes and pricing are not hard-coded because they have not been confirmed in the project brief.

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
