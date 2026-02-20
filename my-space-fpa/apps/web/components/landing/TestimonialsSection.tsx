import React from 'react';
import Avatar from '../ui/Avatar';

interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  rating: number;
}

interface TestimonialsSectionProps {
  title?: string;
  testimonials?: Testimonial[];
}

export default function TestimonialsSection({
  title = 'Trusted by Freelancers Across Africa',
  testimonials = [
    {
      id: '1',
      content: 'My Space FPA has transformed how I work. The built-in IDE and video calls make collaboration seamless. I\'ve earned 3x more since joining!',
      author: {
        name: 'Sarah Johnson',
        role: 'Full-Stack Developer',
        avatar: undefined
      },
      rating: 5
    },
    {
      id: '2',
      content: 'The AI matching is incredible. I get high-quality projects that perfectly match my skills. Payment is always on time.',
      author: {
        name: 'Michael Okafor',
        role: 'UI/UX Designer',
        avatar: undefined
      },
      rating: 5
    },
    {
      id: '3',
      content: 'Finally, a platform that understands African freelancers. The wallet system makes receiving payments so easy.',
      author: {
        name: 'Amina Hassan',
        role: 'Content Writer',
        avatar: undefined
      },
      rating: 5
    }
  ]
}: TestimonialsSectionProps) {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {title}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card p-8 rounded-2xl border border-white/5 hover-lift"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-msf-warning-amber"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-msf-mist mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar
                  src={testimonial.author.avatar}
                  alt={testimonial.author.name}
                  size="md"
                />
                <div>
                  <p className="text-white font-medium">
                    {testimonial.author.name}
                  </p>
                  <p className="text-sm text-msf-mist">
                    {testimonial.author.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
