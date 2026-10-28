import QRCode from 'qrcode';

// Target location in Beng Village, Chi Kraeng, Chi Kraeng District, Siem Reap
export const WEDDING_LOCATION = {
  name: 'ភោជនីយដ្ឋានផ្កាឈូកទេព (​ អគារ G )',
  village: 'ពុំមាន',
  commune: 'សង្កាត់ផ្សារដើមគរ',
  district: 'ខណ្ឌទួលគោក',
  province: 'រាជធានីភ្នំពេញ',
  fullKhmer: 'ស្ថិតនៅ សង្កាត់ផ្សារដើមគរ ខណ្ឌទួលគោក រាជធានីភ្នំពេញ',
  fullEnglish: 'Phsar Doeum Kor Sangkat, Tuol Kouk District, Phnom Penh',
  mapsUrl: 'https://maps.app.goo.gl/MX4CJFugQmD2RMPp8',
  coordinates: '11.556833, 104.906485',
  embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d290.53298965721723!2d104.9063712507236!3d11.55684780129108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2skh!4v1793171847276!5m2!1sen!2skh',
  hostsPhones: [
    { label: 'ម្ចាស់កម្មវិធី (ខ្សែទី ១)', number: '087 388 887', tel: '+85587388887' },
    { label: 'ម្ចាស់កម្មវិធី (ខ្សែទី ២)', number: '085 908 015', tel: '+85585908015' },
  ]
};

// export const BANK_ACCOUNTS = {
//   aba: {
//     bankName: 'ABA BANK',
//     accountName: 'PEOU NEANG',
//     khrAccount: '012 459 616',
//     usdAccount: '012 459 615',
//     khqrString: 'https://link.payway.com.kh/khqr?account=012459615&name=PEOU%20NEANG&bank=ABA'
//   },
//   acleda: {
//     bankName: 'ACLEDA BANK (អេស៊ីលីដា)',
//     accountName: 'Heng Kimhor',
//     accountNumber: '012 459 616',
//     khqrString: 'https://link.acleda.com.kh/khqr?account=012459616&name=NEANG%20PEOU&bank=ACLEDA'
//   }
// };

export const BANK_ACCOUNTS = {
  aba: {
    bankName: 'ABA BANK',
    accountName: 'LLC Heng Kimhor',
    khrAccount: '111 222 333',
    usdAccount: '111 222 334',
    khqrString: '1111111111111111111111111111111111111111111111111111111111111111'
  },
  acleda: {
    bankName: 'ACLEDA BANK (អេស៊ីលីដា)',
    accountName: 'LLC Heng Kimhor',
    khrAccount: '111 222 333',
    usdAccount: '111 222 334',
    khqrString: '1111111111111111111111111111111111111111111111111111111111111111'
  }
};

export async function generateQrDataUrl(text: string, options?: {
  width?: number;
  margin?: number;
  colorDark?: string;
  colorLight?: string;
}): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      width: options?.width || 360,
      margin: options?.margin ?? 2,
      color: {
        dark: options?.colorDark || '#000000',
        light: options?.colorLight || '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    });
  } catch (err) {
    console.error('Failed to generate QR code', err);
    return '';
  }
}
