import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "../utils/debounce";
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

const SAVE_STATUE = {
  SAVED: "saved",
  NOT_SAVED: "not-saved",
};

const MESSAGES_MATRIX = {
  CONFIRM_FETCH_LOCATION:
    "Fetch Location will overwrite existing location information, are you sure to process?",
  CONFIRM_FETCH_USER_INFO:
    "Fetch User Info will overwrite existing user information, are you sure to process?",
  CONFIRM_DELETE_SAVED_PROFILE:
    "Confirm to delete saved profile and clean the fields?",
};

const UserProfile = () => {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [autoSave, setAutoSave] = useState(true);
  const [saveStatus, setSaveStatus] = useState(SAVE_STATUE.SAVED);

  useEffect(() => {
    handleCheckLocalStorage();
  }, []);

  useEffect(() => {
    if (autoSave) {
      debouncedSave();
    }
  }, [profile]);

  // Fetch user location from API
  const fetchLocation = async () => {
    if (
      (profile.location &&
        window.confirm(MESSAGES_MATRIX.CONFIRM_FETCH_LOCATION)) ||
      !profile.location
    ) {
      if (LOCATION_API_KEY) {
        try {
          const response = await axios.get(
            "https://ipgeolocation.abstractapi.com/v1/",
            {
              params: { api_key: LOCATION_API_KEY },
            }
          );
          setProfile((prev) => ({
            ...prev,
            location: response.data.city,
          }));
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      } else {
        setProfile((prev) => ({
          ...prev,
          location: mockLocationInfo.city,
        }));
      }
    }
  };

  // Fetch user information from API
  const fetchUserInfo = async () => {
    const { email, username, displayName, avatarUri } = profile;

    const fieldFilled = email || username || displayName || avatarUri;

    if (
      (fieldFilled &&
        window.confirm(MESSAGES_MATRIX.CONFIRM_FETCH_USER_INFO)) ||
      !fieldFilled
    ) {
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

  // Save profile data to local storage
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setSaveStatus(SAVE_STATUE.SAVED);
  };

  const debouncedSave = debounce(() => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setSaveStatus(SAVE_STATUE.SAVED);
  }, 1000);

  // Delete local storage saved profile
  const handleDelete = () => {
    if (window.confirm(MESSAGES_MATRIX.CONFIRM_DELETE_SAVED_PROFILE)) {
      localStorage.removeItem("userProfile");
      setProfile(DEFAULT_PROFILE);
    }
  };

  // Handle auto save checkbox change
  const handleAutoSaveChange = () => {
    if (!autoSave) {
      handleSave();
    }
    setAutoSave((prev) => !prev);
  };

  // Handle form input change
  const handleChange = (e) => {
    setSaveStatus("not-saved");
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
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
        <textarea
          name="interest1"
          value={profile.interest1}
          onChange={handleChange}
          placeholder="Interest 1"
        />
        <textarea
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
        <div className="auto-save-container">
          <input
            type="checkbox"
            name={"autoSave"}
            value={autoSave}
            checked={autoSave}
            onChange={handleAutoSaveChange}
          />
          <span className="auto-save-title">AutoSave</span>
          <span className={`save-status-${saveStatus}`}>
            {saveStatus === "not-saved" ? "Not Saved" : "Saved"}
          </span>
        </div>
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
        <button
          className="save-profile"
          type="button"
          onClick={handleSave}
          style={{ visibility: autoSave ? "hidden" : "visible" }}
        >
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
