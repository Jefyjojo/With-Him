import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { useMember } from '@/integrations';
import { PrayerJournal } from '@/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

export default function PrayerJournalPage() {
  const { member } = useMember();
  const [entries, setEntries] = useState<PrayerJournal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    entryTitle: '',
    prayerContent: '',
    moodTag: 'grateful',
    isPrivate: true,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, [member]);

  const fetchEntries = async () => {
    try {
      if (!member?.loginEmail) return;

      const { items } = await BaseCrudService.getAll<PrayerJournal>('prayerjournal');
      // Note: Currently showing all entries. To filter by user, you would need to:
      // 1. Add a userId field to PrayerJournal, or
      // 2. Use the userprofiles relationship properly
      setEntries(items);
    } catch (err) {
      console.error('Failed to fetch prayer entries:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await BaseCrudService.create('prayerjournal', {
        _id: crypto.randomUUID(),
        entryTitle: formData.entryTitle,
        prayerContent: formData.prayerContent,
        entryDate: new Date(),
        moodTag: formData.moodTag,
        isPrivate: formData.isPrivate,
      });

      setFormData({
        entryTitle: '',
        prayerContent: '',
        moodTag: 'grateful',
        isPrivate: true,
      });
      setShowForm(false);
      await fetchEntries();
    } catch (err) {
      console.error('Failed to create prayer entry:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this prayer entry?')) {
      try {
        await BaseCrudService.delete('prayerjournal', id);
        await fetchEntries();
      } catch (err) {
        console.error('Failed to delete prayer entry:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-paragraph text-secondary-foreground">Loading your prayer journal...</p>
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
          className="flex justify-between items-start mb-12"
        >
          <div>
            <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-4">Prayer Journal</h1>
            <p className="font-paragraph text-xl text-secondary-foreground/70">
              A sacred space for your prayers and conversations with God
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-6 py-3 rounded-lg transition-all duration-300"
          >
            {showForm ? 'Cancel' : '+ New Prayer'}
          </Button>
        </motion.div>

        {/* New Prayer Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 mb-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="font-paragraph text-sm font-medium text-secondary-foreground block mb-2">
                  Prayer Title
                </label>
                <Input
                  type="text"
                  placeholder="Give your prayer a title..."
                  value={formData.entryTitle}
                  onChange={(e) => setFormData({ ...formData, entryTitle: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <label className="font-paragraph text-sm font-medium text-secondary-foreground block mb-2">
                  Your Prayer
                </label>
                <textarea
                  placeholder="Write your prayer here... This is a private space between you and God."
                  value={formData.prayerContent}
                  onChange={(e) => setFormData({ ...formData, prayerContent: e.target.value })}
                  required
                  className="w-full h-48 p-4 border-2 border-primary/20 rounded-lg font-paragraph text-secondary-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-paragraph text-sm font-medium text-secondary-foreground block mb-2">
                    Current Mood
                  </label>
                  <Select value={formData.moodTag} onValueChange={(value) => setFormData({ ...formData, moodTag: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grateful">Grateful</SelectItem>
                      <SelectItem value="anxious">Anxious</SelectItem>
                      <SelectItem value="joyful">Joyful</SelectItem>
                      <SelectItem value="sorrowful">Sorrowful</SelectItem>
                      <SelectItem value="peaceful">Peaceful</SelectItem>
                      <SelectItem value="confused">Confused</SelectItem>
                      <SelectItem value="hopeful">Hopeful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="font-paragraph text-sm font-medium text-secondary-foreground block mb-2">
                    Privacy
                  </label>
                  <Select
                    value={formData.isPrivate ? 'private' : 'shared'}
                    onValueChange={(value) => setFormData({ ...formData, isPrivate: value === 'private' })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private (Only Me)</SelectItem>
                      <SelectItem value="shared">Shared (With Community)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph py-3 rounded-lg transition-all duration-300"
              >
                {submitting ? 'Saving Prayer...' : 'Save Prayer'}
              </Button>
            </form>
          </motion.div>
        )}

        {/* Prayer Entries */}
        <div className="space-y-6">
          {entries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-lg p-12 text-center"
            >
              <p className="font-paragraph text-lg text-secondary-foreground/70 mb-4">
                Your prayer journal is empty. Start by writing your first prayer.
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-3 rounded-lg transition-all duration-300"
              >
                Write Your First Prayer
              </Button>
            </motion.div>
          ) : (
            entries.map((entry, index) => (
              <motion.div
                key={entry._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl text-primary mb-2">{entry.entryTitle}</h3>
                    <div className="flex gap-3 items-center">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-paragraph text-xs">
                        {entry.moodTag}
                      </span>
                      <span className="font-paragraph text-sm text-secondary-foreground/60">
                        {entry.entryDate
                          ? new Date(entry.entryDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'No date'}
                      </span>
                      {entry.isPrivate && (
                        <span className="font-paragraph text-xs text-secondary-foreground/50">🔒 Private</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => entry._id && handleDelete(entry._id)}
                    className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors duration-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <p className="font-paragraph text-secondary-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {entry.prayerContent}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
