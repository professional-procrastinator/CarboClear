const questions = [
  {
    question: 'How often do you eat meat or meat-based products?',
    options: [
      { label: 'Never', value: 0 },
      { label: 'Once a week', value: 1 },
      { label: 'Twice a week', value: 2 },
      { label: 'Meat in every meal', value: 3 },
    ],
    step: 0,
  },
  {
    question: 'Is your food locally sourced or imported?',
    options: [
      { label: 'Do not know', value: 0 },
      { label: 'Most of the food is locally sourced', value: 0 },
      { label: 'Some of the food is locally sourced', value: 2 },
    ],
    step: 0,
  },
  {
    question: 'How do you commute to work/school?',
    options: [
      { label: 'Walking/cycling', value: 1 },
      { label: 'Carpooling', value: 2 },
      { label: 'Public transportation', value: 3 },
      { label: 'Cars and other vehicles', value: 4 },
    ],
    step: 1,
  },
  {
    question: 'What kind of car do you use to commute to work/school?',
    options: [
      { label: 'Electric car', value: 1 },
      { label: 'Hybrid car', value: 2 },
      { label: 'Small or medium petrol/diesel car', value: 3 },
      { label: 'Large petrol/diesel car', value: 4 },
    ],
    step: 1,
  },
  {
    question: 'How much time do you spend commuting to work/school in a week?',
    options: [
      { label: 'Under 2 hours a week', value: 0 },
      { label: '2-5 hours a week', value: 1 },
      { label: '5-15 hours a week', value: 2 },
      { label: 'Over 15 hours a week', value: 3 },
    ],
    step: 1,
  },
  {
    question: 'How many people (17+) live in your household?',
    options: [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4 or more', value: 4 },
    ],
    step: 2,
  },
  {
    question: 'What temperature do you set your thermostat to in winters?',
    options: [
      { label: 'Less than 14°C', value: 1 },
      { label: '14-18°C', value: 2 },
      { label: '18-22°C', value: 3 },
      { label: 'Above 22°C', value: 4 },
    ],
    step: 2,
  },
  {
    question: 'Do you plug out your electronic devices when not in use?',
    options: [
      { label: 'Always', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Rarely', value: 3 },
      { label: 'Never', value: 4 },
    ],
    step: 2,
  },
];

export default questions;
