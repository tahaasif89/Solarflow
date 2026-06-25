'use client';
import { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HiOutlineTrash, HiOutlineStar, HiStar, HiPlay } from 'react-icons/hi';

function SortableItem({ item, index, onRemove, onSetPrimary }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  const isVideo = item.type === 'video';

  return (
    <div ref={setNodeRef} style={style}
      className={`relative group rounded-2xl overflow-hidden border-2 transition-all ${
        item.isPrimary ? 'border-solar-gold ring-2 ring-solar-gold/20' : isVideo ? 'border-purple-200' : 'border-gray-200'
      }`}>
      <div {...attributes} {...listeners} className="aspect-square cursor-grab active:cursor-grabbing relative bg-gray-100">
        {isVideo ? (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center"><HiPlay className="text-4xl text-white/80" /></div>
        ) : (
          <img src={item.url} alt={item.name} className="w-full h-full object-cover" draggable={false} />
        )}
      </div>
      {item.isPrimary && <div className="absolute top-2 left-2 bg-solar-gold text-navy-950 text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><HiStar /> Hero</div>}
      {!item.isPrimary && <div className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-full ${isVideo ? 'bg-purple-500 text-white' : 'bg-white/80 text-gray-600'}`}>{isVideo ? '🎬 Video' : '🖼️'}</div>}
      <div className="absolute top-2 right-2 w-6 h-6 bg-black/50 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{index + 1}</div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform">
        <p className="text-white text-[10px] truncate mb-1">{item.name}</p>
        <div className="flex gap-1">
          {!item.isPrimary && <button onClick={(e) => { e.stopPropagation(); onSetPrimary(item.id); }}
            className="flex-1 bg-white/20 text-white text-[10px] py-1.5 rounded-lg hover:bg-white/30 flex items-center justify-center gap-1"><HiOutlineStar /> Set Hero</button>}
          <button onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
            className="bg-red-500/80 text-white p-1.5 rounded-lg hover:bg-red-600"><HiOutlineTrash className="text-xs" /></button>
        </div>
      </div>
    </div>
  );
}

export default function SortableMediaGrid({ media, onMediaChange, onRemove }) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (e) => {
    const { active, over } = e;
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const oldIdx = media.findIndex((m) => m.id === active.id);
    const newIdx = media.findIndex((m) => m.id === over.id);
    const updated = [...media];
    const [moved] = updated.splice(oldIdx, 1);
    updated.splice(newIdx, 0, moved);
    updated.forEach((m, i) => { m.isPrimary = i === 0; });
    onMediaChange(updated);
  };

  const setPrimary = (id) => {
    const idx = media.findIndex((m) => m.id === id);
    if (idx === -1) return;
    const updated = [...media];
    const [item] = updated.splice(idx, 1);
    updated.unshift(item);
    updated.forEach((m, i) => { m.isPrimary = i === 0; });
    onMediaChange(updated);
  };

  if (media.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-700">Media ({media.length})</h4>
        <p className="text-xs text-gray-400">Drag to reorder • First = Hero</p>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter}
        onDragStart={(e) => setActiveId(e.active.id)} onDragEnd={handleDragEnd}>
        <SortableContext items={media.map((m) => m.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media.map((item, i) => (
              <SortableItem key={item.id} item={item} index={i} onRemove={onRemove} onSetPrimary={setPrimary} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}