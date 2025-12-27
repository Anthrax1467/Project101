
import React from 'react';
import { UserNotification } from '../types';

interface Props {
  notifications: UserNotification[];
  onMarkRead: (id: string) => void;
  onClear: () => void;
}

const NotificationCenter: React.FC<Props> = ({ notifications, onMarkRead, onClear }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2">
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest">Activity</h3>
          <p className="text-[10px] text-slate-400 font-bold">{unreadCount} unread alerts</p>
        </div>
        <button onClick={onClear} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">
          Clear All
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto no-scrollbar">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-3xl mb-4 block">🔕</span>
            <p className="text-xs font-bold text-slate-400 uppercase">No notifications</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id} 
              onClick={() => onMarkRead(notif.id)}
              className={`p-6 border-b border-slate-50 cursor-pointer transition-colors ${notif.read ? 'opacity-50' : 'bg-red-50/30 hover:bg-red-50'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${notif.type === 'booking' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                  {notif.type}
                </span>
                <span className="text-[8px] font-bold text-slate-400 uppercase">{notif.date}</span>
              </div>
              <h4 className="text-xs font-black text-slate-900 mb-1">{notif.title}</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{notif.message}</p>
            </div>
          ))
        )}
      </div>
      <div className="p-4 bg-slate-50 text-center">
        <button className="text-[10px] font-black text-red-700 uppercase tracking-widest hover:underline">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

// Added missing default export
export default NotificationCenter;
