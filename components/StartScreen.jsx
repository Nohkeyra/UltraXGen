

import React, { useMemo } from 'react';
import { PanelMode } from '../types';
import { VectorIcon, TypographyIcon, MonogramIcon, ExtractorIcon, FilterIcon, PulseIcon, BoxIcon } from './Icons'; 
import { PageLayout } from './Layouts.jsx';





const PALETTES = [
  { bgColor, textColor, accentColor, shadowColor, darkBgColor, darkTextColor, darkAccentColor,
  { bgColor, textColor, accentColor, shadowColor, darkBgColor, darkTextColor, darkAccentColor,
  { bgColor, textColor, accentColor, shadowColor, darkBgColor, darkTextColor, darkAccentColor,
  { bgColor, textColor, accentColor, shadowColor, darkBgColor, darkTextColor, darkAccentColor,
  { bgColor, textColor, accentColor, shadowColor, darkBgColor, darkTextColor, darkAccentColor,
  { bgColor, textColor, accentColor, shadowColor, darkBgColor, darkTextColor, darkAccentColor,
  { bgColor, textColor, accentColor, shadowColor, darkBgColor, darkTextColor, darkAccentColor,
  { bgColor, textColor, accentColor, shadowColor, darkBgColor, darkTextColor, darkAccentColor,
];

function shuffle(array){
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const StartScreen = ({ onSelectMode = (_mode) => {}, recentCount = 0, enabledModes = Object.values(PanelMode) }) => {
  const shuffledPalettes = useMemo(() => shuffle(PALETTES), []);

  const allCardConfigs = useMemo(() => [
    { title, subtitle, Icon, mode,
    { title, subtitle, Icon, mode,
    { title, subtitle, Icon, mode,
    { title, subtitle, Icon, mode,
    { title, subtitle, Icon, mode,
    { title, subtitle, Icon, mode, []);

  const visibleCardConfigs = useMemo(() => {
    return allCardConfigs.filter(config => enabledModes.includes(config.mode));
  }, [allCardConfigs, enabledModes]);

  return (
    <PageLayout centered>
      <div className="flex flex-col items-center justify-center text-center py-2 md:py-8">
        <div className="flex flex-col items-center max-w-4xl w-full mb-4 md:mb-12 scale-90 md:scale-100 origin-top">
          <div className="relative inline-block mb-4 md:mb-8">
            <div className="w-12 h-12 sm:w-32 sm:h-32 bg-brandCharcoal dark:bg-zinc-900 border-[4px] sm:border-[12px] border-brandRed flex items-center justify-center mx-auto shadow-[6px_6px_0px_0px_#CC0001] sm:shadow-[16px_16px_0px_0px_#CC0001] hover:translate-x-1.5 hover:translate-y-1.5 transition-transform duration-500 cursor-pointer group rounded-sm">
               <svg className="group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out" width="30" height="30" viewBox="0 0 240 240" fill="none" stroke="#FFCC00" strokeWidth="4"><path d="M120 20L150 100H230L165 150L190 230L120 180L50 230L75 150L10 100H90L120 20Z" fill="currentColor" /></svg>
            </div>
            <div className="absolute -bottom-2 -right-4 bg-brandYellow text-brandBlue text-[7px] sm:text-[9px] font-black uppercase px-2 py-0.5 sm:px-3 sm:py-1.5 italic tracking-widest shadow-lg rounded-sm border border-brandBlue">Engine_v5.2</div>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-brandCharcoal dark:text-white italic uppercase leading-[0.8] select-none mb-3 md:mb-8">HYPER<span className="text-brandRed">X</span>GEN</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
             <div className="flex flex-col items-start border-l-2 border-brandRed pl-3 text-left">
               <p className="text-[8px] sm:text-[12px] font-black uppercase tracking-[0.3em] text-brandCharcoalMuted dark:text-white/40 leading-none mb-0.5">Architectural_Engine</p>
               <span className="text-[7px] sm:text-[9px] font-bold text-brandRed uppercase tracking-widest animate-pulse">PROTOCOL_LOCKED</span>
             </div>
             {recentCount > 0 && (
               <div className="flex items-center gap-2 bg-brandCharcoal dark:bg-zinc-800 p-1.5 px-4 rounded-sm border border-brandRed/20 shadow-lg">
                 <div className="w-1.5 h-1.5 bg-brandRed rounded-full animate-ping"></div>
                 <span className="text-[8px] sm)}
          </div>
        </div>

        <div className="grid grid-cols-2 md, index) => (
            <ModeCard 
              key={config.mode}
              title={config.title} 
              subtitle={config.subtitle} 
              Icon={config.Icon} 
              onClick={() => onSelectMode(config.mode)}
              {...shuffledPalettes[index % shuffledPalettes.length]}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

const ModeCard = ({ title, subtitle, onClick, Icon, bgColor, textColor, accentColor, shadowColor, darkBgColor, darkTextColor, darkAccentColor }: any) => (
  <button 
    onClick={onClick} 
    className={`relative group p-3 md,0,1,0.2)]`}
    style={{ 
      boxShadow,
    }}
  >
    <div className={`absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 -mr-6 -mt-6 md:-mr-12 md:-mt-12 rounded-full blur-2xl md:blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-1000
      ${accentColor} ${darkAccentColor || 'dark:bg-brandRed/5'}
    `}></div>
    
    <div className="absolute top-2 right-2 md:top-6 md:right-6 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 opacity-30">
      <Icon className={`w-6 h-6 md:w-14 md:h-14 ${textColor} ${darkTextColor || 'dark:text-white'}`} />
    </div>

    <div className="relative z-10 space-y-1 md:space-y-3">
      <h3 className={`text-xl md:text-4xl font-black uppercase italic tracking-tighter leading-none ${textColor} ${darkTextColor || 'dark:text-white'}`}>{title}</h3>
      <div className={`h-1 md:h-1.5 w-6 md:w-12 bg-current group-hover:w-full transition-all duration-500`} />
    </div>
    
    <p className={`relative z-10 text-[7px] md);
