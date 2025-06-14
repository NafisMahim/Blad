import React from 'react';
import { Zap, LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import SubscriptionStatus from './SubscriptionStatus';

interface HeaderProps {
  onUpgradeClick: () => void;
  session: any;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUpgradeClick, session, onSignOut }) => {
  return (
    <header className="relative z-20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg shadow-lg shadow-yellow-400/25">
            <Zap className="w-6 h-6 text-black" />
          </div>
          <span className="text-2xl font-bold text-white">
            Nexus<span className="text-yellow-400">AI</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="w-4 h-4" />
                <span className="text-sm">{session.user.email}</span>
              </div>
              <SubscriptionStatus />
              <button
                onClick={onSignOut}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
              <button
                onClick={onUpgradeClick}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg 
                        hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-yellow-400/25
                        hover:shadow-yellow-400/40 hover:scale-105"
              >
                Get Pro Access
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                to="/login"
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold rounded-lg 
                        hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg shadow-yellow-400/25
                        hover:shadow-yellow-400/40"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;