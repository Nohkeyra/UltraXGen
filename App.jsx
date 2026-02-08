
import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { PanelMode, KernelConfig, ExtractionResult, CloudArchiveEntry, LogEntry } from './types.js';
import { BootScreen } from './components/BootScreen.jsx';
import { RealRefineDiagnostic } from './components/RealRefineDiagnostic.jsx';
import { RealRepairDiagnostic } from './components/RealRepairDiagnostic.jsx';
import { useDeviceDetection } from './components/DeviceDetector.jsx';
import { StartScreen } from './components/StartScreen.jsx';
import { PanelHeader } from './components/PanelHeader.jsx';
import { AppControlsBar } from './components/AppControlsBar.jsx';
import { LogViewer } from './components/LogViewer.jsx';
import { LoadingSpinner } from './components/Loading.jsx';

// Lazy-load panel components for better initial performance
const VectorPanel = lazy(() => import('./components/VectorPanel.jsx').then(module => ({ default)));
const TypographyPanel = lazy(() => import('./components/TypographyPanel.jsx').then(module => ({ default)));
const MonogramPanel = lazy(() => import('./components/MonogramPanel.jsx').then(module => ({ default)));
const StyleExtractorPanel = lazy(() => import('./components/StyleExtractorPanel.jsx').then(module => ({ default)));
const ImageFilterPanel = lazy(() => import('./components/ImageFilterPanel.jsx').then(module => ({ default)));
const SystemAuditPanel = lazy(() => import('./components/SystemAuditPanel.jsx').then(module => ({ default)));


const LS_KEYS = {
  ARCHIVES,
  DNA,
  PRESETS,
  RECENT,
  THEME,
  CONFIG,
  LOGS: 'hyperxgen_logs_v1'
};

;
}

export const App = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [currentPanel, setCurrentPanel] = useState(PanelMode.START);
  const [transferData, setTransferData] = useState(null);
  const [isRepairing, setIsRepairing] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [systemIntegrity, setSystemIntegrity] = useState(100);
  const [activeDna, setActiveDna] = useState(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [enabledModes, setEnabledModes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [showLogViewer, setShowLogViewer] = useState(false);
  const [currentPanelState, setCurrentPanelState] = useState(null);
  
  const deviceInfo = useDeviceDetection();
  const [uiRefinementLevel, setUiRefinementLevel] = useState(0);

  const [kernelConfig, setKernelConfig] = useState({
    thinkingBudget,
    temperature,
    model,
    deviceContext);

  const [recentWorks, setRecentWorks] = useState([]);
  const [savedPresets, setSavedPresets] = useState([]);
  const [cloudArchives, setCloudArchives] = useState([]);

  const addLog = useCallback((message, type: 'info' | 'error' | 'success' | 'warning' = 'info') => {
    setLogs(prev => {
      const newLogEntry = {
        id).toString(),
        timestamp).toLocaleTimeString(),
        message,
        type,
      };
      return [newLogEntry, ...prev].slice(0, 50); 
    });
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem(LS_KEYS.THEME);
    if (storedTheme) setIsDarkMode(storedTheme === 'dark');
    else if (window.matchMedia('(prefers-color-scheme)').matches) setIsDarkMode(true);

    const storedConfig = localStorage.getItem(LS_KEYS.CONFIG);
    if (storedConfig) {
      setKernelConfig(prev => ({ ...prev, ...JSON.parse(storedConfig) }));
    }
    
    const storedLogs = localStorage.getItem(LS_KEYS.LOGS);
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem(LS_KEYS.THEME, isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => setIsDarkMode(prev => !prev), []);

  useEffect(() => {
    if (!isBooting && !hasInitialized) {
      const boot = async () => {
        try {
          addLog("INITIATING, 'info');
          const response = await fetch('/config.json');
          const appConfig = await response.json();
          
          const configuredModes = appConfig.panels.enabled.map(panelName => {
            switch (panelName) {
              case 'VectorPanel': return PanelMode.VECTOR;
              case 'TypographyPanel': return PanelMode.TYPOGRAPHY;
              case 'MonogramPanel': return PanelMode.MONOGRAM;
              case 'StyleExtractorPanel': return PanelMode.EXTRACTOR;
              case 'ImageFilterPanel': return PanelMode.FILTERS;
              case 'SystemAuditPanel': return PanelMode.AUDIT;
              default).filter(mode => mode !== PanelMode.START);
          setEnabledModes(configuredModes);

          const p4 = localStorage.getItem(LS_KEYS.PRESETS);
          setSavedPresets(p4 ? JSON.parse(p4)
          const r4 = localStorage.getItem(LS_KEYS.RECENT);
          setRecentWorks(r4 ? JSON.parse(r4)
          const dna = localStorage.getItem(LS_KEYS.DNA);
          if (dna) setActiveDna(JSON.parse(dna));
          const archives = localStorage.getItem(LS_KEYS.ARCHIVES);
          setCloudArchives(archives ? JSON.parse(archives)
          
          setHasInitialized(true);
          addLog("ARCHITECTURE, 'success');
        } catch (e) {
          setHasInitialized(true);
          addLog(`CRITICAL_KERNEL_PANIC)}`, 'error');
        }
      };
      boot();
    }
  }, [addLog, isBooting, hasInitialized]);

  useEffect(() => { 
    if (hasInitialized) {
      localStorage.setItem(LS_KEYS.PRESETS, JSON.stringify(savedPresets)); 
      localStorage.setItem(LS_KEYS.RECENT, JSON.stringify(recentWorks.slice(0, 15))); 
      localStorage.setItem(LS_KEYS.ARCHIVES, JSON.stringify(cloudArchives));
      localStorage.setItem(LS_KEYS.DNA, JSON.stringify(activeDna));
      localStorage.setItem(LS_KEYS.CONFIG, JSON.stringify(kernelConfig));
      localStorage.setItem(LS_KEYS.LOGS, JSON.stringify(logs));
    }
  }, [savedPresets, recentWorks, cloudArchives, activeDna, kernelConfig, logs, hasInitialized]);

  const handleCommitFeedback = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addLog("COMMIT_SUCCESS, 'success');
    }, 800);
  }, [addLog]);

  const handleCommitToVault = useCallback(() => {
    const outputImage = currentPanelState?.generatedOutput || currentPanelState?.filteredImage;

    if (!currentPanelState || !outputImage) {
      addLog("COMMIT_FAIL, 'error');
      return;
    }

    setIsSaving(true);

    const name = currentPanelState.prompt ? 
      `Commit, 15)}` :
      currentPanelState.name || `Commit: ${currentPanelState.type}`;

    const newPreset = {
      id)}`,
      name,
      type,
      description).toLocaleDateString()}`,
      ...currentPanelState,
      generatedOutput,
      imageUrl,
      timestamp).toLocaleTimeString()
    };

    if (savedPresets.some(p => p.generatedOutput === newPreset.generatedOutput)) {
        addLog("COMMIT_INFO, 'info');
        setIsSaving(false);
        return;
    }

    setSavedPresets(prev => [newPreset, ...prev]);

    setTimeout(() => {
      setIsSaving(false);
      addLog("COMMIT_SUCCESS, 'success');
    }, 800);
  }, [currentPanelState, addLog, savedPresets]);

  const handleModeSwitch = useCallback((mode, data?: any) => {
    setCurrentPanel(mode);
    setTransferData(data || null);
    addLog(`OMEGA_PIVOT)}_ENGAGED`, 'info');
  }, [addLog]);

  const handleDeletePreset = useCallback((id) => {
    setSavedPresets(prev => prev.filter(p => p.id !== id));
    addLog("DNA_VAULT, 'warning');
  }, [addLog]);

  const handleSetGlobalDna = useCallback((dna) => {
    setActiveDna(dna);
    addLog(dna ? `DNA_ANCHOR)}` : "DNA_ANCHOR, 'info');
  }, [addLog]);

  const handleLoadItem = useCallback((item) => {
    if (item.dna) {
      handleSetGlobalDna(item.dna);
      addLog(`DNA_INJECTION)} APPLIED`, 'success');
      const synthesisModes = [PanelMode.VECTOR, PanelMode.TYPOGRAPHY, PanelMode.MONOGRAM];
      if (!synthesisModes.includes(currentPanel)) {
        handleModeSwitch(item.type || item.mode, item);
      }
    } else {
      handleModeSwitch(item.type || item.mode, item);
    }
  }, [currentPanel, handleSetGlobalDna, handleModeSwitch, addLog]);

  const handleBootComplete = useCallback(() => {
    setIsBooting(false);
  }, []);

  if (isBooting) {
    return <BootScreen onBootComplete={handleBootComplete} isDarkMode={isDarkMode} />;
  }

  const renderPanel = () => {
    if (!hasInitialized) return null;
    const commonProps = {
      initialData,
      kernelConfig,
      integrity,
      refinementLevel,
      onSaveToHistory) => {
        setRecentWorks(p => [w, ...p]);
        addLog(`BUFFER_APPEND)}`, 'success');
      },
      onModeSwitch,
      onSetGlobalDna,
      savedPresets,
      globalDna,
      addLog,
    };

    switch (currentPanel) {
      case PanelMode.START: 
        return <StartScreen recentCount={recentWorks.length} onSelectMode={handleModeSwitch} enabledModes={enabledModes} />;
      case PanelMode.VECTOR: 
        return <VectorPanel {...commonProps} onStateUpdate={setCurrentPanelState} />;
      case PanelMode.TYPOGRAPHY: 
        return <TypographyPanel {...commonProps} onStateUpdate={setCurrentPanelState} />;
      case PanelMode.MONOGRAM: 
        return <MonogramPanel {...commonProps} onStateUpdate={setCurrentPanelState} />;
      case PanelMode.EXTRACTOR:
        return (
          <StyleExtractorPanel 
            {...commonProps}
            onSaveToPresets={(p) => {
              setSavedPresets(prev => [p, ...prev]);
              addLog(`DNA_VAULT, 'success');
            }} 
            onDeletePreset={handleDeletePreset}
            activeGlobalDna={activeDna} 
            onSaveFeedback={handleCommitFeedback}
          />
        );
      case PanelMode.FILTERS:
        return <ImageFilterPanel {...commonProps} onStateUpdate={setCurrentPanelState} />;
      case PanelMode.AUDIT: 
        return <SystemAuditPanel />;
      default: return null;
    }
  };

  return (
    <div className="app-shell relative">
      <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.03] bg-grid-pattern"></div>
      
      {isRepairing && (
        <RealRepairDiagnostic onComplete={(r) => { 
          setIsRepairing(false); 
          setSystemIntegrity(r.systemStabilityScore); 
          addLog(`FORENSIC_SYNC, 'success');
        }} />
      )}
      
      {isRefining && (
        <RealRefineDiagnostic onComplete={(r) => { 
          setIsRefining(false); 
          setUiRefinementLevel(r.visualScore); 
          addLog(`REFINE_REPORT, 'success');
        }} />
      )}
      
      <PanelHeader 
        title="HYPERXGEN" 
        integrity={systemIntegrity}
        onBack={() => handleModeSwitch(PanelMode.START)}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onStartRepair={() => {
          setIsRepairing(true);
          addLog("DIAGNOSTIC, 'info');
        }}
        onStartRefine={() => {
          setIsRefining(true);
          addLog("DIAGNOSTIC, 'info');
        }}
        onToggleLogViewer={() => setShowLogViewer(prev => !prev)}
      />

      <div className="app-main"><div className="app-main-content-area custom-scrollbar">
        <Suspense fallback={<LoadingSpinner />}>
          {renderPanel()}
        </Suspense>
      </div></div>
      
      <AppControlsBar 
        activeMode={currentPanel}
        recentWorks={recentWorks}
        savedPresets={savedPresets}
        cloudArchives={cloudArchives}
        isSaving={isSaving}
        onSwitchMode={handleModeSwitch}
        onForceSave={handleCommitToVault}
        onLoadHistoryItem={handleLoadItem}
        enabledModes={enabledModes}
      />

      <LogViewer 
        logs={logs} 
        onClear={() => setLogs([])} 
        isOpen={showLogViewer} 
        onClose={() => setShowLogViewer(false)} 
      />
    </div>
  );
};
