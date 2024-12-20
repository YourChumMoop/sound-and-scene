# Sound and Scene

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

**Sound and Scene** is a web application designed to help users discover **music events** and nearby **food and drink options**. Using data from the **Ticketmaster API** for events and the **Foursquare API** for venue recommendations, our platform provides a seamless way to plan a night out. The app features an intuitive interface, efficient search functionality, and real-time data to simplify event discovery while promoting local businesses. A direct link to the deployed application is provided in the "Questions" section below.

![Sound-and-Scene-img](https://github.com/user-attachments/assets/6d2196a0-37f3-49ed-bbb6-80e87995b1a5)


## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To install this project locally, clone it from the GitHub repository linked in the "Questions" section below.

```bash
git clone https://github.com/Sinnema1/sound-and-scene.git
cd sound-and-scene
npm install
```

## Usage

### Environment Variables

Create a \`.env\` file in the \`server\` directory and provide the necessary API keys:

```plaintext
TM_API_BASE_URL=https://app.ticketmaster.com/discovery/v2
TM_API_KEY=your_api_key
FS_API_BASE_URL=https://api.foursquare.com/v3/places
FS_API_KEY=your_api_key
JWT_SECRET=your_jwt_secret
```

### Run the Application

To run the project locally, use the following commands:

1. **Build the Client**:

   ```bash
   cd client
   npm run build
   cd ..
   ```

2. **Start the Client and Server conurrently**:

  ```bash
   cd ..
   npm run start:dev
   ```

4. **Access the Application**:  
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deployment on Render

This project is deployed on **Render**. The deployment process includes:

- **Create PostgreSQL Database in Render**
- **Copy Internal Database URL**
- **Create a New Web Service**
  - **Create Environment Variable**:
    - **Name**: `DB_URL`
    - **Value**: copied internal database URL
  - **Build Command**: `npm install`
  - **Start Command**: `npm start\`

### Common Deployment Issues

If you encounter issues like `Database sync failed` or `Cannot GET /`, refer to the [Render Troubleshooting Guide](https://render.com/docs/troubleshooting-deploys).

## License

This application is covered under the MIT license.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Submit a pull request with a clear description of your updates.

## Tests

To verify the application works as expected, follow these steps:

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run the Development Server**:

   ```bash
   npm run start:dev
   ```

3. **Navigate to** [http://localhost:3000](http://localhost:3000) and test the application’s functionality.

## Questions

- **Project Link**: [Sound and Scene Deployment](https://sound-and-scene.onrender.com)
- **GitHub**: [Sinnema1](https://github.com/Sinnema1)
- **Contact**: For questions or feedback, email me at [test@test.com](mailto:test@test.com).
