import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { UserReflections } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';

export default function ReflectionsPage() {
  const [reflections, setReflections] = useState<UserReflections[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string>('all');

  useEffect(() => {
    loadReflections();
  }, []);

  const loadReflections = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<UserReflections>('userreflections');
    setReflections(items);
    setIsLoading(false);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMMM d, yyyy');
  };

  const uniqueMoods = ['all', ...Array.from(new Set(reflections.map(r => r.moodTag).filter(Boolean)))];

  const filteredReflections = selectedMood === 'all' 
    ? reflections 
    : reflections.filter(r => r.moodTag === selectedMood);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-secondary py-20 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-heading text-6xl lg:text-8xl text-primary mb-8 italic">
            Daily Reflections
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
            Explore thoughtful reflections on scripture, faith, and spiritual growth. Find inspiration for your journey with Jesus.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      {uniqueMoods.length > 1 && (
        <section className="w-full bg-background py-12 border-b border-primary/10">
          <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {uniqueMoods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`font-paragraph text-sm px-6 py-2 border-2 transition-all duration-300 capitalize ${
                    selectedMood === mood
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reflections Grid */}
      <section className="w-full bg-background py-20 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary-foreground/60">
                Loading reflections...
              </p>
            </div>
          ) : filteredReflections.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary-foreground/60">
                No reflections available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {filteredReflections.map((reflection) => (
                <Link
                  key={reflection._id}
                  to={`/reflections/${reflection._id}`}
                  className="group flex flex-col lg:flex-row bg-secondary border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
                >
                  {reflection.featuredImage && (
                    <div className="w-full lg:w-1/3 h-64 lg:h-auto overflow-hidden bg-primary/5">
                      <Image 
                        src={reflection.featuredImage}
                        alt={reflection.title || 'Reflection image'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={400}
                      />
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col flex-1">
                    {reflection.moodTag && (
                      <span className="inline-block w-fit px-4 py-1 bg-badgebackground font-paragraph text-xs text-primary mb-4 capitalize">
                        {reflection.moodTag}
                      </span>
                    )}
                    
                    <h2 className="font-heading text-3xl lg:text-4xl text-primary mb-4 group-hover:opacity-80 transition-opacity duration-300">
                      {reflection.title}
                    </h2>
                    
                    <p className="font-paragraph text-base text-secondary-foreground/70 mb-6 line-clamp-3 flex-1">
                      {reflection.reflectionContent}
                    </p>
                    
                    <div className="flex flex-col gap-2 pt-4 border-t border-primary/10">
                      <p className="font-paragraph text-sm text-secondary-foreground font-semibold">
                        {reflection.authorName}
                      </p>
                      {reflection.submissionDate && (
                        <p className="font-paragraph text-sm text-secondary-foreground/60">
                          {formatDate(reflection.submissionDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
