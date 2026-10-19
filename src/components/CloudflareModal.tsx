import React, { useState } from 'react';
import { X, Download, Cloud, CheckCircle, FileCode, Terminal, ExternalLink, Sparkles, Copy, Check } from 'lucide-react';
import { generateCloudflareZip } from '../utils/zipGenerator';

interface CloudflareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloudflareModal: React.FC<CloudflareModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setDownloading(true);
      const { blob, filename } = await generateCloudflareZip();
      
      // Create a virtual download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate Cloudflare zip:', err);
      setDownloading(false);
    }
  };

  const copyCliCommand = () => {
    navigator.clipboard.writeText('npx wrangler pages deploy . --project-name=ami-hospital');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">Cloudflare Pages ZIP Package</h3>
              <p className="text-xs text-amber-100 font-medium">
                Production-ready deployment bundle for Ami Hospital
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/10 hover:bg-black/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Download Card */}
          <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-extrabold text-slate-900 text-base">ami-hospital-cloudflare-pages.zip</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold">
                  Zero Config
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Pre-configured with <code className="bg-amber-100 px-1 rounded text-amber-900 font-mono">_headers</code>, <code className="bg-amber-100 px-1 rounded text-amber-900 font-mono">_routes.json</code>, and standalone responsive code.
              </p>
            </div>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-600/30 transition flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Packaging ZIP...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-200" />
                  <span>ZIP Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download ZIP File</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Steps on How to Deploy */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              How to Deploy to Cloudflare Pages in 3 Steps:
            </h4>
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs text-slate-700 leading-relaxed">
                  <strong>Click the button above</strong> to download <code className="text-orange-700 font-mono font-semibold">ami-hospital-cloudflare-pages.zip</code> to your computer.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs text-slate-700 leading-relaxed">
                  Open your <a href="https://dash.cloudflare.com/" target="_blank" rel="noreferrer" className="text-orange-600 font-bold underline inline-flex items-center gap-1">Cloudflare Dashboard <ExternalLink className="w-3 h-3" /></a>, go to <strong>Workers & Pages</strong> &gt; <strong>Create application</strong> &gt; <strong>Pages</strong> &gt; <strong>Upload assets</strong>.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-xs text-slate-700 leading-relaxed">
                  Name the project <span className="font-semibold text-slate-900">ami-hospital</span>, extract and drag the files (or upload the zip directly), and click <strong>Deploy site</strong>. It is immediately live worldwide with free Cloudflare SSL!
                </div>
              </div>
            </div>
          </div>

          {/* Included Files in ZIP */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Files Included in the ZIP:
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-slate-800 flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-teal-600" />
                <span>index.html (Complete Page)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-slate-800 flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-orange-600" />
                <span>_headers (Edge Security)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-slate-800 flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-indigo-600" />
                <span>_routes.json (Cloudflare Routes)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-100 font-mono text-slate-800 flex items-center gap-2">
                <FileCode className="w-3.5 h-3.5 text-slate-600" />
                <span>README.md (Deploy Guide)</span>
              </div>
            </div>
          </div>

          {/* Alternative CLI Deployment */}
          <div className="p-4 rounded-2xl bg-slate-900 text-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                Alternative: Deploy via Wrangler CLI
              </span>
              <button
                onClick={copyCliCommand}
                className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-md transition"
              >
                {copiedCli ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCli ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <code className="text-xs font-mono text-amber-300 block bg-slate-950 p-2.5 rounded-lg overflow-x-auto">
              npx wrangler pages deploy . --project-name=ami-hospital
            </code>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Target platform: <strong>Cloudflare Pages Direct Upload</strong></span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
