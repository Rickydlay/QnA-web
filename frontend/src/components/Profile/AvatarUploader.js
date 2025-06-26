import React from 'react';
import api from 'api'; // Add this line

const AvatarUploader = ({ profile, setProfile, setMessage }) => {
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = localStorage.getItem('token');
      const res = await api.put('/api/profile/avatar', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      setProfile(prev => ({ ...prev, user: { ...prev.user, avatar: res.data.avatar } }));
      setMessage('Avatar updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to upload avatar.');
    }
  };

  const triggerFileInput = () => {
    document.getElementById('avatarUpload').click();
  };

  const avatarUrl = profile.user.avatar ? `http://localhost:5000${profile.user.avatar}` : 'http://localhost:5000/uploads/user.png';

  return (
    <div className="position-relative mb-3">
      <img
        src={avatarUrl}
        alt={`${profile.user.username || 'Guest'}'s avatar`}
        className="rounded-circle"
        width="40"
        height="40"
        onClick={triggerFileInput}
        style={{ cursor: 'pointer' }}
        onError={(e) => (e.target.src = 'http://localhost:5000/uploads/user.png')}
      />
      <input
        id="avatarUpload"
        type="file"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default AvatarUploader;