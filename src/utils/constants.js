export const correctPhrases = [
  'Amazing!',
  'Great job!',
  'You did it!',
  'Wonderful!',
  'Fantastic!',
  "You're so smart!",
  'Perfect!',
  'Way to go!'
];

export const wrongPhrases = [
  'Good try!',
  'Almost!',
  'Keep trying!',
  'Not quite!',
  'Try again!',
  "You'll get it!"
];

export const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

export const getRandomPhrase = (array) => array[Math.floor(Math.random() * array.length)];

export const animals = [
  { id: 'cow', name: 'Cow', emoji: '🐮' },
  { id: 'dog', name: 'Dog', emoji: '🐶' },
  { id: 'cat', name: 'Cat', emoji: '🐱' },
  { id: 'sheep', name: 'Sheep', emoji: '🐑' },
  { id: 'duck', name: 'Duck', emoji: '🦆' },
  { id: 'horse', name: 'Horse', emoji: '🐴' },
  { id: 'pig', name: 'Pig', emoji: '🐷' },
  { id: 'chicken', name: 'Chicken', emoji: '🐔' },
  { id: 'goat', name: 'Goat', emoji: '🐐' },
  { id: 'rabbit', name: 'Rabbit', emoji: '🐇' },
  { id: 'frog', name: 'Frog', emoji: '🐸' },
  { id: 'turtle', name: 'Turtle', emoji: '🐢' },
  { id: 'monkey', name: 'Monkey', emoji: '🐒' },
  { id: 'elephant', name: 'Elephant', emoji: '🐘' },
  { id: 'lion', name: 'Lion', emoji: '🦁' },
  { id: 'zebra', name: 'Zebra', emoji: '🦓' },
  { id: 'giraffe', name: 'Giraffe', emoji: '🦒' },
  { id: 'panda', name: 'Panda', emoji: '🐼' },
  { id: 'bear', name: 'Bear', emoji: '🐻' },
  { id: 'penguin', name: 'Penguin', emoji: '🐧' }
];

export const shapes = [
  { id: 'circle', name: 'Circle', emoji: '●', color: '#F87171' },
  { id: 'square', name: 'Square', emoji: '■', color: '#60A5FA' },
  { id: 'triangle', name: 'Triangle', emoji: '▲', color: '#34D399' },
  { id: 'rectangle', name: 'Rectangle', emoji: '▬', color: '#FBBF24' },
  { id: 'star', name: 'Star', emoji: '★', color: '#A78BFA' },
  { id: 'heart', name: 'Heart', emoji: '♥', color: '#F472B6' },
  { id: 'oval', name: 'Oval', emoji: '⬭', color: '#818CF8' },
  { id: 'diamond', name: 'Diamond', emoji: '♦', color: '#FB923C' }
];

export const emotions = [
  { id: 'happy', name: 'Happy', label: 'happy', emoji: '😊' },
  { id: 'sad', name: 'Sad', label: 'sad', emoji: '😢' },
  { id: 'angry', name: 'Angry', label: 'angry', emoji: '😠' },
  { id: 'surprised', name: 'Surprised', label: 'surprised', emoji: '😲' },
  { id: 'scared', name: 'Scared', label: 'scared', emoji: '😨' },
  { id: 'silly', name: 'Silly', label: 'silly', emoji: '😜' },
  { id: 'excited', name: 'Excited', label: 'excited', emoji: '🤩' },
  { id: 'tired', name: 'Tired', label: 'tired', emoji: '😴' }
];

export const sportsEquipment = [
  { id: 'soccer', name: 'Soccer Ball', emoji: '⚽' },
  { id: 'basketball', name: 'Basketball', emoji: '🏀' },
  { id: 'football', name: 'Football', emoji: '🏈' },
  { id: 'baseball', name: 'Baseball', emoji: '⚾' },
  { id: 'tennis', name: 'Tennis Ball', emoji: '🎾' },
  { id: 'volleyball', name: 'Volleyball', emoji: '🏐' },
  { id: 'rugby', name: 'Rugby Ball', emoji: '🏉' },
  { id: 'bowling', name: 'Bowling Ball', emoji: '🎳' }
];

export const instruments = [
  { id: 'piano', name: 'Piano', emoji: '🎹' },
  { id: 'guitar', name: 'Guitar', emoji: '🎸' },
  { id: 'drums', name: 'Drums', emoji: '🥁' },
  { id: 'violin', name: 'Violin', emoji: '🎻' },
  { id: 'trumpet', name: 'Trumpet', emoji: '🎺' },
  { id: 'saxophone', name: 'Saxophone', emoji: '🎷' },
  { id: 'accordion', name: 'Accordion', emoji: '🪗' },
  { id: 'microphone', name: 'Microphone', emoji: '🎤' }
];

export const vehicles = [
  { id: 'car', name: 'Car', emoji: '🚗' },
  { id: 'bus', name: 'Bus', emoji: '🚌' },
  { id: 'train', name: 'Train', emoji: '🚂' },
  { id: 'airplane', name: 'Airplane', emoji: '✈️' },
  { id: 'boat', name: 'Boat', emoji: '⛵' },
  { id: 'bicycle', name: 'Bicycle', emoji: '🚲' },
  { id: 'truck', name: 'Truck', emoji: '🚚' },
  { id: 'helicopter', name: 'Helicopter', emoji: '🚁' }
];

export const landmarks = [
  { id: 'eiffel', name: 'Eiffel Tower', emoji: '🗼' },
  { id: 'pyramid', name: 'Pyramid', emoji: '🔺' },
  { id: 'statue', name: 'Statue of Liberty', emoji: '🗽' },
  { id: 'castle', name: 'Castle', emoji: '🏰' },
  { id: 'temple', name: 'Temple', emoji: '🏛️' },
  { id: 'mountain', name: 'Mountain', emoji: '⛰️' },
  { id: 'island', name: 'Island', emoji: '🏝️' },
  { id: 'ferris', name: 'Ferris Wheel', emoji: '🎡' }
];

export const countingObjects = [
  { emoji: '🍎', name: 'apples' },
  { emoji: '🍌', name: 'bananas' },
  { emoji: '🍓', name: 'strawberries' },
  { emoji: '🚗', name: 'cars' },
  { emoji: '⚽', name: 'soccer balls' },
  { emoji: '🎸', name: 'guitars' },
  { emoji: '🐶', name: 'dogs' },
  { emoji: '🦋', name: 'butterflies' },
  { emoji: '🌟', name: 'stars' },
  { emoji: '🎈', name: 'balloons' }
];

export const colorItems = [
  { id: 'red-apple', name: 'Apple', emoji: '🍎', color: 'Red' },
  { id: 'red-heart', name: 'Heart', emoji: '❤️', color: 'Red' },
  { id: 'red-ladybug', name: 'Ladybug', emoji: '🐞', color: 'Red' },
  { id: 'blue-whale', name: 'Whale', emoji: '🐳', color: 'Blue' },
  { id: 'blue-water', name: 'Water', emoji: '💧', color: 'Blue' },
  { id: 'blue-gem', name: 'Gem', emoji: '💎', color: 'Blue' },
  { id: 'green-frog', name: 'Frog', emoji: '🐸', color: 'Green' },
  { id: 'green-leaf', name: 'Leaf', emoji: '🌿', color: 'Green' },
  { id: 'green-tree', name: 'Tree', emoji: '🌲', color: 'Green' },
  { id: 'yellow-star', name: 'Star', emoji: '⭐', color: 'Yellow' },
  { id: 'yellow-banana', name: 'Banana', emoji: '🍌', color: 'Yellow' },
  { id: 'yellow-sun', name: 'Sun', emoji: '☀️', color: 'Yellow' },
  { id: 'orange-orange', name: 'Orange', emoji: '🍊', color: 'Orange' },
  { id: 'orange-carrot', name: 'Carrot', emoji: '🥕', color: 'Orange' },
  { id: 'orange-tiger', name: 'Tiger', emoji: '🐯', color: 'Orange' },
  { id: 'purple-grape', name: 'Grape', emoji: '🍇', color: 'Purple' },
  { id: 'purple-octopus', name: 'Octopus', emoji: '🐙', color: 'Purple' },
  { id: 'purple-heart', name: 'Heart', emoji: '💜', color: 'Purple' },
  { id: 'pink-flamingo', name: 'Flamingo', emoji: '🦩', color: 'Pink' },
  { id: 'pink-pig', name: 'Pig', emoji: '🐷', color: 'Pink' },
  { id: 'pink-ribbon', name: 'Ribbon', emoji: '🎀', color: 'Pink' },
  { id: 'brown-bear', name: 'Bear', emoji: '🐻', color: 'Brown' },
  { id: 'brown-cookie', name: 'Cookie', emoji: '🍪', color: 'Brown' },
  { id: 'brown-football', name: 'Football', emoji: '🏈', color: 'Brown' }
];

export const colorEmojis = {
  Red: '🔴',
  Blue: '🔵',
  Green: '🟢',
  Yellow: '🟡',
  Orange: '🟠',
  Purple: '🟣',
  Pink: '🩷',
  Brown: '🟤'
};

export const allColors = Object.keys(colorEmojis);

export const oddOneOutCategories = [
  { name: 'Animals', items: animals },
  { name: 'Vehicles', items: vehicles },
  { name: 'Instruments', items: instruments },
  { name: 'Sports', items: sportsEquipment },
  { name: 'Landmarks', items: landmarks }
];

export const gameSections = [
  {
    label: 'Learn',
    games: [
      { route: 'Animals', title: 'Animals', emoji: '🐶', colors: ['#34D399', '#10B981'] },
      { route: 'ShapeMatch', title: 'Shapes', emoji: '🔵', colors: ['#FBBF24', '#F97316'] },
      { route: 'ColorMatch', title: 'Colors', emoji: '🎨', colors: ['#F87171', '#FACC15'] },
      { route: 'EmotionGame', title: 'Emotions', emoji: '😊', colors: ['#A78BFA', '#6366F1'] },
      { route: 'SportsGame', title: 'Sports', emoji: '⚽', colors: ['#2DD4BF', '#06B6D4'] },
      { route: 'InstrumentsGame', title: 'Music', emoji: '🎸', colors: ['#F472B6', '#FB7185'] },
      { route: 'VehiclesGame', title: 'Vehicles', emoji: '🚗', colors: ['#60A5FA', '#38BDF8'] },
      { route: 'LandmarksGame', title: 'Landmarks', emoji: '🗼', colors: ['#FBBF24', '#FB923C'] }
    ]
  },
  {
    label: 'Play',
    games: [
      { route: 'Counting', title: 'Counting', emoji: '🔢', colors: ['#F87171', '#EC4899'] },
      { route: 'TapCount', title: 'Tap Count', emoji: '👉', colors: ['#A3E635', '#22C55E'] },
      { route: 'MemoryGame', title: 'Memory', emoji: '🧠', colors: ['#A78BFA', '#8B5CF6'] },
      { route: 'OddOneOut', title: 'Odd One Out', emoji: '🤔', colors: ['#22D3EE', '#3B82F6'] }
    ]
  }
];

export const stickerMilestones = [
  {
    id: 'first-correct',
    emoji: '⭐',
    name: 'First Star',
    desc: 'First correct answer',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 1
  },
  {
    id: 'first-five',
    emoji: '🌟',
    name: 'Bright Start',
    desc: '5 correct answers',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 5
  },
  {
    id: 'score-10',
    emoji: '🎉',
    name: 'Party Time',
    desc: '10 correct answers',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 10
  },
  {
    id: 'streak-5',
    emoji: '🔥',
    name: 'On Fire',
    desc: '5 correct in a row',
    check: (stats) => Object.values(stats).some((entry) => (entry.streak || 0) >= 5)
  },
  {
    id: 'streak-10',
    emoji: '🚀',
    name: 'Rocket Run',
    desc: '10 correct in a row',
    check: (stats) => Object.values(stats).some((entry) => (entry.streak || 0) >= 10)
  },
  {
    id: 'explorer',
    emoji: '🗺️',
    name: 'Explorer',
    desc: 'Played 3 different games',
    check: (stats) => Object.values(stats).filter((entry) => entry.attempts > 0).length >= 3
  },
  {
    id: 'big-explorer',
    emoji: '🧭',
    name: 'Adventure Guide',
    desc: 'Played 6 different games',
    check: (stats) => Object.values(stats).filter((entry) => entry.attempts > 0).length >= 6
  },
  {
    id: 'super-explorer',
    emoji: '🌍',
    name: 'World Wanderer',
    desc: 'Played 10 different games',
    check: (stats) => Object.values(stats).filter((entry) => entry.attempts > 0).length >= 10
  },
  {
    id: 'score-25',
    emoji: '🏆',
    name: 'Champion',
    desc: '25 correct answers',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 25
  },
  {
    id: 'score-50',
    emoji: '👑',
    name: 'Shining Crown',
    desc: '50 correct answers',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 50
  },
  {
    id: 'busy-player',
    emoji: '🎈',
    name: 'Busy Player',
    desc: '20 total attempts',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.attempts || 0), 0) >= 20
  },
  {
    id: 'super-player',
    emoji: '🎊',
    name: 'Super Player',
    desc: '50 total attempts',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.attempts || 0), 0) >= 50
  },
  {
    id: 'counter',
    emoji: '🔢',
    name: 'Counter',
    desc: '10 correct counting answers',
    check: (stats) => ((stats.counting?.correct || 0) + (stats['tap-count']?.correct || 0)) >= 10
  },
  {
    id: 'number-hero',
    emoji: '🧮',
    name: 'Number Hero',
    desc: '25 correct counting answers',
    check: (stats) => ((stats.counting?.correct || 0) + (stats['tap-count']?.correct || 0)) >= 25
  },
  {
    id: 'animal-buddy',
    emoji: '🐾',
    name: 'Animal Buddy',
    desc: '10 correct animal answers',
    check: (stats) => (stats['animal-game']?.correct || 0) >= 10
  },
  {
    id: 'shape-builder',
    emoji: '🔷',
    name: 'Shape Builder',
    desc: '10 correct shape answers',
    check: (stats) => (stats['shape-match']?.correct || 0) >= 10
  },
  {
    id: 'color-rainbow',
    emoji: '🌈',
    name: 'Rainbow Finder',
    desc: '10 correct color answers',
    check: (stats) => (stats['color-match']?.correct || 0) >= 10
  },
  {
    id: 'feeling-friend',
    emoji: '😊',
    name: 'Feeling Friend',
    desc: '10 correct emotion answers',
    check: (stats) => (stats['emotion-game']?.correct || 0) >= 10
  },
  {
    id: 'sports-star',
    emoji: '⚽',
    name: 'Sports Star',
    desc: '10 correct sports answers',
    check: (stats) => (stats['sports-game']?.correct || 0) >= 10
  },
  {
    id: 'music-maker',
    emoji: '🎵',
    name: 'Music Maker',
    desc: '10 correct music answers',
    check: (stats) => (stats['instruments-game']?.correct || 0) >= 10
  },
  {
    id: 'road-runner',
    emoji: '🚌',
    name: 'Road Runner',
    desc: '10 correct vehicle answers',
    check: (stats) => (stats['vehicles-game']?.correct || 0) >= 10
  },
  {
    id: 'memory-pal',
    emoji: '🧠',
    name: 'Memory Pal',
    desc: '5 memory game wins',
    check: (stats) => (stats['memory-game']?.correct || 0) >= 5
  },
  {
    id: 'sharp-eyes',
    emoji: '🕵️',
    name: 'Sharp Eyes',
    desc: '10 odd one out wins',
    check: (stats) => (stats['odd-one-out']?.correct || 0) >= 10
  },
  {
    id: 'landmark-lover',
    emoji: '🏰',
    name: 'Landmark Lover',
    desc: '10 correct landmark answers',
    check: (stats) => (stats['landmarks-game']?.correct || 0) >= 10
  }
];
