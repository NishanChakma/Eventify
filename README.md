# Eventify

- Login screen (Firebase email-auth)
- Sign-up screen (Firebase email-auth)
- Home screen fetching and displaying a list of items from a public REST API
- Details screen (Home > Search > Click Events)
- Favorite screen (Home > Search > Click love icon > Favorite)
- State management using Zustand
- Navigation implemented with React Navigation
- Form implementation using React Hook Form (Homescreen → Search Result → Details → Book Now → Form)
- Animations using Reanimated for headline text(Home screen) and loading indicators(loading screen)
- Expo push notification system (Profile → Show Push Notification Token → Copy to Clipboard)
- App icons, metadata, and Privacy Policy screen (Profile → Privacy Policy)
- Change language option (English and Bengali) → HomeScreen/Profile → Language Modal → Select Language
- App optimization using the Hermes engine
- EAS build setup instructions


## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [EAS Build](#eas-build)
- [Running the App](#running-the-app)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/NishanChakma/Eventify
cd your-repo
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```


## Development

Start the development server:

```bash
expo start
```

You can run the app on:

- Android Emulator
- iOS Simulator
- Physical device using Expo Go app (scan the QR code)

## EAS Build

Expo Application Services (EAS) allows building your app for iOS and Android in the cloud.

1. **Install EAS CLI**:

```bash
npm install -g eas-cli
```

2. **Login to your Expo account**:

```bash
eas login
```

3. **Configure EAS Build**:

```bash
eas build:configure
```

4. **Build the app**:

- For Android:

```bash
eas build --platform android
```

- For iOS:

```bash
eas build --platform ios
```

5. **Submit the app to stores** (optional):

```bash
eas submit --platform android
eas submit --platform ios
```

> Note: Make sure you have proper Apple and Google credentials for submission.

## Running the App

- Start Metro Bundler:

```bash
expo start
```

- Open app on:

  - **Android device/emulator**: Press `a`
  - **iOS simulator**: Press `i`
  - **Web browser**: Press `w`

## Dependencies

List of main dependencies:

- `expo` – Expo framework
- `react-native` – React Native
- `react-navigation` – Navigation library
- `axios` – HTTP requests
- `i18next` - Handle Language
- `react-native-firebase` - Authentication
- `react-native-reanimated-carousel` - Image slider
- `expo-splash-screen`
- `react-hook-form`
- `react-native-reanimated`
- `react-native-modal`
- `react-native-phone-input`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/my-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
