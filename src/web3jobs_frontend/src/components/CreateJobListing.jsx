import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateJobListing = ({ backendActor }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    budget: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'budget' ? Number(value) : value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const skills = formData.skills.split(',').map(skill => skill.trim());
      const result = await backendActor.createJobListing(
        formData.title,
        formData.description,
        skills,
        Number(formData.budget)
      );
      
      if (result && result.length > 0) {
        navigate('/recruiter-dashboard');
      } else {
        setError('Failed to create job listing. Please ensure your profile is complete.');
      }
    } catch (error) {
      console.error('Error creating job listing:', error);
      setError('Error creating job listing: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gray-900 rounded-xl border border-gold/20 p-6">
      <h1 className="text-2xl font-bold text-gold mb-6">Post New Opportunity</h1>
      
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-xl mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gold text-sm font-bold mb-2">Job Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gold/20 focus:ring-2 focus:ring-gold"
            required
          />
        </div>
        
        <div>
          <label className="block text-gold text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gold/20 focus:ring-2 focus:ring-gold h-48"
            required
          />
        </div>
        
        <div>
          <label className="block text-gold text-sm font-bold mb-2">Required Skills</label>
          <input
            name="skills"
            type="text"
            value={formData.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gold/20 focus:ring-2 focus:ring-gold"
            placeholder="React, Motoko, Web3, Design"
            required
          />
        </div>
        
        <div>
          <label className="block text-gold text-sm font-bold mb-2">Budget (ICP)</label>
          <input
            name="budget"
            type="number"
            min="0"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gold/20 focus:ring-2 focus:ring-gold"
            required
          />
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/recruiter-dashboard')}
            className="px-6 py-2 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gold text-black rounded-lg hover:bg-gold/80 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Posting...' : 'Publish Opportunity'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobListing;
