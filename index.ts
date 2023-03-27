// QUERY SELECTORS

const reviewTotalDisplay = document.querySelector("#reviews");
const returningUserDisplay = document.querySelector("#returning-user");
const userNameDisplay = document.querySelector("#user");
const propertyContainer = document.querySelector(".properties");

// REVIEWS Object

const reviews: {
  name: string;
  stars: number;
  loyaltyUser: boolean;
  date: string;
}[] = [
  {
    name: "Sheia",
    stars: 5,
    loyaltyUser: true,
    date: "01-04-2021",
  },
  {
    name: "Andrzej",
    stars: 3,
    loyaltyUser: false,
    date: "28-03-2021",
  },
  {
    name: "Omar",
    stars: 4,
    loyaltyUser: true,
    date: "27-03-2021",
  },
];

// USER Object

const you: {
  firstName: string;
  lastName: string;
  isReturning: boolean;
  age: number;
  stayedAt: string[];
} = {
  firstName: "Bobby",
  lastName: "Brown",
  isReturning: true,
  age: 35,
  stayedAt: ["florida-home", "oman-flat", "tokyo-bungalow"],
};

//PROPERTIES Object

const properties: {
  image: string;
  title: string;
  price: number;
  location: {
    firstLine: string;
    city: string;
    code: number;
    country: string;
  };
  contact: [number, string];
  isAvailable: boolean;
}[] = [
  {
    image: "./assets/columbia.jpg",
    title: "Columbian Shack",
    price: 465,
    location: {
      firstLine: "shack 37",
      city: "Bogota",
      code: 4566768,
      country: "Columbia",
    },
    contact: [+1123495082908, "marywinkle@gmail.com"],
    isAvailable: true,
  },
  {
    image: "./assets/England.jpg",
    title: "London Fog",
    price: 5700,
    location: {
      firstLine: "1190 Fog St",
      city: "London",
      code: 1777999,
      country: "United Kingdom",
    },
    contact: [+1123495067909, "johnwells@gmail.com"],
    isAvailable: false,
  },
  {
    image: "./assets/poland.jpg",
    title: "Polish Cottage",
    price: 306,
    location: {
      firstLine: "no 23",
      city: "Gdansk",
      code: 789001,
      country: "Poland",
    },
    contact: [+1333495082906, "garydavis@hotmail.com"],
    isAvailable: true,
  },
];

// FUNCTIONS

function showReviewTotal(value: number, reviewer: string, isLoyalty: boolean) {
  const iconDisplay = isLoyalty ? "⭐" : "";
  reviewTotalDisplay!.innerHTML = `
    ${value.toString()} 
    | last reviewed by ${reviewer}
    ${iconDisplay}
    `;
}

function populateUser(isReturning: boolean, userName: string) {
  if (isReturning) {
    returningUserDisplay!.innerHTML = "back, ";
  }
  userNameDisplay!.innerHTML += userName;
}

showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);

populateUser(you.isReturning, you.firstName);

for (let i = 0; i < properties.length; i++) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = properties[i].title;

  const image = document.createElement("img");
  image.setAttribute("src", properties[i].image);
  card.appendChild(image);
  propertyContainer!.appendChild(card);
}
