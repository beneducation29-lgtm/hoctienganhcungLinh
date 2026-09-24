import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Bell,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Flame,
  Award,
  LogOut,
  Languages
} from 'lucide-react';
import { ActiveTab, Notification, StudentProfile } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  student: StudentProfile;
  notifications: Notification[];
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  student,
  notifications,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'curriculum', label: 'Chương trình học' },
    { id: 'vocabulary', label: 'Từ vựng (Vocab)' },
    { id: 'grammar', label: 'Ngữ pháp' },
    { id: 'review', label: 'Ôn tập' },
    { id: 'skills', label: '4 kỹ năng' },
    { id: 'aitutor', label: 'AI Tutor' },
    { id: 'progress', label: 'Tiến độ' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Zone: Clean, single-line text wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex items-center gap-2.5 text-left focus:outline-none cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
                <Languages className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                  ENGLISH<span className="text-blue-600">.</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
                  THPT English Platform
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap relative cursor-pointer ${
                    isActive
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {item.id === 'aitutor' && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-bold bg-blue-100 text-blue-700 rounded">
                      NEW
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Zone: Search, Notifications, Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100/80 hover:bg-slate-200/70 border border-slate-200/60 rounded-lg transition-colors cursor-pointer"
              title="Tìm kiếm từ vựng, ngữ pháp, Unit Tiếng Anh (Phím tắt: Ctrl+K)"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Tìm bài học, Unit...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Thông báo"
                aria-label="Thông báo"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="text-sm font-semibold text-slate-900">Thông báo Tiếng Anh</h4>
                    <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                      Đánh dấu đã đọc
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto mt-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5 px-1 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className="flex items-start gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{n.timeAgo}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Student Avatar & Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    MT
                  </div>
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[120px]">
                    {student.name}
                  </span>
                  <span className="text-[11px] text-blue-600 font-bold leading-tight flex items-center gap-1">
                    Trình độ {student.englishLevel} · Lớp {student.currentGrade}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">{student.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{student.school}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                      <span className="flex items-center gap-1 text-amber-600 font-medium">
                        <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {student.streakDays} ngày
                      </span>
                      <span>·</span>
                      <span className="font-bold text-blue-600">CEFR: {student.englishLevel}</span>
                    </div>
                  </div>

                  <div className="py-2 text-xs space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('progress');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Hồ sơ & Phân tích 4 Kỹ năng</span>
                      <Award className="w-4 h-4 text-slate-400" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('aitutor');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>AI Study Advisor</span>
                      <Sparkles className="w-4 h-4 text-blue-500" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setShowProfileMenu(false)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất (Demo)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">
              MT
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{student.name}</p>
              <p className="text-xs text-slate-500">Lớp {student.currentGrade} · Trình độ {student.englishLevel}</p>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Chuỗi streak: <strong className="text-amber-600">{student.streakDays} ngày</strong></span>
            <span>Mục tiêu CEFR: <strong className="text-blue-600">{student.targetLevel}</strong></span>
          </div>
        </div>
      )}
    </header>
  );
};
