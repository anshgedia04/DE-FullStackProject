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
<div></div>
  );
}
