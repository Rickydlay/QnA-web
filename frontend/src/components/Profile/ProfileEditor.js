import React from 'react';

const ProfileEditor = ({ editedProfile, handleChange, handleSave, setEditMode }) => (
  <div className="mt-3">
    <input
      type="text"
      name="username"
      value={editedProfile.username}
      onChange={handleChange}
      className="form-control mb-2"
      placeholder="Username"
    />
    <input
      type="text"
      name="department"
      value={editedProfile.department}
      onChange={handleChange}
      className="form-control mb-2"
      placeholder="Department"
    />
    <input
      type="text"
      name="skill"
      value={editedProfile.skill}
      onChange={handleChange}
      className="form-control mb-2"
      placeholder="Skill"
    />
    <button className="btn btn-primary btn-sm me-2" onClick={handleSave}>Save</button>
    <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(false)}>Cancel</button>
  </div>
);

export default ProfileEditor;