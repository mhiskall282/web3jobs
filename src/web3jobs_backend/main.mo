import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
// import Option "mo:base/Option";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Nat32 "mo:base/Nat32";


actor AfroTalent {
  // Types
  public type UserRole = {
    #Freelancer;
    #Recruiter;
  };

  public type UserProfile = {
  principal : Principal;
  name : Text;
  email : Text;
  role : UserRole;
  bio : Text;
  image : Text; 
  isComplete : Bool;
  createdAt : Int;
  
  // Optional role-specific fields
  skills : ?[Text];
  portfolioLink : ?Text;
  hourlyRate : ?Float;
  companyName : ?Text;
  companyWebsite : ?Text;
  hiringBudget : ?Float;
};

  public type JobListing = {
    id : Nat;
    title : Text;
    description : Text;
    skills : [Text];
    budget : Nat;
    recruiterPrincipal : Principal;
    isOpen : Bool;
    createdAt : Int;
  };

  public type JobApplication = {
    jobId : Nat;
    freelancerPrincipal : Principal;
    proposal : Text;
    createdAt : Int;
  };

  // State
  private stable var nextJobId : Nat = 0;
  private let userProfiles = HashMap.HashMap<Principal, UserProfile>(10, Principal.equal, Principal.hash);
  func natHash(n : Nat) : Hash.Hash {
    return Nat32.fromNat(n % (2 ** 32));
  };

  private let jobListings = HashMap.HashMap<Nat, JobListing>(10, Nat.equal, natHash);
  private let jobApplications = HashMap.HashMap<Text, JobApplication>(10, Text.equal, Text.hash);

  // Helper functions
  private func _generateApplicationKey(jobId : Nat, principal : Principal) : Text {
    Nat.toText(jobId) # Principal.toText(principal);
  };

  // User profile management
 public shared (msg) func createProfile(
  name : Text,
  email : Text,
  role : UserRole,
  bio : Text,
  image : Text,
  skills : ?[Text],
  portfolioLink : ?Text,
  hourlyRate : ?Float,
  companyName : ?Text,
  companyWebsite : ?Text,
  hiringBudget : ?Float
) : async Bool {
  let caller = msg.caller;
  
  let profile : UserProfile = {
    principal = caller;
    name = name;
    email = email;
    role = role;
    bio = bio;
    image = image;
    isComplete = name.size() > 0 and email.size() > 0 and bio.size() > 0;
    createdAt = Time.now();
    
    // Role-specific fields
    skills = skills;
    portfolioLink = portfolioLink;
    hourlyRate = hourlyRate;
    companyName = companyName;
    companyWebsite = companyWebsite;
    hiringBudget = hiringBudget;
  };
  
  userProfiles.put(caller, profile);
  true;
};

 public shared query (msg) func getProfile() : async ?UserProfile {
  userProfiles.get(msg.caller)
};

  public query func hasCompleteProfile(user : Principal) : async Bool {
    switch (userProfiles.get(user)) {
      case (null) { return false };
      case (?profile) { return profile.isComplete };
    };
  };

  // Job listing management
  public shared (msg) func createJobListing(title : Text, description : Text, skills : [Text], budget : Nat) : async ?Nat {
    let caller = msg.caller;

    switch (userProfiles.get(caller)) {
      case (null) { return null };
      case (?profile) {
        switch (profile.role) {
          case (#Recruiter) {
            if (not profile.isComplete) { return null };

            let jobId = nextJobId;
            nextJobId += 1;

            let job : JobListing = {
              id = jobId;
              title = title;
              description = description;
              skills = skills;
              budget = budget;
              recruiterPrincipal = caller;
              isOpen = true;
              createdAt = Time.now();
            };

            jobListings.put(jobId, job);
            return ?jobId;
          };
          case (_) { return null };
        };
      };
    };
  };

  public query func getAllJobListings() : async [JobListing] {
    Iter.toArray(jobListings.vals());
  };

  public query func getJobListing(jobId : Nat) : async ?JobListing {
    jobListings.get(jobId);
  };

  // Job application management
  public shared (msg) func applyForJob(jobId : Nat, proposal : Text) : async Bool {
    let caller = msg.caller;

    switch (userProfiles.get(caller)) {
      case (null) { return false };
      case (?profile) {
        switch (profile.role) {
          case (#Freelancer) {
            if (not profile.isComplete) { return false };

            switch (jobListings.get(jobId)) {
              case (null) { return false };
              case (?job) {
                if (not job.isOpen) { return false };

                let applicationKey = _generateApplicationKey(jobId, caller);

                let application : JobApplication = {
                  jobId = jobId;
                  freelancerPrincipal = caller;
                  proposal = proposal;
                  createdAt = Time.now();
                };

                jobApplications.put(applicationKey, application);
                return true;
              };
            };
          };
          case (_) { return false };
        };
      };
    };
  };

  public query (msg) func getMyApplications() : async [JobApplication] {
    let caller = msg.caller;

    let applications = Iter.toArray(jobApplications.vals());
    return Array.filter<JobApplication>(
      applications,
      func(app) {
        Principal.equal(app.freelancerPrincipal, caller);
      },
    );
  };

  public query (msg) func getApplicationsForJob(jobId : Nat) : async [JobApplication] {
    let caller = msg.caller;

    switch (jobListings.get(jobId)) {
      case (null) { return [] };
      case (?job) {
        if (not Principal.equal(job.recruiterPrincipal, caller)) {
          return [];
        };

        let applications = Iter.toArray(jobApplications.vals());
        return Array.filter<JobApplication>(
          applications,
          func(app) {
            app.jobId == jobId;
          },
        );
      };
    };
  };



// private let temporaryImages = HashMap.HashMap<Principal, (Text, Text)>(10, Principal.equal, Principal.hash);

  // Identity check
  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };
};
