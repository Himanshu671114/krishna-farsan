import { FaralProduct } from '../types';

export const POSTER_MAIN_IMAGE = '/assets/aistudio/________________________da10366c.png';
export const POSTER_HAMPER_IMAGE = '/assets/aistudio/gemini-2.5-flash-image_Make_ONLY_these_two_changes_to_the_existing_poster_1._Replace_the_mobile_number_-0_8bcd5019.jpg';

// Realistic food photography assets
export const PHOTO_CHAKLI = '/src/assets/images/photo_chakli_realistic_1793212530257.jpg';
export const PHOTO_SHANKARPAALE = '/src/assets/images/photo_shankarpaale_realistic_1793212531535.jpg';
export const PHOTO_POHE_CHIWDA = '/src/assets/images/photo_pohe_chiwda_realistic_1793212531995.jpg';
export const PHOTO_TIKHAT_SHEV = '/src/assets/images/photo_tikhat_shev_realistic_1793212532667.jpg';
export const PHOTO_BESAN_LADDU = '/src/assets/images/photo_besan_laddu_realistic_1793212533243.jpg';
export const PHOTO_RAVA_LADDU = '/src/assets/images/photo_rava_laddu_realistic_1793212533677.jpg';
export const PHOTO_KARANJI = '/src/assets/images/photo_karanji_realistic_1793212534027.jpg';
export const PHOTO_ANARSE = '/src/assets/images/photo_anarse_realistic_1793212534816.jpg';
export const PHOTO_RAVA_BESAN_LADDU = '/src/assets/images/photo_rava_besan_laddu_realistic_1793212535032.jpg';
export const PHOTO_HAMPER_REALISTIC = '/src/assets/images/photo_faral_hamper_realistic_1793212535725.jpg';

// EXACT REQUIREMENT: Only 500 g and 1 kg weight options
const standardWeights = [
  { grams: 500, labelMr: '५०० ग्रॅम (0.5 kg)', labelEn: '500 g', multiplier: 0.5 },
  { grams: 1000, labelMr: '१ किलो (1 kg)', labelEn: '1 kg', multiplier: 1.0 },
];

export const FARAL_PRODUCTS: FaralProduct[] = [
  {
    id: 'chakli',
    nameMr: 'चकली',
    nameEn: 'Bhajani Chakli',
    pricePerKg: 500,
    descriptionMr: 'पारंपरिक भाजणीची कुरकुरीत, खमंग आणि काटेरी चकली.',
    descriptionEn: 'Crispy and crunchy authentic multigrain bhajani spiral chakli with traditional spices.',
    imageCrop: {
      src: PHOTO_CHAKLI,
      bgPosition: 'center',
      bgSize: 'cover',
    },
    weightOptions: standardWeights,
  },
  {
    id: 'shankarpaale',
    nameMr: 'शंकरपाळे',
    nameEn: 'Shankarpaale',
    pricePerKg: 450,
    descriptionMr: 'तुपातील खुसखुशीत, जिभेवर विरघळणारे गोड शंकरपाळे.',
    descriptionEn: 'Melt-in-mouth sweet diamond-cut pastry made with pure ghee and flour.',
    imageCrop: {
      src: PHOTO_SHANKARPAALE,
      bgPosition: 'center',
      bgSize: 'cover',
    },
    weightOptions: standardWeights,
  },
  {
    id: 'pohe-chiwda',
    nameMr: 'पोहे चिवडा',
    nameEn: 'Pohe Chiwda',
    pricePerKg: 500,
    descriptionMr: 'कढीपत्ता, शेंगदाणे आणि खोबऱ्याचा खमंग तडका असलेला पोहे चिवडा.',
    descriptionEn: 'Crispy roasted flattened rice tossed with peanuts, dry coconut, green chillies and curry leaves.',
    imageCrop: {
      src: PHOTO_POHE_CHIWDA,
      bgPosition: 'center',
      bgSize: 'cover',
    },
    weightOptions: standardWeights,
  },
  {
    id: 'tikhat-shev',
    nameMr: 'तिखट शेव',
    nameEn: 'Tikhat Shev (Authentic Thick)',
    pricePerKg: 500,
    descriptionMr: 'अस्सल जाड तिखट शेव—नायलॉन शेव किंवा भुजिया नव्हे! खमंग लसूण-मसाल्यांची चव.',
    descriptionEn: 'Authentic Maharashtrian thick, crunchy spicy shev—not thin nylon sev or generic bhujia.',
    imageCrop: {
      src: PHOTO_TIKHAT_SHEV,
      bgPosition: 'center',
      bgSize: 'cover',
    },
    weightOptions: standardWeights,
  },
  {
    id: 'besan-laddu',
    nameMr: 'बेसन लाडू',
    nameEn: 'Besan Laddu (Pure Ghee)',
    pricePerKg: 750,
    descriptionMr: 'शुद्ध साजूक तुपात मंद आचेवर भाजलेले दाणेदार बेसन लाडू.',
    descriptionEn: 'Rich, aromatic gram flour laddus slow-roasted to perfection in pure ghee, cardamom, and nuts.',
    imageCrop: {
      src: PHOTO_BESAN_LADDU,
      bgPosition: 'center',
      bgSize: 'cover',
    },
    weightOptions: standardWeights,
  },
  {
    id: 'rava-laddu',
    nameMr: 'रवा लाडू',
    nameEn: 'Rava Laddu',
    pricePerKg: 750,
    descriptionMr: 'बारीक रवा आणि सुक्या खोबऱ्याचे रसाळ, मऊ लाडू.',
    descriptionEn: 'Soft, delicate roasted semolina laddus flavored with saffron, cardamom and dry fruits.',
    imageCrop: {
      src: PHOTO_RAVA_LADDU,
      bgPosition: 'center',
      bgSize: 'cover',
    },
    weightOptions: standardWeights,
  },
  {
    id: 'dryfruit-karanji',
    nameMr: 'ड्रायफ्रूट गोड करंजी',
    nameEn: 'Dryfruit God Karanji',
    pricePerKg: 900,
    descriptionMr: 'काजू, बदाम, पिस्ता आणि खोबऱ्याच्या सारणाने भरलेली खुसखुशीत करंजी.',
    descriptionEn: 'Flaky golden crescent pastry generously stuffed with roasted nuts, khoya, and coconut.',
    imageCrop: {
      src: PHOTO_KARANJI,
      bgPosition: 'center',
      bgSize: 'cover',
    },
    weightOptions: standardWeights,
  },
  {
    id: 'anarse',
    nameMr: 'अनारसे',
    nameEn: 'Traditional Anarse',
    pricePerKg: 1000,
    descriptionMr: 'पारंपरिक आंबवलेल्या तांदूळ-गुळाची जाळीदार आणि खसखस लावलेली मिठाई.',
    descriptionEn: 'Festive delicacy of fermented rice and jaggery with honeycomb texture and poppy seeds.',
    imageCrop: {
      src: PHOTO_ANARSE,
      bgPosition: 'center',
      bgSize: 'cover',
    },
    weightOptions: standardWeights,
  },
  {
    id: 'rava-besan-laddu',
    nameMr: 'रवा-बेसन मिक्स लाडू',
    nameEn: 'Rava-Besan Mix Laddu',
    pricePerKg: 800,
    descriptionMr: 'रवा आणि बेसन या दोघांचा अप्रतिम संगम; दाणेदार पोत आणि उत्कृष्ट चव.',
    descriptionEn: 'Balanced blend of golden roasted semolina and besan crafted in pure country ghee.',
    imageCrop: {
      src: PHOTO_RAVA_BESAN_LADDU,
      bgPosition: 'center',
      bgSize: 'cover',
    },
    weightOptions: standardWeights,
  },
];
