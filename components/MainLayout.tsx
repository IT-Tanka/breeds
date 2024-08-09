import Link from 'next/link';
import { ReactNode } from 'react';
import Head from 'next/head';
interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}
export function MainLayout({ children, title = 'Breeds App' }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="next,javascript,nextjs,react" />
        <meta name="description" content="this is an app with dogs and cats breeds" />
        <meta charSet="utf-8" />
      </Head>
      <header className="bg-green-600 p-4">
        <Link
          href="/"
          className="text-4xl font-extrabold text-orange-500 uppercase tracking-widest shadow-logo hover:text-yellow-300 transition-colors duration-300 font-custom flex items-center"
        >
          Breeds-app
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 1280.000000 1232.000000"
            preserveAspectRatio="xMidYMid meet"
            style={{ marginLeft: '0.5rem', transform: 'rotate(25deg)' }} // Поворот иконки на 25 градусов
          >
            <g
              transform="translate(0.000000,1232.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path d="M8425 12296 c-714 -172 -1276 -774 -1548 -1656 -128 -415 -184 -930 -142 -1305 82 -741 432 -1322 951 -1583 176 -88 352 -134 520 -134 134 0 252 24 387 78 814 327 1377 1162 1499 2224 21 187 16 551 -11 770 -40 326 -87 500 -196 725 -171 353 -411 614 -705 764 -178 92 -325 130 -525 137 -113 3 -143 1 -230 -20z"/>
              <path d="M3822 12255 c-408 -74 -780 -384 -1006 -839 -212 -426 -270 -1025 -160 -1654 140 -802 549 -1478 1131 -1868 128 -86 340 -191 484 -239 102 -34 128 -38 241 -43 150 -6 257 8 388 50 203 65 369 167 525 323 309 309 501 774 546 1323 18 226 -2 562 -51 825 -175 952 -690 1700 -1380 2003 -269 118 -506 157 -718 119z"/>
              <path d="M11403 8606 c-661 -109 -1244 -566 -1604 -1260 -171 -329 -261 -613 -326 -1026 -23 -149 -27 -205 -27 -375 0 -208 12 -311 55 -479 115 -451 386 -818 723 -981 184 -89 352 -122 541 -105 459 40 868 247 1232 623 401 415 677 989 767 1592 23 151 39 446 32 567 -37 623 -371 1169 -836 1369 -180 77 -378 104 -557 75z"/>
              <path d="M1051 8344 c-435 -73 -801 -377 -936 -779 -48 -142 -88 -345 -105 -530 -62 -671 173 -1424 618 -1985 98 -123 291 -317 414 -413 284 -225 627 -386 947 -447 85 -16 286 -14 367 4 359 78 662 328 834 689 106 222 160 505 160 838 0 205 -10 317 -46 507 -137 732 -582 1417 -1182 1820 -164 111 -397 229 -524 266 -159 46 -380 58 -547 30z"/>
              <path d="M6240 5905 c-348 -39 -692 -132 -1031 -281 -518 -229 -1018 -610 -1341 -1024 -697 -894 -1181 -1862 -1378 -2755 -12 -55 -33 -138 -46 -185 -67 -243 -56 -519 31 -760 140 -388 443 -689 818 -815 224 -75 559 -74 932 4 243 50 425 108 941 299 718 267 917 318 1400 363 216 20 255 21 404 10 381 -27 682 -110 1260 -346 512 -209 798 -322 870 -342 720 -204 1435 47 1680 590 107 239 119 628 29 997 -88 359 -349 942 -599 1335 -704 1108 -1211 1729 -1790 2197 -549 442 -1005 650 -1571 713 -159 18 -447 18 -609 0z"/>
            </g>
          </svg>
        </Link>
      </header>
      <main>
        {children}
      </main>
    </>
  );
}
