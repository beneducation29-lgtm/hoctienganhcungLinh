import React, { useEffect, useRef, useState } from 'react';
import { LogIn, X, ShieldCheck } from 'lucide-react';

export interface GoogleProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

interface GoogleLoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (profile: GoogleProfile) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: { client_id: string; callback: (response: { credential: string }) => void }) => void;
          renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const decodeJwtPayload = (credential: string): Record<string, string> => {
  const payload = credential.split('.')[1];
  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
  const json = decodeURIComponent(
    atob(normalized)
      .split('')
      .map((char) => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(json);
};

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({ open, onClose, onLogin }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId.includes('your-google')) {
      setError('Chưa cấu hình VITE_GOOGLE_CLIENT_ID. Hãy thêm Google Web Client ID vào Secrets/Environment trước khi deploy.');
      return;
    }

    const mount = () => {
      if (!window.google || !buttonRef.current) return;
      buttonRef.current.innerHTML = '';
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: ({ credential }) => {
          try {
            const payload = decodeJwtPayload(credential);
            if (!payload.email) throw new Error('Google account did not return an email.');
            onLogin({
              name: payload.name || payload.email.split('@')[0],
              email: payload.email,
              avatarUrl: payload.picture || ''
            });
            onClose();
          } catch {
            setError('Không đọc được thông tin tài khoản Google. Vui lòng thử lại.');
          }
        }
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
        text: 'signin_with',
        shape: 'pill'
      });
    };

    if (window.google) {
      mount();
      return;
    }

    const existing = document.querySelector('script[data-google-identity]');
    if (existing) {
      existing.addEventListener('load', mount);
      return () => existing.removeEventListener('load', mount);
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = 'true';
    script.onload = mount;
    document.head.appendChild(script);
    return () => script.removeEventListener('load', mount);
  }, [open, onClose, onLogin]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-slate-950/45 backdrop-blur-sm flex items-center justify-center p-4" onMouseDown={onClose}>
      <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8" onMouseDown={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <LogIn className="w-5 h-5" />
            </div>
            <h2 className="mt-4 text-xl font-extrabold text-slate-900">Đăng nhập tài khoản</h2>
            <p className="mt-1.5 text-sm text-slate-500">Dùng tài khoản Google để Linh hiển thị đúng tên, email và ảnh đại diện của em.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 cursor-pointer" aria-label="Đóng">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 flex justify-center min-h-12" ref={buttonRef} />

        {error && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
            {error}
          </div>
        )}

        <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>Thông tin hồ sơ được dùng để cá nhân hóa giao diện học tập. Không còn tên học sinh mẫu cố định.</span>
        </div>
      </div>
    </div>
  );
};
