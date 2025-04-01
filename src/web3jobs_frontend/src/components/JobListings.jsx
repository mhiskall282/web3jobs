import React, { useState, useEffect } from 'react';

const JobListings = ({ jobs, isLoading, backendActor }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [proposal, setProposal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (backendActor) {
          const profile = await backendActor.getProfile();
          setUserProfile(profile.length > 0 ? profile[0] : null);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, [backendActor]);
  
  const handleApply = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      if (!userProfile) {
        setError('Complete your profile to apply');
        return;
      }
      
      const result = await backendActor.applyForJob(selectedJob.id, proposal);
      
      if (result) {
        setSuccess('Application submitted successfully!');
        setProposal('');
        setSelectedJob(null);
      }
    } catch (error) {
      console.error('Error applying:', error);
      setError('Error applying: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto"></div>
        <p className="mt-4 text-gray-300">Loading opportunities...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {success && (
        <div className="bg-green-500/10 text-green-500 p-4 rounded-xl">
          {success}
        </div>
      )}
      
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-xl">
          {error}
        </div>
      )}
      
      {jobs.length === 0 ? (
        <div className="text-center py-8 bg-gray-900 rounded-xl">
          <p className="text-gray-300">No opportunities available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-gray-900 rounded-xl border border-gold/20 p-6">
              <h2 className="text-xl font-semibold text-gold mb-2">{job.title}</h2>
              <p className="text-gray-300 mb-4">{job.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-gray-300">
                  <span className="font-medium">Budget:</span> {job.budget} ICP
                </div>
                
                {job.isOpen ? (
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="bg-gold text-black px-4 py-2 rounded-lg hover:bg-gold/80 transition-colors"
                    disabled={profileLoading}
                  >
                    Apply Now
                  </button>
                ) : (
                  <span className="text-red-500">Closed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl border border-gold/20 p-6 w-full max-w-xl">
            <h2 className="text-xl font-semibold text-gold mb-4">Apply for {selectedJob.title}</h2>
            
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-gold text-sm font-bold mb-2">Proposal</label>
                <textarea
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gold/20 focus:ring-2 focus:ring-gold h-48"
                  placeholder="Explain your qualifications..."
                  required
                />
              </div>
              
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-6 py-2 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gold text-black rounded-lg hover:bg-gold/80 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListings;