import  { FormEvent } from 'react';
import { useState } from 'react';
import { Search, Phone, Video, MoreHorizontal } from 'lucide-react';
import { formatDate } from '../lib/utils';

const conversations = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: true,
    },
    lastMessage: "I've reviewed your proposal for the DeFi project",
    timestamp: new Date('2024-03-10T09:23:00'),
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: false,
    },
    lastMessage: 'The smart contract audit is complete. Here are my findings...',
    timestamp: new Date('2024-03-09T15:45:00'),
    unread: 0,
  },
  {
    id: 3,
    user: {
      name: 'Elena Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      online: true,
    },
    lastMessage: 'Can we schedule a call to discuss the NFT marketplace?',
    timestamp: new Date('2024-03-09T11:30:00'),
    unread: 1,
  },
];

const messages = [
  {
    id: 1,
    sender: 'Sarah Johnson',
    content: "Hi! I've reviewed your proposal for the DeFi project and I'm quite impressed with your approach.",
    timestamp: new Date('2024-03-10T09:23:00'),
    isSender: false,
  },
  {
    id: 2,
    sender: 'You',
    content: "Thank you! I'm glad you found it interesting. I have extensive experience with similar DeFi protocols.",
    timestamp: new Date('2024-03-10T09:25:00'),
    isSender: true,
  },
  {
    id: 3,
    sender: 'Sarah Johnson',
    content: 'Could you tell me more about your experience with yield farming implementations?',
    timestamp: new Date('2024-03-10T09:26:00'),
    isSender: false,
  },
  {
    id: 4,
    sender: 'You',
    content: "Of course! I've worked on several yield farming protocols, including optimizing gas costs and implementing security measures. Would you like me to share some specific examples?",
    timestamp: new Date('2024-03-10T09:28:00'),
    isSender: true,
  },
  {
    id: 5,
    sender: 'Sarah Johnson',
    content: "Yes, that would be very helpful! Also, what's your availability for a quick call this week?",
    timestamp: new Date('2024-03-10T09:30:00'),
    isSender: false,
  },
];

export const Messages = () => {
  const [message, setMessage] = useState('');

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="container py-8">
      <div className="bg-secondary-light rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <div className="col-span-4 border-r border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-secondary border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-16rem)]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 hover:bg-secondary cursor-pointer border-b border-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={conversation.user.avatar}
                        alt={conversation.user.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {conversation.user.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-accent-green rounded-full border-2 border-secondary-light"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-gray-400">
                          {formatDate(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <span className="bg-primary text-secondary px-2 py-1 rounded-full text-xs font-semibold">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-8 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={conversations[0].user.avatar}
                  alt={conversations[0].user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-semibold">{conversations[0].user.name}</h2>
                  <p className="text-sm text-gray-400">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <MoreHorizontal className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] ${
                      msg.isSender
                        ? 'bg-primary text-secondary-dark'
                        : 'bg-secondary text-gray-100'
                    } rounded-lg px-4 py-2`}
                  >
                    <p>{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {formatDate(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-gray-700">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 bg-secondary border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="submit"
                  className="btn-primary px-6"
                  disabled={!message.trim()}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
