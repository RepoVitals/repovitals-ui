import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Star, GitFork, Shield, TrendingUp, AlertTriangle, ExternalLink, Bell, Settings, BarChart3 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data - in real app this would come from API
  const trackedRepos = [
    {
      id: 1,
      owner: 'facebook',
      name: 'react',
      description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
      score: 9.2,
      security: 8.7,
      maintenance: 9.5,
      popularity: 9.8,
      stars: 218000,
      lastScan: '2 hours ago',
      alerts: 0,
      language: 'JavaScript'
    },
    {
      id: 2,
      owner: 'microsoft',
      name: 'vscode',
      description: 'Visual Studio Code',
      score: 8.9,
      security: 9.1,
      maintenance: 8.8,
      popularity: 8.7,
      stars: 156000,
      lastScan: '4 hours ago',
      alerts: 1,
      language: 'TypeScript'
    },
    {
      id: 3,
      owner: 'nodejs',
      name: 'node',
      description: 'Node.js JavaScript runtime',
      score: 8.5,
      security: 8.2,
      maintenance: 8.9,
      popularity: 8.4,
      stars: 102000,
      lastScan: '6 hours ago',
      alerts: 2,
      language: 'JavaScript'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 6) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const filteredRepos = trackedRepos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repo.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'alerts' && repo.alerts > 0) ||
                         (selectedFilter === 'high-score' && repo.score >= 8);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Monitor and analyze your tracked repositories</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard/add-repo"
              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Track New Repo
            </Link>
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tracked Repos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{trackedRepos.length}</p>
              </div>
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <Shield className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">8.9</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Stars</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">476k</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Repos</option>
                  <option value="alerts">With Alerts</option>
                  <option value="high-score">High Score (8+)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Repository List */}
        <div className="space-y-4">
          {filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <Link
                      to={`/repo/${repo.owner}/${repo.name}`}
                      className="text-xl font-bold font-mono text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {repo.owner}/{repo.name}
                    </Link>
                    <a
                      href={`https://github.com/${repo.owner}/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    {repo.alerts > 0 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {repo.alerts} alert{repo.alerts > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{repo.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars.toLocaleString()}</span>
                    </div>
                    <span>Last scan: {repo.lastScan}</span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  {/* Score Breakdown */}
                  <div className="grid grid-cols-3 gap-4 lg:gap-6">
                    <div className="text-center">
                      <div className={`${getScoreBg(repo.security)} rounded-lg p-3`}>
                        <div className={`text-lg font-bold ${getScoreColor(repo.security)}`}>
                          {repo.security}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Security</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`${getScoreBg(repo.maintenance)} rounded-lg p-3`}>
                        <div className={`text-lg font-bold ${getScoreColor(repo.maintenance)}`}>
                          {repo.maintenance}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Maintenance</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`${getScoreBg(repo.popularity)} rounded-lg p-3`}>
                        <div className={`text-lg font-bold ${getScoreColor(repo.popularity)}`}>
                          {repo.popularity}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Popularity</div>
                      </div>
                    </div>
                  </div>

                  {/* Overall Score */}
                  <div className="text-center lg:text-right">
                    <div className={`text-3xl font-bold ${getScoreColor(repo.score)} mb-1`}>
                      {repo.score}
                    </div>
                    <div className="text-xs text-gray-500">Overall</div>
                    <Link
                      to={`/repo/${repo.owner}/${repo.name}/details`}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm transition-colors mt-2"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No repositories found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by tracking your first repository'}
            </p>
            <Link
              to="/dashboard/add-repo"
              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Track New Repo
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;