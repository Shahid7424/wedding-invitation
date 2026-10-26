/**
 * ─────────────────────────────────────────────────────────────
 *  INVITATION DATA — the ONLY place names, dates & addresses live.
 *  Everything below is copied from the printed Dawat Nama card.
 *  To change any text on the website, change it here only.
 * ─────────────────────────────────────────────────────────────
 */

export const invitation = {
  /* ---------- Opening ---------- */
  opening: {
    en: {
      bismillah: "In the name of Allah the most beneficent & merciful",
      title: "Dawat Nama",
      occasion: "Marriage Ceremony",
    },
    ur: {
      bismillah: "بسمہ تعالیٰ",
      title: "دعوت نامہ",
      occasion: "بتقریب شادی خانہ آبادی",
    },
    couplet: [
      "یہ وہ لمحہ ہے جس پہ ساری دنیا ناز کرتی ہے",
      "یہاں سے زندگی اپنا سفر آغاز کرتی ہے",
    ],
  },

  /* ---------- Hosts ---------- */
  hosts: {
    en: {
      prefix: "Mrs & Mr.",
      name: "Mohd Taroof Shah",
      request:
        "Request the pleasure of your company on auspicious occasion of the Marriage ceremony of Their Sons",
    },
    ur: {
      prefix: "الداعی",
      name: "محمد تعروف شاہ",
      request: "حسب پروگرام آپ کی شرکت ہمارے لئے باعث مسرت ہوگی",
    },
  },

  /* ---------- Weddings ---------- */
  weddings: [
    {
      id: "shahid-tarannum",
      date: "2026-11-10",
      en: {
        day: "Tuesday",
        dateLine: "On Tuesday, 10th November 2026",
        dayNum: "10",
        monthYear: "November 2026",
        groom: "Mohd Shahid Shah",
        groomParent: "S/o. Mohd Taroof Shah",
        weds: "Wed's",
        bride: "Tarannum",
        brideParent: "D/o. Janab Hamid Ali Sahab",
        brideAddress: ["Vill & P.o-Ismaila,", "Distt-Gonda."],
      },
      ur: {
        dateLine: "۱۰؍نومبر ۲۰۲۶ء بروز منگل",
        groom: "محمد شاہد شاہ",
        groomTitle: "نور چشم",
        groomParent: "ابن۔ محمد تعروف شاہ",
        weds: "ہمراہ",
        bride: "ترنم",
        brideTitle: "عزیزہ",
        brideParent: "بنت۔ حامد علی صاحب",
        brideAddress: ["مقام و پوسٹ اسماعیلہ، ضلع گونڈہ"],
      },
    },
    {
      id: "irfan-afsana",
      date: "2026-11-11",
      en: {
        day: "Wednesday",
        dateLine: "On Wednesday, 11th November 2026",
        dayNum: "11",
        monthYear: "November 2026",
        groom: "Mohd Irfan Shah",
        groomParent: "S/o. Mohd Taroof Shah",
        weds: "Wed's",
        bride: "Afsana Khatoon",
        brideParent: "D/o. Janab Maqbool Ahmad Sahab",
        brideAddress: ["Vill-Mudehra, P.o-Semri,", "Distt-Siddharth Nagar"],
      },
      ur: {
        dateLine: "۱۱؍نومبر ۲۰۲۶ء بروز بدھ",
        groom: "محمد عرفان شاہ",
        groomTitle: "نور چشم",
        groomParent: "ابن۔ محمد تعروف شاہ",
        weds: "ہمراہ",
        bride: "افسانہ خاتون",
        brideTitle: "عزیزہ",
        brideParent: "بنت۔ مقبول احمد",
        brideAddress: ["مقام مڑہرا، پوسٹ سیمری،", "ضلع سدھارتھ نگر"],
      },
    },
  ],

  /* ---------- Programme (Valima) ---------- */
  valima: {
    // 12 Nov 2026, 12 Noon India time
    startISO: "2026-11-12T12:00:00+05:30",
    en: {
      label: "Programme",
      insha: "Insha Allah",
      title: "Dawat-e-Valima",
      dateLine: "On Thursday, 12th November 2026",
      day: "Thursday",
      dayNum: "12",
      monthYear: "November 2026",
      time: "At 12 Noon",
    },
    ur: {
      label: "پروگرام",
      insha: "انشاء اللہ",
      title: "دعوت ولیمہ",
      dateLine: "۱۲؍نومبر ۲۰۲۶ء بروز جمعرات",
      time: "۱۲؍ بجے دن",
    },
  },

  /* ---------- Venue / W.T.W.Y ---------- */
  venue: {
    en: {
      label: "W.T.W.Y",
      labelFull: "Waiting To Welcome You",
      name: "Mohd Taroof Shah",
      address: ["Vill-Asnahra, P.o-Dindai,", "Distt-Siddharth Nagar"],
    },
    ur: {
      label: "الداعی",
      name: "محمد تعروف شاہ",
      address: ["مقام اسنہرا، پوسٹ ڈنڈئی،", "ضلع سدھارتھ نگر"],
    },
    mapUrl: "https://maps.app.goo.gl/y82rNmrYDHs2LsiU7",
  },

  /* ---------- R.S.V.P ---------- */
  rsvp: {
    en: {
      label: "R.S.V.P.",
      names: [
        "Mohd Javed",
        "Imam Ali",
        "Mohd Maroof",
        "Mohd Ishaq",
        "Mohd Shadab",
        "Mohd Faizan",
      ],
      family: "All Shah Family & Relatives",
    },
    ur: {
      label: "چشم براہ",
      names: [
        "امام علی",
        "محمد معروف",
        "محمد جاوید",
        "محمد اسحاق",
        "محمد شاداب",
        "محمد فیضان",
      ],
      family: "و جملہ شاہ فیملی و عزیز و اقارب",
    },
    phoneDisplay: "9619355430",
    phoneIntl: "919619355430",
    
  },
} as const;

export type Lang = "en" | "ur";
