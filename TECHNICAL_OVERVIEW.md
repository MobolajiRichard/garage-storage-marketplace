# TECHNICAL OVERVIEW

## Why I chose this project
The reason i chose this project was because it's practical, has a clear business model and it depicts a real-life daily needs scenario solutions. I have also had an idea of creating something very similar to this a while ago (matching people with unused lands). This challenge feels like a perfect chance to explore it. It pushes me to think critically and turn those ideas into working code.

## Stacks And Tools Used
I chose these stack
- Mobile App: Expo, React Native, Typescipt
- Styling & UI: Native TailwindCSS for clean, responsive design.
- Backend: NestJS, TypeScript for structured, maintainable APIs endpoints.
- Database: PostgreSQL with Prisma ORM for relational data.
- Authentication:  JWT-based (@Nest/jwt) system for session handling
- File Storage: Vercel Blob for fast and lightweight storage.

## How i would take the project to completion

- ROADMAP
I'll work on the project in phases, with each phase having particular target e.g.
- Phase 1 (MVP) 
- Phase 2 – Core Enhancements And Maintenace
- Phase 3 – Scaling & Architecture Improvements

- FEATURES
Some of the features that i'll like to implement which isn't already implemented are:
 - Real Time In-App Chat: This will introduce the ability for host, guest to send messages in the platform. I'll use pusher to implement ral time communication in the platform. This is because pusher is easy integrate and scale, and i have had previous experiences integrating pusher for real-time communication.
 - Online Presence: This will show show which host is online for faster negotiations. 
 - Price Negotations: Instead of the fixed price that is curretly implemented, i want users to be able to negotiate price on the platform making the process looks similar to real life interactions
 - AI Bot: I'll implement AI bot that users can interact with. instead of going through the traditional search routine, users can talk to AI Bot to get specific spaces based on their requests
 - AI AutoReply (Host Only): This is a feature in which, incase an host isn't online they can enable AI auto reply to make AI respond to users on their behalf. Doing this will ensure quick interactions and boost customer retentions.
 - Cryptocurrecy Payment: users should be able to pay using their cryptocurrency wallets
 - Social Media Authentication
 - Referral Syste

- ARCHITECTURE AND SCALING
 - To scale the app, the first thing i'll do is to switch to a bigger Cloud Strorage Provider (AWS, Google Cloud, e.t.c).
 - I'll implement caching with Redis for faster search and availability lookups.
 - I'll inmplement Load balancing and horizontal scaling for backend services.
 - I'll create separate microservices for bookings, payments, and messaging once usage grows.
 - I'll implement queue system (e.g., BullMQ) for handling background jobs.

-LONG TERM VISION
Expansion into other verticals: parking spots, unused land, house, cars e.t.c.