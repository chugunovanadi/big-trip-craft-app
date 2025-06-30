const destinations = [
  {
    name: 'Tokyo',
    description: 'Tokyo blends ultra-modern skyscrapers with historic temples and traditional districts.',
    pictures: [
      { src: 'img/photos/1.jpg', descriptionPicture: 'Modern cityscape of Tokyo' },
      { src: 'img/photos/2.jpg', descriptionPicture: 'Historic temple in Tokyo' },
      { src: 'img/photos/3.jpg', descriptionPicture: 'Traditional district in Tokyo' }
    ]
  },
  {
    name: 'Osaka',
    description: 'Osaka is a major economic center in the Kansai region and an important port city.',
    pictures: [
      { src: 'img/photos/2.jpg', descriptionPicture: 'Osaka port area' },
      { src: 'img/photos/3.jpg', descriptionPicture: 'Economic center of Osaka' },
      { src: 'img/photos/4.jpg', descriptionPicture: 'Skyscrapers in Osaka' }
    ]
  },
  {
    name: 'Kyoto',
    description: 'Kyoto is famous for its traditional architecture, geishas, and tea ceremonies.',
    pictures: [
      { src: 'img/photos/3.jpg', descriptionPicture: 'Traditional Kyoto street' },
      { src: 'img/photos/4.jpg', descriptionPicture: 'Geisha district in Kyoto' },
      { src: 'img/photos/1.jpg', descriptionPicture: 'Tea house in Kyoto' }
    ]
  },
  {
    name: 'Nara',
    description: 'Nara is an ancient capital of Japan, renowned for its historic temples, friendly deer, and the Great Buddha at Todai-ji Temple.',
    pictures: [
      { src: 'img/photos/4.jpg', descriptionPicture: 'Great Buddha of Nara' },
      { src: 'img/photos/2.jpg', descriptionPicture: 'Deer in Nara Park' },
      { src: 'img/photos/1.jpg', descriptionPicture: 'Historic temple in Nara' }
    ]
  },
  {
    name: 'Nagasaki',
    description: '',
    pictures: []
  },
];

const generateDestinations = () => destinations;

export{generateDestinations};

