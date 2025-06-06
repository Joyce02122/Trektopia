# Trektopia – Interactive Journey Recap Platform

## Project Objectives

Trektopia is an interactive and narrative-driven platform designed for explorers, hikers, and anyone who loves documenting their journeys. Building on data collected by TrailGuard (such as location, environmental parameters, and timelines), Trektopia transforms these into a story of your travels.

Users can revisit their routes, mark important moments, add personal notes and photos, and even have a chosen animal companion join them throughout the journey. The goal of Trektopia is to turn the simple act of reviewing data into an emotionally engaging, interactive narrative.

**＊TrailGuard:** A hiking device developed in another course project (UW TECHIN515). It uses LoRa-Mesh technology to enable reliable, long-range communication between team members in remote areas—helping them stay connected even without cellular signals. It also collects real-time environmental and activity data such as GPS location, altitude, temperature, humidity, and motion.

---

## Target Users and Their Needs

- **General Users**: People who want an easy yet fun way to document their everyday adventures and memories without needing complex journaling.
- **Outdoor Enthusiasts / Hikers**: Those who want to visually track their routes and milestones, while also capturing the emotions and highlights of their trips.
- **Self-Explorers**: Individuals looking to document their personal journeys, emotional changes, or life experiences, using maps and timelines to reflect on their inner journey.

---

## Key Deliverables

- **Interactive Journey Recap Generator**  
  A feature that automatically converts your map and timeline data into a dynamic journey story, showing your route, stops, and personal notes/photos.

- **Memory Node Visualization**  
  Interactive memory points on the map where users can "check in" at certain moments of their journey. These nodes display photos, short notes, or voice clips related to that moment, providing users with a chance to reflect on their experiences.

- **Team Communication Recap**  
  A feature to track and review team communication during the journey. This includes LoRa signal data, message timestamps, and communication success rates, allowing users to evaluate the effectiveness of their teamwork.

---

## Development Roadmap

| Week | Tasks | Process |
|------|-------|---------|
| Week 1 | Project planning and user research | Finished |
| Week 2 | User journey mapping and persona creation | Finished |
| Week 3 | Initial UI wireframes and interaction design | Finished |
| Week 4 | Backend architecture and database setup | Finished |
| Week 5 | Path data parsing and memory tagging features | Finished |
| Week 6 | Designing animated journey recap flow | Finished |
| Week 7 | Developing animal companion and emotion recording system | Finished |
| Week 8 | Front-end and back-end integration, user testing | Finished |
| Week 9 | Animation optimization, sharing feature implementation, and bug fixing | Finished |
| Week 10 | Final testing, deployment, and user documentation | Finished |

---

## Special Challenges and Constraints

- **Balancing Visual Appeal and Performance**: With so much animation and interactive content, we need to ensure the platform performs smoothly while providing an engaging experience.
- **Customizability vs Simplicity**: We want to offer highly personalized options (like emotion tagging and companion selection) without overwhelming users with complexity.

---

## Expected Outcomes

- **Immersive Journey Visualization**  
  Users will be able to revisit and save each journey in a dynamic way, creating a more immersive experience of their memories.

- **Personalized Narrative Experience**  
  By adding animal companions and emotional tracking, users will form a deeper emotional connection with their journey, creating a unique and personal recap.

---

## Setup & Usage

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Joyce02122/trektopia.git
   ```
2. Navigate to the project directory:
   ```bash
   cd trektopia
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the application:
   ```bash
   npm start
   ```
5. Access the app at:
   ```
   http://localhost:3000
   ```

### Usage
1. Create a new journey.
2. Add memory points (photos, notes, or voice clips).
3. Review your journey recap.
4. View team communication history.

---

## Progress & Issues

### Progress
All major features are complete:
- Dashboard
- Journey Recap Map
- Team Communication Page
- Settings Page

UI and animations are being optimized for a smoother experience.

### Known Issues
- Message layout issue on the Team Communication page (currently being developed).
- Animal companion animation requires smoother transitions.
- Mobile performance improvements are still in progress.

---

## Contact Information of the Team

- **Joyce Chou**  
  Email: ychou3@uw.edu
- **Katherine Chen**  
  Email: ejchen99@uw.edu