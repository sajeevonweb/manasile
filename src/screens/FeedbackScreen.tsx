import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Check, Copy } from 'lucide-react';

const FEEDBACK_EMAIL = 'sajeevuiux@gmail.com';
const FEEDBACK_SUBJECT = 'Manasile App Feedback';

export default function FeedbackScreen() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const subject = encodeURIComponent(FEEDBACK_SUBJECT);
    const body = encodeURIComponent(trimmed);

    window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`;
  };

    const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(FEEDBACK_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable; fail silently
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Feedback</h1>
          </div>
          <div className="px-6 py-6 text-gray-700 leading-relaxed">
            <p className="mb-4">
              Found a bug, have a feature idea, or just want to share your thoughts? We'd
              love to hear from you...
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what's on your mind..."
              rows={8}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-y"
            />

            <div className="mt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleSend}
                disabled={!message.trim()}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>

            <div className="mt-4 rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
              <p className="text-xs text-gray-400">
                Clicking "Send" opens your default email app with the message pre-filled.
                If that doesn't open, you can email us directly at:
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="text-xs font-medium text-gray-600">{FEEDBACK_EMAIL}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 shrink-0"
                  title="Copy email address"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
              
          </div>
        </div>
      </div>
    </div>
  );
}