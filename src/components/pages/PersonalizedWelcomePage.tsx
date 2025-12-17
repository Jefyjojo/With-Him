import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { useMember } from '@/integrations';
import { UserProfiles } from '@/entities';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function PersonalizedWelcomePage() {
  const navigate = useNavigate();
  const { member } = useMember();
  const [userProfile, setUserProfile] = useState<UserProfiles | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!member?.loginEmail) {
          navigate('/onboarding');
          return;
        }

        const { items } = await BaseCrudService.getAll<UserProfiles>('userprofiles');
        const userProf = items.find((p) => p.externalUserId === member.loginEmail);

        if (!userProf) {
          navigate('/onboarding');
          return;
        }

        setUserProfile(userProf);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        navigate('/onboarding');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [member, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-paragraph text-secondary-foreground">Loading your journey...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  const getAgeGroup = (dateOfBirth: string | Date | undefined) => {
    if (!dateOfBirth) return 'friend';
    const birthDate = new Date(dateOfBirth);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 18) return 'young friend';
    if (age < 30) return 'young adult';
    if (age < 50) return 'friend';
    return 'beloved elder';
  };

  const ageGroup = getAgeGroup(userProfile.dateOfBirth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div>
              <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-4">
                Welcome, {userProfile.userName}
              </h1>
              <p className="font-paragraph text-xl text-secondary-foreground/80">
                We're honored to walk alongside you on this spiritual journey. Grace is here to provide daily encouragement, scripture, and a space for your prayers and reflections.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-2xl text-primary">Your Personalized Experience</h2>
              <p className="font-paragraph text-secondary-foreground/70">
                Based on your profile, we've tailored content specifically for you. Explore scriptures that speak to your heart, share your reflections, and keep a private prayer journal.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary"
              >
                <p className="font-heading text-2xl text-primary mb-2">📖</p>
                <h3 className="font-heading text-lg text-secondary-foreground mb-1">Daily Scripture</h3>
                <p className="font-paragraph text-sm text-secondary-foreground/60">
                  Mood-based verses for your day
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary"
              >
                <p className="font-heading text-2xl text-primary mb-2">🙏</p>
                <h3 className="font-heading text-lg text-secondary-foreground mb-1">Prayer Journal</h3>
                <p className="font-paragraph text-sm text-secondary-foreground/60">
                  Keep your prayers private and sacred
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary"
              >
                <p className="font-heading text-2xl text-primary mb-2">💭</p>
                <h3 className="font-heading text-lg text-secondary-foreground mb-1">Reflections</h3>
                <p className="font-paragraph text-sm text-secondary-foreground/60">
                  Share your spiritual insights
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary"
              >
                <p className="font-heading text-2xl text-primary mb-2">✨</p>
                <h3 className="font-heading text-lg text-secondary-foreground mb-1">Testimonies</h3>
                <p className="font-paragraph text-sm text-secondary-foreground/60">
                  Inspire others with your story
                </p>
              </motion.div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => navigate('/mood-scripture')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-3 rounded-lg transition-all duration-300"
              >
                Explore Scripture
              </Button>
              <Button
                onClick={() => navigate('/prayer-journal')}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 font-paragraph px-8 py-3 rounded-lg transition-all duration-300"
              >
                Start Praying
              </Button>
            </div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-2xl"></div>
              <Image
                src="https://static.wixstatic.com/media/3e9bb1_fc81ec0789ed4a1189bfb60cc01b9428~mv2.png?originWidth=576&originHeight=640"
                alt="Jesus walking with a person in a peaceful garden setting"
                width={500}
                height={600}
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-white rounded-2xl p-8 lg:p-12 shadow-lg border-t-4 border-primary"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-heading text-3xl text-primary mb-4">Begin Your Journey Today</h2>
            <p className="font-paragraph text-secondary-foreground/70 mb-8">
              Every day is an opportunity to grow closer to God. Let Grace be your companion in faith, providing daily encouragement, scripture, and a sacred space for your spiritual practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/daily-walk')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-3 rounded-lg transition-all duration-300"
              >
                Start Daily Walk
              </Button>
              <Button
                onClick={() => navigate('/reflections')}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 font-paragraph px-8 py-3 rounded-lg transition-all duration-300"
              >
                Read Reflections
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
