import { useNavigate } from 'react-router-dom';
import { useMember } from '@/integrations';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function HomePage() {
  const navigate = useNavigate();
  const { member, isAuthenticated, actions } = useMember();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/welcome');
    } else {
      actions.login();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Hero Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-heading text-6xl lg:text-7xl text-primary leading-tight mb-4"
              >
                Your Spiritual Companion
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-paragraph text-xl lg:text-2xl text-secondary-foreground/80 leading-relaxed"
              >
                Grace is a Jesus-centered spiritual companion designed to guide you through daily devotions, scripture meditation, prayer journaling, and silent reflection. Find peace, strength, and purpose in your faith journey.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={handleGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-4 rounded-lg transition-all duration-300 text-lg"
              >
                {isAuthenticated ? 'Continue Your Journey' : 'Get Started'}
              </Button>
              <Button
                onClick={() => navigate('/mood-scripture')}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary/5 font-paragraph px-8 py-4 rounded-lg transition-all duration-300 text-lg"
              >
                Explore Scripture
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3 pt-4"
            >
              <p className="font-paragraph text-sm text-secondary-foreground/60 uppercase tracking-widest">
                Trusted by thousands of believers
              </p>
              <div className="flex gap-4 items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-primary/20 border-2 border-white flex items-center justify-center font-paragraph text-xs text-primary"
                    >
                      👤
                    </div>
                  ))}
                </div>
                <p className="font-paragraph text-sm text-secondary-foreground/70">
                  Join our growing community of believers
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl"></div>
              <Image
                src="https://static.wixstatic.com/media/3e9bb1_fc81ec0789ed4a1189bfb60cc01b9428~mv2.png?originWidth=576&originHeight=640"
                alt="Jesus walking beside a person in a peaceful garden, representing spiritual companionship"
                width={600}
                height={700}
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">How Grace Supports Your Faith</h2>
            <p className="font-paragraph text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
              Discover the features designed to deepen your spiritual journey and bring you closer to God
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '📖',
                title: 'Mood-Based Scripture',
                description: 'Find the perfect scripture for your current emotional state and spiritual needs',
                action: () => navigate('/mood-scripture'),
              },
              {
                icon: '🌅',
                title: 'Daily Walk',
                description: 'Start each day with a personalized devotion, scripture, and reflection prompt',
                action: () => navigate('/daily-walk'),
              },
              {
                icon: '🙏',
                title: 'Prayer Journal',
                description: 'Keep a private, sacred space to record your prayers and conversations with God',
                action: () => navigate('/prayer-journal'),
              },
              {
                icon: '☮️',
                title: 'Silent Reflection',
                description: 'Find peace through guided meditation and silent contemplation of God\'s presence',
                action: () => navigate('/silent-reflection'),
              },
              {
                icon: '💭',
                title: 'Reflections',
                description: 'Share your spiritual insights and read reflections from other believers',
                action: () => navigate('/reflections'),
              },
              {
                icon: '✨',
                title: 'Testimonies',
                description: 'Be inspired by stories of faith and transformation from our community',
                action: () => navigate('/testimonies'),
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={feature.action}
                className="bg-gradient-to-br from-background to-primary/5 rounded-2xl p-8 border-2 border-primary/10 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <p className="text-5xl mb-4">{feature.icon}</p>
                <h3 className="font-heading text-xl text-primary mb-3">{feature.title}</h3>
                <p className="font-paragraph text-secondary-foreground/70 mb-6">{feature.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-2 border-primary text-primary hover:bg-primary/5 font-paragraph py-2 rounded-lg transition-all duration-300"
                >
                  Explore
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl lg:text-5xl text-primary mb-4">Stories of Faith</h2>
          <p className="font-paragraph text-lg text-secondary-foreground/70 max-w-2xl mx-auto">
            See how Grace has impacted the lives of believers around the world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-primary"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-primary text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-paragraph text-secondary-foreground/80 mb-6 italic">
                "Grace has become an essential part of my daily spiritual practice. The personalized scripture and prayer journal have deepened my relationship with God in ways I never expected."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-paragraph text-lg">
                  👤
                </div>
                <div>
                  <p className="font-heading text-primary">Sarah M.</p>
                  <p className="font-paragraph text-xs text-secondary-foreground/60">Verified User</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => navigate('/testimonies')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph px-8 py-3 rounded-lg transition-all duration-300"
          >
            Read More Testimonies
          </Button>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 py-20 lg:py-24">
        <div className="max-w-[100rem] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="space-y-6"
          >
            <h2 className="font-heading text-4xl lg:text-5xl text-primary-foreground">
              Begin Your Spiritual Journey Today
            </h2>
            <p className="font-paragraph text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join thousands of believers who have found peace, purpose, and deeper faith through Grace
            </p>
            <Button
              onClick={handleGetStarted}
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary font-paragraph px-8 py-4 rounded-lg transition-all duration-300 text-lg"
            >
              {isAuthenticated ? 'Continue Your Journey' : 'Get Started Free'}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
