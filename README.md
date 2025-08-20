# Garage Space By Mobolaji Richard

This project is bootstrapped using Turborepo, Expo, React Native and NestJs

## How to run

 - Clone Repository
 - Install Depedency. From the root run `npm install`

## Mobile App
 - From root cd apps/mobile-app
 - run npm start
 - After bundling, press i to open on iOS simulator or a to open on Android
 - You'll need a mac, xcode to open iOS simulator
 - You'll need Android Studio to open an Android Simulator
 - or
 - You can scan the QR code on your phone to open Expo Go

## Backend (NestJs)
 - The BE codebase has already been deployed and attached to the mobile app, so you don't need to run the code locally.
 - However, if you wish to run the code locally, you'll need to create a .env file in the root of the project, variable you need to have has been shown in the .env.example in the root of the project. (I can provide my .env used if needed please don't hesitate to reach out)
 - after inputting variable
 - open terminal, From root cd apps/backend
 - run `npm run prisma:migrate`
 - run `npm run prisma:generate`
 - run `npm run start:dev`
 - Please don't forget to change the BASE_API_URL in the mobile-app folder (apps/mobile-app/queries/index.ts) to http://localhost:5050/api/v1
