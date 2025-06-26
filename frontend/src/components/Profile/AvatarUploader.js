import React from 'react';
import api from 'api';

const AvatarUploader = ({ profile, setProfile, setMessage }) => {
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await api.put('/api/profile/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
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

  const avatarUrl = profile.user.avatar ? `${process.env.REACT_APP_API_URL}${profile.user.avatar}` : `${process.env.REACT_APP_API_URL}/uploads/user.png`;

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
        onError={(e) => (e.target.src = `${process.env.REACT_APP_API_URL}/uploads/user.png`)}
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