# Dawat Nama · Shah Family Wedding Website

Next.js 16 (App Router) + TypeScript + Tailwind CSS + `motion`.
Mobile-first digital invitation: Tap-to-Open doors, couple illustrations, Save-the-Date calendar,
Valima scratch card, countdown, timeline, map, R.S.V.P. (Call / WhatsApp), English ⇄ اردو switch, background audio.

## Vercel par live kaise karein

1. Is folder ko GitHub par ek naye repo mein push karein:
   ```bash
   git init
   git add .
   git commit -m "Dawat Nama website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/shah-dawat.git
   git push -u origin main
   ```
2. vercel.com → **Add New… → Project** → GitHub repo choose karein → **Deploy**.
   Next.js apne aap detect hota hai, koi setting nahi badalni.
3. Live link milega (jaise `shah-dawat.vercel.app`). Project name badal kar link ka naam badal sakte hain.
   WhatsApp preview image (`app/opengraph-image.jpg`) live URL ke saath apne aap jud jaati hai.

## Local chalane ke liye

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build check
```

## Kuch badalna ho to

| Kya badalna hai | File |
|---|---|
| Naam, date, pata, mobile number, map link (sab card ka text) | `data/invitation.ts` |
| Music | `public/audio/nasheed.mp3` (isi naam se nayi file daal dein) |
| WhatsApp preview image | `app/opengraph-image.jpg` (1200×630) |
| Rang / fonts | `app/globals.css` (`:root` tokens) |
| Sections ka design | `components/Sections.tsx` |
| Dulha-dulhan illustration aur unke rang | `components/CoupleIllustration.tsx` (`PALETTES`) |
| Cover (darwaze + Tap to Open) | `components/Cover.tsx` |

## Notes

- Site Google search mein index nahi hogi (`robots: noindex`) — sirf link wale log dekh payenge.
- Music tabhi chalta hai jab mehmaan "Tap to Open" dabate hain (phone browsers bina tap ke awaaz nahi chalne dete).
- Valima "Add to Calendar" ka end-time card par nahi hai, isliye 3 ghante rakha gaya hai (`lib/links.ts`).
