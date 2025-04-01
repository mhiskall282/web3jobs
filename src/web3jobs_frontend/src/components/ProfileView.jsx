import React from 'react';

const ProfileView = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="bg-gray-900 rounded-xl border border-gold/20 p-6">
      <div className="flex items-start gap-6 mb-6">
        {/* <img 
          src={profile.image} 
          className="w-24 h-24 rounded-full object-cover border-2 border-gold/30"
          alt="Profile"
        /> */}
        <div>
          <h2 className="text-2xl font-bold text-gold">{profile.name}</h2>
          <p className="text-gray-300">{profile.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-gold/10 text-gold rounded-full text-sm">
            {profile.role.Freelancer ? 'Freelancer' : 'Recruiter'}
          </span>
        </div>
      </div>

      {profile.role.Freelancer ? (
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-semibold mb-2 text-gold">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gold">Hourly Rate</h3>
            <p>{profile.hourlyRate} ICP/hour</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gold">Portfolio</h3>
            <a 
              href={profile.portfolioLink} 
              className="text-gold hover:text-gold/80 underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {profile.portfolioLink}
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-semibold text-gold">Company</h3>
            <p>{profile.companyName}</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gold">Website</h3>
            <a 
              href={profile.companyWebsite} 
              className="text-gold hover:text-gold/80 underline"
              target="_blank" 
              rel="noopener noreferrer"
            >
              {profile.companyWebsite}
            </a>
          </div>
          
          <div>
            <h3 className="font-semibold text-gold">Hiring Budget</h3>
            <p>{profile.hiringBudget} ICP/month</p>
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gold/20">
        <h3 className="font-semibold mb-2 text-gold">About Me</h3>
        <p className="text-gray-300 whitespace-pre-line">{profile.bio}</p>
      </div>
    </div>
  );
};

export default ProfileView;