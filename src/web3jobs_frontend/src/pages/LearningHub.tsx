// import React from 'react';
import { Book, Award, Clock, Users, ArrowRight, Play, CheckCircle } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Smart Contract Development with Solidity',
    description: 'Learn to build secure and efficient smart contracts for DeFi applications',
    level: 'Intermediate',
    duration: '8 weeks',
    enrolled: 1234,
    progress: 45,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'David Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      title: 'Senior Blockchain Developer'
    }
  },
  {
    id: 2,
    title: 'Web3 Frontend Development',
    description: 'Master React and Web3.js for building decentralized applications',
    level: 'Beginner',
    duration: '6 weeks',
    enrolled: 856,
    progress: 75,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    instructor: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      title: 'Frontend Engineer'
    }
  }
];

const skillBounties = [
  {
    id: 1,
    title: 'Build a DEX Interface',
    reward: 500,
    deadline: '2024-03-25',
    difficulty: 'Advanced',
    submissions: 12,
    skills: ['React', 'Web3.js', 'Solidity']
  },
  {
    id: 2,
    title: 'Create NFT Marketplace Smart Contract',
    reward: 750,
    deadline: '2024-04-10',
    difficulty: 'Intermediate',
    submissions: 8,
    skills: ['Solidity', 'OpenZeppelin', 'ERC721']
  }
];

export const LearningHub = () => {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Active Courses */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Your Active Courses</h2>
            <div className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-secondary-light rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button className="absolute bottom-4 right-4 btn-primary flex items-center gap-2">
                      <Play className="w-4 h-4" /> Continue Learning
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                        <p className="text-gray-400">{course.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{course.enrolled.toLocaleString()} enrolled</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Bounties */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-6">Active Skill Bounties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillBounties.map((bounty) => (
                <div key={bounty.id} className="bg-secondary-light p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold">{bounty.title}</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {bounty.reward} AFRI
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Difficulty</span>
                      <span className="font-semibold">{bounty.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Deadline</span>
                      <span className="font-semibold">{bounty.deadline}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Submissions</span>
                      <span className="font-semibold">{bounty.submissions}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {bounty.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary rounded-full text-sm text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button className="w-full btn-secondary flex items-center justify-center gap-2">
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Learning Stats */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Your Learning Stats</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Weekly Goal</span>
                  <span className="text-primary">4/5 hours</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '80%' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary p-4 rounded-lg text-center">
                  <p className="text-2xl font-semibold">12</p>
                  <p className="text-sm text-gray-400">Courses Completed</p>
                </div>
                <div className="bg-secondary p-4 rounded-lg text-center">
                  <p className="text-2xl font-semibold">3</p>
                  <p className="text-sm text-gray-400">Certifications</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-secondary-light p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-6">Recommended for You</h2>
            <div className="space-y-4">
              {[
                { title: 'DeFi Protocol Development', level: 'Advanced', duration: '10 weeks' },
                { title: 'Blockchain Security', level: 'Intermediate', duration: '6 weeks' },
                { title: 'NFT Development', level: 'Beginner', duration: '4 weeks' },
              ].map((course, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-secondary rounded-lg">
                  <Book className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-gray-400">
                      {course.level} • {course.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
