# Snake Game

This is a Snake game implementation using React, Node.js, and PostgreSQL. The game allows players to control a snake and collect different types of feed while earning points. It features a leaderboard to track high scores and includes functionality such as pausing the game and detecting game over conditions.

## Technologies

- React
- Node.js
- PostgreSQL

## Requirements

To run the Snake game, ensure that you have the following:

- Node.js installed on your machine
- PostgreSQL database for storing game records

## Features

1. **Input Name**: Players can input their name before starting the game.
2. **Counting Points**: The game keeps track of the player's points earned during gameplay.
3. **List of Record Holders**: A leaderboard displays the top scores achieved by players.
4. **Snake's Move**: Players can control the snake's movement in four directions: left, right, forward, and back.
5. **Pause**: Players can pause the game at any time during gameplay.
6. **Game Over**: The game ends if the snake crosses its own body, resulting in a game over condition.
7. **Three Types of Feed**: There are three types of feed available in the game, each with different point values:
    - First: 1 point
    - Second: 5 points
    - Third: 10 points
8. **Speed Increase**: Whenever the player reaches a multiple of 50 points, the snake's speed increases.

## How to run locally

To run the game locally, follow these steps:

1. specify  environmental variable in .env file (frontend and backend) use .env.example as example (for test you can use db url that specify in .env.example of backend)
2. from root run `yarn run i` or `yarn install --ignore-optional`
3. from root run `yarn run build`
4. from root run `yarn run start:backend`
5. from root run `yarn run dev:frontend`
6. open http://localhost:3000

Ensure that you have the necessary environment and configuration in place for hosting the server and database.
