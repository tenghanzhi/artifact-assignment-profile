import React, { useState, useEffect } from "react";
import axios from "axios";
import mockUserInfo from "../data/mockUserInfo";
import mockLocationInfo from "../data/mockLocationInfo";
import "./UserProfile.css";

const LOCATION_API_KEY = "";
const PROFILE_API_TOKEN = "";
const DEFAULT_PROFILE = {
  name: "",
  age: "",
  gender: "",
  location: "",
  interest1: "",
  interest2: "",
  email: "",
  username: "",
  displayName: "",
  avatarUri: "",
};

const UserProfile = () => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  useEffect(() => {
    handleCheckLocalStorage();
  }, []);

  // Fetch user location from API
  const fetchLocation = async () => {
    if (LOCATION_API_KEY) {
      try {
        const response = await axios.get(
          "https://ipgeolocation.abstractapi.com/v1/",
          {
            params: { api_key: LOCATION_API_KEY },
          }
        );
        setProfile((prev) => ({ ...prev, location: response.data.city }));
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    } else {
      setProfile((prev) => ({ ...prev, location: mockLocationInfo.city }));
    }
  };

  // Fetch user information from API
  const fetchUserInfo = async () => {
    if (PROFILE_API_TOKEN) {
      try {
        const response = await axios.get(
          "https://api-staging-0.gotartifact.com/v2/users/me",
          {
            headers: {
              Authorization: PROFILE_API_TOKEN,
            },
          }
        );
        const { email, username, display_name, avatar_uri } =
          response.data.profile;
        setProfile((prev) => ({
          ...prev,
          email,
          username,
          displayName: display_name,
          avatarUri: avatar_uri,
        }));
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    } else {
      const { email, username, display_name, avatar_uri } =
        mockUserInfo.profile;
      setProfile((prev) => ({
        ...prev,
        email,
        username,
        displayName: display_name,
        avatarUri: avatar_uri,
      }));
    }
  };

  // Check local storage
  const handleCheckLocalStorage = async () => {
    const storedProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (storedProfile) {
      setProfile(storedProfile);
    } else {
      try {
        await Promise.all([fetchUserInfo(), fetchLocation()]);
        console.log("Data fetched successfully from APIs.");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile data to local storage
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

  // Delete local storage saved profile
  const handleDelete = () => {
    localStorage.removeItem("userProfile");
    setProfile(DEFAULT_PROFILE);
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <form className="profile-form">
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="number"
          name="age"
          value={profile.age}
          onChange={handleChange}
          placeholder="Age"
        />
        <input
          type="text"
          name="gender"
          value={profile.gender}
          onChange={handleChange}
          placeholder="Gender"
        />
        <input
          type="text"
          name="location"
          value={profile.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="text"
          name="interest1"
          value={profile.interest1}
          onChange={handleChange}
          placeholder="Interest 1"
        />
        <input
          type="text"
          name="interest2"
          value={profile.interest2}
          onChange={handleChange}
          placeholder="Interest 2"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="text"
          name="displayName"
          value={profile.displayName}
          onChange={handleChange}
          placeholder="Display Name"
        />
        <input
          type="text"
          name="avatarUri"
          value={profile.avatarUri}
          onChange={handleChange}
          placeholder="Avatar URI"
        />
        <button
          className="fetch-location"
          type="button"
          onClick={fetchLocation}
        >
          Fetch Location
        </button>
        <button
          className="fetch-user-info"
          type="button"
          onClick={fetchUserInfo}
        >
          Fetch User Info
        </button>
        <button className="save-profile" type="button" onClick={handleSave}>
          Save Profile
        </button>
        <button
          className="delete-saved-profile"
          type="button"
          onClick={handleDelete}
        >
          Delete Saved Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
