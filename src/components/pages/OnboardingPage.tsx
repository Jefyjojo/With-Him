import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { member } = useMember();
  const [formData, setFormData] = useState({
    userName: '',
    dateOfBirth: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.userName || !formData.dateOfBirth || !formData.gender) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      const userId = member?.loginEmail || `user-${Date.now()}`;

      await BaseCrudService.create('userprofiles', {
        _id: crypto.randomUUID(),
        externalUserId: userId,
        userName: formData.userName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
      });

      navigate('/welcome');
    } catch (err) {
      setError('Failed to save your information. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl text-primary mb-3">Welcome to Grace</h1>
            <p className="font-paragraph text-secondary-foreground/70">
              Let's get to know you better so we can personalize your spiritual journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-paragraph text-sm font-medium text-secondary-foreground block mb-2">
                Your Name
              </label>
              <Input
                type="text"
                placeholder="Enter your name"
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
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive p-3 rounded-lg font-paragraph text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph py-3 rounded-lg transition-all duration-300"
            >
              {loading ? 'Saving...' : 'Continue to Your Journey'}
            </Button>
          </form>

          <p className="font-paragraph text-xs text-secondary-foreground/50 text-center mt-6">
            Your information is secure and will be used only to personalize your experience
          </p>
        </div>
      </motion.div>
    </div>
  );
}
