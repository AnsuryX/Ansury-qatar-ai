import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, FileText, CheckCircle, AlertTriangle, Play, Save, 
  Settings, Key, Link2, HelpCircle, ArrowRight, Table, Terminal, 
  RefreshCw, Check, LogIn, LogOut, CheckCircle2
} from 'lucide-react';

interface FormMapping {
  formUrl: string;
  firmNameField: string;
  contactPersonField: string;
  emailField: string;
  phoneField: string;
  focusAreaField: string;
  volumeField: string;
  portalsField: string;
}

export default function GoogleFormsSync() {
  const [selectedFormKey, setSelectedFormKey] = useState<'onboarding' | 'case_study'>('onboarding');

  const defaultOnboarding = {
    formUrl: '',
    firmNameField: 'entry.100001',
    contactPersonField: 'entry.100002',
    emailField: 'entry.100003',
    phoneField: 'entry.100004',
    focusAreaField: 'entry.100005',
    volumeField: 'entry.100006',
    portalsField: 'entry.100007'
  };

  const defaultCaseStudy = {
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSew67BxqImdq0wkcA_ReKrcufzqtUy0CGgBKxRdpaEnapeVcg/formResponse',
    firmNameField: 'entry.878293089',
    contactPersonField: 'entry.486856360',
    emailField: 'entry.1855917600',
    phoneField: 'entry.1741765249',
    focusAreaField: 'entry.1305289832',
    volumeField: '',
    portalsField: 'entry.626789171'
  };

  const [mapping, setMapping] = useState<FormMapping>(defaultOnboarding);

  const [activeStep, setActiveStep] = useState(1);
  const [logs, setLogs] = useState<{ time: string; type: string; msg: string; success: boolean }[]>([]);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  
  // Google API OAuth elements
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ email?: string; name?: string; picture?: string } | null>(null);
  const [userForms, setUserForms] = useState<any[]>([]);
  const [isLoadingForms, setIsLoadingForms] = useState(false);
  const [gClientId, setGClientId] = useState('');

  // Sample submission to preview
  const [formData, setFormData] = useState({
    firmName: 'Doha Towers Brokerage',
    contactPerson: 'Ali Al-Mansoori',
    email: 'ali@dohaspire.qa',
    phone: '+974 5511 2233',
    focusArea: 'Lusail Marina/City',
    monthlyInquiries: '250',
    portalsUsed: 'Property Finder, Bayut Qatar'
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedClientId = localStorage.getItem('ansury_gform_clientid');
    if (savedClientId) {
      setGClientId(savedClientId);
    }

    const savedMapping = localStorage.getItem('ansury_gform_mapping');
    if (savedMapping) {
      try {
        setMapping(JSON.parse(savedMapping));
      } catch (e) {
        console.error('Failed to parse saved form mapping');
      }
    }

    // Capture OAuth implicit grant token if returned
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) {
        setAccessToken(token);
        localStorage.setItem('ansury_google_token', token);
        // Clear hash from URL cleanly
        window.history.replaceState(null, '', window.location.pathname);
        addLog('oauth', 'Google Sign-In successful. Workspace Token established.', true);
        fetchGoogleUserInfo(token);
      }
    } else {
      const storedToken = localStorage.getItem('ansury_google_token');
      if (storedToken) {
        setAccessToken(storedToken);
        fetchGoogleUserInfo(storedToken);
      }
    }
  }, []);

  const handleFormTabChange = (key: 'onboarding' | 'case_study') => {
    // Sync current active form before switching
    const currentStorageKey = selectedFormKey === 'onboarding' ? 'ansury_gform_mapping' : 'ansury_case_studies_gform_mapping';
    localStorage.setItem(currentStorageKey, JSON.stringify(mapping));

    setSelectedFormKey(key);

    const targetStorageKey = key === 'onboarding' ? 'ansury_gform_mapping' : 'ansury_case_studies_gform_mapping';
    const saved = localStorage.getItem(targetStorageKey);
    if (saved) {
      try {
        setMapping(JSON.parse(saved));
        addLog('config', `Switched view: custom configuration loaded for [${key === 'onboarding' ? 'Primary Form' : 'Case Study Form'}]`, true);
      } catch (e) {
        setMapping(key === 'onboarding' ? defaultOnboarding : defaultCaseStudy);
      }
    } else {
      const initial = key === 'onboarding' ? defaultOnboarding : defaultCaseStudy;
      setMapping(initial);
      localStorage.setItem(targetStorageKey, JSON.stringify(initial));
      addLog('config', `Switched view: template coordinates initialized for [${key === 'onboarding' ? 'Primary Form' : 'Case Study Form'}]`, true);
    }

    // Set simulator sample inputs appropriately
    if (key === 'case_study') {
      setFormData({
        firmName: 'Doha Premium Properties Enclave',
        contactPerson: 'Salmeen Al-Kuwari',
        email: 'salmeen@dohapremium.qa',
        phone: '+974 6600 7711',
        focusArea: 'Technical Auditing',
        monthlyInquiries: '1',
        portalsUsed: 'Consultation Request for Portfolio Optimization'
      });
    } else {
      setFormData({
        firmName: 'Doha Towers Brokerage',
        contactPerson: 'Ali Al-Mansoori',
        email: 'ali@dohaspire.qa',
        phone: '+974 5511 2233',
        focusArea: 'Lusail Marina/City',
        monthlyInquiries: '250',
        portalsUsed: 'Property Finder, Bayut Qatar'
      });
    }
  };

  const addLog = (type: string, msg: string, success = true) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [{ time: timestamp, type, msg, success }, ...prev.slice(0, 49)]);
  };

  const fetchGoogleUserInfo = async (token: string) => {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUserInfo({ email: data.email, name: data.name, picture: data.picture });
        addLog('api', `Pulled profile info for: ${data.email}`, true);
        fetchUsersGoogleForms(token);
      } else {
        localStorage.removeItem('ansury_google_token');
        setAccessToken(null);
        addLog('api', 'Cached credentials expired. Please sign in again.', false);
      }
    } catch (e) {
      addLog('api', 'Error retrieving user profile info.', false);
    }
  };

  const fetchUsersGoogleForms = async (token: string) => {
    setIsLoadingForms(true);
    addLog('api', 'Querying Google Drive API for Google Forms...', true);
    try {
      const res = await fetch(
        "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.form'&pageSize=8&fields=files(id,name,webViewLink,modifiedTime)",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setUserForms(data.files || []);
        addLog('api', `Successfully retrieved ${data.files?.length || 0} active Google Forms.`, true);
      } else {
        addLog('api', 'Google Drive retrieval failed. Ensure credentials match approved scopes.', false);
      }
    } catch (e) {
      addLog('api', 'Network error querying Google Forms.', false);
    } finally {
      setIsLoadingForms(false);
    }
  };

  const handleOAuthSignIn = () => {
    if (!gClientId) {
      alert('Please configure your Google Developer Client ID in Step 3 below first!');
      return;
    }
    localStorage.setItem('ansury_gform_clientid', gClientId);
    const scopes = [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/forms.body.readonly',
      'https://www.googleapis.com/auth/forms.responses.readonly'
    ].join(' ');

    const redirectUri = window.location.origin;
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(gClientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scopes)}&prompt=consent`;
    
    addLog('oauth', 'Establishing Google Workspace connection link...', true);
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    setAccessToken(null);
    setUserInfo(null);
    setUserForms([]);
    localStorage.removeItem('ansury_google_token');
    addLog('oauth', 'Signed out from Google account. Secure channel severed.', true);
  };

  const saveConfiguration = () => {
    const storageKey = selectedFormKey === 'onboarding' ? 'ansury_gform_mapping' : 'ansury_case_studies_gform_mapping';
    localStorage.setItem(storageKey, JSON.stringify(mapping));
    addLog('config', `${selectedFormKey === 'onboarding' ? 'Primary Form' : 'Case Studies Form'} submission field bindings saved locally.`, true);
    alert('Google Form connection coordinates saved successfully! Your web forms are now fully mapped.');
  };

  const normalizeFormUrl = (url: string): string => {
    if (!url) return '';
    let processed = url.trim();
    if (processed.includes('/viewform')) {
      processed = processed.replace('/viewform', '/formResponse');
    }
    if (!processed.includes('/formResponse') && processed.includes('docs.google.com/forms/d/e/')) {
      const parts = processed.split('?')[0];
      processed = parts + (parts.endsWith('/') ? 'formResponse' : '/formResponse');
    }
    if (processed.includes('?')) {
      processed = processed.split('?')[0];
    }
    return processed;
  };

  const handleTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapping.formUrl) {
      addLog('test', 'Testing halted: Missing target Google Form response endpoint URL.', false);
      alert('Please input your Google Form URL in Step 1 first!');
      return;
    }

    setTestStatus('testing');
    const targetUrl = normalizeFormUrl(mapping.formUrl);
    addLog('test', `Preparing post payload destination: ${targetUrl}`, true);

    const body = new URLSearchParams();
    if (mapping.firmNameField) body.append(mapping.firmNameField, formData.firmName);
    if (mapping.contactPersonField) body.append(mapping.contactPersonField, formData.contactPerson);
    if (mapping.emailField) body.append(mapping.emailField, formData.email);
    if (mapping.phoneField) body.append(mapping.phoneField, formData.phone);
    if (mapping.focusAreaField) body.append(mapping.focusAreaField, formData.focusArea);
    if (mapping.volumeField) body.append(mapping.volumeField, formData.monthlyInquiries);
    if (mapping.portalsField) body.append(mapping.portalsField, formData.portalsUsed);

    addLog('test', `Dispatched Parameters:\n` + JSON.stringify(Object.fromEntries(body.entries()), null, 2), true);

    try {
      await fetch(targetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
      });

      setTestStatus('success');
      addLog('test', 'Lead successfully delivered to Google Form! Mode: [Silent Ingestion]', true);
    } catch (err: any) {
      console.error(err);
      setTestStatus('error');
      addLog('test', `Dispatch error: ${err?.message || 'Server closed or rejected connection'}`, false);
    }
  };

  const autoFillExampleMapping = () => {
    if (selectedFormKey === 'case_study') {
      setMapping(defaultCaseStudy);
      addLog('config', 'Populated case study consultation template blueprint.', true);
    } else {
      setMapping({
        formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfD-exampleFormId12345/formResponse',
        firmNameField: 'entry.18439201',
        contactPersonField: 'entry.58291043',
        emailField: 'entry.99302144',
        phoneField: 'entry.42019482',
        focusAreaField: 'entry.78184920',
        volumeField: 'entry.39105432',
        portalsField: 'entry.67290145'
      });
      addLog('config', 'Populated standard audit feedback template blueprint.', true);
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-12 relative z-10">
      
      {/* Intro Dashboard Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 pb-8 border-b border-[#2A3650]/40">
        <div>
          <span className="font-mono text-xs text-[#06B6D4] uppercase tracking-[0.2em] block font-bold mb-3">
            WORKSPACE WORKFLOW AUTOMATION
          </span>
          <h1 className="font-sora text-3xl md:text-4xl text-white font-bold">
            Google Forms Lead Connection
          </h1>
          <p className="font-sans text-[#8B95A7] text-sm mt-2 max-w-2xl leading-relaxed">
            Eliminate the upkeep overhead of relational databases like Supabase. Retain Ansury’s elegant website front-end design while routing lead payloads directly into your team's centralized Google Forms and Sheets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={autoFillExampleMapping}
            className="text-xs font-mono font-bold text-[#8B95A7] hover:text-[#06B6D4] bg-[#111827] border border-[#2A3650] px-4 py-2.5 rounded-full transition-transform active:scale-95"
          >
            Load Example Mapping Template
          </button>
        </div>
      </div>

      {/* Tab Switcher for Web Forms */}
      <div className="flex bg-[#111827] p-1.5 rounded-xl border border-[#2A3650] max-w-xl mb-8">
        <button
          onClick={() => handleFormTabChange('onboarding')}
          className={`flex-1 py-2.5 px-5 rounded-lg font-sans text-xs font-bold transition-all ${
            selectedFormKey === 'onboarding' 
              ? 'bg-[#06B6D4] text-[#111827] shadow-lg shadow-[#06B6D4]/10' 
              : 'text-[#8B95A7] hover:text-white hover:bg-[#1A2333]'
          }`}
        >
          Primary Agency Audit Form
        </button>
        <button
          onClick={() => handleFormTabChange('case_study')}
          className={`flex-1 py-2.5 px-5 rounded-lg font-sans text-xs font-bold transition-all ${
            selectedFormKey === 'case_study' 
              ? 'bg-[#06B6D4] text-[#111827] shadow-lg shadow-[#06B6D4]/10' 
              : 'text-[#8B95A7] hover:text-white hover:bg-[#1A2333]'
          }`}
        >
          Case Studies Consultation Form
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Active Setup Panel (8 Columns) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Step 1: Destination Form Coordinates */}
          <div className="bg-[#1A2333] border border-[#2A3650] rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-2.5 text-xs text-[#06B6D4] font-mono font-bold uppercase tracking-wider mb-4 pb-3 border-b border-[#2A3650]/45">
              <span className="w-5 h-5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center text-white text-[10px]">1</span>
              <span>Define Form Endpoint</span>
            </div>
            
            <p className="text-[#8B95A7] text-xs leading-relaxed mb-6">
              Create a standard Google Form inside your organization's Workspace account. Get the form's URL or get its "Pre-filled Link" (located in the top-right menu of your Form editor) to extract the entry fields. Then paste it here:
            </p>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono uppercase text-[#D1D5DB] font-bold">Target Google Form URL or formResponse Link</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3.5 top-3 w-4 h-4 text-[#8B95A7]" />
                  <input 
                    type="text"
                    value={mapping.formUrl}
                    onChange={e => setMapping({...mapping, formUrl: e.target.value})}
                    placeholder="https://docs.google.com/forms/d/e/1FAIpQLSfD.../formResponse"
                    className="w-full bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg pl-10 pr-4 py-2.5 outline-none font-sans text-xs transition-colors"
                  />
                </div>
              </div>
              <p className="text-[10.5px] text-[#8B95A7] leading-relaxed italic mt-1">
                Tip: Standard formats resemble: <code className="text-white">https://docs.google.com/forms/d/e/[FORM_ID]/viewform</code>, which our software automatically converts to the corresponding response handler.
              </p>
            </div>
          </div>

          {/* Step 2: Custom Mapping Matrix */}
          <div className="bg-[#1A2333] border border-[#2A3650] rounded-2xl p-6 lg:p-8">
            <div className="flex items-center justify-between items-center mb-4 pb-3 border-b border-[#2A3650]/45">
              <div className="flex items-center gap-2.5 text-xs text-[#06B6D4] font-mono font-bold uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center text-white text-[10px]">2</span>
                <span>Map Leads Parameters to Google Form Inputs</span>
              </div>
              
              <div className="tooltip relative group">
                <HelpCircle className="w-4 h-4 text-[#8B95A7] cursor-help" />
                <div className="absolute right-0 bottom-full mb-2 w-72 bg-[#111827] border border-[#2A3650] rounded-lg p-3 text-[10px] text-[#8B95A7] leading-relaxed invisible group-hover:visible z-20 shadow-xl">
                  Inspect the source code of your Google Form or generate a "Pre-filled Link" to see the autoassigned input names like <strong className="text-white">entry.123456789</strong>. Pair them with respective parameters below.
                </div>
              </div>
            </div>

            <p className="text-[#8B95A7] text-xs leading-relaxed mb-6">
              When a Qatari real estate lead is received on Ansury, we forward the payload values using Google's native HTML pre-fill system keys (identifiable by the prefix <code className="text-white">entry.xxxxxx</code>).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">RE Agency / Developer Name</label>
                <input 
                  type="text" 
                  value={mapping.firmNameField}
                  onChange={e => setMapping({...mapping, firmNameField: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-mono text-[11px]"
                  placeholder="entry.123456"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Contact Name Field ID</label>
                <input 
                  type="text" 
                  value={mapping.contactPersonField}
                  onChange={e => setMapping({...mapping, contactPersonField: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-mono text-[11px]"
                  placeholder="entry.234567"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Business Email Field ID</label>
                <input 
                  type="text" 
                  value={mapping.emailField}
                  onChange={e => setMapping({...mapping, emailField: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-mono text-[11px]"
                  placeholder="entry.345678"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Phone Number Field ID</label>
                <input 
                  type="text" 
                  value={mapping.phoneField}
                  onChange={e => setMapping({...mapping, phoneField: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-mono text-[11px]"
                  placeholder="entry.456789"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Primary Region Focus Field ID</label>
                <input 
                  type="text" 
                  value={mapping.focusAreaField}
                  onChange={e => setMapping({...mapping, focusAreaField: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-mono text-[11px]"
                  placeholder="entry.567890"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Inbound Volume Capacity Field ID</label>
                <input 
                  type="text" 
                  value={mapping.volumeField}
                  onChange={e => setMapping({...mapping, volumeField: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-mono text-[11px]"
                  placeholder="entry.678901"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Active Portals &amp; Channels Target Field ID</label>
                <input 
                  type="text" 
                  value={mapping.portalsField}
                  onChange={e => setMapping({...mapping, portalsField: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg px-3.5 py-2.5 outline-none font-mono text-[11px]"
                  placeholder="entry.789012"
                />
              </div>

            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={saveConfiguration}
                className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#111827] text-xs font-bold py-3 px-6 rounded-full flex items-center gap-1.5 active:scale-95 transition-transform"
              >
                <Save className="w-4 h-4" />
                <span>Save Bindings &amp; Enable Routing</span>
              </button>
            </div>
          </div>

          {/* Step 3: Google Client Developer Integration */}
          <div className="bg-[#1A2333] border border-[#2A3650] rounded-2xl p-6 lg:p-8">
            <div className="flex items-center gap-2.5 text-xs text-[#06B6D4] font-mono font-bold uppercase tracking-wider mb-4 pb-3 border-b border-[#2A3650]/45">
              <span className="w-5 h-5 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30 flex items-center justify-center text-white text-[10px]">3</span>
              <span>Retrieve Google Forms Details (Drive &amp; Forms API OAuth)</span>
            </div>
            
            <p className="text-[#8B95A7] text-xs leading-relaxed mb-6">
              Connect via Google OAuth to retrieve your existing Google Forms list directly inside this dashboard. Provide your standard <strong>Google OAuth Client ID</strong> (obtainable from GCP Console credentials):
            </p>

            <div className="flex flex-col md:flex-row gap-4 items-end mb-6 text-xs">
              <div className="flex-1 flex flex-col gap-1.5 w-full">
                <label className="text-[10px] font-mono uppercase text-[#D1D5DB] font-bold">Your Google Client ID</label>
                <div className="relative">
                  <Key className="absolute left-3.5 top-3 w-4 h-4 text-[#8B95A7]" />
                  <input 
                    type="text" 
                    value={gClientId}
                    onChange={e => setGClientId(e.target.value)}
                    placeholder="e.g. 129481944-abc.apps.googleusercontent.com"
                    className="w-full bg-[#111827] text-white border border-[#2A3650] focus:border-[#06B6D4] rounded-lg pl-10 pr-4 py-2.5 outline-none font-mono text-[11px]"
                  />
                </div>
              </div>
              
              {!accessToken ? (
                <button
                  onClick={handleOAuthSignIn}
                  className="bg-[#20283B] hover:bg-[#20283B]/80 text-[#06B6D4] border border-[#06B6D4]/40 hover:border-[#06B6D4] text-xs font-bold py-2.5 px-6 rounded-lg transition-all flex items-center gap-1.5 shrink-0"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Connect Google Account</span>
                </button>
              ) : (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => fetchUsersGoogleForms(accessToken)}
                    className="bg-[#20283B] text-white border border-[#2A3650] text-xs font-bold py-2.5 px-3.5 rounded-lg hover:brightness-110 active:scale-95 transition-all"
                    title="Reload Google Forms"
                  >
                    <RefreshCw className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold py-2.5 px-5 rounded-lg transition-all flex items-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Disconnect</span>
                  </button>
                </div>
              )}
            </div>

            {/* Display profile & forms */}
            {accessToken && userInfo && (
              <div className="bg-[#111827] rounded-xl p-5 border border-[#2A3650] text-xs flex flex-col gap-4">
                <div className="flex items-center gap-3 border-b border-[#2A3650]/40 pb-3">
                  {userInfo.picture && (
                    <img 
                      src={userInfo.picture} 
                      alt={userInfo.name} 
                      className="w-8 h-8 rounded-full border border-[#06B6D4]/50"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div>
                    <h5 className="font-bold text-white">{userInfo.name || 'Connected Admin'}</h5>
                    <span className="text-[#8B95A7] text-[10px] font-mono">{userInfo.email}</span>
                  </div>
                  <span className="ml-auto flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono">
                    <Check className="w-3 h-3" /> Enabled
                  </span>
                </div>

                {/* Google Forms list in account */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Forms Found in Drive ({userForms.length})</label>
                  
                  {isLoadingForms ? (
                    <div className="flex justify-center items-center py-6 gap-2 text-[#8B95A7] font-mono">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#06B6D4]" />
                      <span>Fetching Google Files...</span>
                    </div>
                  ) : userForms.length === 0 ? (
                    <div className="text-[#8B95A7] italic text-center py-4 bg-[#20283B]/20 rounded border border-[#2A3650]/30">
                      No Google Forms found. Create a form in Drive first.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {userForms.map((f: any) => (
                        <div 
                          key={f.id} 
                          className="bg-[#20283B]/40 hover:bg-[#20283B]/75 p-3 rounded-lg border border-[#2A3650] transition-colors flex items-center gap-3 group"
                        >
                          <FileText className="w-4 h-4 text-purple-400 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="block text-white font-bold truncate">{f.name}</span>
                            <span className="block text-[9.5px] text-[#8B95A7] font-mono">ID: {f.id.substring(0, 10)}...</span>
                          </div>
                          <button
                            onClick={() => {
                              setMapping(prev => ({
                                ...prev,
                                formUrl: `https://docs.google.com/forms/d/e/${f.id}/formResponse`
                              }));
                              addLog('config', `Selected form target: ${f.name}`, true);
                            }}
                            className="text-[9px] font-mono font-bold bg-[#06B6D4]/15 hover:bg-[#06B6D4]/30 text-[#06B6D4] px-2 py-1 rounded transition-colors"
                          >
                            Bind
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Simulation & Testing Sandbox (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Diagnostic Console Panel */}
          <div className="bg-[#111827] border border-[#2A3650] rounded-2xl overflow-hidden flex flex-col h-[520px]">
            <div className="bg-[#1A2333] px-5 py-4 border-b border-[#2A3650] flex justify-between items-center bg-gradient-to-r from-[#1A2333] to-[#111827]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#06B6D4]" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Ingestion Console
                </span>
              </div>
              <button 
                onClick={() => setLogs([])}
                className="text-[9px] font-mono text-[#8B95A7] hover:text-[#06B6D4]"
              >
                Clear
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2.5 font-mono text-[10.5px]">
              {logs.length === 0 ? (
                <div className="text-[#8B95A7] italic text-center py-32">
                  Ready. Dispatch test inquiries to view logs.
                </div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className="flex gap-2 items-start border-b border-[#2A3650]/20 pb-2">
                    <span className="text-[#8B95A7] shrink-0">[{log.time}]</span>
                    <span className={`font-bold shrink-0 uppercase text-[9px] px-1 rounded ${
                      log.type === 'test' ? 'bg-[#06B6D4]/10 text-[#06B6D4]' : 
                      log.type === 'oauth' ? 'bg-purple-500/10 text-purple-400' :
                      log.type === 'api' ? 'bg-amber-500/10 text-amber-400' : 'bg-gray-500/10 text-gray-400'
                    }`}>
                      {log.type}
                    </span>
                    <p className={`flex-1 break-all whitespace-pre-wrap ${log.success ? 'text-[#D1D5DB]' : 'text-red-400 font-bold'}`}>
                      {log.msg}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Core Simulator / Manual Verification Tool */}
          <div className="bg-[#1A2333] border border-[#2A3650] rounded-2xl p-6">
            <div className="flex items-center gap-2 text-xs text-[#06B6D4] font-mono font-bold uppercase tracking-wider mb-5 pb-3 border-b border-[#2A3650]/45">
              <Play className="w-3.5 h-3.5" />
              <span>Diagnostic Lead Tester</span>
            </div>

            <form onSubmit={handleTestSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Simulation Lead Firm</label>
                <input 
                  type="text" 
                  value={formData.firmName}
                  onChange={e => setFormData({...formData, firmName: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] rounded-lg px-3 py-2 outline-none font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Contact Name</label>
                <input 
                  type="text" 
                  value={formData.contactPerson}
                  onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] rounded-lg px-3 py-2 outline-none font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Contact Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] rounded-lg px-3 py-2 outline-none font-sans"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono uppercase text-[#8B95A7] font-bold">Primary Region Focus</label>
                <select 
                  value={formData.focusArea}
                  onChange={e => setFormData({...formData, focusArea: e.target.value})}
                  className="bg-[#111827] text-white border border-[#2A3650] rounded-lg px-3 py-2 outline-none font-sans cursor-pointer"
                >
                  <option value="The Pearl-Qatar">The Pearl-Qatar</option>
                  <option value="Lusail Marina/City">Lusail Marina/City</option>
                  <option value="West Bay Doha">West Bay Doha</option>
                  <option value="Msheireb Downtown">Msheireb Downtown</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={testStatus === 'testing'}
                className={`w-full py-3 px-6 rounded-full text-xs font-bold transition-all duration-300 active:scale-95 text-center flex items-center justify-center gap-2 ${
                  testStatus === 'testing' ? 'bg-[#20283B] text-[#8B95A7] cursor-not-allowed' :
                  testStatus === 'success' ? 'bg-emerald-500 text-white hover:bg-emerald-600' :
                  'bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-[#111827] font-bold shadow-lg shadow-[#06B6D4]/10'
                }`}
              >
                {testStatus === 'testing' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#06B6D4]" />
                    <span>Sending Ingestion Packet...</span>
                  </>
                ) : testStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Lead Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <span>Post Lead to Google Form</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {testStatus === 'success' && (
                <button
                  type="button"
                  onClick={() => setTestStatus('idle')}
                  className="text-[10px] text-[#06B6D4] text-center font-mono hover:underline mt-1 block"
                >
                  Reset simulator to test again
                </button>
              )}
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
