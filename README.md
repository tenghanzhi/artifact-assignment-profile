# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Objective:
This assignment evaluates your ability to develop a React web application with a focus on creating dynamic pages, implementing form handling, managing local storage, and integrating API usage. Your task is to set up and create a React app with dedicated pages for user profiles and interest fields. The application should enable users to input and save information seamlessly. Additionally, it should incorporate features such as local storage interaction for saving user state, reading JSON from local file storage to display static information, and API integration for fetching and updating user details.

# Time Estimate:
X hours

# Deliverables:
## Designing React Pages:
User Profile Page:
Load JSON file locally with these fields and dynamically display/populate fields.
Fields: Name, Age, Gender, Location, Interest 1, Interest 2, Email, Username, Display name and Avatar URI
Implement an API call to auto-fill the user's location. Allow users to override if necessary.
Fields: Location
Implement an API call to read the user’s email and username from the given endpoint with the following parameters and authentication information.
Fields: Email, Username, Display name, and Avatar URI

Functionality:
Local Storage Interaction to store user profile states:
Save user input to local storage.
Load stored data upon page refresh.
Load & Read JSON for populating fields:
Implement the ability to read a JSON file from local storage.
Display static information on the page.

API Integration #1 to populate user location:
Implement functionality to interact with geolocation endpoints.
https://www.abstractapi.com/api/ip-geolocation-api
Enable fetching and updating of user location.
API Integration #2 to populate user information:
Implement functionality to interact with https://api-staging-0.gotartifact.com/v2/users/me
Enable fetching and displaying user email, username, display name & avatar URI from the API endpoint with the given authentication token.
Use the following as an example response to integrate API with the page. Since the authentication token expires after 60 minutes from issuance, the below command will fail to request. Still, please use the example response below to mock your page. During the code-checking/review phase, we will verify with the actual latest token to ensure the page functions as intended.
Request: curl --location 'https://api-staging-0.gotartifact.com/v2/users/me' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjZjdmODcyNzA5MWU0Yzc3YWE5OTVkYjYwNzQzYjdkZDJiYjcwYjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWR0ZXN0LTk2YWJlIiwiYXVkIjoiYWR0ZXN0LTk2YWJlIiwiYXV0aF90aW1lIjoxNzA1NjA2NDE1LCJ1c2VyX2lkIjoiczFINTJ6OTNFcmJPaGV0SGhIMEE3ZUxCOElqMiIsInN1YiI6InMxSDUyejkzRXJiT2hldEhoSDBBN2VMQjhJajIiLCJpYXQiOjE3MDU2MDY0MTUsImV4cCI6MTcwNTYxMDAxNSwiZW1haWwiOiJucG1AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5wbUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.jT9vIRl9yLgOcEvGfenfTygx1bOG4DYvhgJkbXFabQ6soDjlWRVUW2yWN_BmRlwMN8zoG04EMNrDKA18EB_5fFFjnKfl5VryibI4R3_K6afXYLQr-35EzVuU1LtjgmwAQ3xIQA1nkW58KVIE7mJiI9XS3lZjTGJ66XLyZHmOsvqreZiU32p6LxoujGRmLnl2Ha8Kwkb9CM_uOzPNkgQiPQG5wDnn_P9BJUx0DGljdA60D3_2JPuMuFYBMlD7o1SnVMKdomqlF2NeQf9wysp5uUklAfBblPURLf0bZ0Ohi7nGKr6iQUvq8rUjFdCSfcGuRmWFWDUj_yE0vVeXenZa5A'

Response: {“success”:true,“profile”:{“user_uuid”:“aa2a7a42-82a7-4350-b23f-57c74445964d”,“email”:“npm@gmail.com”,“username”:“jaytest”,“display_name”:“jaytest”,“location”:“”,“biography”:“”,“avatar_uri”:“https://firebasestorage.googleapis.com/v0/b/adtest-96abe.appspot.com/o/images%2Fjaytest%2F4475da4a-7526-4c34-88fb-05712576b738.png?alt=media&token=a29930c9-d8a7-448d-a952-4791b282a368”,“banner_uri”:“/images/content/profile/default_banner.png”,“badge”:“”,“socials”:null,“created_at”:“2024-01-18T01:08:19+0000”}}

Submission Instructions:
Submit the React app source code on GitHub.
Include a document outlining the steps taken to design React pages.


### `Page Link: https://tenghanzhi.github.io/artifact-assignment-profile/`

### `Design Steps`
- Requirements Gathering
  1. Pages for user profiles and interest fields.
  2. Enable users to input and save information seamlessly.
  3. Use local storage interaction for saving user state
  4. Reading JSON from local file storage to display static information
  5. API integration for fetching and updating user details
   
- Architecture/High-level Design
  1. Application approach:
        - SPA will be recommended because it is easier to share data between components and pages.
        - SSR or CSR are all will be fine for this application, because we don't need to worry about the SEO is this scenario, also the page is not heavy rendered
        - Concluding: I will use SPA & CSR to accomplish this assignment.
  2. Server:
        - API for load user location data: 'https://ipgeolocation.abstractapi.com/v1', {method: 'GET'}
        - API for populate user information (will be mocked locally): 'https://api-staging-0.gotartifact.com/v2/users/me', {'Authorization:''}
        - API for update user information (? not mentioned in the assignment)
  3. CDN Server:
        - Not necessary for current application because not large multi-media files need to be stored.
  4. Client
        - Pages
            - This page will have a form with fields for Name, Age, Gender, Location, Interest 1, Interest 2, Email, Username, Display Name, and Avatar URI.
            - The form fields are populated using data from local storage, JSON file, and APIs.
        - Controller
            - Controls the flow of Local Storage data within the application
            - Makes network API requests to the server.
        - Store
            - Local Storage
            - React States
            - Redux (future scalability)

- Data Model
  
        - Mocked User Information API Response: 
            {
                “success”:true,
                “profile”:{
                    “user_uuid”:“aa2a7a42-82a7-4350-b23f-57c74445964d”,
                    “email”:“npm@gmail.com”,
                    “username”:“jaytest”,
                    “display_name”:“jaytest”,
                    “location”:“”,
                    “biography”:“”,
                    “avatar_uri”:“https://firebasestorage.googleapis.com/v0/b/adtest-96abe.appspot.com/o/images%2Fjaytest%2F4475da4a-7526-4c34-88fb-05712576b738.png?alt=media&token=a29930c9-d8a7-448d-a952-4791b282a368”,“banner_uri”:“/images/content/profile/default_banner.png”,
                    “badge”:“”,
                    “socials”:null,
                    “created_at”:“2024-01-18T01:08:19+0000”
                }
            }
            
        - Location API Response:
            {
                "ip_address": "166.171.248.255",
                "city": "San Jose",
                "city_geoname_id": 5392171,
                "region": "California",
                "region_iso_code": "CA",
                "region_geoname_id": 5332921,
                "postal_code": "95141",
                "country": "United States",
                "country_code": "US",
                "country_geoname_id": 6252001,
                "country_is_eu": false,
                "continent": "North America",
                "continent_code": "NA",
                "continent_geoname_id": 6255149,
                "longitude": -121.7714,
                "latitude": 37.1835,
                "security": {
                    "is_vpn": false
                },
                "timezone": {
                    "name": "America/Los_Angeles",
                    "abbreviation": "PDT",
                    "gmt_offset": -7,
                    "current_time": "06:37:41",
                    "is_dst": true
                },
                "flag": {
                    "emoji": "🇺🇸",
                    "unicode": "U+1F1FA U+1F1F8",
                    "png": "https://static.abstractapi.com/country-flags/US_flag.png",
                    "svg": "https://static.abstractapi.com/country-flags/US_flag.svg"
                },
                "currency": {
                    "currency_name": "USD",
                    "currency_code": "USD"
                },
                "connection": {
                    "autonomous_system_number": 20057,
                    "autonomous_system_organization": "ATT-MOBILITY-LLC-AS20057",
                    "connection_type": "Cellular",
                    "isp_name": "AT&T Mobility LLC",
                    "organization_name": "Service Provider Corporation"
                }
}

- Interface / API
  1. Update LOCATION_API_KEY will automatically trigger actual location fetch function: 
      - API: "https://ipgeolocation.abstractapi.com/v1/"
      - params: { api_key: LOCATION_API_KEY },
      - method: "GET",
  2. Update PROFILE_API_TOKEN will automatically trigger actual location fetch function:
      - API: "https://api-staging-0.gotartifact.com/v2/users/me"
      - headers: { Authorization: PROFILE_API_TOKEN },
      - method: "GET",
  3. fetchLocation => Fetch user location from API
  4. fetchUserInfo => Fetch user information from API
  5. handleCheckLocalStorage => Check local storage
  6. handleChange => Handle form input change
  7. handleSave => Save profile data to local storage
  8. handleDelete => Delete local storage saved profile
