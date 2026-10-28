import { FaralCombo } from '../types';
import { PHOTO_HAMPER_REALISTIC } from './products';

export const FARAL_COMBOS: FaralCombo[] = [
  {
    id: 'combo-classic',
    nameMr: 'क्लासिक फराळ कॉम्बो',
    nameEn: 'Classic Faral Combo',
    subtitleMr: 'सणासाठी पारंपरिक फराळाचा सुंदर संगम',
    price: 599,
    popular: false,
    image: PHOTO_HAMPER_REALISTIC,
    imageCrop: {
      bgPosition: 'center',
      bgSize: 'cover',
    },
    items: [
      { nameMr: 'चकली', nameEn: 'Chakli', quantityMr: '५ नग', quantityEn: '5 pcs' },
      { nameMr: 'करंजी', nameEn: 'Karanji', quantityMr: '४ नग', quantityEn: '4 pcs' },
      { nameMr: 'बेसन लाडू', nameEn: 'Besan Laddu', quantityMr: '२ नग', quantityEn: '2 pcs' },
      { nameMr: 'रवा लाडू', nameEn: 'Rava Laddu', quantityMr: '२ नग', quantityEn: '2 pcs' },
      { nameMr: 'तिखट शेव', nameEn: 'Tikhat Shev', quantityMr: '१०० ग्रॅम', quantityEn: '100 g' },
      { nameMr: 'शंकरपाळे', nameEn: 'Shankarpaale', quantityMr: '१०० ग्रॅम', quantityEn: '100 g' },
      { nameMr: 'पोहे चिवडा', nameEn: 'Pohe Chiwda', quantityMr: '१०० ग्रॅम', quantityEn: '100 g' },
    ],
  },
  {
    id: 'combo-double',
    nameMr: 'डबल फराळ कॉम्बो',
    nameEn: 'Double Faral Combo (Diwali Gift Hamper)',
    subtitleMr: 'कुटुंबासाठी आणि पाहुण्यांच्या स्वागतासाठी • सर्व ७ पदार्थ दुप्पट प्रमाणात',
    price: 1099,
    popular: true,
    image: PHOTO_HAMPER_REALISTIC,
    imageCrop: {
      bgPosition: 'center',
      bgSize: 'cover',
    },
    items: [
      { nameMr: 'चकली', nameEn: 'Chakli', quantityMr: '१० नग', quantityEn: '10 pcs' },
      { nameMr: 'करंजी', nameEn: 'Karanji', quantityMr: '८ नग', quantityEn: '8 pcs' },
      { nameMr: 'बेसन लाडू', nameEn: 'Besan Laddu', quantityMr: '४ नग', quantityEn: '4 pcs' },
      { nameMr: 'रवा लाडू', nameEn: 'Rava Laddu', quantityMr: '४ नग', quantityEn: '4 pcs' },
      { nameMr: 'तिखट शेव', nameEn: 'Tikhat Shev', quantityMr: '२०० ग्रॅम', quantityEn: '200 g' },
      { nameMr: 'शंकरपाळे', nameEn: 'Shankarpaale', quantityMr: '२०० ग्रॅम', quantityEn: '200 g' },
      { nameMr: 'पोहे चिवडा', nameEn: 'Pohe Chiwda', quantityMr: '२०० ग्रॅम', quantityEn: '200 g' },
    ],
  },
];
