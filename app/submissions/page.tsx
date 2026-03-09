'use client';

import { useState, useEffect } from 'react';
import { Users, Phone, MapPin, Calendar, Filter, Search, Download, TrendingUp } from 'lucide-react';

interface Submission {
  _id: string;
  fullName: string;
  rollNumber?: string;
  phone: string;
  currentLocation?: string;
  interest: 'definitely' | 'maybe' | 'unsure';
  suggestions?: string;
  wantUpdates: boolean;
  submittedAt: string;
}

interface Statistics {
  total: number;
  definitely: number;
  maybe: number;
  unsure: number;
  wantUpdates: number;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterInterest, setFilterInterest] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, [search, filterInterest]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (filterInterest) params.append('interest', filterInterest);

      const response = await fetch(`/api/submissions?${params}`);
      const result = await response.json();

      if (result.success) {
        setSubmissions(result.data);
        setStatistics(result.statistics);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getInterestBadge = (interest: string) => {
    const badges = {
      definitely: { text: 'হ্যাঁ, আসবো', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
      maybe: { text: 'চেষ্টা করবো', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
      unsure: { text: 'নিশ্চিত না', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    };
    return badges[interest as keyof typeof badges] || badges.unsure;
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Roll', 'Phone', 'Location', 'Interest', 'Updates', 'Submitted'];
    const rows = submissions.map(s => [
      s.fullName,
      s.rollNumber || '',
      s.phone,
      s.currentLocation || '',
      s.interest,
      s.wantUpdates ? 'Yes' : 'No',
      new Date(s.submittedAt).toLocaleString(),
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] via-[#1a2a4a] to-[#111827] text-[#FFF7ED]">
      {/* Header */}
      <div className="border-b border-[#334155] bg-[#1E293B]/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 md:py-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Title Section */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#F59E0B] mb-1 leading-tight">
                  Submissions Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-[#CBD5E1] truncate">CSE Session 2019-20 Reunion</p>
              </div>
              <button
                onClick={exportToCSV}
                className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#F59E0B] hover:bg-[#DC8502] text-[#0F172A] font-semibold rounded-lg transition-colors text-sm sm:text-base"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Statistics Cards */}
        {statistics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
            <div className="bg-[#1E293B]/50 border border-[#334155] rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F59E0B] flex-shrink-0" />
                <span className="text-[10px] sm:text-xs text-[#CBD5E1] leading-tight">Total</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#FFF7ED]">{statistics.total}</p>
            </div>

            <div className="bg-[#1E293B]/50 border border-green-500/30 rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs text-[#CBD5E1] leading-tight">Definitely</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-400">{statistics.definitely}</p>
            </div>

            <div className="bg-[#1E293B]/50 border border-yellow-500/30 rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs text-[#CBD5E1] leading-tight">Maybe</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-yellow-400">{statistics.maybe}</p>
            </div>

            <div className="bg-[#1E293B]/50 border border-gray-500/30 rounded-lg p-3 sm:p-4">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
                <span className="text-[10px] sm:text-xs text-[#CBD5E1] leading-tight">Unsure</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-400">{statistics.unsure}</p>
            </div>

            <div className="bg-[#1E293B]/50 border border-[#334155] rounded-lg p-3 sm:p-4 col-span-2 sm:col-span-3 lg:col-span-1">
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F59E0B] flex-shrink-0" />
                <span className="text-[10px] sm:text-xs text-[#CBD5E1] leading-tight">Want Updates</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-[#FFF7ED]">{statistics.wantUpdates}</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-[#1E293B]/50 border border-[#334155] rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="grid gap-2 sm:gap-3 md:gap-4 sm:grid-cols-2">
            <div className="relative">
              <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#64748B] pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base bg-[#0F172A] border border-[#334155] rounded-lg text-[#FFF7ED] placeholder-[#64748B] focus:border-[#F59E0B] focus:outline-none"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#64748B] pointer-events-none" />
              <select
                value={filterInterest}
                onChange={(e) => setFilterInterest(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base bg-[#0F172A] border border-[#334155] rounded-lg text-[#FFF7ED] focus:border-[#F59E0B] focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">All Levels</option>
                <option value="definitely">হ্যাঁ, আসবো</option>
                <option value="maybe">চেষ্টা করবো</option>
                <option value="unsure">নিশ্চিত না</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[#CBD5E1]">Loading submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-12 bg-[#1E293B]/50 border border-[#334155] rounded-lg">
            <Users className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
            <p className="text-[#CBD5E1]">No submissions found</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {submissions.map((submission) => {
              const badge = getInterestBadge(submission.interest);
              return (
                <div
                  key={submission._id}
                  onClick={() => setSelectedSubmission(submission)}
                  className="bg-[#1E293B]/50 border border-[#334155] hover:border-[#F59E0B]/50 rounded-lg p-4 sm:p-6 cursor-pointer transition-all hover:shadow-lg hover:shadow-[#F59E0B]/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-[#F59E0B]/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#F59E0B]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-[#FFF7ED] mb-1 truncate">
                            {submission.fullName}
                          </h3>
                          {submission.rollNumber && (
                            <p className="text-sm text-[#CBD5E1]">Roll: {submission.rollNumber}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2 sm:gap-3 text-sm">
                        <div className="flex items-center gap-2 text-[#CBD5E1]">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{submission.phone}</span>
                        </div>
                        {submission.currentLocation && (
                          <div className="flex items-center gap-2 text-[#CBD5E1]">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{submission.currentLocation}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-[#CBD5E1]">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">
                            {new Date(submission.submittedAt).toLocaleDateString('bn-BD')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col gap-2 items-start">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                        {badge.text}
                      </span>
                      {submission.wantUpdates && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-blue-500/20 text-blue-400 border-blue-500/30">
                          Updates ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className="bg-gradient-to-br from-[#1E293B] to-[#111827] border border-[#F59E0B]/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-[#334155]">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#F59E0B]">Submission Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-[#CBD5E1] hover:text-[#FFF7ED] transition-colors p-1"
                aria-label="Close"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4 sm:space-y-5">
              {/* Full Name */}
              <div className="bg-[#0F172A]/30 rounded-lg p-3 sm:p-4 border border-[#334155]/50">
                <label className="text-xs sm:text-sm text-[#94A3B8] mb-1 sm:mb-2 block font-medium">Full Name</label>
                <p className="text-base sm:text-lg md:text-xl text-[#FFF7ED] font-semibold break-words">
                  {selectedSubmission.fullName}
                </p>
              </div>

              {/* Roll Number */}
              {selectedSubmission.rollNumber && (
                <div className="bg-[#0F172A]/30 rounded-lg p-3 sm:p-4 border border-[#334155]/50">
                  <label className="text-xs sm:text-sm text-[#94A3B8] mb-1 sm:mb-2 block font-medium">Roll Number</label>
                  <p className="text-base sm:text-lg text-[#FFF7ED] font-mono">{selectedSubmission.rollNumber}</p>
                </div>
              )}

              {/* Phone Number */}
              <div className="bg-[#0F172A]/30 rounded-lg p-3 sm:p-4 border border-[#334155]/50">
                <label className="text-xs sm:text-sm text-[#94A3B8] mb-1 sm:mb-2 block font-medium">Phone Number</label>
                <p className="text-base sm:text-lg text-[#FFF7ED] font-mono">{selectedSubmission.phone}</p>
              </div>

              {/* Current Location */}
              {selectedSubmission.currentLocation && (
                <div className="bg-[#0F172A]/30 rounded-lg p-3 sm:p-4 border border-[#334155]/50">
                  <label className="text-xs sm:text-sm text-[#94A3B8] mb-1 sm:mb-2 block font-medium">Current Location</label>
                  <p className="text-base sm:text-lg text-[#FFF7ED] break-words">{selectedSubmission.currentLocation}</p>
                </div>
              )}

              {/* Interest Level */}
              <div className="bg-[#0F172A]/30 rounded-lg p-3 sm:p-4 border border-[#334155]/50">
                <label className="text-xs sm:text-sm text-[#94A3B8] mb-2 sm:mb-3 block font-medium">Interest Level</label>
                <span className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border ${getInterestBadge(selectedSubmission.interest).color}`}>
                  {getInterestBadge(selectedSubmission.interest).text}
                </span>
              </div>

              {/* Suggestions */}
              {selectedSubmission.suggestions && (
                <div className="bg-[#0F172A]/30 rounded-lg p-3 sm:p-4 border border-[#334155]/50">
                  <label className="text-xs sm:text-sm text-[#94A3B8] mb-2 sm:mb-3 block font-medium">Suggestions</label>
                  <div className="bg-[#0F172A]/50 p-3 sm:p-4 rounded-lg border border-[#334155]">
                    <p className="text-sm sm:text-base text-[#FFF7ED] leading-relaxed whitespace-pre-wrap break-words">
                      {selectedSubmission.suggestions}
                    </p>
                  </div>
                </div>
              )}

              {/* Want Updates */}
              <div className="bg-[#0F172A]/30 rounded-lg p-3 sm:p-4 border border-[#334155]/50">
                <label className="text-xs sm:text-sm text-[#94A3B8] mb-1 sm:mb-2 block font-medium">Want Updates</label>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border ${
                    selectedSubmission.wantUpdates 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                  }`}>
                    {selectedSubmission.wantUpdates ? 'Yes ✓' : 'No'}
                  </span>
                </div>
              </div>

              {/* Submitted At */}
              <div className="bg-[#0F172A]/30 rounded-lg p-3 sm:p-4 border border-[#334155]/50">
                <label className="text-xs sm:text-sm text-[#94A3B8] mb-1 sm:mb-2 block font-medium">Submitted At</label>
                <p className="text-sm sm:text-base text-[#FFF7ED]">
                  {new Date(selectedSubmission.submittedAt).toLocaleString('bn-BD', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            </div>

            {/* Close Button (Mobile) */}
            <div className="mt-6 sm:hidden">
              <button
                onClick={() => setSelectedSubmission(null)}
                className="w-full py-3 bg-[#334155] hover:bg-[#475569] text-[#FFF7ED] font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
