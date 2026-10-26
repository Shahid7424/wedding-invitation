import { invitation as D } from "@/data/invitation";

const enc = encodeURIComponent;
const hostAddress = `${D.venue.en.name}, ${D.venue.en.address.join(" ")}`;

function gcal(text: string, dates: string, details: string, location?: string) {
  let url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${enc(text)}&dates=${dates}&details=${enc(details)}`;
  if (location) url += `&location=${enc(location)}`;
  return url;
}

/** Google Calendar links. Wedding days are all-day (no time printed on the card). */
export const calendarLinks = {
  "shahid-tarannum": gcal(
    `${D.weddings[0].en.groom} Wed's ${D.weddings[0].en.bride}`,
    "20261110/20261111",
    `${D.weddings[0].en.dateLine}\nDawat Nama – ${D.hosts.en.prefix} ${D.hosts.en.name}`,
  ),
  "irfan-afsana": gcal(
    `${D.weddings[1].en.groom} Wed's ${D.weddings[1].en.bride}`,
    "20261111/20261112",
    `${D.weddings[1].en.dateLine}\nDawat Nama – ${D.hosts.en.prefix} ${D.hosts.en.name}`,
  ),
  // 12 Nov 2026, 12:00 IST = 06:30 UTC. The card gives no end time, so 3 hours is used as a placeholder.
  valima: gcal(
    `${D.valima.en.insha} ${D.valima.en.title}`,
    "20261112T063000Z/20261112T093000Z",
    `${D.valima.en.dateLine}, ${D.valima.en.time}\n${D.venue.en.label}: ${hostAddress}\nMap: ${D.venue.mapUrl}`,
    hostAddress,
  ),
};

export const telLink = `tel:+${D.rsvp.phoneIntl}`;
export const whatsappLink = `https://wa.me/${D.rsvp.phoneIntl}?text=${enc(
  "Assalamu Alaikum! Dawat Nama mil gaya, bahut shukriya. Insha Allah hum shaadi mein shamil honge.",
)}`;

export function shareText(url: string) {
  return `Dawat Nama – ${D.hosts.en.prefix} ${D.hosts.en.name}\n${D.weddings[0].en.groom} & ${D.weddings[0].en.bride} · ${D.weddings[1].en.groom} & ${D.weddings[1].en.bride}\n10, 11 & 12 November 2026\n${url}`;
}
