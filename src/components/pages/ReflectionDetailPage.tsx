import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { UserReflections } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { format } from 'date-fns';
import { ArrowLeft } from 'lucide-react';

export default function ReflectionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [reflection, setReflection] = useState<UserReflections | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadReflection();
    }
  }, [id]);

  const loadReflection = async () => {
    if (!id) return;
    
    setIsLoading(true);
    const item = await BaseCrudService.getById<UserReflections>('userreflections', id);
    setReflection(item);
    setIsLoading(false);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMMM d, yyyy');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <p className="font-paragraph text-lg text-secondary-foreground/60">
            Loading reflection...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!reflection) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <p className="font-paragraph text-lg text-secondary-foreground/60 mb-6">
              Reflection not found
            </p>
            <Link 
              to="/reflections" 
              className="font-paragraph text-base px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-block"
            >
              Back to Reflections
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Back Navigation */}
      <section className="w-full bg-secondary py-8">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <Link 
            to="/reflections" 
            className="inline-flex items-center gap-2 font-paragraph text-base text-secondary-foreground hover:opacity-70 transition-opacity duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Reflections
          </Link>
        </div>
      </section>

      {/* Reflection Content */}
      <section className="w-full bg-background py-20 lg:py-32">
        <div className="max-w-[60rem] mx-auto px-6 lg:px-12">
          {reflection.featuredImage && (
            <div className="w-full h-96 mb-12 overflow-hidden bg-primary/5">
              <Image 
                src={reflection.featuredImage}
                alt={reflection.title || 'Reflection image'}
                className="w-full h-full object-cover"
                width={800}
              />
            </div>
          )}
          
          <div className="mb-8">
            {reflection.moodTag && (
              <span className="inline-block px-5 py-2 bg-badgebackground font-paragraph text-sm text-primary mb-6 capitalize">
                {reflection.moodTag}
              </span>
            )}
            
            <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-6 italic">
              {reflection.title}
            </h1>
            
            <div className="flex items-center gap-4 pb-6 border-b-2 border-primary/10">
              <p className="font-paragraph text-lg text-secondary-foreground font-semibold">
                {reflection.authorName}
              </p>
              {reflection.submissionDate && (
                <>
                  <span className="text-secondary-foreground/30">•</span>
                  <p className="font-paragraph text-base text-secondary-foreground/60">
                    {formatDate(reflection.submissionDate)}
                  </p>
                </>
              )}
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="font-paragraph text-lg text-secondary-foreground/80 leading-relaxed whitespace-pre-wrap">
              {reflection.reflectionContent}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-secondary py-16 lg:py-24">
        <div className="max-w-[60rem] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl text-primary mb-6">
            Find daily encouragement
          </h2>
          <p className="font-paragraph text-base text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Download the Grace app and receive scripture that speaks to your heart, wherever you are in your journey.
          </p>
          <a 
            href="/#download" 
            className="font-paragraph text-base px-10 py-4 bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 inline-block"
          >
            Get the App
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
