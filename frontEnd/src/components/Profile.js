import React, { useEffect, useState } from 'react';
import { changePassword, deleteAccount, getUserProfile, updateUserProfile } from '../services/ProfileService/ProfileService';
import { useSelector } from 'react-redux';
import { Button, TextField, Dialog, Card, Typography, Box, IconButton } from '@mui/material';
import { Edit, Save, Delete, Password } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [userData, setUserData] = useState({});
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    contactNumber: '',
    address: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const data = await getUserProfile(userId);
      if (data) {
        setUserData(data);
        setFormData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          contactNumber: data.contactNumber || '',
          address: data.address || '',
        });
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const updateData = async () => {
    const newData = {
      userId: user._id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      contactNumber: formData.contactNumber,
    };
    await updateUserProfile(newData);
    setEditMode(false);
    fetchUserDetails();
  };

  const changePass = async () => {
    const newData = {
      userId: user._id,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    await changePassword(newData);
    setShowPasswordDialog(false);
  };

  const deleteUser = async () => {
    const userData = { userId: user._id };
    await deleteAccount(userData , navigate);
    setShowDeleteDialog(false);
  };

  return (
    <div className='w-screen h-screen bg-slate-800'>
        <div className="p-8 max-w-3xl mx-auto">
      <Card className="p-8 shadow-2xl rounded-2xl bg-gray-50">
        <Typography variant="h4" className="font-extrabold text-indigo-600 mb-8">
          User Profile
        </Typography>
        <Box className="space-y-6">
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            disabled={!editMode}
            onChange={changeHandler}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            disabled={!editMode}
            onChange={changeHandler}
            fullWidth
            variant="outlined"
          />
          <TextField label="Email" value={formData.email} disabled fullWidth variant="outlined" />
          <TextField
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            disabled={!editMode}
            onChange={changeHandler}
            fullWidth
            variant="outlined"
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            disabled={!editMode}
            onChange={changeHandler}
            fullWidth
            variant="outlined"
          />
        </Box>
        <Box className="mt-8 flex space-x-4">
          {!editMode && (
            <Button startIcon={<Edit />} variant="contained" color="primary" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          )}
          {editMode && (
            <Button startIcon={<Save />} variant="contained" color="success" onClick={updateData}>
              Save Changes
            </Button>
          )}
          <Button startIcon={<Password />} variant="outlined" color="secondary" onClick={() => setShowPasswordDialog(true)}>
            Change Password
          </Button>
          <Button startIcon={<Delete />} variant="outlined" color="error" onClick={() => setShowDeleteDialog(true)}>
            Delete Account
          </Button>
        </Box>
      </Card>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)}>
        <Box className="p-8">
          <Typography variant="h5" className="font-extrabold text-indigo-600">Change Password</Typography>
          <Box className="space-y-4 mt-4">
            <TextField
              label="Old Password"
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={changeHandler}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="New Password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={changeHandler}
              fullWidth
              variant="outlined"
            />
            <Button variant="contained" color="success" onClick={changePass}>
              Change Password
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <Box className="p-8">
          <Typography variant="h5" className="font-extrabold text-red-600">Delete Account</Typography>
          <Typography className="text-red-600 mt-2">
            Warning: Deleting your account will permanently remove all your data. Are you sure you want to proceed?
          </Typography>
          <Box className="flex space-x-4 mt-4">
            <Button variant="contained" color="error" onClick={deleteUser}>
              Yes, Delete
            </Button>
            <Button variant="outlined" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Dialog>
    </div>
    </div>
    
  );
}
