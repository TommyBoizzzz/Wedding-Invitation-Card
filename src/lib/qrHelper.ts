import QRCode from 'qrcode';

// Target location in Beng Village, Chi Kraeng, Chi Kraeng District, Siem Reap
// Coordinates approx for Chi Kraeng / Beng, Siem Reap: 13.067, 104.385
// export const WEDDING_LOCATION = {
//   name: 'គេហដ្ឋានខាងស្រី (Bride\'s Family Home)',
//   village: 'ភូមិបេង',
//   commune: 'ឃុំជីក្រែង',
//   district: 'ស្រុកជីក្រែង',
//   province: 'ខេត្តសៀមរាប',
//   fullKhmer: 'គេហដ្ឋានខាងស្រី ស្ថិតនៅ ភូមិបេង ឃុំជីក្រែង ស្រុកជីក្រែង ខេត្តសៀមរាប',
//   fullEnglish: 'Bride\'s Home, Beng Village, Chi Kraeng Commune, Chi Kraeng District, Siem Reap Province, Cambodia',
//   mapsUrl: 'https://maps.app.goo.gl/MF8uXE3uDm5vtF1c9',
//   coordinates: '13.0667, 104.3833',
//   embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124800!2d104.35!3d13.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310f823e2182b8a7%3A0x8673a55e2d631dfb!2sChi%20Kraeng%2C%20Siem%20Reap%20Province%2C%20Cambodia!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh',
//   hostsPhones: [
//     { label: 'ម្ចាស់កម្មវិធី (ខ្សែទី ១)', number: '011 77 91 55', tel: '+85511779155' },
//     { label: 'ម្ចាស់កម្មវិធី (ខ្សែទី ២)', number: '011 77 91 55', tel: '+85511779155' },
//     { label: 'ម្ចាស់កម្មវិធី (ខ្សែទី ៣)', number: '011 77 91 55', tel: '+85511779155' },
//   ]
// };

export const WEDDING_LOCATION = {
  name: 'Place Coming Soon',
  village: 'Place Coming Soon',
  commune: 'Place Coming Soon',
  district: 'Place Coming Soon',
  province: 'Place Coming Soon',
  fullKhmer: 'Place Coming Soon',
  fullEnglish: 'Place Coming Soon',
  mapsUrl: 'https://maps.app.goo.gl/MF8uXE3uDm5vtF1c9',
  coordinates: '13.0667, 104.3833',
  embedMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124800!2d104.35!3d13.06!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310f823e2182b8a7%3A0x8673a55e2d631dfb!2sChi%20Kraeng%2C%20Siem%20Reap%20Province%2C%20Cambodia!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh',
  hostsPhones: [
    { label: 'ម្ចាស់កម្មវិធី (ខ្សែទី ១)', number: '011 77 91 55', tel: '+85511779155' },
    { label: 'ម្ចាស់កម្មវិធី (ខ្សែទី ២)', number: '011 77 91 55', tel: '+85511779155' },
    { label: 'ម្ចាស់កម្មវិធី (ខ្សែទី ៣)', number: '011 77 91 55', tel: '+85511779155' },
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
//     accountName: '(Groom Name)',
//     accountNumber: '012 459 616',
//     khqrString: 'https://link.acleda.com.kh/khqr?account=012459616&name=NEANG%20PEOU&bank=ACLEDA'
//   }
// };

export const BANK_ACCOUNTS = {
  aba: {
    bankName: 'ABA BANK',
    accountName: 'LLC (Groom Name)',
    khrAccount: '111 222 333',
    usdAccount: '111 222 334',
    khqrString: '1111111111111111111111111111111111111111111111111111111111111111'
  },
  acleda: {
    bankName: 'ACLEDA BANK (អេស៊ីលីដា)',
    accountName: 'LLC (Groom Name)',
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
