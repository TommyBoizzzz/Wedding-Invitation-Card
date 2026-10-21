export interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: 'traditional' | 'modern' | 'all';
  description: string;
  location: string;
}

export interface WeddingHostPhone {
  label: string;
  number: string;
  tel: string;
}
