import { useEffect, useState } from 'react';
import { useMember } from '@/integrations';
import { BaseCrudService } from '@/integrations';
import { UserProfiles } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const { member, actions } = useMember();
  const [userProfile, setUserProfile] = useState<UserProfiles | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    dateOfBirth: '',
    gender: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!member?.loginEmail) return;

        const { items } = await BaseCrudService.getAll<UserProfiles>('userprofiles');
        const userProf = items.find((p) => p.externalUserId === member.loginEmail);

        if (userProf) {
          setUserProfile(userProf);
          setFormData({
            userName: userProf.userName || '',
            dateOfBirth: userProf.dateOfBirth ? new Date(userProf.dateOfBirth).toISOString().split('T')[0] : '',
            gender: userProf.gender || '',
          });
        }
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [member]);

  const handleSaveProfile = async () => {
    try {
      if (!userProfile?._id) return;

      await BaseCrudService.update('userprofiles', {
        _id: userProfile._id,
        userName: formData.userName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
      });

      setUserProfile({
        ...userProfile,
        userName: formData.userName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-paragraph text-secondary-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="mb-12">
            <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-4">Your Profile</h1>
            <p className="font-paragraph text-xl text-secondary-foreground/70">
              Manage your personal information and preferences
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 space-y-8">
            {/* Account Information */}
            <div className="border-b border-primary/10 pb-8">
              <h2 className="font-heading text-2xl text-primary mb-6">Account Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-paragraph text-sm text-secondary-foreground/60 mb-2">Email</p>
                  <p className="font-paragraph text-lg text-secondary-foreground">{member?.loginEmail}</p>
                </div>
                <div>
                  <p className="font-paragraph text-sm text-secondary-foreground/60 mb-2">Member Since</p>
                  <p className="font-paragraph text-lg text-secondary-foreground">
                    {member?._createdDate
                      ? new Date(member._createdDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Recently'}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="border-b border-primary/10 pb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-2xl text-primary">Personal Information</h2>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/5 font-paragraph py-2 px-4 rounded-lg transition-all duration-300"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="font-paragraph text-sm font-medium text-secondary-foreground block mb-2">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm font-medium text-secondary-foreground block mb-2">
                      Date of Birth
                    </label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="font-paragraph text-sm font-medium text-secondary-foreground block mb-2">
                      Gender
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-primary/20 rounded-lg font-paragraph text-secondary-foreground focus:outline-none focus:border-primary"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph py-3 rounded-lg transition-all duration-300"
                  >
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="font-paragraph text-sm text-secondary-foreground/60 mb-2">Full Name</p>
                    <p className="font-paragraph text-lg text-secondary-foreground">{userProfile?.userName || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-secondary-foreground/60 mb-2">Date of Birth</p>
                    <p className="font-paragraph text-lg text-secondary-foreground">
                      {userProfile?.dateOfBirth
                        ? new Date(userProfile.dateOfBirth).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : 'Not set'}
                    </p>
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-secondary-foreground/60 mb-2">Gender</p>
                    <p className="font-paragraph text-lg text-secondary-foreground capitalize">
                      {userProfile?.gender || 'Not set'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Account Actions */}
            <div className="pt-8">
              <h2 className="font-heading text-2xl text-primary mb-6">Account Actions</h2>
              <Button
                onClick={actions.logout}
                className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground font-paragraph py-3 rounded-lg transition-all duration-300"
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-primary cursor-pointer"
            >
              <h3 className="font-heading text-lg text-primary mb-2">Prayer Journal</h3>
              <p className="font-paragraph text-sm text-secondary-foreground/70 mb-4">
                View and manage your private prayer entries
              </p>
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 font-paragraph py-2 px-4 rounded-lg transition-all duration-300"
              >
                Go to Journal
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-primary cursor-pointer"
            >
              <h3 className="font-heading text-lg text-primary mb-2">Daily Walk</h3>
              <p className="font-paragraph text-sm text-secondary-foreground/70 mb-4">
                Continue your daily spiritual practice
              </p>
              <Button
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 font-paragraph py-2 px-4 rounded-lg transition-all duration-300"
              >
                Start Today
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
