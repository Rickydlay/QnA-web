import React from 'react';

const ProfileInfo = ({ profile, setEditMode }) => (
  <div className="mt-3">
    <p className="card-text mb-1">Username: {profile.user.username || 'Not specified'}</p>
    <p className="card-text mb-1">Department: {profile.department || 'Not specified'}</p>
    <p className="card-text mb-1">Skill: {profile.skill || 'Not specified'}</p>
    <p className="card-text mb-1">Role: {profile.user.role}</p>
    <button className="btn btn-outline-primary btn-sm" onClick={() => setEditMode(true)}>Edit Profile</button>
  </div>
);

export default ProfileInfo;