import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
// import List "mo:base/List";
// import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Nat32 "mo:base/Nat32";

actor Web3TalentMarketplace {

  type UserId = Principal;
  type JobId = Nat;
  type BountyId = Nat;
  type VoteId = Nat;
  type AiAgentId = Nat;

  public type User = {
    id : UserId;
    name : Text;
    reputation : Nat;
    skills : [Text];
    wallet : Text;
    endorsements : [Text];
    aiAgentAssigned : ?AiAgentId;
  };

  public type Job = {
    id : JobId;
    client : UserId;
    title : Text;
    description : Text;
    budget : Nat;
    applicantIds : [UserId];
    status : Text;
    milestones : [Text];
    escrowAmount : Nat;
    reviews : [Text];
    requiredSkills : [Text];
  };

  public type Bounty = {
    id : BountyId;
    title : Text;
    description : Text;
    reward : Nat;
    completedBy : ?UserId;
  };

  public type Vote = {
    id : VoteId;
    proposal : Text;
    votesFor : Nat;
    votesAgainst : Nat;
    status : Text;
  };

  public type AiAgent = {
    id : AiAgentId;
    name : Text;
    capabilities : [Text];
    assignedTo : ?UserId;
    activeTasks : [Text];
  };
  // Custom hash function for Nat that considers more bits
  func natHash(n : Nat) : Hash.Hash {
    let h1 = Nat32.fromNat(n % 0x7FFFFFFF); // Lower 31 bits
    let h2 = Nat32.fromNat((n / 0x7FFFFFFF) % 0x7FFFFFFF); // Next 31 bits
    return h1 ^ h2; // XOR the two parts
  };
  var users = HashMap.HashMap<UserId, User>(10, Principal.equal, Principal.hash);
  var jobs = HashMap.HashMap<JobId, Job>(10, Nat.equal, natHash);
  var _bounties = HashMap.HashMap<BountyId, Bounty>(10, Nat.equal, natHash);
  var votes = HashMap.HashMap<VoteId, Vote>(10, Nat.equal, natHash);
  var aiAgents = HashMap.HashMap<AiAgentId, AiAgent>(10, Nat.equal, natHash);

  var jobCounter : Nat = 0;
  var _bountyCounter : Nat = 0;
  var _voteCounter : Nat = 0;
  var aiAgentCounter : Nat = 0;

  // User Registration
  public func registerUser(name : Text, skills : [Text], wallet : Text) : async Text {
    let userId = Principal.fromActor(Web3TalentMarketplace);
    let newUser : User = {
      id = userId;
      name;
      reputation = 0;
      skills;
      wallet;
      endorsements = [];
      aiAgentAssigned = null;
    };
    users.put(userId, newUser);
    "User registered successfully";
  };

  // Assign AI Agent to User
  public func assignAiAgentToUser(userId : UserId, agentId : AiAgentId) : async Text {
    switch (users.get(userId)) {
      case (?user) {
        let updatedUser = { user with aiAgentAssigned = ?agentId };
        users.put(userId, updatedUser);
        "AI Agent assigned successfully";
      };
      case _ { "User not found" };
    };
  };

  // Create AI Agent
  public func createAiAgent(name : Text, capabilities : [Text]) : async AiAgentId {
    aiAgentCounter += 1;
    let newAgent : AiAgent = {
      id = aiAgentCounter;
      name;
      capabilities;
      assignedTo = null;
      activeTasks = [];
    };
    aiAgents.put(aiAgentCounter, newAgent);
    aiAgentCounter;
  };

  // AI Agent Task Assignment
  public func assignTaskToAiAgent(agentId : AiAgentId, task : Text) : async Text {
    switch (aiAgents.get(agentId)) {
      case (?agent) {
        let updatedAgent = {
          agent with activeTasks = Array.append(agent.activeTasks, [task])
        };
        aiAgents.put(agentId, updatedAgent);
        "Task assigned to AI Agent";
      };
      case _ { "AI Agent not found" };
    };
  };

  // Post Job with Required Skills
  public func postJob(title : Text, description : Text, budget : Nat, milestones : [Text], requiredSkills : [Text]) : async JobId {
    jobCounter += 1;

    let newJob : Job = {
      id = jobCounter;
      client = Principal.fromActor(Web3TalentMarketplace);
      title;
      description;
      budget;
      applicantIds = [];
      status = "Open";
      milestones;
      escrowAmount = 0;
      reviews = [];
      requiredSkills;
    };
    jobs.put(jobCounter, newJob);
    jobCounter;
  };

  // // Apply for Job with Skill Matching
  // public func applyForJob(jobId: JobId, userId: UserId) : async Text {
  //     switch (jobs.get(jobId)) {
  //         case (?job) {
  //             switch (users.get(userId)) {
  //                 case (?user) {
  //                     if (List.all<Text>(job.requiredSkills, func(skill) { Array.find(user.skills, func(uSkill) { uSkill == skill }) != null })) {
  //                         let updatedJob = { job with applicantIds = Array.append(job.applicantIds, [userId]) };
  //                         jobs.put(jobId, updatedJob);
  //                         "Applied successfully"
  //                     } else {
  //                         "User does not meet the required skills"
  //                     }
  //                 };
  //                 case _ { "User not found" };
  //             }
  //         };
  //         case _ { "Job not found" };
  //     }
  // };

  // Apply for Job with Skill Matching
  public func applyForJob(jobId : JobId, userId : UserId) : async Text {
    switch (jobs.get(jobId)) {
      case (?job) {
        switch (users.get(userId)) {
          case (?user) {
            // Check if all required skills are found in user skills
            var hasAllSkills = true;
            label skillLoop for (skill in job.requiredSkills.vals()) {
              let skillMatch = Array.find<Text>(
                user.skills,
                func(uSkill : Text) : Bool {
                  return uSkill == skill;
                },
              );
              if (Option.isNull(skillMatch)) {
                hasAllSkills := false;
                break skillLoop;
              };
            };

            if (hasAllSkills) {
              // Create a buffer from the existing applicants
              let buffer = Buffer.Buffer<UserId>(job.applicantIds.size());
              for (applicant in job.applicantIds.vals()) {
                buffer.add(applicant);
              };
              // Add the new applicant
              buffer.add(userId);

              // Update the job with the new applicants
              let updatedJob = {
                job with applicantIds = Buffer.toArray(buffer)
              };
              jobs.put(jobId, updatedJob);
              "Applied successfully";
            } else {
              "User does not meet the required skills";
            };
          };
          case _ { "User not found" };
        };
      };
      case _ { "Job not found" };
    };
  };

  // Endorse a User's Skill
  public func endorseUser(userId : UserId, skill : Text) : async Text {
    switch (users.get(userId)) {
      case (?user) {
        let updatedUser = {
          user with endorsements = Array.append(user.endorsements, [skill])
        };
        users.put(userId, updatedUser);
        "User endorsed successfully";
      };
      case _ { "User not found" };
    };
  };

  // DAO Governance - Reputation-based Voting
  public func voteOnProposal(voteId : VoteId, userId : UserId, voteFor : Bool) : async Text {
    switch (votes.get(voteId)) {
      case (?vote) {
        switch (users.get(userId)) {
          case (?user) {
            let updatedVote = if (voteFor) {
              { vote with votesFor = vote.votesFor + user.reputation };
            } else {
              { vote with votesAgainst = vote.votesAgainst + user.reputation };
            };
            votes.put(voteId, updatedVote);
            "Vote cast successfully";
          };
          case _ { "User not found" };
        };
      };
      case _ { "Vote not found" };
    };
  };
};
