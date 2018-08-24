# As the Crow Flies

behold! a mostly-finished coding challenge from a company I won't name but that you can probably figure out with detective work!

now featuring React because I wanted some practice with React

## prompt

"Create a web app that calculates the distance (in nautical miles) between two airports. The app should auto-
complete the airports and should feature all airports in the U.S. only. Bonus: plot the trip on Google maps."

## how to run it

1. [have npm installed][npm installation]
2. `$ npm install` to install dependencies
2. `$ npm run dev` to start webpack-dev-server
4. navigate to `localhost:8080` in you browser of choice

## todo

- accessibility!!! oops
- better focus/tab-ing behavior
- test on an actual mobile device to see if the suggestions mess with the keyboard
- actual autocomplete (rather than manually clicking the thing you want) (???)
- learn what a nautical mile is

## stretch goals

- "smart" ordering of autocomplete matches somehow
  - e.g. if you type in "New York", JFK and LGA should probably be the first matches

[npm installation]: https://docs.npmjs.com/getting-started/installing-node#install-npm--manage-npm-versions
