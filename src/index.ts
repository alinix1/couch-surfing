// IMPORTS //

import { Permissions, LoyaltyUser } from './enums';
import { Review, Property } from './interface';
import MainProperty from './classes';

// QUERY SELECTORS //

const reviewTotalDisplay = document.querySelector('#reviews');
const returningUserDisplay = document.querySelector('#returning-user');
const userNameDisplay = document.querySelector('#user');
const propertyContainer = document.querySelector('.properties');
const reviewContainer = document.querySelector('.reviews');
const button = document.querySelector('button');
const container = document.querySelector('.container');
const footer = document.querySelector('.footer');

let isLoggedIn: boolean;

// REVIEWS Object //

const reviews: Review[] = [
  {
    name: 'Sheia',
    stars: 5,
    loyaltyUser: LoyaltyUser.GOLD_USER,
    date: '01-04-2021',
  },
  {
    name: 'Andrzej',
    stars: 3,
    loyaltyUser: LoyaltyUser.SILVER_USER,
    date: '28-03-2021',
  },
  {
    name: 'Omar',
    stars: 4,
    loyaltyUser: LoyaltyUser.BRONZE_USER,
    date: '27-03-2021',
  },
];

// YOU Object //

const you: {
  firstName: string;
  lastName: string;
  permissions: Permissions;
  isReturning: boolean;
  age: number;
  stayedAt: string[];
} = {
  firstName: 'Bobby',
  lastName: 'Brown',
  permissions: Permissions.ADMIN,
  isReturning: true,
  age: 35,
  stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow'],
};

//PROPERTIES Object //

const properties: Property[] = [
  {
    image: './assets/columbia.jpg',
    title: 'Columbian Shack',
    price: 465,
    location: {
      firstLine: 'shack 37',
      city: 'Bogota',
      code: 4566768,
      country: 'Columbia',
    },
    contact: [+1123495082908, 'marywinkle@gmail.com'],
    isAvailable: true,
  },
  {
    image: './assets/England.jpg',
    title: 'London Flat',
    price: 5700,
    location: {
      firstLine: '1190 Fog St',
      city: 'London',
      code: 'SW4 5XW',
      country: 'United Kingdom',
    },
    contact: [+1123495067909, 'johnwells@gmail.com'],
    isAvailable: false,
  },
  {
    image: './assets/poland.jpg',
    title: 'Polish Cottage',
    price: 306,
    location: {
      firstLine: 'no 23',
      city: 'Gdansk',
      code: 789001,
      country: 'Poland',
    },
    contact: [+1333495082906, 'garydavis@hotmail.com'],
    isAvailable: true,
  },
  {
    image: './assets/malaysia.jpg',
    title: 'Malia Hotel',
    price: 420,
    location: {
      firstLine: 'Room 4',
      city: 'Malia',
      code: 45334,
      country: 'Malaysia',
    },
    contact: [+6053323235454, 'lee34@gmail.com'],
    isAvailable: false,
  },
];

// FUNCTIONS //

function add(firstValue: number, secondValue: number): number {
  return firstValue + secondValue;
}

let authorityStatus: any;
isLoggedIn = false;

function showDetails(
  authorityStatus: boolean | Permissions,
  element: HTMLDivElement,
  price: number,
) {
  if (authorityStatus) {
    const priceDisplay = document.createElement('div');
    priceDisplay.innerHTML = price.toString() + '/night';
    element.appendChild(priceDisplay);
  }
}

function showReviewTotal(
  value: number,
  reviewer: string,
  isLoyalty: LoyaltyUser,
): void {
  const iconDisplay = isLoyalty === LoyaltyUser.GOLD_USER ? '⭐' : '';
  reviewTotalDisplay!.innerHTML = `
    ${value.toString()}  review${makeMultiple(value)}
    | last reviewed by ${reviewer}
    ${iconDisplay}
    `;
}

function populateUser(isReturning: boolean, userName: string) {
  if (isReturning) {
    returningUserDisplay!.innerHTML = 'back, ';
  }
  userNameDisplay!.innerHTML += userName;
}

showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);

populateUser(you.isReturning, you.firstName);

for (let i = 0; i < properties.length; i++) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = properties[i].title;

  const image = document.createElement('img');
  image.setAttribute('src', properties[i].image);
  card.appendChild(image);
  propertyContainer!.appendChild(card);
  showDetails(you.permissions, card, properties[i].price);
}

let currentLocation: [string, string, number] = ['Denver', '1:55', 34];
footer!.innerHTML =
  currentLocation[0] +
  ' ' +
  currentLocation[1] +
  ' ' +
  currentLocation[2] +
  ' °';

function makeMultiple(value: number): string {
  if (value > 1 || value === 0) {
    return 's';
  } else {
    return '';
  }
}

function getTopTwoReviews(reviews: Review[]): Review[] {
  const sortedReviews = reviews.sort((a, b) => b.stars - a.stars);
  return sortedReviews.slice(0, 2);
}

let count = 0;
function addReviews(array: Review[]): void {
  if (!count) {
    count++;
    const topTwo = getTopTwoReviews(array);
    for (let i = 0; i < topTwo.length; i++) {
      const card = document.createElement('div');
      card.classList.add('review-card');
      card.innerHTML = topTwo[i].stars + ' stars from ' + topTwo[i].name;
      reviewContainer!.appendChild(card);
    }

    container!.removeChild(button);
  }
}

button!.addEventListener('click', () => addReviews(reviews));

let yourMainProperty = new MainProperty(
  './assets/France.jpg',
  'French seaside',
  [
    {
      name: 'Olive',
      stars: 5,
      loyaltyUser: LoyaltyUser.SILVER_USER,
      date: '12-04-21',
    },
  ],
);

const mainImageContainer = document.querySelector('.main-image');
const image = document.createElement('img');
image.setAttribute('src', yourMainProperty.src);
image.classList.add('img');
mainImageContainer!.appendChild(image);
