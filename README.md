# Elixir Spin (ClashHub) 🎮

Elixir Spin is a powerful, React-based companion tool designed for Clash Royale streamers and fans. It allows users to generate fun, randomized decks through engaging interactive mechanics like Spin Wheels and Slot Machines.

## ✨ Features

- **🎰 Slot Machine**: Roll the slots to discover 3 potential cards and pick the perfect addition to your deck.
- **🎡 Spin Wheel**: A dynamic wheel that selects a card for your deck with smooth animations and confetti celebrations.
- **🎲 Instant Randomizer**: Generate a complete 8-card deck instantly with category-based toggles (Evolutions, Buildings, Champions, Spells, etc.).
- **🚀 One-Click Copy Deck**: Copy your final generated deck directly into Clash Royale using the built-in deep-linking utility.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd clashhub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add your API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

```bash
npm run build
```

## 🏗️ Project Structure

The project follows a clean, modular architecture:

- **`src/api/`**: Axios configuration and interceptors for backend communication.
- **`src/components/`**: Reusable UI components (DeckSection, CardFilters, etc.).
- **`src/constants/`**: Centralized static data for rarities, costs, and challenge types.
- **`src/hooks/`**: Custom hooks for shared logic (e.g., `useDeckManager` for state management).
- **`src/pages/`**: Page-level components for each challenge type.
- **`src/types/`**: TypeScript interfaces and types.
- **`src/utils/`**: Utility functions like deck sharing logic.

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **State Management**: React Hooks
- **API Client**: Axios
- **Animation**: Canvas Confetti & CSS Keyframes

---
*Made with ❤️ for the Clash Royale community.*
