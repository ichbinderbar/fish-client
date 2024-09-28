# Project Title

## Overview

My app is an online card fishing game. The game is my version of the traditional ecuadorian game "Cuarenta".

### Problem Space

My app is needed for me and my girlfriend to play our version of the game when I am traveling.

### User Profile

My app will be used by me and my girlfriend. We like the game to be short so we can play more rounds.

### Features

The game will include a solo mode where the player plays against a bot, as well as an online one versus one mode where the player plays against an other person.

## Implementation

### Tech Stack

I will be using te MERN web dev stack to build this game.

### APIs

None

### Sitemap

Home page: In this page you will see the game instrucctions at the bottom, and on top the buttons to start a new game, login/register, and see the leaderboard.

Intructions page: Will be the same as home page with a different route.

Game page: In this page you will see a table in the middle dividing the player and opponent areas. Each area will show the current player stats.

Leaderboard: In this page you will see a list of game results against other players. The table will display the number of wins a player has agains other players. This is the page the game page redirects to at the end of each game.

### Data

My server will emit the current game state using web sockets and the data will be generated during the game.

My static data will be fetched from the server using an axios get request and it will contain previous game results.

My data will be updated at the end of every game via an axios post request and it will contain the last game results.

The data will be stored in one table/document called scores with the following attributes:

- Player username
- Player final score
- Opponent username
- Opponent final score
- Game date

### Endpoints

/scores to post and get results

## Roadmap

Sprint 1 (16/09-23/09): UI components and server side game state management implementation with websockets

Sprint 2 (23/09-30/09): API and data base implementation

Sprint 3 (30/09-04/10): Styling

---

## Future Implementations

- Auto log out
- Create room/join existing room feature
- Chat for online games
- Reconnection sync for online game
- Private leaderboard
- Profile form
