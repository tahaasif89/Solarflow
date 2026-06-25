'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCloudUpload, HiOutlinePhotograph, HiOutlineVideoCamera, HiX, HiExclamation } from 'react-icons/hi';
import { v4 as uuidv4 } from 'uuid';

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default function MediaUploader({ media = [], onMediaChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState({});
  const [errors, setErrors] = useState([]);
  const fileRef = useRef(null);

  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm'];
  const maxImageSize = 5 * 1024 * 1024;
  const maxVideoSize = 50 * 1024 * 1024;

  const simulateUpload = useCallback((file) => {
    return new Promise((resolve, reject) => {
      if (!validTypes.includes(file.type)) {
        reject({ file: file.name, error: `Unsupported: ${file.type}` }); return;
      }
      const max = file.type.startsWith('video/') ? maxVideoSize : maxImageSize;
      if (file.size > max) {
        reject({ file: file.name, error: `Max ${formatFileSize(max)}` }); return;
      }

      const id = uuidv4();
      const isVideo = file.type.startsWith('video/');
      let prog = 0;

      const interval = setInterval(() => {
        prog += Math.random() * (isVideo ? 8 : 20) + 5;
        if (prog >= 100) {
          clearInterval(interval);
          setProgress((p) => { const n = { ...p }; delete n[id]; return n; });
          const url = URL.createObjectURL(file);
          resolve({ id, type: isVideo ? 'video' : 'image', url, name: file.name, size: file.size, isPrimary: false, duration: null, order: 0 });
        } else {
          setProgress((p) => ({ ...p, [id]: { progress: Math.min(prog, 100), type: isVideo ? 'video' : 'image', name: file.name } }));
        }
      }, 150);
      setProgress((p) => ({ ...p, [id]: { progress: 0, type: isVideo ? 'video' : 'image', name: file.name } }));
    });
  }, []);

  const handleFiles = useCallback(async (files) => {
    setErrors([]);
    const results = await Promise.allSettled(Array.from(files).map((f) => simulateUpload(f)));
    const newMedia = [];
    const newErrors = [];
    results.forEach((r) => { r.status === 'fulfilled' ? newMedia.push(r.value) : newErrors.push(r.reason); });
    if (newErrors.length) setErrors(newErrors);
    if (newMedia.length) {
      const updated = [...media];
      newMedia.forEach((m) => { if (updated.length === 0) m.isPrimary = true; updated.push(m); });
      onMediaChange(updated);
    }
  }, [media, onMediaChange, simulateUpload]);

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          isDragging ? 'upload-zone-active border-solar-gold bg-solar-gold/5' : 'border-gray-200 hover:border-solar-gold/50 hover:bg-gray-50'
        }`}
      >
        <input ref={fileRef} type="file" multiple accept="image/*,video/mp4,video/quicktime,video/webm" onChange={(e) => { handleFiles(e.target.files); e.target.value = ''; }} className="hidden" />
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-2xl bg-solar-gold/10 flex items-center justify-center"><HiOutlinePhotograph className="text-2xl text-solar-gold" /></div>
            <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center"><HiOutlineVideoCamera className="text-2xl text-purple-500" /></div>
          </div>
          <p className="text-sm font-semibold text-gray-700">{isDragging ? 'Drop files here' : 'Drag & drop images or videos'}</p>
          <p className="text-xs text-gray-400">Images: max 5MB • Videos: max 50MB</p>
        </div>
      </div>

      <AnimatePresence>
        {errors.map((err, i) => (
          <motion.div key={i} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="mt-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-3 text-xs">
            <HiExclamation className="text-red-500" /><span className="text-red-700"><strong>{err.file}:</strong> {err.error}</span>
            <button onClick={() => setErrors((p) => p.filter((_, j) => j !== i))} className="ml-auto text-red-400 hover:text-red-600"><HiX className="text-sm" /></button>
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {Object.entries(progress).map(([id, data]) => (
          <motion.div key={id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2">
            <div className={`flex items-center gap-3 rounded-xl p-3 ${data.type === 'video' ? 'bg-purple-50' : 'bg-blue-50'}`}>
              {data.type === 'video' ? <HiOutlineVideoCamera className="text-purple-500" /> : <HiOutlinePhotograph className="text-blue-500" />}
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 truncate">{data.name}</span>
                  <span className={`font-bold ${data.type === 'video' ? 'text-purple-600' : 'text-blue-600'}`}>{Math.round(data.progress)}%</span>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${data.type === 'video' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${data.progress}%` }}
                    className={`h-full rounded-full progress-striped ${data.type === 'video' ? 'bg-gradient-to-r from-purple-400 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-blue-600'}`} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}