const originalTitle = "Glan | Portfolio";

const inactiveTitles = [
  "Come back soon!👀",
  "👋 Hey! Don’t forget me!",
  "Lost in the internet maze?🕸️",
  "🔍Searching the web? Check my work too!",
  "Just a reminder—I’m still open",
  "Did you bring snacks?🍿"
];

let titleInterval = null;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Start changing title every 1.5 seconds
    titleInterval = setInterval(() => {
      const randomTitle =
        inactiveTitles[Math.floor(Math.random() * inactiveTitles.length)];
      document.title = randomTitle;
    }, 1500); // 🔁 change every 1.5 sec
  } else {
    // Stop interval when tab is active
    clearInterval(titleInterval);
    titleInterval = null;

    document.title = "Welcome back | Glan’s Portfolio";

    setTimeout(() => {
      document.title = originalTitle;
    }, 1500);
  }
});
