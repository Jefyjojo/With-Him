import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { MoodBasedScriptures } from '@/entities';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function DailyWalkPage() {
  const [dailyScripture, setDailyScripture] = useState<MoodBasedScriptures | null>(null);
  const [loading, setLoading] = useState(true);
  const [reflection, setReflection] = useState('');

  useEffect(() => {
    const fetchDailyScripture = async () => {
      try {
        const { items } = await BaseCrudService.getAll<MoodBasedScriptures>('moodbasedscriptures');
        if (items.length > 0) {
          const randomIndex = Math.floor(Math.random() * items.length);
          setDailyScripture(items[randomIndex]);
        }
      } catch (err) {
        console.error('Failed to fetch daily scripture:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyScripture();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-paragraph text-secondary-foreground">Preparing your daily walk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-4">Your Daily Walk</h1>
          <p className="font-paragraph text-xl text-secondary-foreground/70">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left: Scripture */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
          >
            <div className="mb-6">
              <p className="font-paragraph text-sm uppercase tracking-widest text-primary/60 mb-2">Today's Scripture</p>
              <h2 className="font-heading text-3xl text-primary">{dailyScripture?.mood}</h2>
            </div>

            <div className="space-y-6 border-l-4 border-primary pl-6">
              <p className="font-paragraph text-lg text-secondary-foreground/80 italic leading-relaxed">
                "{dailyScripture?.scriptureText}"
              </p>

              <div>
                <p className="font-paragraph text-sm font-semibold text-primary mb-2">
                  {dailyScripture?.scriptureReference}
                </p>
                <p className="font-paragraph text-sm text-secondary-foreground/60">
                  Comfort Level: {dailyScripture?.comfortLevel}/10
                </p>
              </div>
            </div>

            {dailyScripture?.keywords && (
              <div className="mt-8 pt-8 border-t border-primary/10">
                <p className="font-paragraph text-xs uppercase tracking-widest text-secondary-foreground/50 mb-3">
                  Key Themes
                </p>
                <div className="flex flex-wrap gap-2">
                  {dailyScripture.keywords.split(',').map((keyword) => (
                    <span
                      key={keyword.trim()}
                      className="bg-primary/10 text-primary px-4 py-2 rounded-full font-paragraph text-sm"
                    >
                      {keyword.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: Reflection Prompt */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
              <h3 className="font-heading text-2xl text-primary mb-4">Reflect & Meditate</h3>
              <p className="font-paragraph text-secondary-foreground/70 mb-6">
                Take a moment to meditate on this scripture. What does it mean to you today? How can you apply it to your life?
              </p>

              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your thoughts and reflections here..."
                className="w-full h-48 p-4 border-2 border-primary/20 rounded-lg font-paragraph text-secondary-foreground focus:outline-none focus:border-primary resize-none"
              />

              <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph py-3 rounded-lg transition-all duration-300">
                Save Reflection
              </Button>
            </div>

            {/* Prayer Prompt */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border-l-4 border-primary">
              <h3 className="font-heading text-xl text-primary mb-3">Prayer for Today</h3>
              <p className="font-paragraph text-secondary-foreground/70 italic">
                "Lord, help me to understand and apply this scripture in my life today. Guide my steps and strengthen my faith. Amen."
              </p>
              <Button
                variant="outline"
                className="w-full mt-6 border-2 border-primary text-primary hover:bg-primary/5 font-paragraph py-2 rounded-lg transition-all duration-300"
              >
                Go to Prayer Journal
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Daily Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
        >
          <h2 className="font-heading text-3xl text-primary mb-8">Daily Spiritual Practices</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Morning Prayer',
                description: 'Start your day with intention and gratitude',
                icon: '🌅',
              },
              {
                title: 'Scripture Reading',
                description: 'Meditate on the word of God',
                icon: '📖',
              },
              {
                title: 'Evening Reflection',
                description: 'Review your day and give thanks',
                icon: '🌙',
              },
            ].map((practice, index) => (
              <motion.div
                key={practice.title}
                whileHover={{ y: -4 }}
                className="p-6 border-2 border-primary/20 rounded-xl hover:border-primary transition-all duration-300"
              >
                <p className="text-3xl mb-3">{practice.icon}</p>
                <h3 className="font-heading text-lg text-primary mb-2">{practice.title}</h3>
                <p className="font-paragraph text-sm text-secondary-foreground/70">{practice.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
