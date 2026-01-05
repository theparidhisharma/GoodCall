import React from 'react';
import { Activity, Zap, Leaf } from 'lucide-react';
import { Goal } from './types';

export const DEFAULT_GOALS: Goal[] = [
  { id: 'gut', label: 'Gut Health', sub: 'No Bloating / Low FODMAP', icon: React.createElement(Activity, { size: 20 }), color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/50' },
  { id: 'sugar', label: 'Insulin Control', sub: 'Strict Low Sugar', icon: React.createElement(Zap, { size: 20 }), color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' },
  { id: 'vegan', label: 'Plant Based', sub: 'No Animal Products', icon: React.createElement(Leaf, { size: 20 }), color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' },
];
