import React from 'react';
import { Book, Award, Clock, Users, ArrowRight, Play, CheckCircle, Zap } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Solidity Smart Contract Mastery',
    description: 'Build secure DeFi protocols with African use-case studies',
    level: 'Intermediate',
    duration: '6 weeks',
    enrolled: 1895,
    progress: 65,
    image: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0',
    instructor: {
      name: 'Kwame Asante',
      avatar: 'https://avatars.githubusercontent.com/u/1234567',
      title: 'Lead Blockchain Architect'
    }
  },
  {
    id: 2,
    title: 'Web3 Frontend Development',
    description: 'Create dApps using React & Next.js with African UI patterns',
    level: 'Beginner',
    duration: '4 weeks',
    enrolled: 2341,
    progress: 30,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3',
    instructor: {
      name: 'Amina Diallo',
      avatar: 'https://avatars.githubusercontent.com/u/7654321',
      title: 'Senior Web3 Developer'
    }
  }
];

const skillBounties = [
  {
    id: 1,
    title: 'Build Agricultural Supply Chain DApp',
    reward: 750,
    deadline: '2024-04-15',
    difficulty: 'Advanced',
    submissions: 18,
    skills: ['Solidity', 'IPFS', 'React']
  },
  {
    id: 2,
    title: 'Create Cross-Border Payment Protocol',
    reward: 1500,
    deadline: '2024-05-01',
    difficulty: 'Intermediate',
    submissions: 24,
    skills: ['Rust', 'ICP', 'Motoko']
  }
];

export const LearningHub = () => {
  return (
    <div className="bg-black text-gold min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-orange-500 bg-clip-text text-transparent">
            AfroWeb3 Academy
          </h1>
          <p className="text-xl text-gray-300">
            Master blockchain development through Africa-focused Web3 curriculum
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Active Courses Section */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Book className="w-8 h-8 text-gold" />
                Your Learning Journey
              </h2>
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-gray-900 rounded-xl border border-gold/20 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <button className="absolute bottom-4 right-4 bg-gold hover:bg-gold/90 text-black px-6 py-2 rounded-full flex items-center gap-2 transition-all">
                        <Play className="w-5 h-5" />
                        Continue
                      </button>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-semibold mb-2">{course.title}</h3>
                          <p className="text-gray-300">{course.description}</p>
                        </div>
                        <div className="flex items-center gap-2 text-gold">
                          <CheckCircle className="w-6 h-6" />
                          <span className="font-bold">{course.progress}%</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          {course.level}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          {course.enrolled.toLocaleString()} peers
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skill Bounties Section */}
            <section>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Zap className="w-8 h-8 text-gold" />
                Web3 Builders Challenge
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {skillBounties.map((bounty) => (
                  <div key={bounty.id} className="bg-gray-900 p-6 rounded-xl border border-gold/20">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{bounty.title}</h3>
                      <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm">
                        {bounty.reward} AFRI
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Difficulty</span>
                        <span className="font-semibold">{bounty.difficulty}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Deadline</span>
                        <span className="font-semibold">{bounty.deadline}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Participants</span>
                        <span className="font-semibold">{bounty.submissions}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bounty.skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <button className="w-full flex items-center justify-center gap-2 bg-transparent border border-gold text-gold hover:bg-gold/10 py-3 rounded-lg transition-all">
                        View Challenge <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Learning Progress */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-2xl font-bold mb-6">Learning Progress</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-400">Weekly Goal</span>
                    <span className="text-gold">8/10 hours</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div 
                      className="bg-gold rounded-full h-2 transition-all duration-500" 
                      style={{ width: '80%' }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-gold">15</p>
                    <p className="text-gray-400">Courses Completed</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-gold">4</p>
                    <p className="text-gray-400">Certifications Earned</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Recommended Paths */}
            <section className="bg-gray-900 p-6 rounded-xl border border-gold/20">
              <h2 className="text-2xl font-bold mb-6">Recommended Paths</h2>
              <div className="space-y-4">
                {[
                  { title: 'DeFi Africa Specialization', skills: ['Solidity', 'DAOs', 'Yield Farming'] },
                  { title: 'NFT Creators Track', skills: ['IPFS', 'ERC-721', 'Digital Art'] },
                  { title: 'Blockchain Infrastructure', skills: ['Rust', 'Node Operation', 'Security'] },
                ].map((path, index) => (
                  <div key={index} className="group bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gold/10 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-gold/10 text-gold rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <h3 className="font-semibold">{path.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-11">
                      {path.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-gold/10 text-gold rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};