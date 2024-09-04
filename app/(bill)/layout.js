import "../(user)/globals.css";

export const metadata = {
  // metadataBase: new URL("https://bicakciserkan.com"),
  // keywords: [
  //   "Bıçak",
  //   "Av malzemeleri",
  //   "Kesici aletler",
  //   "Alışveriş",
  //   "Çakı",
  //   "Katana",
  //   "Zülfikar",
  //   "Kasap bıçağı",
  //   "Zırh bıçağı",
  //   "Şef bıçağı",
  //   "Karambit",
  //   "Bayonet",
  //   "Kelebek bıçakları",
  //   "Taktik bıçaklar",
  //   "Outdoor bıçaklar",
  //   "Avcı bıçakları",
  //   "Kamp bıçakları",
  //   "Survival bıçaklar",
  //   "Koleksiyon bıçakları",
  //   "Dövme bıçaklar",
  //   "El yapımı bıçaklar",
  // ],
  title: "May Plastik",
  description: "MAY PLASTİK Satış Websitesi",
  robots: {
    index: true,
    follow: true,
  },
  generator: "AYDTANITIM",
  applicationName: "Next.js",
  referrer: "origin-when-cross-origin",
  creator: "Aydtanitim.com",
  publisher: "MayPlastik",
  verification: {
    google: "123123123",
  },
  // openGraph: {
  //   title: "BıçakcıSerkan",
  //   description: "Bıçakcı Serkan Av ve Bıçak Malzemeleri Satış Websitesi",
  //   url: "https://bicakciserkan.com",
  //   siteName: "Bıçakcı Serkan",
  //   images: [
  //     {
  //       url: "https://bicakciserkan.com/assets/images/bicakcilogo.svg",
  //       width: 736,
  //       height: 250,
  //       alt: "Bıçakcı Serkan",
  //     },
  //   ],
  //   locale: "tr_TR",
  //   type: "website",
  // },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
