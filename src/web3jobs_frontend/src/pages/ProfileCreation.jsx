import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import ImageUploader from './ImageUploader';

const ProfileCreation = () => {
  const { backendActor, setUserProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'freelancer',
    bio: '',
    // Freelancer fields
    skills: '',
    portfolioLink: '',
    hourlyRate: '',
    // Recruiter fields
    companyName: '',
    companyWebsite: '',
    hiringBudget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.bio.trim()) newErrors.bio = 'Required';
    
    if (formData.role === 'freelancer') {
      if (!formData.skills.trim()) newErrors.skills = 'Required';
      // if (!formData.portfolioLink.trim()) newErrors.portfolioLink = 'Required';
      if (!formData.hourlyRate) newErrors.hourlyRate = 'Required';
    } else {
      if (!formData.companyName.trim()) newErrors.companyName = 'Required';
      if (!formData.hiringBudget) newErrors.hiringBudget = 'Required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;
  
  //   setIsSubmitting(true);
  //   try {
  //     const roleVariant = formData.role === 'freelancer' 
  //       ? { Freelancer: null } 
  //       : { Recruiter: null };
  
  //     // Remove all Some() wrappers - Motoko handles optionals automatically
  //     const success = await backendActor.createProfile(
  //       formData.name,
  //       formData.email,
  //       roleVariant,
  //       formData.bio,
  //       formData.role === 'freelancer' ? formData.skills.split(',').map(s => s.trim()) : [],
  //       formData.role === 'freelancer' ? formData.portfolioLink : "",
  //       formData.role === 'freelancer' ? parseFloat(formData.hourlyRate) : 0,
  //       formData.role === 'recruiter' ? formData.companyName : "",
  //       formData.role === 'recruiter' ? formData.companyWebsite : "",
  //       formData.role === 'recruiter' ? parseFloat(formData.hiringBudget) : 0
  //     );
  
  //     if (success) {
  //       const profile = await backendActor.getProfile();
  //       setUserProfile(profile);
  //       navigate(profile?.Freelancer ? '/freelancer-dashboard' : '/recruiter-dashboard');
  //     }
  //   } catch (error) {
  //     setErrors({ submit: error.message });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setIsSubmitting(true);
    try {
      const roleVariant = formData.role === 'freelancer' 
        ? { Freelancer: null } 
        : { Recruiter: null };
  
      // Format optional values correctly for Candid
      const success = await backendActor.createProfile(
        formData.name,
        formData.email,
        roleVariant,
        formData.bio,
        "", // image
        formData.role === 'freelancer' ? [formData.skills.split(',').map(s => s.trim())] : [], // skills as opt array
        formData.role === 'freelancer' ? [formData.portfolioLink] : [], // portfolioLink as opt text
        formData.role === 'freelancer' ? [parseFloat(formData.hourlyRate)] : [], // hourlyRate as opt float
        formData.role === 'recruiter' ? [formData.companyName] : [], // companyName as opt text
        formData.role === 'recruiter' ? [formData.companyWebsite] : [], // companyWebsite as opt text
        formData.role === 'recruiter' ? [parseFloat(formData.hiringBudget)] : [] // hiringBudget as opt float
      );
  
      if (success) {
        const profileResult = await backendActor.getProfile();
        
        // Handle the optional return type correctly
        if (Array.isArray(profileResult) && profileResult.length > 0) {
          const profile = profileResult[0];
          setUserProfile(profile);
          navigate(profile.role.hasOwnProperty('Freelancer') ? '/freelancer-dashboard' : '/recruiter-dashboard');
        } else {
          setErrors({ submit: "Profile created but couldn't retrieve it" });
        }
      }
    } catch (error) {
      console.error("Profile creation error:", error);
      setErrors({ submit: error.message || "Failed to create profile" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">Complete Your Profile</h1>
        
        {errors.submit && (
          <div className="bg-red-100 border-red-400 text-red-700 p-3 mb-4 rounded">
            {errors.submit}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                role: 'freelancer',
                companyName: '',
                companyWebsite: '',
                hiringBudget: ''
              }))}
              className={`p-4 rounded-lg border-2 ${
                formData.role === 'freelancer' 
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-200'
              }`}
            >
              <h3 className="font-semibold">Freelancer</h3>
              <p className="text-sm text-gray-600">Developer, Designer, Writer</p>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({
                ...prev,
                role: 'recruiter',
                skills: '',
                portfolioLink: '',
                hourlyRate: ''
              }))}
              className={`p-4 rounded-lg border-2 ${
                formData.role === 'recruiter' 
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200'
              }`}
            >
              <h3 className="font-semibold">Recruiter</h3>
              <p className="text-sm text-gray-600">Hire Web3 Talent</p>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                name="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>

            {formData.role === 'freelancer' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Skills *</label>
                  <input
                    placeholder="React, Motoko, UI/UX..."
                    value={formData.skills}
                    onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.skills && <span className="text-red-500 text-sm">{errors.skills}</span>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Portfolio URL *</label>
                  <input
                    type="url"
                    value={formData.portfolioLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, portfolioLink: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.portfolioLink && (
                    <span className="text-red-500 text-sm">{errors.portfolioLink}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Hourly Rate (ICP) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.hourlyRate && (
                    <span className="text-red-500 text-sm">{errors.hourlyRate}</span>
                  )}
                </div>
              </>
            )}

            {formData.role === 'recruiter' && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name *</label>
                  <input
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.companyName && (
                    <span className="text-red-500 text-sm">{errors.companyName}</span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Company Website</label>
                  <input
                    type="url"
                    value={formData.companyWebsite}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyWebsite: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Hiring Budget (ICP) *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.hiringBudget}
                    onChange={(e) => setFormData(prev => ({ ...prev, hiringBudget: e.target.value }))}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.hiringBudget && (
                    <span className="text-red-500 text-sm">{errors.hiringBudget}</span>
                  )}
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Bio *</label>
              <textarea
                rows="4"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="w-full p-2 border rounded-lg"
              />
              {errors.bio && <span className="text-red-500 text-sm">{errors.bio}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving Profile...' : 'Complete Registration'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;