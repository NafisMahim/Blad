import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AdGenerator from './components/AdGenerator';
import CampaignGenerator from './components/CampaignGenerator';
import AdRewriter from './components/AdRewriter';
import SavedCampaigns from './components/SavedCampaigns';
import ColdEmailGenerator from './components/ColdEmailGenerator';
import SocialBlitzGenerator from './components/SocialBlitzGenerator';
import InfluencerPitchGenerator from './components/InfluencerPitchGenerator';
import CampaignExporter from './components/CampaignExporter';
import AdComparator from './components/AdComparator';
import PersonaProfiler from './components/PersonaProfiler';
import ContentAngleGenerator from './components/ContentAngleGenerator';
import TrendRewriter from './components/TrendRewriter';
import ABVariationGenerator from './components/ABVariationGenerator';
import TonePolisher from './components/TonePolisher';
import CampaignPackExporter from './components/CampaignPackExporter';
import HookAnalyzer from './components/HookAnalyzer';
import HeadlineSplitTester from './components/HeadlineSplitTester';
import AudienceResonanceAnalyzer from './components/AudienceResonanceAnalyzer';
import PainPointExtractor from './components/PainPointExtractor';
import OfferOptimizer from './components/OfferOptimizer';
import ScriptToSkitConverter from './components/ScriptToSkitConverter';
import StoryboardBuilder from './components/StoryboardBuilder';
import EmotionalTriggerMapper from './components/EmotionalTriggerMapper';
import ControversialTakeGenerator from './components/ControversialTakeGenerator';
import FlipScriptReverser from './components/FlipScriptReverser';
import PersonaCTAGenerator from './components/PersonaCTAGenerator';
import BeforeAfterAdGenerator from './components/BeforeAfterAdGenerator';
import MetaphorMagicTool from './components/MetaphorMagicTool';
import CommentBaitGenerator from './components/CommentBaitGenerator';
import AdBuildingBlockAssembler from './components/AdBuildingBlockAssembler';
// NEW FINAL 12 FEATURES
import AdVersionExplainer from './components/AdVersionExplainer';
import ModularAdAssembler from './components/ModularAdAssembler';
import AdGoalMatcher from './components/AdGoalMatcher';
import Deviralizer from './components/Deviralizer';
import FirstThreeSecondsOptimizer from './components/FirstThreeSecondsOptimizer';
import CTAPersonalizer from './components/CTAPersonalizer';
import PsychTestForCopy from './components/PsychTestForCopy';
import VisualAdBuilder from './components/VisualAdBuilder';
import AdStyleRoulette from './components/AdStyleRoulette';
import AdMagnetBreakdown from './components/AdMagnetBreakdown';
import ViralPerformancePredictor from './components/ViralPerformancePredictor';
import HookMemoryTest from './components/HookMemoryTest';
// MORE FEATURES (12 NEW)
import OfferAngleMatcher from './components/OfferAngleMatcher';
import HookFrameTester from './components/HookFrameTester';
import CreatorFunnelBuilder from './components/CreatorFunnelBuilder';
import CourseSummaryGenerator from './components/CourseSummaryGenerator';
import CommentExploder from './components/CommentExploder';
import ViralCTASequencer from './components/ViralCTASequencer';
import PlatformTimingForecaster from './components/PlatformTimingForecaster';
import ContentEthicsSanitizer from './components/ContentEthicsSanitizer';
import ValueLadderBuilder from './components/ValueLadderBuilder';
import MonetizationGenerator from './components/MonetizationGenerator';
import ContentFrameworkBuilder from './components/ContentFrameworkBuilder';
import CourseCurriculumBuilder from './components/CourseCurriculumBuilder';
// 10 NEW ADDITIONAL FEATURES
import ZeroToStartupEngine from './components/ZeroToStartupEngine';
import ContentCalendarGenerator from './components/ContentCalendarGenerator';
import PromptDebugger from './components/PromptDebugger';
import OnePersonAgencyAutomator from './components/OnePersonAgencyAutomator';
import ProductLaunchFlow from './components/ProductLaunchFlow';
import FailureAnalyzer from './components/FailureAnalyzer';
import IncomeStreamGenerator from './components/IncomeStreamGenerator';
import InfographicWizard from './components/InfographicWizard';
import DigitalProductGenerator from './components/DigitalProductGenerator';
import CreatorCollabConnector from './components/CreatorCollabConnector';
// NEW BUSINESS FEATURES
import ContractClauseNegotiator from './components/ContractClauseNegotiator';
import RegulationGapScanner from './components/RegulationGapScanner';
import MonetizationMultiplier from './components/MonetizationMultiplier';
import CrisisCommsGenerator from './components/CrisisCommsGenerator';
import AcquisitionLanguageTranslator from './components/AcquisitionLanguageTranslator';
import ChurnAutopsyReport from './components/ChurnAutopsyReport';
import GlobalPayrollArchitect from './components/GlobalPayrollArchitect';
import IPStrategySimulator from './components/IPStrategySimulator';
import BoardMeetingAlchemist from './components/BoardMeetingAlchemist';
import ExitMultiplierEngine from './components/ExitMultiplierEngine';
// NEW BLUE FEATURES
import IdeaToCompany from './components/IdeaToCompany';
import AutoGhostwriter from './components/AutoGhostwriter';
import DecisionClarity from './components/DecisionClarity';
import BreakpointFixer from './components/BreakpointFixer';
import HyperPersona from './components/HyperPersona';
import PerfectPricing from './components/PerfectPricing';
import AudienceTrigger from './components/AudienceTrigger';
import StartupStrategy from './components/StartupStrategy';
import MiniSaaS from './components/MiniSaaS';
import DistributionStack from './components/DistributionStack';

import PricingModal from './components/PricingModal';
import Navigation from './components/Navigation';
import { AdResult, SavedCampaign } from './types/ad';
import { supabase } from './lib/supabase';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SuccessPage from './components/SuccessPage';
import { checkSubscription } from './lib/stripe';

type ActivePage = 'generator' | 'campaign' | 'rewriter' | 'saved' | 'email' | 'social' | 'influencer' | 'export' |
  'comparator' | 'personas' | 'angles' | 'trend-rewriter' | 'ab-variations' | 'tone-polisher' | 'campaign-pack' | 'hook-analyzer' |
  'headline-tester' | 'audience-analyzer' | 'pain-extractor' | 'offer-optimizer' | 'script-skit' | 'storyboard' | 
  'emotion-mapper' | 'controversial' | 'flip-script' | 'persona-cta' | 'before-after' | 'metaphor' | 'comment-bait' | 'ad-blocks' |
  // NEW FINAL 12 FEATURES
  'ad-explainer' | 'modular-assembler' | 'goal-matcher' | 'deviralizer' | 'first-3-seconds' | 'cta-personalizer' |
  'psych-test' | 'visual-builder' | 'style-roulette' | 'magnet-breakdown' | 'performance-predictor' | 'memory-test' |
  // MORE FEATURES
  'offer-angle-matcher' | 'hook-frame-tester' | 'creator-funnel-builder' | 'course-summary-generator' |
  'comment-exploder' | 'viral-cta-sequencer' | 'platform-timing-forecaster' | 'content-ethics-sanitizer' |
  'value-ladder-builder' | 'monetization-generator' | 'content-framework-builder' | 'course-curriculum-builder' |
  // 10 NEW ADDITIONAL FEATURES
  'startup-engine' | 'content-calendar' | 'prompt-debugger' | 'agency-automator' | 'product-launch' |
  'failure-analyzer' | 'income-streams' | 'infographic-wizard' | 'digital-product' | 'collab-connector' |
  // NEW BUSINESS FEATURES
  'contract-negotiator' | 'regulation-scanner' | 'monetization-multiplier' | 'crisis-comms' | 'acquisition-translator' |
  'churn-autopsy' | 'global-payroll' | 'ip-strategy' | 'board-meeting' | 'exit-multiplier' |
  // NEW BLUE FEATURES
  'idea-to-company' | 'auto-ghostwriter' | 'decision-clarity' | 'breakpoint-fixer' | 'hyperpersona' |
  'perfect-pricing' | 'audience-trigger' | 'startup-strategy' | 'mini-saas' | 'distribution-stack';

function App() {
  const [activePage, setActivePage] = useState<ActivePage>('generator');
  const [generatedAd, setGeneratedAd] = useState<AdResult | null>(null);
  const [showPricing, setShowPricing] = useState(false);
  const [hasUsedFreeTrial, setHasUsedFreeTrial] = useState(false);
  const [savedCampaigns, setSavedCampaigns] = useState<SavedCampaign[]>([]);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check for active session
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
      }
      setSession(data.session);
      
      // Check subscription status
      if (data.session) {
        const subscription = await checkSubscription();
        setIsSubscribed(subscription.isSubscribed);
      }
      
      setLoading(false);
      
      // Set up auth state change listener
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, newSession) => {
          setSession(newSession);
          
          // Check subscription status when auth state changes
          if (newSession) {
            const subscription = await checkSubscription();
            setIsSubscribed(subscription.isSubscribed);
          } else {
            setIsSubscribed(false);
          }
        }
      );
      
      return () => {
        authListener.subscription.unsubscribe();
      };
    };
    
    getSession();
  }, []);

  // Load saved campaigns from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('adrocket-campaigns');
    if (saved) {
      setSavedCampaigns(JSON.parse(saved));
    }
  }, []);

  const handleAdGenerated = (ad: AdResult) => {
    setGeneratedAd(ad);
    
    // Only set free trial usage if not subscribed
    if (!isSubscribed) {
      setHasUsedFreeTrial(true);
    }
    
    // Save to campaigns
    const newCampaign: SavedCampaign = {
      id: Date.now().toString(),
      name: `${ad.businessType} Campaign`,
      ad,
      createdAt: new Date().toISOString(),
      type: 'single'
    };
    
    const updatedCampaigns = [newCampaign, ...savedCampaigns];
    setSavedCampaigns(updatedCampaigns);
    localStorage.setItem('adrocket-campaigns', JSON.stringify(updatedCampaigns));
  };

  const handleCampaignGenerated = (campaign: SavedCampaign) => {
    const updatedCampaigns = [campaign, ...savedCampaigns];
    setSavedCampaigns(updatedCampaigns);
    localStorage.setItem('adrocket-campaigns', JSON.stringify(updatedCampaigns));
  };

  const handleUpgradeClick = () => {
    setShowPricing(true);
  };

  const handleDeleteCampaign = (id: string) => {
    const updatedCampaigns = savedCampaigns.filter(c => c.id !== id);
    setSavedCampaigns(updatedCampaigns);
    localStorage.setItem('adrocket-campaigns', JSON.stringify(updatedCampaigns));
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10">
          <Header 
            onUpgradeClick={handleUpgradeClick} 
            session={session} 
            onSignOut={handleSignOut}
          />
          
          <Routes>
            <Route path="/login" element={!session ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!session ? <SignUp /> : <Navigate to="/" />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/*" element={
              <>
                {!session && !loading ? (
                  <Navigate to="/login" />
                ) : (
                  <>
                    {activePage === 'generator' && !generatedAd && (
                      <HeroSection />
                    )}
                    
                    <Navigation activePage={activePage} onPageChange={setActivePage} />
                    
                    <div className="transition-all duration-500 ease-in-out">
                      {activePage === 'generator' && (
                        <AdGenerator 
                          onAdGenerated={handleAdGenerated}
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                          generatedAd={generatedAd}
                        />
                      )}
                      
                      {activePage === 'campaign' && (
                        <CampaignGenerator 
                          onCampaignGenerated={handleCampaignGenerated}
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}
                      
                      {activePage === 'rewriter' && (
                        <AdRewriter 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'email' && (
                        <ColdEmailGenerator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'social' && (
                        <SocialBlitzGenerator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'influencer' && (
                        <InfluencerPitchGenerator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'export' && (
                        <CampaignExporter 
                          campaigns={savedCampaigns}
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'comparator' && (
                        <AdComparator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'personas' && (
                        <PersonaProfiler 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'angles' && (
                        <ContentAngleGenerator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'trend-rewriter' && (
                        <TrendRewriter 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'ab-variations' && (
                        <ABVariationGenerator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'tone-polisher' && (
                        <TonePolisher 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'campaign-pack' && (
                        <CampaignPackExporter 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'hook-analyzer' && (
                        <HookAnalyzer 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'headline-tester' && (
                        <HeadlineSplitTester 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'audience-analyzer' && (
                        <AudienceResonanceAnalyzer 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {/* ALL 12 ADVANCED FEATURES - FULLY FUNCTIONAL */}
                      {activePage === 'pain-extractor' && (
                        <PainPointExtractor 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'offer-optimizer' && (
                        <OfferOptimizer 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'script-skit' && (
                        <ScriptToSkitConverter 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'storyboard' && (
                        <StoryboardBuilder 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'emotion-mapper' && (
                        <EmotionalTriggerMapper 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'controversial' && (
                        <ControversialTakeGenerator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'flip-script' && (
                        <FlipScriptReverser 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'persona-cta' && (
                        <PersonaCTAGenerator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'before-after' && (
                        <BeforeAfterAdGenerator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'metaphor' && (
                        <MetaphorMagicTool 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'comment-bait' && (
                        <CommentBaitGenerator 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'ad-blocks' && (
                        <AdBuildingBlockAssembler 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {/* NEW FINAL 12 FEATURES - ALL FULLY FUNCTIONAL */}
                      {activePage === 'ad-explainer' && (
                        <AdVersionExplainer 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'modular-assembler' && (
                        <ModularAdAssembler 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'goal-matcher' && (
                        <AdGoalMatcher 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'deviralizer' && (
                        <Deviralizer 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'first-3-seconds' && (
                        <FirstThreeSecondsOptimizer 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'cta-personalizer' && (
                        <CTAPersonalizer 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'psych-test' && (
                        <PsychTestForCopy 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'visual-builder' && (
                        <VisualAdBuilder 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'style-roulette' && (
                        <AdStyleRoulette 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'magnet-breakdown' && (
                        <AdMagnetBreakdown 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'performance-predictor' && (
                        <ViralPerformancePredictor 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'memory-test' && (
                        <HookMemoryTest 
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {/* MORE FEATURES (12 NEW) - ALL FULLY FUNCTIONAL */}
                      {activePage === 'offer-angle-matcher' && (
                        <OfferAngleMatcher
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'hook-frame-tester' && (
                        <HookFrameTester
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'creator-funnel-builder' && (
                        <CreatorFunnelBuilder
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'course-summary-generator' && (
                        <CourseSummaryGenerator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'comment-exploder' && (
                        <CommentExploder
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'viral-cta-sequencer' && (
                        <ViralCTASequencer
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'platform-timing-forecaster' && (
                        <PlatformTimingForecaster
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'content-ethics-sanitizer' && (
                        <ContentEthicsSanitizer
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'value-ladder-builder' && (
                        <ValueLadderBuilder
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'monetization-generator' && (
                        <MonetizationGenerator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'content-framework-builder' && (
                        <ContentFrameworkBuilder
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'course-curriculum-builder' && (
                        <CourseCurriculumBuilder
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {/* 10 NEW ADDITIONAL FEATURES - ALL FULLY FUNCTIONAL */}
                      {activePage === 'startup-engine' && (
                        <ZeroToStartupEngine
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'content-calendar' && (
                        <ContentCalendarGenerator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'prompt-debugger' && (
                        <PromptDebugger
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'agency-automator' && (
                        <OnePersonAgencyAutomator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'product-launch' && (
                        <ProductLaunchFlow
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'failure-analyzer' && (
                        <FailureAnalyzer
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'income-streams' && (
                        <IncomeStreamGenerator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'infographic-wizard' && (
                        <InfographicWizard
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'digital-product' && (
                        <DigitalProductGenerator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'collab-connector' && (
                        <CreatorCollabConnector
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {/* 10 NEW BUSINESS FEATURES - ALL FULLY FUNCTIONAL */}
                      {activePage === 'contract-negotiator' && (
                        <ContractClauseNegotiator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'regulation-scanner' && (
                        <RegulationGapScanner
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'monetization-multiplier' && (
                        <MonetizationMultiplier
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'crisis-comms' && (
                        <CrisisCommsGenerator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'acquisition-translator' && (
                        <AcquisitionLanguageTranslator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'churn-autopsy' && (
                        <ChurnAutopsyReport
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'global-payroll' && (
                        <GlobalPayrollArchitect
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'ip-strategy' && (
                        <IPStrategySimulator
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'board-meeting' && (
                        <BoardMeetingAlchemist
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'exit-multiplier' && (
                        <ExitMultiplierEngine
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {/* NEW BLUE FEATURES - ALL FULLY FUNCTIONAL */}
                      {activePage === 'idea-to-company' && (
                        <IdeaToCompany
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'auto-ghostwriter' && (
                        <AutoGhostwriter
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'decision-clarity' && (
                        <DecisionClarity
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'breakpoint-fixer' && (
                        <BreakpointFixer
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'hyperpersona' && (
                        <HyperPersona
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'perfect-pricing' && (
                        <PerfectPricing
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'audience-trigger' && (
                        <AudienceTrigger
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'startup-strategy' && (
                        <StartupStrategy
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'mini-saas' && (
                        <MiniSaaS
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}

                      {activePage === 'distribution-stack' && (
                        <DistributionStack
                          onUpgradeClick={handleUpgradeClick}
                          hasUsedFreeTrial={hasUsedFreeTrial && !isSubscribed}
                        />
                      )}
                      
                      {activePage === 'saved' && (
                        <SavedCampaigns 
                          campaigns={savedCampaigns}
                          onDeleteCampaign={handleDeleteCampaign}
                        />
                      )}
                    </div>
                  </>
                )}
              </>
            } />
          </Routes>
          
          {showPricing && (
            <PricingModal onClose={() => setShowPricing(false)} />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;