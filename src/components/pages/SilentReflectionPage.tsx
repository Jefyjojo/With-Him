import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function SilentReflectionPage() {
  const [isReflecting, setIsReflecting] = useState(false);
  const [reflectionTime, setReflectionTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isReflecting && reflectionTime < selectedDuration * 60) {
      interval = setInterval(() => {
        setReflectionTime((prev) => prev + 1);
      }, 1000);
    } else if (reflectionTime >= selectedDuration * 60) {
      setIsReflecting(false);
    }

    return () => clearInterval(interval);
  }, [isReflecting, reflectionTime, selectedDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (reflectionTime / (selectedDuration * 60)) * 100;

  const handleStart = () => {
    setReflectionTime(0);
    setIsReflecting(true);
  };

  const handleStop = () => {
    setIsReflecting(false);
  };

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
          <h1 className="font-heading text-5xl lg:text-6xl text-primary mb-4">Silent Reflection</h1>
          <p className="font-paragraph text-xl text-secondary-foreground/70 max-w-2xl mx-auto">
            Find peace in silence. Take time to listen to God's voice and reflect on His presence in your life.
          </p>
        </motion.div>

        {/* Main Reflection Area */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left: Reflection Timer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
          >
            <div className="space-y-8">
              {/* Duration Selection */}
              {!isReflecting && (
                <div>
                  <p className="font-paragraph text-sm uppercase tracking-widest text-primary/60 mb-4">
                    Choose Duration
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[5, 10, 15, 20, 30, 45].map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setSelectedDuration(duration)}
                        className={`font-paragraph py-3 px-4 rounded-lg transition-all duration-300 ${
                          selectedDuration === duration
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-primary/10 text-primary hover:bg-primary/20'
                        }`}
                      >
                        {duration}m
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Timer Display */}
              <div className="text-center">
                <p className="font-paragraph text-sm uppercase tracking-widest text-secondary-foreground/60 mb-4">
                  {isReflecting ? 'Time Remaining' : 'Ready to Begin'}
                </p>
                <div className="text-6xl font-heading text-primary mb-6 font-mono">
                  {formatTime(isReflecting ? selectedDuration * 60 - reflectionTime : 0)}
                </div>

                {/* Progress Bar */}
                {isReflecting && (
                  <div className="w-full bg-primary/10 rounded-full h-2 mb-6 overflow-hidden">
                    <motion.div
                      className="bg-primary h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="flex gap-4">
                {!isReflecting ? (
                  <Button
                    onClick={handleStart}
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-paragraph py-3 rounded-lg transition-all duration-300"
                  >
                    Begin Reflection
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleStop}
                      variant="outline"
                      className="flex-1 border-2 border-primary text-primary hover:bg-primary/5 font-paragraph py-3 rounded-lg transition-all duration-300"
                    >
                      End Early
                    </Button>
                  </>
                )}
              </div>

              {/* Reflection Prompts */}
              <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary">
                <p className="font-paragraph text-sm uppercase tracking-widest text-primary/60 mb-3">
                  Reflection Prompts
                </p>
                <ul className="space-y-2 font-paragraph text-sm text-secondary-foreground/70">
                  <li>• What is God teaching me today?</li>
                  <li>• Where do I see His presence in my life?</li>
                  <li>• How can I grow closer to Him?</li>
                  <li>• What am I grateful for?</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-2xl"></div>
              <Image
                src="https://static.wixstatic.com/media/3e9bb1_272e4a5a24a84bc3a13a252bc120ece6~mv2.png?originWidth=448&originHeight=576"
                alt="Person in peaceful meditation with Jesus in a serene natural setting"
                width={500}
                height={600}
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
        >
          <h2 className="font-heading text-3xl text-primary mb-8 text-center">Benefits of Silent Reflection</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Inner Peace',
                description: 'Find calm and tranquility in silence',
                icon: '☮️',
              },
              {
                title: 'Spiritual Growth',
                description: 'Deepen your connection with God',
                icon: '🌱',
              },
              {
                title: 'Mental Clarity',
                description: 'Clear your mind and gain perspective',
                icon: '🧠',
              },
              {
                title: 'Emotional Healing',
                description: 'Process emotions and find wholeness',
                icon: '💚',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="text-center p-6 border-2 border-primary/20 rounded-xl hover:border-primary transition-all duration-300"
              >
                <p className="text-4xl mb-3">{benefit.icon}</p>
                <h3 className="font-heading text-lg text-primary mb-2">{benefit.title}</h3>
                <p className="font-paragraph text-sm text-secondary-foreground/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12 border-l-4 border-primary"
        >
          <h2 className="font-heading text-2xl text-primary mb-6">Tips for Deeper Reflection</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Find a quiet, comfortable space free from distractions',
              'Silence your phone and other electronic devices',
              'Sit in a comfortable position with good posture',
              'Focus on your breathing and God\'s presence',
              'Let thoughts come and go without judgment',
              'End with gratitude and a prayer of thanksgiving',
            ].map((tip, index) => (
              <div key={index} className="flex gap-3">
                <span className="text-primary font-heading text-xl flex-shrink-0">✓</span>
                <p className="font-paragraph text-secondary-foreground/70">{tip}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
