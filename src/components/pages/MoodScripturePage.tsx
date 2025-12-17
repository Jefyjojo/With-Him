import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { MoodBasedScriptures } from '@/entities';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function MoodScripturePage() {
  const [scriptures, setScriptures] = useState<MoodBasedScriptures[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScriptures = async () => {
      try {
        const { items } = await BaseCrudService.getAll<MoodBasedScriptures>('moodbasedscriptures');
        setScriptures(items);
        if (items.length > 0) {
          setSelectedMood(items[0].mood || null);
        }
      } catch (err) {
        console.error('Failed to fetch scriptures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScriptures();
  }, []);

  const moods = Array.from(new Set(scriptures.map((s) => s.mood).filter(Boolean)));
  const selectedScriptures = scriptures.filter((s) => s.mood === selectedMood);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-paragraph text-secondary-foreground">Loading scriptures...</p>
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
          <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-4">Mood-Based Scripture</h1>
          <p className="font-paragraph text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            Find the perfect scripture for your current mood and heart condition
          </p>
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              className={`font-paragraph px-6 py-3 rounded-full transition-all duration-300 ${
                selectedMood === mood
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-white text-secondary-foreground border-2 border-primary/20 hover:border-primary'
              }`}
            >
              {mood}
            </button>
          ))}
        </motion.div>

        {/* Scriptures Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedScriptures.map((scripture, index) => (
            <motion.div
              key={scripture._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b-2 border-primary/20">
                <h3 className="font-heading text-xl text-primary mb-2">{scripture.mood}</h3>
                <p className="font-paragraph text-sm text-secondary-foreground/60">
                  Comfort Level: {scripture.comfortLevel}/10
                </p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="font-paragraph text-secondary-foreground/70 italic mb-3">
                    "{scripture.scriptureText}"
                  </p>
                  <p className="font-paragraph text-sm font-semibold text-primary">
                    {scripture.scriptureReference}
                  </p>
                </div>

                {scripture.keywords && (
                  <div>
                    <p className="font-paragraph text-xs text-secondary-foreground/50 uppercase tracking-wide mb-2">
                      Keywords
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {scripture.keywords.split(',').map((keyword) => (
                        <span
                          key={keyword.trim()}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full font-paragraph text-xs"
                        >
                          {keyword.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph py-2 rounded-lg transition-all duration-300 mt-4">
                  Meditate on This
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedScriptures.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="font-paragraph text-secondary-foreground/70 text-lg">
              No scriptures found for this mood. Please try another.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
