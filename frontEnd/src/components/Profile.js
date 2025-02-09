import React, { useEffect, useState } from 'react';
import { changePassword, deleteAccount, getUserProfile, updateUserProfile } from '../services/ProfileService/ProfileService';
import { useSelector } from 'react-redux';
import { Button, TextField, Dialog, Card, Typography, Box, IconButton, Avatar, Skeleton, CircularProgress } from '@mui/material';
import { Edit, Save, Delete, Password, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true);
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
      toast.error("Error fetching user details");
      console.error("Error fetching user details:", error.message);
    } finally {
      setIsLoading(false);
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
    try {
      setIsSaving(true);
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
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-8"
    >
      <ToastContainer position="top-right" />
      <div className="max-w-4xl mx-auto">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          className="mb-6 text-white hover:text-gray-200"
        >
          Back
        </Button>

        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 md:p-8">
              <div className="flex items-center space-x-4">
                <Avatar 
                  className="w-20 h-20 border-4 border-white"
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${formData.firstName} ${formData.lastName}`}
                />
                <div>
                  <Typography variant="h4" className="text-white font-bold">
                    {isLoading ? (
                      <Skeleton width={200} />
                    ) : (
                      `${formData.firstName} ${formData.lastName}`
                    )}
                  </Typography>
                  <Typography className="text-gray-200">
                    {isLoading ? <Skeleton width={150} /> : formData.email}
                  </Typography>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} height={56} />
                  ))
                ) : (
                  <>
                    <TextField
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      disabled={!editMode}
                      onChange={changeHandler}
                      fullWidth
                      variant="outlined"
                      className="transition-all duration-300"
                    />
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      disabled={!editMode}
                      onChange={changeHandler}
                      fullWidth
                      variant="outlined"
                      className="transition-all duration-300"
                    />
                    <TextField label="Email" value={formData.email} disabled fullWidth variant="outlined" className="transition-all duration-300" />
                    <TextField
                      label="Contact Number"
                      name="contactNumber"
                      value={formData.contactNumber}
                      disabled={!editMode}
                      onChange={changeHandler}
                      fullWidth
                      variant="outlined"
                      className="transition-all duration-300"
                    />
                    <TextField
                      label="Address"
                      name="address"
                      value={formData.address}
                      disabled={!editMode}
                      onChange={changeHandler}
                      fullWidth
                      variant="outlined"
                      className="transition-all duration-300"
                    />
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                {!editMode ? (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      startIcon={<Edit />}
                      variant="contained"
                      color="primary"
                      onClick={() => setEditMode(true)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600"
                    >
                      Edit Profile
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      startIcon={isSaving ? <CircularProgress size={20} /> : <Save />}
                      variant="contained"
                      color="success"
                      onClick={updateData}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </motion.div>
                )}
                <Button startIcon={<Password />} variant="outlined" color="secondary" onClick={() => setShowPasswordDialog(true)}>
                  Change Password
                </Button>
                <Button startIcon={<Delete />} variant="outlined" color="error" onClick={() => setShowDeleteDialog(true)}>
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Enhanced Dialogs */}
        <Dialog
          open={showPasswordDialog}
          onClose={() => setShowPasswordDialog(false)}
          PaperProps={{
            className: 'rounded-lg',
            component: motion.div,
            initial: { y: -20, opacity: 0 },
            animate: { y: 0, opacity: 1 },
          }}
        >
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

        <Dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          PaperProps={{
            className: 'rounded-lg',
            component: motion.div,
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
          }}
        >
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
    </motion.div>
  );
}
