import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = ({ backendActor, initialData, userRole, isEditing = false }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    bio: initialData?.bio || '',
    // image: initialData?.image || '',
    skills: initialData?.skills?.join(', ') || '',
    portfolioLink: initialData?.portfolioLink || '',
    hourlyRate: initialData?.hourlyRate || 0,
    companyName: initialData?.companyName || '',
    companyWebsite: initialData?.companyWebsite || '',
    hiringBudget: initialData?.hiringBudget || 0
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['hourlyRate', 'hiringBudget'].includes(name) ? Number(value) : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Parse skills from comma-separated string to array
      const skills = formData.skills.split(',').map(skill => skill.trim()).filter(Boolean);
      
      // Call the createProfile function from your backend
      const result = await backendActor.createProfile(
        formData.name,
        formData.email,
        userRole, // "#Freelancer" or "#Recruiter"
        formData.bio,

        skills.length > 0 ? [skills] : [], // Optional array of skills
        formData.portfolioLink || null,
        formData.hourlyRate > 0 ? formData.hourlyRate : null,
        formData.companyName || null,
        formData.companyWebsite || null,
        formData.hiringBudget > 0 ? formData.hiringBudget : null
      );
      
      if (result) {
        // Redirect based on user role
        if (userRole === "#Freelancer") {
          navigate('/freelancer-dashboard');
        } else {
          navigate('/recruiter-dashboard');
        }
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Determine which fields to show based on user role
  const isFreelancer = userRole === "#Freelancer";
  
  return (
    <div className="max-w-3xl mx-auto">
         formData.image,     <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Your Profile' : 'Complete Your Profile'}
      </h1>
      
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-xl mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information - For All Users */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gold/20 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                  required
                ></textarea>
              </div>
              
              {/* <div>
                <label className="block text-gray-300 mb-2" htmlFor="image">
                  Profile Image URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                  placeholder="https://example.com/your-image.jpg"
                />
              </div> */}
            </div>
          </div>
          
          {/* Freelancer-specific fields */}
          {isFreelancer && (
            <div className="bg-gray-900 p-6 rounded-xl border border-gold/20 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Freelancer Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="skills">
                    Skills (comma separated)
                  </label>
                  <input
                    id="skills"
                    name="skills"
                    type="text"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                    placeholder="e.g. Smart Contracts, Web3, DeFi, Solidity"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="portfolioLink">
                    Portfolio Link
                  </label>
                  <input
                    id="portfolioLink"
                    name="portfolioLink"
                    type="text"
                    value={formData.portfolioLink}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="hourlyRate">
                    Hourly Rate (ICP)
                  </label>
                  <input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Recruiter-specific fields */}
          {!isFreelancer && (
            <div className="bg-gray-900 p-6 rounded-xl border border-gold/20 md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Recruiter Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="companyName">
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="companyWebsite">
                    Company Website
                  </label>
                  <input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="text"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                    placeholder="https://yourcompany.com"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="hiringBudget">
                    Hiring Budget (ICP)
                  </label>
                  <input
                    id="hiringBudget"
                    name="hiringBudget"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.hiringBudget}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(isFreelancer ? '/freelancer-dashboard' : '/recruiter-dashboard')}
            className="bg-gray-800 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button type="submit"
            disabled={isSubmitting}
            className="bg-gold text-black px-6 py-3 rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;