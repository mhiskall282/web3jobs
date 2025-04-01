import React, { useState, useEffect } from 'react';

const MyApplications = ({ backendActor }) => {
  // ... existing state and logic
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Get applications from the backend
        const apps = await backendActor.getMyApplications();
        setApplications(apps);
        
        if (apps.length > 0) {
          // Fetch job details for each application
          const jobPromises = apps.map(app => backendActor.getJobListing(app.jobId));
          const jobResults = await Promise.all(jobPromises);
          
          const jobMap = {};
          jobResults.forEach((jobResult, index) => {
            // Check if job exists (it's an optional type in your backend)
            if (jobResult && jobResult.length > 0) {
              jobMap[apps[index].jobId] = jobResult[0];
            }
          });
          
          setJobDetails(jobMap);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        setError('Failed to load your applications. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (backendActor) {
      fetchApplications();
    }
  }, [backendActor]);
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your applications...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold mx-auto"></div>
        <p className="mt-4 text-gray-300">Loading your applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 text-red-500 p-4 rounded-xl mb-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gold mb-6">My Applications</h1>
      
      {applications.length === 0 ? (
        <div className="text-center py-8 bg-gray-900 rounded-xl">
          <p className="text-gray-300">No applications found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {applications.map((app, index) => {
            const job = jobDetails[app.jobId];
            return (
              <div key={index} className="bg-gray-900 rounded-xl border border-gold/20 p-6">
                <h2 className="text-xl font-semibold text-gold mb-2">
                  {job ? job.title : `Opportunity #${app.jobId}`}
                </h2>
                
                {job && (
                  <>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-300 mb-4">
                      <span className="font-medium">Budget:</span> {job.budget} ICP
                    </div>
                    <div className="text-gray-300 mb-4">
                      <span className="font-medium">Status:</span> {job.isOpen ? 
                        <span className="text-green-500">Open</span> : 
                        <span className="text-red-500">Closed</span>}
                    </div>
                  </>
                )}
                
                <div className="border-t border-gold/20 pt-4 mt-4">
                  <h3 className="font-medium text-gold mb-2">Your Proposal</h3>
                  <p className="text-gray-300">{app.proposal}</p>
                </div>
                
                <div className="text-sm text-gray-400 mt-4">
                  Applied on: {new Date(Number(app.createdAt) / 1000000).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyApplications;