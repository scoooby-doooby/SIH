import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Contact: React.FC = () => {
  const [messageSent, setMessageSent] = useState(false);

  const contactSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().min(10, 'Message must be at least 10 characters').required('Message is required'),
  });

  const handleSubmit = (values: any, { resetForm }: any) => {
    // Simulate form submission
    console.log('Contact form submitted:', values);
    setMessageSent(true);
    resetForm();
    setTimeout(() => setMessageSent(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: 'support@tamiltours.com',
      description: 'Get in touch for support and inquiries',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: '+91 98765 43210',
      description: '24/7 customer support available',
      color: 'from-green-400 to-teal-500'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: '123 Heritage Street, Chennai',
      description: 'Tamil Nadu 600001, India',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      description: 'Weekend support available',
      color: 'from-orange-400 to-red-500'
    }
  ];

  const faqs = [
    {
      question: 'How do offline maps work?',
      answer: 'Download maps to your device before traveling. They work without internet connectivity and include all points of interest, navigation, and audio tour locations.'
    },
    {
      question: 'Are audio tours available in multiple languages?',
      answer: 'Yes! Our audio tours are available in Tamil, English, and Hindi. More languages are being added based on user demand.'
    },
    {
      question: 'Can I use the app without creating an account?',
      answer: 'You can browse tours and maps without an account, but creating one allows you to save favorites, write reviews, and get personalized recommendations.'
    },
    {
      question: 'How often is content updated?',
      answer: 'We regularly update our tours, maps, and information. New destinations and features are added monthly based on user feedback and seasonal attractions.'
    }
  ];

  return (
    <div className="min-h-screen px-4 md:px-8 mt-12">
      {/* Header */}
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
          Get in Touch
        </h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Have questions about Tamil Nadu travel or need help with our platform? We're here to assist you on your journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8">
            <div className="flex items-center space-x-2 mb-6">
              <MessageCircle className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
            </div>

            {messageSent && (
              <div className="backdrop-blur-lg bg-green-500/20 border border-green-400/30 rounded-2xl p-4 mb-6">
                <div className="flex items-center space-x-2 text-green-400">
                  <Send className="w-5 h-5" />
                  <span className="font-semibold">Message sent successfully!</span>
                </div>
                <p className="text-green-300 text-sm mt-1">We'll get back to you within 24 hours.</p>
              </div>
            )}

            <Formik
              initialValues={{ name: '', email: '', subject: '', message: '' }}
              validationSchema={contactSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Full Name</label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Email Address</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">Subject</label>
                  <Field
                    as="select"
                    name="subject"
                    className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="tours">Tour Information</option>
                    <option value="maps">Maps & Navigation</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="partnership">Partnership Opportunities</option>
                  </Field>
                  <ErrorMessage name="subject" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">Message</label>
                  <Field
                    as="textarea"
                    name="message"
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 resize-none"
                  />
                  <ErrorMessage name="message" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white py-4 rounded-2xl font-semibold hover:from-cyan-500 hover:to-blue-600 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </Form>
            </Formik>
          </div>

          {/* FAQ Section */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 mt-8">
            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-2">{faq.question}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          {/* Contact Cards */}
          {contactInfo.map((info, index) => (
            <div key={index} className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
              <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${info.color} bg-opacity-20 mb-4`}>
                <div className="text-white">
                  {info.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{info.title}</h3>
              <p className="text-cyan-400 font-semibold mb-1">{info.details}</p>
              <p className="text-white/80 text-sm">{info.description}</p>
            </div>
          ))}

          {/* Social Media */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <p className="text-white/80 text-sm mb-4">
              Stay updated with the latest travel tips and new destinations.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="backdrop-blur-lg bg-blue-500/20 border border-blue-400/30 rounded-full p-3 text-blue-400 hover:bg-blue-500/30 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="backdrop-blur-lg bg-sky-500/20 border border-sky-400/30 rounded-full p-3 text-sky-400 hover:bg-sky-500/30 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="backdrop-blur-lg bg-pink-500/20 border border-pink-400/30 rounded-full p-3 text-pink-400 hover:bg-pink-500/30 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Our Location</h3>
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl h-48 flex items-center justify-center border border-white/20">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-2" />
                <p className="text-white/80 text-sm">Interactive Map</p>
                <p className="text-white/60 text-xs">Chennai, Tamil Nadu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;