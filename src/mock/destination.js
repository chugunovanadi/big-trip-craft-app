import { getRandomValue } from '../utils.js';

const COUNT_DESTINATION = 15;
const namesDestination = ['Tokyo', 'Osaka', 'Kyoto', 'Nara'];
const descriptionsDestination = ['It blends ultra-modern skyscrapers with historic temples and traditional districts',
  'A major economic center in the Kansai region and an important port city',
  'Famous for traditional architecture, geishas, and tea ceremonies',
  'An ancient capital of Japan, renowned for its historic temples, friendly deer in Nara Park, and the Great Buddha at Todai-ji Temple'
];
const picturesSrc = ['img/photos/1.jpg', 'img/photos/2.jpg', 'img/photos/3.jpg', 'img/photos/4.jpg'];
const picturesDescriptions = ['ultra-modern skyscrapers with historic temples', 'important port city', 'traditional architecture', 'friendly deer in Nara Park'];

const generateDestination = () => ({
  description: getRandomValue(descriptionsDestination),
  name: getRandomValue(namesDestination),
  pictures: [
    {
      src: getRandomValue(picturesSrc),
      descriptionPicture: getRandomValue(picturesDescriptions)
    },
    {
      src: getRandomValue(picturesSrc),
      descriptionPicture: getRandomValue(picturesDescriptions)
    },
    {
      src: getRandomValue(picturesSrc),
      descriptionPicture: getRandomValue(picturesDescriptions)
    },
  ]
});

const generateDestinations = () => Array.from({length: COUNT_DESTINATION}, generateDestination);

export{generateDestinations};

