import React from 'react';

export type ViewState = 'camera' | 'decision' | 'compare' | 'warning' | 'wrapped' | 'goals' | 'history' | 'analysis';
export type Sentiment = 'positive' | 'negative' | 'neutral' | 'uncertain';

export interface ProductData {
  name: string;
  brand: string;
  image: string;
  verdict: string;
  reason: string;
  pros: string[];
  cons: string[];
  sentiment: Sentiment;
  confidence: number;
  matchScore: number;
  calories: number | string;
  price: string;
}

export interface Goal {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactElement;
  color: string;
  bg: string;
  border: string;
}
