import React, { useEffect, useState } from 'react';
import api from 'api';
import ProfileInfo from './ProfileInfo';
import ProfileEditor from './ProfileEditor';
import AvatarUploader from './AvatarUploader';
//import QuestionsList from './QuestionsList';
//import AnswersList from './AnswersList';
import { useAuth } from '../../hooks/useAuth'; // Add this

const Profile = () => {
  const { user, handleLogout } = useAuth(); // Add handleLogout
  const [profile, setProfile] = useState({
    user: { username: '', role: '', avatar: '' },
    questions: [],
    answers: [],
    department: '',
    skill: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    username: '',
    department: '',
    skill: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { user, questions, answers, department, skill } = res.data;
        setProfile({ user, questions, answers, department: department || '', skill: skill || '' });
        setEditedProfile({ username: user.username, department: department || '', skill: skill || '' });
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put('/api/profile', editedProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { user, department, skill } = res.data;
      setProfile({ ...profile, user, department: department || '', skill: skill || '' });
      setEditedProfile({ username: user.username, department: department || '', skill: skill || '' });
      setEditMode(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card shadow-sm mb-4" style={{ border: '1px solid rgb(205, 215, 234)' }}>
          <div className="card-body p-3 text-center d-flex flex-column align-items-center">
            <AvatarUploader profile={profile} setProfile={setProfile} setMessage={setMessage} />
            {editMode ? (
              <ProfileEditor
                editedProfile={editedProfile}
                handleChange={(e) => setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value })}
                handleSave={handleSave}
                setEditMode={setEditMode}
              />
            ) : (
              <ProfileInfo profile={profile} setEditMode={setEditMode} />
            )}
            {message && <p className="text-success mt-2">{message}</p>}
            <button className="btn btn-outline-danger btn-sm mt-3" onClick={handleLogout}>Logout</button>
          </div>
        </div>
       {/*<div className="accordion mb-4" id="profileAccordion">
          <QuestionsList questions={profile.questions} />
          <AnswersList answers={profile.answers} />
        </div>*/}
      </div>
    </div>
  );
};

export default Profile;