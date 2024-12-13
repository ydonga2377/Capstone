import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import defaultProfileImage from "../../images/default.png";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    profilePicture: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!user.username.trim()) {
      alert("Username is required!");
      return;
    }

    const formData = new FormData();
    formData.append("username", user.username);
    if (file) {
      formData.append("profilePicture", file);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile updated successfully!");
      setUser(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <div className="profile-picture">
        <img
          src={
            user.profilePicture
              ? `${process.env.REACT_APP_API_URL}${user.profilePicture}`
              : defaultProfileImage
          }
          alt="Profile"
          className="profile-picture-img"
        />
      </div>
      <div className="profile-details">
        <label>
          Username:
          <input
            type="text"
            value={user.username}
            placeholder="Enter your username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input type="email" value={user.email} disabled={!!user.email} />
        </label>
        <label>
          Upload Profile Picture:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Profile;
