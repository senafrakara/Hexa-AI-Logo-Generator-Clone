# Hexa - AI Logo Clone App

This is a React Native Expo application that simulates an AI-powered logo generation service. The app allows users to input prompts for logo creation, choose a style, and view the generated logo.

## Features

- Input prompts for logo generation
- Select from multiple logo styles (No Style, Monogram, Abstract, Mascot)
- Real-time status updates during logo creation
- View and download generated logos
- Multi-language support (English and Turkish)
- Dark/Light theme support
- Firestore integration for persistent data storage

## Screenshots

The app follows the design available in the [Figma Case Study](https://www.figma.com/design/ZFAE2gKQ6TkImS40RI0ZOl/Case-Study-Software-Engineer?node-id=0-1&p=f&t=8y0UPH1vDV6qWVOU-0).

## Tech Stack

- React Native Expo (Managed Workflow)
- Expo SDK 3.3.0  
- Firebase Firestore
- TypeScript
- i18n for internationalization
- Tailwind CSS for styling
- ThemeProvider for theme management

## Installation

### Prerequisites

- Node.js
- Expo CLI
- Firebase account

### Setup

1. Clone the repository:
```bash
git clone https://github.com/senafrakara/Hexa-AI-Logo-Clone.git
cd hexa-ai-logo-clone
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Add a Web app to your project
   - Copy the Firebase configuration

4. Update the Firebase configuration in `firebase/config.js`

5. Start the development server:
```bash
npx expo start
```

## Project Structure

```
hexa-logo-generator/
├── assets/                         # Static assets (images, fonts)
├── components/                     # Reusable UI components
│   ├── input/StatusChip.tsx       # Status indicator component
│   ├── input/LogoStyleButton.tsx  # Logo style selection button
│   ├── input/LogoStyleList.tsx    # Logo styles list
│   └── ...
├── constants/                      # App constants
│   └── LogoStyles.ts               # Logo Styles Definitions
│   └── ProcessStatus.ts            # Status Indicator Values
├── firebase/                       # Firebase configuration
│   └── config.js                   # Firebase setup
├── i18/                            # Translation files
│   ├── languages/en.js             # English translations
├── app/                            # App screens
│   ├── index.tsx.js                # Logo prompt input screen
│   └── screens/OutputScreen.tsx    # Logo result display screen
├── services/                       # Firebase services
│   └── FBConfig.js                 # Firebase Config service
│   └── LogoService.js              # Logo Creating service
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel configuration
└── tailwind.config.js              # Tailwind CSS configuration
```

## Usage Flow

1. **Input Screen**:
   - Enter a prompt for your logo
   - Select a logo style
   - Press "Create" button
   - The app shows a status chip with processing status

2. **Status Chip States**:
   - Processing: Shows "Creating Your Design..." with estimated time
   - Done: Shows "Your Design is Ready! Tap to see it"
   - Error: Shows "Oops, something went wrong! Click to try again"

3. **Output Screen**:
   - Displays the generated logo
   - Shows the prompt used to create it
   - Option to copy the prompt

## Loom Video 
 
   https://www.loom.com/share/977f3e984426491ebae161dd69163bec?sid=10149262-aaa0-4028-ab1f-d7fa11c4903b
  
## Firebase Integration

The app integrates with Firebase Firestore to store logo generation requests. In a complete implementation, Firebase Functions would be used to handle the actual AI generation process.

- **Frontend Simulation**: The app includes a simulation mode that uses setTimeout to mimic the generation process
- **Backend Integration**: For a full implementation, the commented Firebase Functions code can be deployed

## Customization

### Adding New Languages

1. Create a new translation file in `i18/` folder

## License

[MIT](https://choosealicense.com/licenses/mit/)
