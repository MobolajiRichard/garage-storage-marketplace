# Garage Space By Mobolaji Richard

This project is bootstrapped using Turborepo, Expo, React Native and NestJs

## How to run

1 - Clone Repository
2 - Install Depedency. From the root run `npm install`

## Mobile App
3 - From root cd apps/mobile-app
4 - run npm start
5 - After bundling, press i to open on iOS simulator or a to open on Android
6 - You'll need a mac, xcode to open iOS simulator
7 - You'll need Android Studio to open an Android Simulator
8 - or
9 - You can scan the QR code on your phone to open Expo Go

## Backend (NestJs)
10 - The BE codebase has already been deployed and attached to the mobile app, so you don't need to run the code locally.
11 - However, if you wish to run the code locally, you'll need to create a .env file in the root of the project, variable you need to have has been shown in the .env.example in the root of the project. (I can provide my .env used if needed please don't hesitate to reach out)
12 - after inputting variable
13 - open terminal, From root cd apps/backend
14 - run `npm run prisma:migrate`
15 - run `npm run prisma:generate`
16 - run `npm run start:dev`
17 - Please don't forget to change the BASE_API_URL in the mobile-app folder (apps/mobile-app/queries/index.ts) to http://localhost:5050/api/v1
