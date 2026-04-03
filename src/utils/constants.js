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
  { id: 'cow', name: 'Cow', emoji: '\u{1F42E}' },
  { id: 'dog', name: 'Dog', emoji: '\u{1F436}' },
  { id: 'cat', name: 'Cat', emoji: '\u{1F431}' },
  { id: 'sheep', name: 'Sheep', emoji: '\u{1F411}' },
  { id: 'duck', name: 'Duck', emoji: '\u{1F986}' },
  { id: 'horse', name: 'Horse', emoji: '\u{1F434}' },
  { id: 'pig', name: 'Pig', emoji: '\u{1F437}' },
  { id: 'chicken', name: 'Chicken', emoji: '\u{1F414}' },
  { id: 'goat', name: 'Goat', emoji: '\u{1F410}' },
  { id: 'rabbit', name: 'Rabbit', emoji: '\u{1F407}' },
  { id: 'frog', name: 'Frog', emoji: '\u{1F438}' },
  { id: 'turtle', name: 'Turtle', emoji: '\u{1F422}' },
  { id: 'monkey', name: 'Monkey', emoji: '\u{1F412}' },
  { id: 'elephant', name: 'Elephant', emoji: '\u{1F418}' },
  { id: 'lion', name: 'Lion', emoji: '\u{1F981}' },
  { id: 'zebra', name: 'Zebra', emoji: '\u{1F993}' },
  { id: 'giraffe', name: 'Giraffe', emoji: '\u{1F992}' },
  { id: 'panda', name: 'Panda', emoji: '\u{1F43C}' },
  { id: 'bear', name: 'Bear', emoji: '\u{1F43B}' },
  { id: 'penguin', name: 'Penguin', emoji: '\u{1F427}' }
];

export const shapes = [
  { id: 'circle', name: 'Circle', emoji: '\u25CF', color: '#F87171' },
  { id: 'square', name: 'Square', emoji: '\u25A0', color: '#60A5FA' },
  { id: 'triangle', name: 'Triangle', emoji: '\u25B2', color: '#34D399' },
  { id: 'rectangle', name: 'Rectangle', emoji: '\u25AC', color: '#FBBF24' },
  { id: 'star', name: 'Star', emoji: '\u2605', color: '#A78BFA' },
  { id: 'heart', name: 'Heart', emoji: '\u2665', color: '#F472B6' },
  { id: 'oval', name: 'Oval', emoji: '\u2B2D', color: '#818CF8' },
  { id: 'diamond', name: 'Diamond', emoji: '\u2666', color: '#FB923C' }
];

export const emotions = [
  { id: 'happy', name: 'Happy', label: 'happy', emoji: '\u{1F60A}' },
  { id: 'sad', name: 'Sad', label: 'sad', emoji: '\u{1F622}' },
  { id: 'angry', name: 'Angry', label: 'angry', emoji: '\u{1F620}' },
  { id: 'surprised', name: 'Surprised', label: 'surprised', emoji: '\u{1F632}' },
  { id: 'scared', name: 'Scared', label: 'scared', emoji: '\u{1F628}' },
  { id: 'silly', name: 'Silly', label: 'silly', emoji: '\u{1F61C}' },
  { id: 'excited', name: 'Excited', label: 'excited', emoji: '\u{1F929}' },
  { id: 'tired', name: 'Tired', label: 'tired', emoji: '\u{1F634}' }
];

export const sportsEquipment = [
  { id: 'soccer', name: 'Soccer Ball', emoji: '\u26BD' },
  { id: 'basketball', name: 'Basketball', emoji: '\u{1F3C0}' },
  { id: 'football', name: 'Football', emoji: '\u{1F3C8}' },
  { id: 'baseball', name: 'Baseball', emoji: '\u26BE' },
  { id: 'tennis', name: 'Tennis Ball', emoji: '\u{1F3BE}' },
  { id: 'volleyball', name: 'Volleyball', emoji: '\u{1F3D0}' },
  { id: 'rugby', name: 'Rugby Ball', emoji: '\u{1F3C9}' },
  { id: 'bowling', name: 'Bowling Ball', emoji: '\u{1F3B3}' }
];

export const instruments = [
  { id: 'piano', name: 'Piano', emoji: '\u{1F3B9}' },
  { id: 'guitar', name: 'Guitar', emoji: '\u{1F3B8}' },
  { id: 'drums', name: 'Drums', emoji: '\u{1F941}' },
  { id: 'violin', name: 'Violin', emoji: '\u{1F3BB}' },
  { id: 'trumpet', name: 'Trumpet', emoji: '\u{1F3BA}' },
  { id: 'saxophone', name: 'Saxophone', emoji: '\u{1F3B7}' },
  { id: 'accordion', name: 'Accordion', emoji: '\u{1FA97}' },
  { id: 'microphone', name: 'Microphone', emoji: '\u{1F3A4}' }
];

export const vehicles = [
  { id: 'car', name: 'Car', emoji: '\u{1F697}' },
  { id: 'bus', name: 'Bus', emoji: '\u{1F68C}' },
  { id: 'train', name: 'Train', emoji: '\u{1F682}' },
  { id: 'airplane', name: 'Airplane', emoji: '\u2708\uFE0F' },
  { id: 'boat', name: 'Boat', emoji: '\u26F5' },
  { id: 'bicycle', name: 'Bicycle', emoji: '\u{1F6B2}' },
  { id: 'truck', name: 'Truck', emoji: '\u{1F69A}' },
  { id: 'helicopter', name: 'Helicopter', emoji: '\u{1F681}' }
];

export const landmarks = [
  { id: 'eiffel', name: 'Eiffel Tower', emoji: '\u{1F5FC}' },
  { id: 'pyramid', name: 'Pyramid', emoji: '\u{1F53A}' },
  { id: 'statue', name: 'Statue of Liberty', emoji: '\u{1F5FD}' },
  { id: 'castle', name: 'Castle', emoji: '\u{1F3F0}' },
  { id: 'temple', name: 'Temple', emoji: '\u{1F3DB}\uFE0F' },
  { id: 'mountain', name: 'Mountain', emoji: '\u26F0\uFE0F' },
  { id: 'island', name: 'Island', emoji: '\u{1F3DD}\uFE0F' },
  { id: 'ferris', name: 'Ferris Wheel', emoji: '\u{1F3A1}' }
];

export const countingObjects = [
  { emoji: '\u{1F34E}', name: 'apples' },
  { emoji: '\u{1F34C}', name: 'bananas' },
  { emoji: '\u{1F353}', name: 'strawberries' },
  { emoji: '\u{1F697}', name: 'cars' },
  { emoji: '\u26BD', name: 'soccer balls' },
  { emoji: '\u{1F3B8}', name: 'guitars' },
  { emoji: '\u{1F436}', name: 'dogs' },
  { emoji: '\u{1F98B}', name: 'butterflies' },
  { emoji: '\u{1F31F}', name: 'stars' },
  { emoji: '\u{1F388}', name: 'balloons' }
];

export const colorItems = [
  { id: 'red-apple', name: 'Apple', emoji: '\u{1F34E}', color: 'Red' },
  { id: 'red-heart', name: 'Heart', emoji: '\u2764\uFE0F', color: 'Red' },
  { id: 'red-ladybug', name: 'Ladybug', emoji: '\u{1F41E}', color: 'Red' },
  { id: 'blue-whale', name: 'Whale', emoji: '\u{1F433}', color: 'Blue' },
  { id: 'blue-water', name: 'Water', emoji: '\u{1F4A7}', color: 'Blue' },
  { id: 'blue-gem', name: 'Gem', emoji: '\u{1F48E}', color: 'Blue' },
  { id: 'green-frog', name: 'Frog', emoji: '\u{1F438}', color: 'Green' },
  { id: 'green-leaf', name: 'Leaf', emoji: '\u{1F33F}', color: 'Green' },
  { id: 'green-tree', name: 'Tree', emoji: '\u{1F332}', color: 'Green' },
  { id: 'yellow-star', name: 'Star', emoji: '\u2B50', color: 'Yellow' },
  { id: 'yellow-banana', name: 'Banana', emoji: '\u{1F34C}', color: 'Yellow' },
  { id: 'yellow-sun', name: 'Sun', emoji: '\u2600\uFE0F', color: 'Yellow' },
  { id: 'orange-orange', name: 'Orange', emoji: '\u{1F34A}', color: 'Orange' },
  { id: 'orange-carrot', name: 'Carrot', emoji: '\u{1F955}', color: 'Orange' },
  { id: 'orange-tiger', name: 'Tiger', emoji: '\u{1F42F}', color: 'Orange' },
  { id: 'purple-grape', name: 'Grape', emoji: '\u{1F347}', color: 'Purple' },
  { id: 'purple-octopus', name: 'Octopus', emoji: '\u{1F419}', color: 'Purple' },
  { id: 'purple-heart', name: 'Heart', emoji: '\u{1F49C}', color: 'Purple' },
  { id: 'pink-flamingo', name: 'Flamingo', emoji: '\u{1F9A9}', color: 'Pink' },
  { id: 'pink-pig', name: 'Pig', emoji: '\u{1F437}', color: 'Pink' },
  { id: 'pink-ribbon', name: 'Ribbon', emoji: '\u{1F380}', color: 'Pink' },
  { id: 'brown-bear', name: 'Bear', emoji: '\u{1F43B}', color: 'Brown' },
  { id: 'brown-cookie', name: 'Cookie', emoji: '\u{1F36A}', color: 'Brown' },
  { id: 'brown-football', name: 'Football', emoji: '\u{1F3C8}', color: 'Brown' }
];

export const colorEmojis = {
  Red: '\u{1F534}',
  Blue: '\u{1F535}',
  Green: '\u{1F7E2}',
  Yellow: '\u{1F7E1}',
  Orange: '\u{1F7E0}',
  Purple: '\u{1F7E3}',
  Pink: '\u{1FA77}',
  Brown: '\u{1F7E4}'
};

export const allColors = Object.keys(colorEmojis);

export const patternThemes = [
  {
    id: 'garden',
    name: 'Garden',
    items: [
      { id: 'flower', name: 'Flower', emoji: '\u{1F33C}', colors: ['#F9A8D4', '#F472B6'] },
      { id: 'leaf', name: 'Leaf', emoji: '\u{1F343}', colors: ['#86EFAC', '#22C55E'] },
      { id: 'sun', name: 'Sun', emoji: '\u2600\uFE0F', colors: ['#FDE68A', '#F59E0B'] }
    ]
  },
  {
    id: 'snack',
    name: 'Snack',
    items: [
      { id: 'apple', name: 'Apple', emoji: '\u{1F34E}', colors: ['#FCA5A5', '#EF4444'] },
      { id: 'banana', name: 'Banana', emoji: '\u{1F34C}', colors: ['#FDE68A', '#FACC15'] },
      { id: 'grape', name: 'Grape', emoji: '\u{1F347}', colors: ['#C4B5FD', '#8B5CF6'] }
    ]
  },
  {
    id: 'toy-box',
    name: 'Toy Box',
    items: [
      { id: 'ball', name: 'Ball', emoji: '\u26BD', colors: ['#93C5FD', '#3B82F6'] },
      { id: 'teddy', name: 'Teddy', emoji: '\u{1F9F8}', colors: ['#F5D0A9', '#C08457'] },
      { id: 'block', name: 'Block', emoji: '\u{1F9F1}', colors: ['#FDBA74', '#F97316'] }
    ]
  }
];

export const shadowMatchThemes = [
  {
    id: 'road-icons',
    name: 'Road Icons',
    items: [
      { id: 'car', name: 'Car', icon: 'car', color: '#2563EB' },
      { id: 'bus', name: 'Bus', icon: 'bus', color: '#EA580C' },
      { id: 'truck', name: 'Truck', icon: 'truck', color: '#16A34A' },
      { id: 'bike', name: 'Bike', icon: 'bike', color: '#9333EA' }
    ]
  },
  {
    id: 'shape-icons',
    name: 'Shape Icons',
    items: [
      { id: 'circle', name: 'Circle', icon: 'circle', color: '#2563EB' },
      { id: 'square', name: 'Square', icon: 'square', color: '#EA580C' },
      { id: 'triangle', name: 'Triangle', icon: 'triangle', color: '#16A34A' },
      { id: 'heart', name: 'Heart', icon: 'heart', color: '#DB2777' }
    ]
  },
  {
    id: 'sky-icons',
    name: 'Sky Icons',
    items: [
      { id: 'star', name: 'Star', icon: 'star', color: '#EAB308' },
      { id: 'moon', name: 'Moon', icon: 'moon-waning-crescent', color: '#475569' },
      { id: 'cloud', name: 'Cloud', icon: 'cloud', color: '#0EA5E9' },
      { id: 'weather-windy', name: 'Wind', icon: 'weather-windy', color: '#14B8A6' }
    ]
  }
];

export const letterSets = [
  ['A', 'B', 'C', 'D', 'E', 'F'],
  ['G', 'H', 'I', 'J', 'K', 'L'],
  ['M', 'N', 'O', 'P', 'R', 'S'],
  ['T', 'U', 'V', 'W', 'Y', 'Z']
];

export const pathThemes = [
  {
    id: 'garden',
    name: 'Garden',
    traveler: '\u{1F41D}',
    goal: '\u{1F33C}',
    boardGradient: ['#FFFDF4', '#ECFCCB'],
    groundColor: '#D9F99D',
    groundAccent: '#BEF264',
    pathColor: '#FDE68A',
    trailColor: '#F59E0B',
    branchColor: '#FEF3C7',
    travelerColor: '#92400E',
    goalColor: '#DB2777'
  },
  {
    id: 'space',
    name: 'Space',
    traveler: '\u{1F680}',
    goal: '\u2B50',
    boardGradient: ['#0F172A', '#1E293B'],
    groundColor: '#1E293B',
    groundAccent: '#334155',
    pathColor: '#BFDBFE',
    trailColor: '#38BDF8',
    branchColor: '#CBD5E1',
    travelerColor: '#FFFFFF',
    goalColor: '#FACC15'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    traveler: '\u{1F42C}',
    goal: '\u{1F3C1}',
    boardGradient: ['#ECFEFF', '#CFFAFE'],
    groundColor: '#A5F3FC',
    groundAccent: '#67E8F9',
    pathColor: '#FFFFFF',
    trailColor: '#06B6D4',
    branchColor: '#E0F2FE',
    travelerColor: '#155E75',
    goalColor: '#EA580C'
  }
];

export const skillAreas = [
  {
    id: 'baby-co-play',
    title: 'Baby Co-Play',
    icon: '\u{1F476}',
    description: 'Gentle parent-and-baby activities for peekaboo, waving, clapping, and first play routines.',
    colors: ['#FCE7F3', '#FFF1F2']
  },
  {
    id: 'letters-reading',
    title: 'Letters & Reading',
    icon: 'ABC',
    description: 'Learn letters, sounds, and matching.',
    colors: ['#DBEAFE', '#EFF6FF']
  },
  {
    id: 'numbers-counting',
    title: 'Numbers & Counting',
    icon: '123',
    description: 'Count objects and build early number sense.',
    colors: ['#FDE68A', '#FEF3C7']
  },
  {
    id: 'thinking-patterns',
    title: 'Thinking & Patterns',
    icon: '\u{1F9E9}',
    description: 'Spot repeats, follow paths, and solve simple logic play.',
    colors: ['#FBCFE8', '#FFF1F2']
  },
  {
    id: 'memory-focus',
    title: 'Memory & Focus',
    icon: '\u{1F9E0}',
    description: 'Practice remembering, noticing, and staying with a challenge.',
    colors: ['#DDD6FE', '#EEF2FF']
  },
  {
    id: 'world-around-me',
    title: 'World Around Me',
    icon: '\u{1F30D}',
    description: 'Name colors, shapes, animals, feelings, and familiar things.',
    colors: ['#BBF7D0', '#ECFDF5']
  }
];

export const childStages = [
  {
    id: 'baby-co-play',
    title: 'Baby Co-Play',
    ageLabel: 'Birth to 12 months',
    description: 'Best for parent-led peekaboo, waving, clapping, and simple cause-and-effect play.',
    featuredSkills: ['baby-co-play'],
    featuredGames: ['BabyPeekaboo', 'BabyPatACake', 'BabyFindToy']
  },
  {
    id: 'early-learner',
    title: 'Early Learner',
    ageLabel: 'About ages 1 to 2',
    description: 'Great for first taps, first words, and simple picture play.',
    featuredSkills: ['world-around-me', 'numbers-counting'],
    featuredGames: ['Animals', 'CountAndPack', 'ColorMatch']
  },
  {
    id: 'growing-learner',
    title: 'Growing Learner',
    ageLabel: 'About ages 2 to 3',
    description: 'Great for matching, counting, and short challenge games.',
    featuredSkills: ['world-around-me', 'numbers-counting', 'memory-focus'],
    featuredGames: ['ShapeSortYard', 'FlatOrSolid', 'CountAndPack']
  },
  {
    id: 'ready-kindergarten',
    title: 'Ready for Kindergarten',
    ageLabel: 'About ages 4 to 5',
    description: 'Great for letters, patterns, memory, and bigger thinking games.',
    featuredSkills: ['letters-reading', 'thinking-patterns', 'memory-focus', 'numbers-counting'],
    featuredGames: ['BeginningSounds', 'WordFamilies', 'ComposeAndDecompose', 'StorySequence']
  }
];

export const gameCatalog = [
  {
    id: 'baby-peekaboo',
    route: 'BabyPeekaboo',
    title: 'Peekaboo',
    icon: '\u{1F648}',
    colors: ['#F9A8D4', '#F472B6'],
    skillArea: 'baby-co-play',
    recommendedStages: ['baby-co-play'],
    minAgeLabel: '0',
    maxAgeLabel: '1',
    learningGoal: 'Practice peekaboo and turn-taking with a parent beside your baby.',
    difficultyLevel: 'co-play',
    recommendedOrder: 10,
    isCoreGame: true
  },
  {
    id: 'baby-pat-a-cake',
    route: 'BabyPatACake',
    title: 'Pat-a-Cake',
    icon: '\u{1F44F}',
    colors: ['#FDBA74', '#FB7185'],
    skillArea: 'baby-co-play',
    recommendedStages: ['baby-co-play'],
    minAgeLabel: '0',
    maxAgeLabel: '1',
    learningGoal: 'Clap along with a parent and practice simple play routines together.',
    difficultyLevel: 'co-play',
    recommendedOrder: 20,
    isCoreGame: true
  },
  {
    id: 'baby-bye-bye',
    route: 'BabyByeBye',
    title: 'Wave Bye-Bye',
    icon: '\u{1F44B}',
    colors: ['#93C5FD', '#60A5FA'],
    skillArea: 'baby-co-play',
    recommendedStages: ['baby-co-play'],
    minAgeLabel: '0',
    maxAgeLabel: '1',
    learningGoal: 'Practice waving and simple social routines with familiar words.',
    difficultyLevel: 'co-play',
    recommendedOrder: 30,
    isCoreGame: true
  },
  {
    id: 'baby-find-toy',
    route: 'BabyFindToy',
    title: 'Find the Toy',
    icon: '\u{1F9F8}',
    colors: ['#A7F3D0', '#34D399'],
    skillArea: 'baby-co-play',
    recommendedStages: ['baby-co-play'],
    minAgeLabel: '0',
    maxAgeLabel: '1',
    learningGoal: 'Practice looking for an object after it is hidden.',
    difficultyLevel: 'co-play',
    recommendedOrder: 40,
    isCoreGame: true
  },
  {
    id: 'baby-put-in-take-out',
    route: 'BabyPutInTakeOut',
    title: 'Put In, Take Out',
    icon: '\u{1F9FA}',
    colors: ['#FDE68A', '#F59E0B'],
    skillArea: 'baby-co-play',
    recommendedStages: ['baby-co-play'],
    minAgeLabel: '0',
    maxAgeLabel: '1',
    learningGoal: 'Practice putting toys into a basket and taking them back out with a parent.',
    difficultyLevel: 'co-play',
    recommendedOrder: 50,
    isCoreGame: true
  },
  {
    id: 'baby-mirror-play',
    route: 'BabyMirrorPlay',
    title: 'Mirror Play',
    icon: '\u{1FA9E}',
    colors: ['#C4B5FD', '#8B5CF6'],
    skillArea: 'baby-co-play',
    recommendedStages: ['baby-co-play'],
    minAgeLabel: '0',
    maxAgeLabel: '1',
    learningGoal: 'Explore faces, smiles, and simple expressions together like mirror play.',
    difficultyLevel: 'co-play',
    recommendedOrder: 60,
    isCoreGame: true
  },
  {
    id: 'animal-game',
    route: 'Animals',
    title: 'Animals',
    icon: '\u{1F436}',
    colors: ['#34D399', '#10B981'],
    skillArea: 'world-around-me',
    recommendedStages: ['early-learner', 'growing-learner'],
    minAgeLabel: '1',
    maxAgeLabel: '3',
    learningGoal: 'Name familiar animals and match the correct picture.',
    difficultyLevel: 'starter',
    recommendedOrder: 10,
    isCoreGame: true
  },
  {
    id: 'shape-match',
    route: 'ShapeMatch',
    title: 'Shapes',
    icon: '\u{1F535}',
    colors: ['#FBBF24', '#F97316'],
    skillArea: 'world-around-me',
    recommendedStages: ['early-learner', 'growing-learner'],
    minAgeLabel: '1',
    maxAgeLabel: '3',
    learningGoal: 'Recognize and name common shapes.',
    difficultyLevel: 'starter',
    recommendedOrder: 20,
    isCoreGame: true
  },
  {
    id: 'shape-sort-yard',
    route: 'ShapeSortYard',
    title: 'Shape Sort Yard',
    icon: '\u{1F539}',
    colors: ['#C4B5FD', '#8B5CF6'],
    skillArea: 'world-around-me',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '2',
    maxAgeLabel: '5',
    learningGoal: 'Sort shapes by what they look like, like round or cornered.',
    difficultyLevel: 'growing',
    recommendedOrder: 25,
    isCoreGame: true
  },
  {
    id: 'flat-or-solid',
    route: 'FlatOrSolid',
    title: 'Flat or Solid?',
    icon: '\u25A3',
    colors: ['#93C5FD', '#3B82F6'],
    skillArea: 'world-around-me',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '3',
    maxAgeLabel: '5',
    learningGoal: 'Sort everyday objects by whether they are flat shapes or solid shapes.',
    difficultyLevel: 'growing',
    recommendedOrder: 28,
    isCoreGame: true
  },
  {
    id: 'color-match',
    route: 'ColorMatch',
    title: 'Colors',
    icon: '\u{1F3A8}',
    colors: ['#F87171', '#FACC15'],
    skillArea: 'world-around-me',
    recommendedStages: ['early-learner', 'growing-learner'],
    minAgeLabel: '1',
    maxAgeLabel: '3',
    learningGoal: 'Match colors to familiar pictures.',
    difficultyLevel: 'starter',
    recommendedOrder: 30,
    isCoreGame: true
  },
  {
    id: 'emotion-game',
    route: 'EmotionGame',
    title: 'Emotions',
    icon: '\u{1F60A}',
    colors: ['#A78BFA', '#6366F1'],
    skillArea: 'world-around-me',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '2',
    maxAgeLabel: '5',
    learningGoal: 'Identify feelings from expressions.',
    difficultyLevel: 'growing',
    recommendedOrder: 40,
    isCoreGame: true
  },
  {
    id: 'sports-game',
    route: 'SportsGame',
    title: 'Sports',
    icon: '\u26BD',
    colors: ['#2DD4BF', '#06B6D4'],
    skillArea: 'world-around-me',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '2',
    maxAgeLabel: '5',
    learningGoal: 'Match sports equipment and everyday objects.',
    difficultyLevel: 'growing',
    recommendedOrder: 50,
    isCoreGame: false
  },
  {
    id: 'instruments-game',
    route: 'InstrumentsGame',
    title: 'Music',
    icon: '\u{1F3B8}',
    colors: ['#F472B6', '#FB7185'],
    skillArea: 'world-around-me',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '2',
    maxAgeLabel: '5',
    learningGoal: 'Recognize instruments and music objects.',
    difficultyLevel: 'growing',
    recommendedOrder: 60,
    isCoreGame: false
  },
  {
    id: 'vehicles-game',
    route: 'VehiclesGame',
    title: 'Vehicles',
    icon: '\u{1F697}',
    colors: ['#60A5FA', '#38BDF8'],
    skillArea: 'world-around-me',
    recommendedStages: ['early-learner', 'growing-learner'],
    minAgeLabel: '1',
    maxAgeLabel: '4',
    learningGoal: 'Name common vehicles and transportation objects.',
    difficultyLevel: 'starter',
    recommendedOrder: 70,
    isCoreGame: true
  },
  {
    id: 'landmarks-game',
    route: 'LandmarksGame',
    title: 'Landmarks',
    icon: '\u{1F5FC}',
    colors: ['#FBBF24', '#FB923C'],
    skillArea: 'world-around-me',
    recommendedStages: ['ready-kindergarten'],
    minAgeLabel: '4',
    maxAgeLabel: '5',
    learningGoal: 'Recognize famous places and world icons.',
    difficultyLevel: 'advanced',
    recommendedOrder: 80,
    isCoreGame: false
  },
  {
    id: 'letter-hunt',
    route: 'LetterHunt',
    title: 'Letter Garden',
    icon: 'A',
    colors: ['#60A5FA', '#2563EB'],
    skillArea: 'letters-reading',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '2',
    maxAgeLabel: '5',
    learningGoal: 'Find matching letters and notice upper- and lowercase forms.',
    difficultyLevel: 'growing',
    recommendedOrder: 10,
    isCoreGame: true
  },
  {
    id: 'rhyme-time',
    route: 'RhymeTime',
    title: 'Rhyme Time',
    icon: '\u{1F3B6}',
    colors: ['#F9A8D4', '#EC4899'],
    skillArea: 'letters-reading',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '3',
    maxAgeLabel: '5',
    learningGoal: 'Listen for words that sound alike and build early rhyming skills.',
    difficultyLevel: 'growing',
    recommendedOrder: 20,
    isCoreGame: true
  },
  {
    id: 'word-families',
    route: 'WordFamilies',
    title: 'Word Families',
    icon: '\u{1F4D6}',
    colors: ['#F59E0B', '#F97316'],
    skillArea: 'letters-reading',
    recommendedStages: ['ready-kindergarten'],
    minAgeLabel: '4',
    maxAgeLabel: '5',
    learningGoal: 'Match simple words that share the same ending sound.',
    difficultyLevel: 'advanced',
    recommendedOrder: 40,
    isCoreGame: true
  },
  {
    id: 'beginning-sounds',
    route: 'BeginningSounds',
    title: 'Beginning Sounds',
    icon: '\u{1F50A}',
    colors: ['#A78BFA', '#6366F1'],
    skillArea: 'letters-reading',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '3',
    maxAgeLabel: '5',
    learningGoal: 'Match pictures to the sound they start with.',
    difficultyLevel: 'growing',
    recommendedOrder: 30,
    isCoreGame: true
  },
  {
    id: 'counting',
    route: 'Counting',
    title: 'Counting',
    icon: '\u{1F522}',
    colors: ['#F87171', '#EC4899'],
    skillArea: 'numbers-counting',
    recommendedStages: ['early-learner', 'growing-learner'],
    minAgeLabel: '1',
    maxAgeLabel: '4',
    learningGoal: 'Count objects and connect sets to totals.',
    difficultyLevel: 'starter',
    recommendedOrder: 10,
    isCoreGame: true
  },
  {
    id: 'count-and-pack',
    route: 'CountAndPack',
    title: 'Count & Pack',
    icon: '\u{1F9FA}',
    colors: ['#FB7185', '#F97316'],
    skillArea: 'numbers-counting',
    recommendedStages: ['early-learner', 'growing-learner'],
    minAgeLabel: '1',
    maxAgeLabel: '4',
    learningGoal: 'Count out the right number of items and pack them into the basket.',
    difficultyLevel: 'starter',
    recommendedOrder: 15,
    isCoreGame: true
  },
  {
    id: 'tap-count',
    route: 'TapCount',
    title: 'Tap Count',
    icon: '\u{1F449}',
    colors: ['#A3E635', '#22C55E'],
    skillArea: 'numbers-counting',
    recommendedStages: ['early-learner', 'growing-learner'],
    minAgeLabel: '1',
    maxAgeLabel: '4',
    learningGoal: 'Count by tapping one item at a time.',
    difficultyLevel: 'starter',
    recommendedOrder: 20,
    isCoreGame: true
  },
  {
    id: 'which-has-more',
    route: 'WhichHasMore',
    title: 'Which Has More?',
    icon: '\u2696\uFE0F',
    colors: ['#38BDF8', '#2563EB'],
    skillArea: 'numbers-counting',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '3',
    maxAgeLabel: '5',
    learningGoal: 'Compare two groups and choose which side has more, fewer, or the same.',
    difficultyLevel: 'growing',
    recommendedOrder: 30,
    isCoreGame: true
  },
  {
    id: 'number-trace',
    route: 'NumberTrace',
    title: 'Number Trace',
    icon: '\u270D\uFE0F',
    colors: ['#2DD4BF', '#0F766E'],
    skillArea: 'numbers-counting',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '3',
    maxAgeLabel: '5',
    learningGoal: 'Trace big numbers with your finger and build number confidence.',
    difficultyLevel: 'growing',
    recommendedOrder: 40,
    isCoreGame: true
  },
  {
    id: 'make-ten',
    route: 'MakeTen',
    title: 'Make 10',
    icon: '\u0031\u0030',
    colors: ['#22C55E', '#14B8A6'],
    skillArea: 'numbers-counting',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '4',
    maxAgeLabel: '5',
    learningGoal: 'Build number pairs that make 10.',
    difficultyLevel: 'advanced',
    recommendedOrder: 50,
    isCoreGame: true
  },
  {
    id: 'compose-decompose',
    route: 'ComposeAndDecompose',
    title: 'Compose & Decompose',
    icon: '\u2795',
    colors: ['#10B981', '#059669'],
    skillArea: 'numbers-counting',
    recommendedStages: ['ready-kindergarten'],
    minAgeLabel: '4',
    maxAgeLabel: '5',
    learningGoal: 'Break numbers into parts and find the missing piece.',
    difficultyLevel: 'advanced',
    recommendedOrder: 60,
    isCoreGame: true
  },
  {
    id: 'memory-game',
    route: 'MemoryGame',
    title: 'Memory',
    icon: '\u{1F9E0}',
    colors: ['#A78BFA', '#8B5CF6'],
    skillArea: 'memory-focus',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '2',
    maxAgeLabel: '5',
    learningGoal: 'Remember card locations and stay focused through a round.',
    difficultyLevel: 'growing',
    recommendedOrder: 10,
    isCoreGame: true
  },
  {
    id: 'odd-one-out',
    route: 'OddOneOut',
    title: 'Odd One Out',
    icon: '\u{1F914}',
    colors: ['#22D3EE', '#3B82F6'],
    skillArea: 'thinking-patterns',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '3',
    maxAgeLabel: '5',
    learningGoal: 'Notice categories and pick the item that does not belong.',
    difficultyLevel: 'growing',
    recommendedOrder: 40,
    isCoreGame: false
  },
  {
    id: 'same-or-different',
    route: 'SameOrDifferent',
    title: 'Same or Different?',
    icon: '\u21C4',
    colors: ['#38BDF8', '#0EA5E9'],
    skillArea: 'thinking-patterns',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '3',
    maxAgeLabel: '5',
    learningGoal: 'Compare two pictures and decide whether they match.',
    difficultyLevel: 'growing',
    recommendedOrder: 35,
    isCoreGame: true
  },
  {
    id: 'pattern-builder',
    route: 'PatternBuilder',
    title: 'Pattern Train',
    icon: '\u{1F9E9}',
    colors: ['#FB7185', '#F97316'],
    skillArea: 'thinking-patterns',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '3',
    maxAgeLabel: '5',
    learningGoal: 'Spot repeating rules and build what comes next.',
    difficultyLevel: 'growing',
    recommendedOrder: 10,
    isCoreGame: true
  },
  {
    id: 'story-sequence',
    route: 'StorySequence',
    title: 'Story Sequence',
    icon: '\u{1F4DC}',
    colors: ['#A78BFA', '#8B5CF6'],
    skillArea: 'thinking-patterns',
    recommendedStages: ['ready-kindergarten'],
    minAgeLabel: '4',
    maxAgeLabel: '5',
    learningGoal: 'Put little stories in order from first to last.',
    difficultyLevel: 'advanced',
    recommendedOrder: 45,
    isCoreGame: true
  },
  {
    id: 'shadow-match',
    route: 'ShadowMatch',
    title: 'Shadow Studio',
    icon: '\u{1F311}',
    colors: ['#64748B', '#334155'],
    skillArea: 'thinking-patterns',
    recommendedStages: ['growing-learner', 'ready-kindergarten'],
    minAgeLabel: '3',
    maxAgeLabel: '5',
    learningGoal: 'Match silhouettes by shape instead of color.',
    difficultyLevel: 'growing',
    recommendedOrder: 20,
    isCoreGame: true
  },
  {
    id: 'follow-path',
    route: 'FollowPath',
    title: 'Trail Adventure',
    icon: '\u{1F9ED}',
    colors: ['#22C55E', '#0EA5E9'],
    skillArea: 'thinking-patterns',
    recommendedStages: ['ready-kindergarten'],
    minAgeLabel: '4',
    maxAgeLabel: '5',
    learningGoal: 'Trace a route and think ahead through simple paths.',
    difficultyLevel: 'advanced',
    recommendedOrder: 30,
    isCoreGame: true
  }
];

export const gameCatalogById = Object.fromEntries(gameCatalog.map((game) => [game.id, game]));
export const gameCatalogByRoute = Object.fromEntries(gameCatalog.map((game) => [game.route, game]));
export const skillAreasById = Object.fromEntries(skillAreas.map((skill) => [skill.id, skill]));
export const childStagesById = Object.fromEntries(childStages.map((stage) => [stage.id, stage]));

export function getGamesForStage(stageId) {
  return gameCatalog
    .filter((game) => !stageId || game.recommendedStages.includes(stageId))
    .sort((a, b) => a.recommendedOrder - b.recommendedOrder || a.title.localeCompare(b.title));
}

export function getGamesForStageAndSkill(stageId, skillArea) {
  return getGamesForStage(stageId).filter((game) => game.skillArea === skillArea);
}

export function getFeaturedGamesForStage(stageId) {
  const stage = childStagesById[stageId];

  if (!stage) {
    return [];
  }

  return stage.featuredGames
    .map((route) => gameCatalogByRoute[route])
    .filter(Boolean);
}

export const oddOneOutCategories = [
  { name: 'Animals', items: animals },
  { name: 'Vehicles', items: vehicles },
  { name: 'Instruments', items: instruments },
  { name: 'Sports', items: sportsEquipment },
  { name: 'Landmarks', items: landmarks }
];

export const stickerMilestones = [
  {
    id: 'first-correct',
    emoji: '\u2B50',
    name: 'First Star',
    desc: 'First correct answer',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 1
  },
  {
    id: 'first-five',
    emoji: '\u{1F31F}',
    name: 'Bright Start',
    desc: '5 correct answers',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 5
  },
  {
    id: 'score-10',
    emoji: '\u{1F389}',
    name: 'Party Time',
    desc: '10 correct answers',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 10
  },
  {
    id: 'streak-5',
    emoji: '\u{1F525}',
    name: 'On Fire',
    desc: '5 correct in a row',
    check: (stats) => Object.values(stats).some((entry) => (entry.streak || 0) >= 5)
  },
  {
    id: 'streak-10',
    emoji: '\u{1F680}',
    name: 'Rocket Run',
    desc: '10 correct in a row',
    check: (stats) => Object.values(stats).some((entry) => (entry.streak || 0) >= 10)
  },
  {
    id: 'explorer',
    emoji: '\u{1F5FA}\uFE0F',
    name: 'Explorer',
    desc: 'Played 3 different games',
    check: (stats) => Object.values(stats).filter((entry) => entry.attempts > 0).length >= 3
  },
  {
    id: 'big-explorer',
    emoji: '\u{1F9ED}',
    name: 'Adventure Guide',
    desc: 'Played 6 different games',
    check: (stats) => Object.values(stats).filter((entry) => entry.attempts > 0).length >= 6
  },
  {
    id: 'super-explorer',
    emoji: '\u{1F30D}',
    name: 'World Wanderer',
    desc: 'Played 10 different games',
    check: (stats) => Object.values(stats).filter((entry) => entry.attempts > 0).length >= 10
  },
  {
    id: 'score-25',
    emoji: '\u{1F3C6}',
    name: 'Champion',
    desc: '25 correct answers',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 25
  },
  {
    id: 'score-50',
    emoji: '\u{1F451}',
    name: 'Shining Crown',
    desc: '50 correct answers',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.correct || 0), 0) >= 50
  },
  {
    id: 'busy-player',
    emoji: '\u{1F388}',
    name: 'Busy Player',
    desc: '20 total attempts',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.attempts || 0), 0) >= 20
  },
  {
    id: 'super-player',
    emoji: '\u{1F38A}',
    name: 'Super Player',
    desc: '50 total attempts',
    check: (stats) => Object.values(stats).reduce((sum, entry) => sum + (entry.attempts || 0), 0) >= 50
  },
  {
    id: 'counter',
    emoji: '\u{1F522}',
    name: 'Counter',
    desc: '10 correct counting answers',
    check: (stats) => ((stats.counting?.correct || 0) + (stats['tap-count']?.correct || 0)) >= 10
  },
  {
    id: 'number-hero',
    emoji: '\u{1F9EE}',
    name: 'Number Hero',
    desc: '25 correct counting answers',
    check: (stats) => ((stats.counting?.correct || 0) + (stats['tap-count']?.correct || 0)) >= 25
  },
  {
    id: 'animal-buddy',
    emoji: '\u{1F43E}',
    name: 'Animal Buddy',
    desc: '10 correct animal answers',
    check: (stats) => (stats['animal-game']?.correct || 0) >= 10
  },
  {
    id: 'shape-builder',
    emoji: '\u{1F537}',
    name: 'Shape Builder',
    desc: '10 correct shape answers',
    check: (stats) => (stats['shape-match']?.correct || 0) >= 10
  },
  {
    id: 'color-rainbow',
    emoji: '\u{1F308}',
    name: 'Rainbow Finder',
    desc: '10 correct color answers',
    check: (stats) => (stats['color-match']?.correct || 0) >= 10
  },
  {
    id: 'feeling-friend',
    emoji: '\u{1F60A}',
    name: 'Feeling Friend',
    desc: '10 correct emotion answers',
    check: (stats) => (stats['emotion-game']?.correct || 0) >= 10
  },
  {
    id: 'sports-star',
    emoji: '\u26BD',
    name: 'Sports Star',
    desc: '10 correct sports answers',
    check: (stats) => (stats['sports-game']?.correct || 0) >= 10
  },
  {
    id: 'music-maker',
    emoji: '\u{1F3B5}',
    name: 'Music Maker',
    desc: '10 correct music answers',
    check: (stats) => (stats['instruments-game']?.correct || 0) >= 10
  },
  {
    id: 'road-runner',
    emoji: '\u{1F68C}',
    name: 'Road Runner',
    desc: '10 correct vehicle answers',
    check: (stats) => (stats['vehicles-game']?.correct || 0) >= 10
  },
  {
    id: 'memory-pal',
    emoji: '\u{1F9E0}',
    name: 'Memory Pal',
    desc: '5 memory game wins',
    check: (stats) => (stats['memory-game']?.correct || 0) >= 5
  },
  {
    id: 'sharp-eyes',
    emoji: '\u{1F575}\uFE0F',
    name: 'Sharp Eyes',
    desc: '10 odd one out wins',
    check: (stats) => (stats['odd-one-out']?.correct || 0) >= 10
  },
  {
    id: 'landmark-lover',
    emoji: '\u{1F3F0}',
    name: 'Landmark Lover',
    desc: '10 correct landmark answers',
    check: (stats) => (stats['landmarks-game']?.correct || 0) >= 10
  },
  {
    id: 'pattern-pro',
    emoji: '\u{1F9E9}',
    name: 'Pattern Pro',
    desc: '10 correct pattern answers',
    check: (stats) => (stats['pattern-builder']?.correct || 0) >= 10
  },
  {
    id: 'shadow-sleuth',
    emoji: '\u{1F311}',
    name: 'Shadow Sleuth',
    desc: '10 correct shadow matches',
    check: (stats) => (stats['shadow-match']?.correct || 0) >= 10
  },
  {
    id: 'letter-finder',
    emoji: 'A',
    name: 'Letter Finder',
    desc: '10 correct letter hunts',
    check: (stats) => (stats['letter-hunt']?.correct || 0) >= 10
  },
  {
    id: 'path-pal',
    emoji: '\u{1F9ED}',
    name: 'Path Pal',
    desc: '10 path wins',
    check: (stats) => (stats['follow-path']?.correct || 0) >= 10
  },
  {
    id: 'pack-pal',
    emoji: '\u{1F9FA}',
    name: 'Pack Pal',
    desc: '10 count and pack wins',
    check: (stats) => (stats['count-and-pack']?.correct || 0) >= 10
  },
  {
    id: 'compare-captain',
    emoji: '\u2696\uFE0F',
    name: 'Compare Captain',
    desc: '10 comparison wins',
    check: (stats) => (stats['which-has-more']?.correct || 0) >= 10
  },
  {
    id: 'shape-sorter',
    emoji: '\u{1F539}',
    name: 'Shape Sorter',
    desc: '10 sorting wins',
    check: (stats) => (stats['shape-sort-yard']?.correct || 0) >= 10
  },
  {
    id: 'trace-star',
    emoji: '\u270D\uFE0F',
    name: 'Trace Star',
    desc: '10 traced numbers',
    check: (stats) => (stats['number-trace']?.correct || 0) >= 10
  },
  {
    id: 'rhyme-rockstar',
    emoji: '\u{1F3B6}',
    name: 'Rhyme Rockstar',
    desc: '10 rhyme wins',
    check: (stats) => (stats['rhyme-time']?.correct || 0) >= 10
  },
  {
    id: 'solid-sleuth',
    emoji: '\u25A3',
    name: 'Solid Sleuth',
    desc: '10 flat or solid wins',
    check: (stats) => (stats['flat-or-solid']?.correct || 0) >= 10
  },
  {
    id: 'sound-scout',
    emoji: '\u{1F50A}',
    name: 'Sound Scout',
    desc: '10 beginning sound wins',
    check: (stats) => (stats['beginning-sounds']?.correct || 0) >= 10
  },
  {
    id: 'make-ten-master',
    emoji: '\u0031\u0030',
    name: 'Make Ten Master',
    desc: '10 make 10 wins',
    check: (stats) => (stats['make-ten']?.correct || 0) >= 10
  },
  {
    id: 'word-family-friend',
    emoji: '\u{1F4D6}',
    name: 'Word Family Friend',
    desc: '10 word family wins',
    check: (stats) => (stats['word-families']?.correct || 0) >= 10
  },
  {
    id: 'number-builder',
    emoji: '\u2795',
    name: 'Number Builder',
    desc: '10 compose and decompose wins',
    check: (stats) => (stats['compose-decompose']?.correct || 0) >= 10
  },
  {
    id: 'match-maker',
    emoji: '\u21C4',
    name: 'Match Maker',
    desc: '10 same or different wins',
    check: (stats) => (stats['same-or-different']?.correct || 0) >= 10
  },
  {
    id: 'story-stacker',
    emoji: '\u{1F4DC}',
    name: 'Story Stacker',
    desc: '10 story sequence wins',
    check: (stats) => (stats['story-sequence']?.correct || 0) >= 10
  }
];
