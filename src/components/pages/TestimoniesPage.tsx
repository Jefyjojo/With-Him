import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { UserTestimonies } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<UserTestimonies[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTestimonies();
  }, []);

  const loadTestimonies = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<UserTestimonies>('usertestimonies');
    const approvedTestimonies = items.filter(t => t.isApproved === true);
    setTestimonies(approvedTestimonies);
    setIsLoading(false);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMMM d, yyyy');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full bg-secondary py-20 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-heading text-6xl lg:text-8xl text-primary mb-8 italic">
            Stories of Faith
          </h1>
          <p className="font-paragraph text-lg lg:text-xl text-secondary-foreground/80 max-w-3xl mx-auto">
            Read powerful testimonies from our community. Each story is a reminder of God's love, grace, and the beautiful ways He works in our lives.
          </p>
        </div>
      </section>

      {/* Testimonies Grid */}
      <section className="w-full bg-background py-20 lg:py-32">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary-foreground/60">
                Loading testimonies...
              </p>
            </div>
          ) : testimonies.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary-foreground/60">
                No testimonies available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {testimonies.map((testimony) => (
                <Link
                  key={testimony._id}
                  to={`/testimonies/${testimony._id}`}
                  className="group flex flex-col bg-secondary border-2 border-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  {testimony.userPhoto && (
                    <div className="w-full h-64 overflow-hidden bg-primary/5">
                      <Image 
                        src={testimony.userPhoto}
                        alt={`${testimony.authorName || 'User'} photo`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={400}
                      />
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col flex-1">
                    <h2 className="font-heading text-2xl lg:text-3xl text-primary mb-4 group-hover:opacity-80 transition-opacity duration-300">
                      {testimony.testimonyTitle}
                    </h2>
                    
                    <p className="font-paragraph text-base text-secondary-foreground/70 mb-6 line-clamp-3 flex-1">
                      {testimony.testimonyContent}
                    </p>
                    
                    <div className="flex flex-col gap-2 pt-4 border-t border-primary/10">
                      <p className="font-paragraph text-sm text-secondary-foreground font-semibold">
                        {testimony.authorName}
                      </p>
                      {testimony.submissionDate && (
                        <p className="font-paragraph text-sm text-secondary-foreground/60">
                          {formatDate(testimony.submissionDate)}
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
