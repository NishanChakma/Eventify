# My Expo App

A brief description of your app. Explain what it does and its main features.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [EAS Build](#eas-build)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
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
- Add more as per your project

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/my-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
