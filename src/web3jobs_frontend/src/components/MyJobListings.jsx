import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MyJobListings = ({ jobs, isLoading, backendActor }) => {
  // ... existing state and logic
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoadingApps, setIsLoadingApps] = useState(false);
  const [error, setError] = useState('');
  const [applicantProfiles, setApplicantProfiles] = useState({});
  
  // Fetch job applications when a job is selected
  const viewApplications = async (jobId) => {
    setIsLoadingApps(true);
    setError('');
    try {
      // Call the backend function to get applications for this job
      const apps = await backendActor.getApplicationsForJob(jobId);
      setApplications(apps);
      setSelectedJob(jobs.find(job => job.id === jobId));
      
      // If there are applications, fetch the profiles of the applicants
      if (apps.length > 0) {
        // This would require a new backend function to get profiles by principal
        // For now, we'll just display the applications without profile details
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications. Please try again later.');
    } finally {
      setIsLoadingApps(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your job listings...</p>
      </div>
    );
  }

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gold">My Opportunities</h1>
        <Link 
          to="/recruiter-dashboard/create-job"
          className="bg-gold text-black px-4 py-2 rounded-lg hover:bg-gold/80 transition-colors"
        >
          Post New Opportunity
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-500/10 text-red-500 p-4 rounded-xl">
          {error}
        </div>
      )}
      
      {jobs.length === 0 ? (
        <div className="text-center py-8 bg-gray-900 rounded-xl">
          <p className="text-gray-300">No opportunities posted yet</p>
          <Link 
            to="/recruiter-dashboard/create-job"
            className="inline-block mt-4 bg-gold text-black px-4 py-2 rounded-lg hover:bg-gold/80 transition-colors"
          >
            Create First Opportunity
          </Link>
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
                <div>
                  <div className="text-gray-300 mb-2">
                    <span className="font-medium">Budget:</span> {job.budget} ICP
                  </div>
                  <div className="text-gray-300">
                    <span className="font-medium">Status:</span> {job.isOpen ? 
                      <span className="text-green-500">Open</span> : 
                      <span className="text-red-500">Closed</span>}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {job.isOpen && (
                    <button
                      onClick={() => {/* close job logic */}}
                      className="bg-gray-800 text-gold px-4 py-2 rounded-lg border border-gold/20 hover:bg-gold/10 transition-colors"
                    >
                      Close Opportunity
                    </button>
                  )}
                  <button
                    onClick={() => viewApplications(job.id)}
                    className="bg-gold text-black px-4 py-2 rounded-lg hover:bg-gold/80 transition-colors"
                  >
                    View Applications
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-400 mt-4">
                Posted on: {new Date(Number(job.createdAt) / 1000000).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Applications Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl border border-gold/20 p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-gold mb-4">
              Applications for {selectedJob.title}
            </h2>
            
            {isLoadingApps ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold mx-auto"></div>
                <p className="mt-4 text-gray-300">Loading applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-300">No applications received</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app, index) => (
                  <div key={index} className="border border-gold/20 rounded-xl p-4">
                    <h3 className="font-medium text-gold mb-2">
                      Applicant: {app.freelancerPrincipal.toString().substring(0, 10)}...
                    </h3>
                    <div className="bg-gray-800 p-3 rounded-lg mb-4">
                      <h4 className="font-medium text-gold mb-2">Proposal:</h4>
                      <p className="text-gray-300">{app.proposal}</p>
                    </div>
                    <div className="text-sm text-gray-400">
                      Received on: {new Date(Number(app.createdAt) / 1000000).toLocaleDateString()}
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        onClick={() => {/* accept logic */}}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        onClick={() => {/* reject logic */}}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 border border-gold/20 text-gold rounded-lg hover:bg-gold/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobListings;