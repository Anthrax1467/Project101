
import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  onSuccess: () => void;
}

const PaymentModal: React.FC<Props> = ({ isOpen, onClose, amount, onSuccess }) => {
  const [method, setMethod] = useState<'card' | 'nepali'>('card');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'verifying'>('idle');

  if (!isOpen) return null;

  const handlePay = () => {
    setLoading(true);
    setStatus('processing');
    
    // Simulation logic for Demo purposes
    setTimeout(() => {
      setStatus('verifying');
      setTimeout(() => {
        setLoading(false);
        setStatus('idle');
        onSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-black text-slate-800">Secure Checkout</h2>
              <p className="text-slate-500 font-medium">Pay for your booking: <span className="text-red-700 font-bold">{amount}</span></p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-3xl font-light">&times;</button>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl mb-6 flex items-center gap-3">
             <span className="text-xl">🛠️</span>
             <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest leading-tight">
               Developer Note: This is a simulated gateway. No real money will be charged during the beta phase.
             </p>
          </div>

          <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setMethod('card')}
              className={`flex-1 py-3 rounded-xl font-black transition-all text-xs uppercase tracking-widest ${method === 'card' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
            >
              Credit/Debit Card
            </button>
            <button 
              onClick={() => setMethod('nepali')}
              className={`flex-1 py-3 rounded-xl font-black transition-all text-xs uppercase tracking-widest ${method === 'nepali' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
            >
              Nepali Banking
            </button>
          </div>

          {method === 'card' ? (
            <div className="flex flex-col gap-4 animate-in fade-in duration-500">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Card Number</label>
                <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 font-mono text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">CVV</label>
                  <input type="password" placeholder="***" className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm" />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2 opacity-40 grayscale">
                <img src="https://img.icons8.com/color/48/000000/visa.png" className="h-6" alt="Visa" />
                <img src="https://img.icons8.com/color/48/000000/mastercard.png" className="h-6" alt="Mastercard" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-right-4 duration-500">
              <button className="flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-green-50 bg-green-50 hover:bg-green-100 transition-all hover:-translate-y-1">
                <div className="h-12 w-24 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/ff/Esewa_logo.webp" alt="eSewa" className="max-h-full" />
                </div>
                <span className="font-black text-xs uppercase tracking-widest text-green-800">eSewa</span>
              </button>
              <button className="flex flex-col items-center gap-3 p-6 rounded-3xl border-2 border-purple-50 bg-purple-50 hover:bg-purple-100 transition-all hover:-translate-y-1">
                <div className="h-12 w-24 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Khalti_Logo.png/220px-Khalti_Logo.png" alt="Khalti" className="max-h-full" />
                </div>
                <span className="font-black text-xs uppercase tracking-widest text-purple-800">Khalti</span>
              </button>
            </div>
          )}

          <button 
            onClick={handlePay}
            disabled={loading}
            className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl mt-8 hover:bg-red-700 transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70 active:scale-95"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                {status === 'processing' ? 'Processing Transaction...' : 'Verifying via Merchant...'}
              </>
            ) : `Authorize Payment`}
          </button>
          
          <p className="text-center text-[10px] text-slate-400 mt-6 uppercase tracking-[0.2em] font-black">
            🛡️ Encrypted by SajhaSecure™ SSL Simulation
          </p>
        </div>
      </div>
    </div>
  );
};

// Added missing default export
export default PaymentModal;
