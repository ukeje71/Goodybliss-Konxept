import { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'General Inquiry'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xblkqaqr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ formData })
      });
      if (response.ok) {
        console.log('Form submitted:', formData);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          message: '',
          subject: 'General Inquiry'
        });
      }

    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f0ea] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-[#74541e] mb-4">Get In Touch</h1>
          <p className="text-lg text-[#74541e] max-w-2xl mx-auto">
            Have questions about my artwork or interested in a commission? I'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif font-semibold text-[#74541e] mb-6">Send a Message</h2>

            {submitSuccess ? (
              <div className="bg-amber-50 border border-amber-300 text-[#74541e] px-4 py-3 rounded mb-4 shadow-sm">
                <p className="font-medium">Message Sent!</p>
                <p className="text-sm">Thank you for reaching out. I’ll get back to you as soon as possible.</p>
              </div>
            ) : (

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#74541e] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#74541e] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#74541e] mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Commission Request">Commission Request</option>
                    <option value="Purchase Question">Purchase Question</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#74541e] mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-amber-200 rounded-md focus:ring-2 focus:ring-[#C47E20] focus:border-[#C47E20]"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#74541e] hover:bg-[#5a4218] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8 w-fit">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-serif font-semibold text-[#74541e] mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-[#74541e]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#74541e]">Email</h3>
                    <p className="text-[#74541e]">goodyblisskonxept@gmail.com</p>
                    <p className="text-sm text-[#74541e] mt-1">Typically responds within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-[#74541e]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#74541e]">Phone</h3>
                    <p className="text-[#74541e]">+2348138562085</p>
                    <p className="text-sm text-[#74541e] mt-1">Available Mon-Fri, 10am-6pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-amber-100 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-[#74541e]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-[#74541e]">Studio Location</h3>
                    <p className="text-[#74541e]">Obohia, Aba,Abia state</p>
                    <p className="text-sm text-[#74541e] mt-1">By appointment only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-serif font-semibold text-[#74541e] mb-6">Connect With Me</h2>
              <p className="text-[#74541e] mb-4">Follow my work and creative process on social media:</p>

              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/goodybliss_konxept/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-100 hover:bg-amber-200 p-3 rounded-full transition duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6 text-[#74541e]" />
                </a>
                <a
                  href="https://www.facebook.com/p/Goodybliss-Konxept-100064522069196/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-100 hover:bg-amber-200 p-3 rounded-full transition duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6 text-[#74541e]" />
                </a>
                <a
                  href="https://twitter.com/goodybliss_konxept"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-100 hover:bg-amber-200 p-3 rounded-full transition duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6 text-[#74541e]" />
                </a>
              </div>

              <div className="mt-6 bg-[#f5f0ea]p-4 rounded-lg">
                <p className="text-[#74541e] text-sm">
                  <strong>Tip:</strong> For fastest response regarding commissions, please include details about:
                </p>
                <ul className="list-disc list-inside text-[#74541e] text-sm mt-2 space-y-1">
                  <li>Desired size and medium</li>
                  <li>Your timeline/deadline</li>
                  <li>Reference images or inspiration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;