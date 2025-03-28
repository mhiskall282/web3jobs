// import neccessary libraries

import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
// import Option "mo:base/Option";
// import Hash "mo:base/Hash";
// import Array "mo:base/Array";
// import Buffer "mo:base/Buffer";
// import Nat32 "mo:base/Nat32";
import Result "mo:base/Result";


actor Web3TalentMarketplace{
  type UserRole = {
    #Freelancer;
    #Recruiter;
  };

  type FreelancerProfile = {
    name: Text;
    skills: [Text];
    hourlyRate: Nat;
    // other freelancer-specific fields
  };

  type RecruiterProfile = {
    name: Text;
    company: Text;
    // other recruiter-specific fields
  };

  // Store user roles
  private let userRoles = HashMap.HashMap<Principal, UserRole>(10, Principal.equal, Principal.hash);
  
  // Store freelancer profiles
  private let freelancerProfiles = HashMap.HashMap<Principal, FreelancerProfile>(10, Principal.equal, Principal.hash);
  
  // Store recruiter profiles
  private let recruiterProfiles = HashMap.HashMap<Principal, RecruiterProfile>(10, Principal.equal, Principal.hash);

  // Register a new user with a role
  public shared({ caller }) func registerUser(role: UserRole) : async () {
    userRoles.put(caller, role);
  };

  // Update freelancer profile
  public shared({ caller }) func updateFreelancerProfile(profile: FreelancerProfile) : async () {
    switch (userRoles.get(caller)) {
      case (?#Freelancer) { freelancerProfiles.put(caller, profile); };
      case (_) { /* Handle error - user is not a freelancer */ };
    };
  };

  // Update recruiter profile
  public shared({ caller }) func updateRecruiterProfile(profile: RecruiterProfile) : async () {
    switch (userRoles.get(caller)) {
      case (?#Recruiter) { recruiterProfiles.put(caller, profile); };
      case (_) { /* Handle error - user is not a recruiter */ };
    };
  };

  // Get user role
  public shared({ caller }) func getMyRole() : async ?UserRole {
    userRoles.get(caller)
  };

  type Result<Ok, Err> = {#ok : Ok; #err : Err};

  // Get profile based on role
  public shared({ caller }) func getMyProfile() : async Result<Any, Text> {
    switch (userRoles.get(caller)) {
      case (?#Freelancer) { 
        switch (freelancerProfiles.get(caller)) {
          case (?profile) { #ok(profile) };
          case (null) { #err("Profile not found") };
        }
      };
      case (?#Recruiter) { 
        switch (recruiterProfiles.get(caller)) {
          case (?profile) { #ok(profile) };
          case (null) { #err("Profile not found") };
        }
      };
      case (null) { #err("User role not found") };
    }
  };
}

// actor Web3TalentMarketplace {
  
//   type UserId = Principal;
//   type JobId = Nat;
//   type AiAgentId = Nat;

//   public type User = {
//     id : UserId;
//     name : Text;
//     reputation : Nat;
//     skills : [Text];
//     wallet : Text;
//     endorsements : [Text];
//     aiAgentAssigned : ?AiAgentId;
//   };

//   public type Job = {
//     id : JobId;
//     client : UserId;
//     title : Text;
//     description : Text;
//     budget : Nat;
//     applicantIds : [UserId];
//     status : Text;
//     milestones : [Text];
//     requiredSkills : [Text];
//   };
  
//   var users = HashMap.HashMap<UserId, User>(10, Principal.equal, Principal.hash);
//   var jobs = HashMap.HashMap<JobId, Job>(10, Nat.equal, Nat32.fromNat);
//   var jobCounter : Nat = 0;
  
//   // Authenticate and register user with Internet Identity
//   public shared ({ caller }) func authenticate(name : Text, skills : [Text], wallet : Text) : async Text {
//     switch (users.get(caller)) {
//       case (?existingUser) { "User already registered." };
//       case null {
//         let newUser : User = {
//           id = caller;
//           name;
//           reputation = 0;
//           skills;
//           wallet;
//           endorsements = [];
//           aiAgentAssigned = null;
//         };
//         users.put(caller, newUser);
//         "User authenticated and registered successfully.";
//       };
//     }
//   };

//   // Fetch user details
//   public query func getUser(userId : UserId) : async ?User {
//     users.get(userId);
//   };
  
//   // Post a job
//   public shared ({ caller }) func postJob(title : Text, description : Text, budget : Nat, milestones : [Text], requiredSkills : [Text]) : async JobId {
//     jobCounter += 1;
//     let newJob : Job = {
//       id = jobCounter;
//       client = caller;
//       title;
//       description;
//       budget;
//       applicantIds = [];
//       status = "Open";
//       milestones;
//       requiredSkills;
//     };
//     jobs.put(jobCounter, newJob);
//     jobCounter;
//   };

//   // Apply for a job
//   public shared ({ caller }) func applyForJob(jobId : JobId) : async Text {
//     switch (jobs.get(jobId)) {
//       case (?job) {
//         switch (users.get(caller)) {
//           case (?user) {
//             let hasAllSkills = Array.all<Text>(job.requiredSkills, func(skill) {
//               Array.find(user.skills, func(uSkill) { uSkill == skill }) != null
//             });

//             if (hasAllSkills) {
//               let updatedJob = { job with applicantIds = Array.append(job.applicantIds, [caller]) };
//               jobs.put(jobId, updatedJob);
//               "Applied successfully.";
//             } else {
//               "User does not meet required skills.";
//             }
//           };
//           case null { "User not registered." };
//         }
//       };
//       case null { "Job not found." };
//     }
//   };
// }
