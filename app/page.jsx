'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Mail, MapPin, ExternalLink, BookOpen,
  Play, Pause, Volume2, VolumeX,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  Linkedin, Send, Github,
} from 'lucide-react';

// ─── Replace placeholder data with your real content ─────────────────────────

const PROFILE = {
  name:        'Ali Saber',
  degree:      "Master's Degree in EEE, specializing in Digital Systems",
  university:  'Tehran University',
  gradYear:    '2023',
  field:       'Signal Processing & Embedded Systems',
  email:       'malisaber@yahoo.com',
  location:    'Shiraz, Fars, Iran',
  scholarUrl:  'https://scholar.google.com/citations?user=x3XHBCcAAAAJ&hl=en',
  telegramUrl: 'https://t.me/Malisaber',
  linkedinUrl: 'https://www.linkedin.com/in/malisaber/',
  githubUrl:   'https://github.com/malisaber',
  address:     'Shiraz, Fars, Iran',
  bio: `Ali Saber holds a B.Sc. degree in Electrical Engineering and
  an M.Sc. degree in Electrical and Electronics Engineering with a specialization in Digital Systems.
  His research interests include computer architecture, hardware acceleration, near-memory computing,
  embedded systems, signal processing, and machine learning. His master's research focused on proposing
  and implementing a near-memory processing system and developing efficient communication mechanisms
  between host processors and off-chip 3D memory.
  He is currently interested in pursuing Ph.D. studies in machine learning, artificial intelligence,
  computer architecture, near-memory and in-memory computing, high-performance computing, and quantum computing.`,
};


const ABOUT = {
	area1:		'Machine Learning',
	area2:		'Embodied AI',
	area3:		'Computer Architecture',
	about:		'Electrical and Electronics Engineering researcher focused on Machine Learning, Computer Architecture, Hardware Acceleration, and Signal Processing.'
}



const PUBLICATIONS = [
  {
    id: 1,
    title:   'An Efficient RTL Design for a Wearable Brain–Computer Interface',
    authors: 'Tahereh Vasei, Mohamad Ali Saber, Alireza Nahvy, and Zainalabedin Navabi',
    venue:   'IET Computers & Digital Techniques, 2024',
    link:    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=x3XHBCcAAAAJ&citation_for_view=x3XHBCcAAAAJ:9yKSN-GCB0IC',
    img:     'images/publications/BCI.jpg',
  },
  {
    id: 2,
    title:   'On-chip training of crosstalk predictors to fit uncertainties',
    authors: 'Rezgar Sadeghi, Ehsan Akbari, Mohamad Ali Saber',
    venue:   'IEEE European Test Symposium (ETS), 2022',
    link:    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=x3XHBCcAAAAJ&citation_for_view=x3XHBCcAAAAJ:u5HHmVD_uO8C',
    img:     'images/publications/OCT.jpg',
  },
  {
    id: 3,
    title:   'DiBA: n-Dimensional Bitslice Architecture for LSTM Implementation',
    authors: 'Mahboobe Sadeghipour Roodsari, Mohamad Ali Saber, Zainalabedin Navabi',
    venue:   '23rd International Symposium on Design and Diagnostics of Electronic Circuits & Systems (DDECS), 2020',
    link:    'https://scholar.google.com/citations?view_op=view_citation&hl=en&user=x3XHBCcAAAAJ&citation_for_view=x3XHBCcAAAAJ:u-x6o8ySG0sC',
    img:     'images/publications/DIBA.jpg',
  },
  {
    id: 4,
    title:   'NEMESIS: A 3D Memory-Based Near-Memory Processing Architecture for CNN Acceleration',
    authors: 'Mohamad Ali Saber, Zainalabedin Navabi',
    venue:   'Under review, 2026',
    link:    '#',
    img:     'images/publications/mine.png',
  },
];

const PROJECTS = [
  {
    id:          1,
    title:       'Physics-Based Lunar Lander with Deep Q-Learning',
    description: 'A C++ reinforcement-learning sandbox that combines real-time physics, rendering, and Dueling DQN training.',
    details:     'This project integrates environment simulation, graphical rendering, and agent training into one experimental platform for sequential decision-making. By combining physics-based dynamics with a learned policy and replay-buffer training, it becomes a strong example of embodied AI in a controlled 2-D setting.',
    tech:        ['C++', 'SFML', 'Bullet Physics', 'OpenCV', 'LibTorch', 'OpenGL'],
    github:      'https://github.com/malisaber/RL-Agent-Playing-LunarLander-Game',
    demo:        null,
    slideshowInterval: 3000, // ms between slides (only applies to images)
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'video', src: '/videos/LunarLander/vid1.mp4' },
		{ type: 'image', src: '/images/LunarLander/im1.png' },
		{ type: 'video', src: '/videos/LunarLander/vid2.mp4' },
		{ type: 'image', src: '/images/LunarLander/im1.png' },
		{ type: 'video', src: '/videos/LunarLander/vid3.mp4' },
		{ type: 'image', src: '/images/LunarLander/im1.png' },
    ],
  },
  {
    id:          2,
    title:       'Progression from Tabular RL to Deep RL in GridWorld',
    description: 'A MATLAB project that compares Monte Carlo methods, temporal-difference learning, and DQN on a compact delivery environment.',
    details:     'This project presents reinforcement learning as a staged methodological progression rather than a single algorithm demo. It reuses the same GridWorld task to compare tabular control, multi-step updates, and deep function approximation, which makes the learning dynamics easy to study and explain.',
    tech:        ['MATLAB', 'Monte Carlo control', 'SARSA', 'Q-learning', 'DQN'],
    github:      'https://github.com/malisaber/RL-Agent-Playing-Post-Delivery-Game',
    demo:        null,
    slideshowInterval: 3000,
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'video', src: '/videos/Post/vid1.mp4' },
		{ type: 'image', src: '/images/Post/im1.jpg' },
		{ type: 'video', src: '/videos/Post/vid2.mp4' },
		{ type: 'image', src: '/images/Post/im1.jpg' },
		{ type: 'video', src: '/videos/Post/vid3.mp4' },
    ],
  },
  {
    id:          3,
    title:       'DQN Agent for a Custom Bricks Environment',
    description: 'A MATLAB reinforcement-learning project that trains a Deep Q-Network agent on a brick-stacking game.',
    details:     'The project defines a custom environment and trains a DQN agent with replay and target-network updates, turning the game into a compact example of embodied intelligence and sequential decision-making. It is a practical demonstration of how environment design, reward structure, and policy learning interact in reinforcement learning.',
    tech:        ['MATLAB', 'Deep Learning Toolbox', 'DQN', 'custom environment'],
    github:      'https://github.com/malisaber/RL-Agent-Playing-Bricks-Game',
    demo:        null,
    slideshowInterval: 3000,
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'video', src: '/videos/Bricks/vid1.mp4' },
		{ type: 'image', src: '/images/Bricks/im1.png' },
		{ type: 'video', src: '/videos/Bricks/vid2.mp4' },
		{ type: 'image', src: '/images/Bricks/im1.png' },
    ],
  },
  {
    id:          4,
    title:       'Self-Organizing Map and Competitive Learning Study',
    description: 'A cleaned-up clustering and SOM project with MATLAB demos, a Python implementation, and a LaTeX report.',
    details:     'This project documents unsupervised representation learning through implementation, visualization, and formal reporting. The combination of source code, generated figures, and a written report makes it feel like a small computational learning study rather than a simple coding exercise.',
    tech:        [],
    github:      'https://github.com/malisaber/Self-Organizing-Map',
    demo:        null,
    slideshowInterval: 3000,
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'video', src: '/videos/SOM/vid1.mp4' },
		{ type: 'video', src: '/videos/SOM/vid2.mp4' },
		{ type: 'video', src: '/videos/SOM/vid3.mp4' },
		{ type: 'image', src: '/images/SOM/im1.png' },
		{ type: 'image', src: '/images/SOM/im2.png' },
		{ type: 'video', src: '/videos/SOM/vid3.mp4' },
		{ type: 'image', src: '/images/SOM/im3.png' },
		{ type: 'image', src: '/images/SOM/im4.png' },
    ],
  },
  {
    id:          5,
    title:       'SystemC Processor Instruction Set Simulator Generator',
    description: 'A C++/SystemC code generator that transforms a custom processor-description language into a structured simulator scaffold.',
    details:     'This project automates the creation of repetitive infrastructure for instruction-set simulators by translating concise `.TP` specifications into SystemC-style source files. It reflects a software-engineering approach to architectural modeling, emphasizing abstraction, reproducibility, and reduced manual boilerplate.',
    tech:        ['SystemC', 'ISS'],
    github:      'https://github.com/malisaber/ISS-Generator',
    demo:        null,
    slideshowInterval: 3000,
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'image', src: '/images/ISSGEN/im1.png' },
    ],
  },
  {
    id:          6,
    title:       'SystemC Instruction-Set Simulator for PUNEH',
    description: 'A 16-bit processor simulator built in SystemC with bus modeling, memory, peripherals, and interrupt support.',
    details:     'The project models a complete processor environment, including the CPU core, register file, shared bus abstraction, memory subsystem, UART/USART behavior, and interrupt mechanisms. With a demo program running in simulation, it becomes a strong example of instruction-set simulation and architectural experimentation.',
    tech:        ['C++', 'SystemC', 'TLM', 'peripheral modeling'],
    github:      'https://github.com/malisaber/ISS-PUNEH-Core',
    demo:        null,
    slideshowInterval: 3000,
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'image', src: '/images/PUNEH/im1.jpg' },
    ],
  },
  {
    id:          7,
    title:       'Pipelined AVR Core',
    description: 'A Verilog implementation of the AVR core, mimicing AVR behavior in fetch, decode, execute, memory, and write-back stages.',
    details:     'This design studies the architectural consequences of pipelining, including stage separation, control coordination, interrupt handling, and memory arbitration. It is especially useful as a teaching and exploration artifact because it moves from basic CPU organization toward more performance-oriented microarchitecture.',
    tech:        ['Verilog', 'pipeline architecture', 'simulation', 'FPGA-oriented design'],
    github:      'https://github.com/malisaber/Pipelined-AVR-Core',
    demo:        null,
    slideshowInterval: 3000,
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'image', src: '/images/Pipelined/im1.png' },
    ],
  },
  {
    id:          8,
    title:       '8085 Processor Core',
    description: 'An RTL VHDL implementation of an Intel 8085 microprocessor with cycle-accurate control, datapath logic, and interrupt handling.',
    details:     'This work reconstructs a classic 8-bit processor at the register-transfer level, integrating instruction sequencing, arithmetic and logic operations, flag management, and an external bus interface into a coherent CPU. The design is paired with simulation and synthesis support, so it reads as both a digital-systems implementation and a study in processor microarchitecture.',
    tech:        ['VHDL', 'RTL design', 'digital simulation', 'synthesis'],
    github:      'https://github.com/malisaber/8085-Core',
    demo:        null,
    slideshowInterval: 3000,
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'image', src: '/images/8085/im1.jpg' },
		{ type: 'image', src: '/images/8085/im2.jpg' },
		{ type: 'image', src: '/images/8085/im3.jpg' },
    ],
  },
  {
    id:          9,
    title:       'Multicycle Processor Implementations',
    description: 'Several HDL-based processor designs that examine multicycle datapath organization across AVR-style and MIPS-style instruction sets.',
    details:     'These projects study how instruction execution can be decomposed into fetch, decode, execute, memory, and write-back phases under explicit control sequencing. The AVR-oriented implementation couples Verilog hardware with MATLAB tooling for assembler output and control-memory generation, while the MIPS-oriented implementation presents a conventional multicycle datapath in SystemVerilog. Together they offer a comparative view of processor microarchitecture, control design, and simulation-driven validation.',
    tech:        ['Verilog', 'MATLAB', 'FPGA design', 'control logic', 'Hardware-software codesign'],
    github:      'https://github.com/malisaber?tab=repositories&q=multicycle&type=&language=&sort=',
    demo:        null,
    slideshowInterval: 3000,
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'image', src: '/images/MultiCycle/im1.png' },
    ],
  },
  {
    id:          10,
    title:       'Single-Cycle Processor Implementations',
    description: 'A pair of compact processor designs centered on single-cycle execution and related control-path organization.',
    details:     'These repositories focus on reduced-instruction-set processors intended to make the relationship between instruction fetch, combinational execution, and register updates transparent. The MIPS design follows the canonical single-cycle datapath, while the RISC-V implementation presents a closely related educational model with microprogrammed control. Taken together, they provide a clear introduction to instruction-level sequencing and HDL-based CPU construction.',
    tech:        ['SystemVerilog', 'microcode', 'RISC-V'],
    github:      'singlecycle',
    demo:        null,
    slideshowInterval: 3000,
    media: [
		// Add images and/or videos here, e.g.:
		{ type: 'image', src: '/images/SingleCycle/im1.png' },
    ],
  },
];

const SKILLS = [
  { category: 'Programming', items: ['Python', 'MATLAB', 'C/C++', 'Assembly (AVR/X86/RISC-V)'] },
  { category: 'HDL',		 items: ['VHDL', 'Verilog', 'SystemVerilog', 'SystemC', 'SystemC-AMS', 'Chisel'] },
  { category: 'ML / AI',     items: ['TensorFlow', 'PyTorch', 'Keras', 'scikit-learn'] },
  { category: 'Hardware',    items: ['FPGA', 'ARM', 'AVR'] },
  { category: 'App',         items: ['Simulink', 'Xilinx Vivado ', 'Xilinx ISE', 'Cadence', 'Design Compiler', 'ModelSim', 'Multisim'] },
  { category: 'Tools',       items: ['Git', 'LaTeX', 'Linux', 'Docker'] },
  { category: 'Languages',   items: ['Persian (native)', 'English (fluent)'] },
];

// ─── Shared UI ────────────────────────────────────────────────────────────────

function TraceRule() {
  return (
    <div className="flex items-center gap-[5px] mt-3 mb-10">
      <div className="h-[2px] w-12 bg-signal rounded-full" />
      <div className="w-[7px] h-[7px] bg-signal rotate-45 rounded-[1px]" />
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight text-deep-space">
        {children}
      </h2>
      <TraceRule />
    </div>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────

function ProjectCard({ proj, isExpanded, onToggle }) {
  const videoRef  = useRef(null);
  const didMount  = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [isMuted,      setIsMuted]      = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [isHovering,   setIsHovering]   = useState(false);

  const media   = proj.media ?? [];
  const total   = media.length;
  const current = media[currentIndex] ?? null;
  const isVideo = current?.type === 'video';

  const goPrev = () => setCurrentIndex(i => (i - 1 + total) % total);
  const goNext = () => setCurrentIndex(i => (i + 1) % total);

  // Reset progress when slide changes
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [currentIndex]);

  // Attach video event listeners whenever we land on a video slide
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isVideo) return;
    const onPlay       = () => setIsPlaying(true);
    const onPause      = () => setIsPlaying(false);
    const onTimeUpdate = () => { if (v.duration) setProgress(v.currentTime / v.duration); };
    const onEnded      = () => { if (total > 1) setCurrentIndex(i => (i + 1) % total); };
    v.addEventListener('play',       onPlay);
    v.addEventListener('pause',      onPause);
    v.addEventListener('timeupdate', onTimeUpdate);
    v.addEventListener('ended',      onEnded);
    return () => {
      v.removeEventListener('play',       onPlay);
      v.removeEventListener('pause',      onPause);
      v.removeEventListener('timeupdate', onTimeUpdate);
      v.removeEventListener('ended',      onEnded);
    };
  }, [currentIndex, isVideo, total]);

  // Auto-play video when we land on a video slide (if card is active)
  useEffect(() => {
    if (!videoRef.current || !isVideo) return;
    if (isHovering || isExpanded) {
      videoRef.current.muted = !isExpanded;
      setIsMuted(!isExpanded);
      videoRef.current.play().catch(() => {
        videoRef.current.muted = true;
        setIsMuted(true);
        videoRef.current.play().catch(() => {});
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Auto-advance images on a timer
  useEffect(() => {
    if (total <= 1 || isVideo) return;
    const ms = proj.slideshowInterval ?? 3000;
    const id = setInterval(() => setCurrentIndex(i => (i + 1) % total), ms);
    return () => clearInterval(id);
  }, [currentIndex, isVideo, total, proj.slideshowInterval]);

  // Expand → unmute + play; collapse → pause
  useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    if (!videoRef.current || !isVideo) return;
    if (isExpanded) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isExpanded, isVideo]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!videoRef.current || !isVideo || isExpanded) return;
    videoRef.current.muted = false;
    videoRef.current.play().catch(() => {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    });
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!videoRef.current || !isVideo || isExpanded) return;
    videoRef.current.pause();
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play().catch(() => {});
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };
  const handleSeek = (ratio) => {
    if (videoRef.current?.duration)
      videoRef.current.currentTime = ratio * videoRef.current.duration;
  };

  return (
    <article
      className={`bg-white rounded-lg overflow-hidden border transition-all duration-200
        ${isExpanded
          ? 'md:col-span-2 border-signal/40 shadow-[0_16px_48px_rgba(46,125,200,0.16)]'
          : 'border-gray-100 shadow-sm hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-[0_14px_34px_rgba(10,22,40,0.10)]'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`flex ${isExpanded ? 'flex-col md:flex-row' : 'flex-col'}`}>

        {/* ── Media area ── */}
        <div className={`relative flex-shrink-0 bg-blueprint flex items-center justify-center overflow-hidden
          ${isExpanded ? 'aspect-video md:aspect-auto md:w-[42%]' : 'aspect-video'}`}>

          {/* Current slide */}
          {isVideo ? (
            <video
              key={current.src}
              ref={videoRef}
              className="w-full h-full object-cover"
              loop={total === 1}
              playsInline
              preload="metadata"
            >
              <source src={current.src} type="video/mp4" />
            </video>
          ) : current?.type === 'image' ? (
            <img
              key={current.src}
              src={current.src}
              alt={`${proj.title} — slide ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            /* empty placeholder */
            <>
              <div className="absolute inset-0" style={{
                backgroundImage:
                  'linear-gradient(rgba(46,125,200,0.07) 1px, transparent 1px),' +
                  'linear-gradient(90deg, rgba(46,125,200,0.07) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />
              <div className="relative z-10 w-11 h-11 rounded-full bg-white/80
                              flex items-center justify-center shadow-sm">
                <Play size={18} className="text-signal ml-0.5" />
              </div>
            </>
          )}

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); goPrev(); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                                 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60
                                 text-white flex items-center justify-center transition-colors"
                      aria-label="Previous slide">
                <ChevronLeft size={14} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); goNext(); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                                 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60
                                 text-white flex items-center justify-center transition-colors"
                      aria-label="Next slide">
                <ChevronRight size={14} />
              </button>
            </>
          )}

          {/* Bottom controls bar (always shown if there's any media or dots) */}
          {(total > 0) && (
            <div className="absolute bottom-0 left-0 right-0 z-10
                            bg-gradient-to-t from-black/70 to-transparent pt-6">
              <div className="flex items-center gap-2 px-3 pb-2">

                {/* Play/Pause — video only */}
                {isVideo && (
                  <button onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                          className="flex-shrink-0 p-1.5 rounded-full bg-white/20
                                     hover:bg-white/35 text-white transition-colors"
                          aria-label={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                )}

                {/* Progress bar — video only */}
                {isVideo && (
                  <div className="group/bar flex-1 relative flex items-center h-5 cursor-pointer"
                       onClick={(e) => {
                         e.stopPropagation();
                         const r = e.currentTarget.getBoundingClientRect();
                         handleSeek(Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)));
                       }}>
                    <div className="w-full h-[3px] bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full"
                           style={{ width: `${progress * 100}%` }} />
                    </div>
                    <div className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow
                                    -translate-y-1/2 -translate-x-1/2 pointer-events-none
                                    opacity-0 group-hover/bar:opacity-100 transition-opacity"
                         style={{ left: `${progress * 100}%` }} />
                  </div>
                )}

                {/* Dot indicators */}
                {total > 1 && (
                  <div className={`flex items-center gap-1.5
                    ${!isVideo ? 'flex-1 justify-center' : ''}`}>
                    {media.map((_, i) => (
                      <button key={i}
                              onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                              className={`rounded-full transition-all duration-200 ${
                                i === currentIndex
                                  ? 'w-4 h-[6px] bg-white'
                                  : 'w-[6px] h-[6px] bg-white/50 hover:bg-white/80'
                              }`}
                              aria-label={`Go to slide ${i + 1}`} />
                    ))}
                  </div>
                )}

                {/* Mute — video only */}
                {isVideo && (
                  <button onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                          className="flex-shrink-0 p-1.5 rounded-full bg-white/20
                                     hover:bg-white/35 text-white transition-colors"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}>
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Details area ── */}
        <div className={`flex flex-col flex-1 ${isExpanded ? 'p-6 gap-4' : 'p-5'}`}>
          <div className="flex items-start justify-between gap-4">
            <h3 className={`font-display font-semibold text-deep-space leading-snug
              ${isExpanded ? 'text-xl' : 'text-[15px]'}`}>
              {proj.title}
            </h3>
            {isExpanded && (
              <button onClick={onToggle}
                      className="flex-shrink-0 p-1.5 rounded-lg text-slate-mid
                                 hover:text-deep-space hover:bg-gray-100 transition-colors"
                      aria-label="Collapse">
                <ChevronUp size={18} />
              </button>
            )}
          </div>

          <p className="text-sm text-slate-mid leading-relaxed flex-1">
            {isExpanded ? proj.details : proj.description}
          </p>

          {isExpanded && proj.tech?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {proj.tech.map((t) => (
                <span key={t} className="px-2.5 py-1 text-xs rounded-full bg-blueprint
                                         text-circuit border border-signal/20">{t}</span>
              ))}
            </div>
          )}

          <div className={`flex flex-wrap gap-3 ${isExpanded ? 'mt-auto pt-1' : 'mt-4'}`}>
            {isExpanded ? (
              <>
                {proj.github && (
                  <a href={proj.github} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 text-sm font-medium
                                text-slate-mid border border-gray-200 rounded-lg px-3.5 py-1.5
                                hover:border-deep-space hover:text-deep-space transition-all">
                    <Github size={14} /> GitHub
                  </a>
                )}
                {proj.demo && (
                  <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center gap-1.5 text-sm font-medium
                                text-white bg-signal rounded-lg px-3.5 py-1.5
                                hover:bg-circuit transition-colors">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </>
            ) : (
              <button onClick={onToggle}
                      className="self-start inline-flex items-center gap-1 text-sm font-medium
                                 text-signal border border-signal/30 rounded-lg px-3.5 py-1.5
                                 hover:bg-signal hover:text-white hover:border-signal
                                 transition-all duration-150">
                View details <ChevronDown size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Section: Hero ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="home" className="bg-white pt-[96px] pb-16 sm:pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid items-center gap-8 md:grid-cols-[0.88fr_1.12fr]">
          <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-blueprint p-3 shadow-sm dark:border-white/10 dark:bg-white/6">
            <div className="aspect-[4/5] overflow-hidden rounded-md bg-lab">
              <img
                src="/images/profile.jpg"
                alt="Ali Saber"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-2 text-xs font-medium text-circuit dark:text-sky-200">
              <span className="rounded-full border border-signal/20 bg-blueprint px-3 py-1 dark:bg-signal/12">
			    {ABOUT.area1}
              </span>
              <span className="rounded-full border border-signal/20 bg-blueprint px-3 py-1 dark:bg-signal/12">
			    {ABOUT.area2}
              </span>
              <span className="rounded-full border border-signal/20 bg-blueprint px-3 py-1 dark:bg-signal/12">
			    {ABOUT.area3}
              </span>
            </div>

            <div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-deep-space sm:text-5xl">
                {PROFILE.name}
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-slate-mid">
			    {ABOUT.about}
              </p>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-1">
              <span className="inline-flex items-center gap-2 text-slate-mid">
                <BookOpen size={16} className="flex-shrink-0 text-signal" />
                {PROFILE.degree}
              </span>
              <span className="inline-flex items-center gap-2 text-slate-mid">
                <MapPin size={16} className="flex-shrink-0 text-signal" />
                {PROFILE.location}
              </span>
              <a href={`mailto:${PROFILE.email}`}
                 className="inline-flex items-center gap-2 text-slate-mid transition-colors hover:text-signal">
                <Mail size={16} className="flex-shrink-0 text-signal" />
                {PROFILE.email}
              </a>
              <a href={PROFILE.scholarUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 text-slate-mid transition-colors hover:text-signal">
                <ExternalLink size={16} className="flex-shrink-0 text-signal" />
                Google Scholar
              </a>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-lg bg-deep-space px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-circuit">
                <Github size={16} /> GitHub
              </a>
              <a href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-mid transition-colors hover:border-signal/50 hover:text-circuit dark:border-white/10 dark:bg-white/6 dark:hover:text-sky-100">
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Section: About ───────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section className="bg-lab py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-8">
          <p className="font-display font-semibold text-lg text-deep-space mb-1">
            {PROFILE.name}
          </p>
          <p className="text-slate-mid text-sm mb-5 italic">
            From {PROFILE.university}, graduated in {PROFILE.gradYear} in {PROFILE.field}
          </p>
          <p className="border-l-[3px] border-signal pl-4 text-slate-mid leading-7 text-[15px]">
            {PROFILE.bio}
          </p>
        </div>
      </div>
    </section>
  );
}

// --- Section: Publications ───────────────────────────────────────────────────

function PublicationsSection() {
  return (
    <section id="publications" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading>Publications</SectionHeading>
        <ul className="flex flex-col gap-4">
          {PUBLICATIONS.map((pub) => (
            <li
              key={pub.id}
              className="flex items-start gap-4 p-4 rounded-lg
                         border border-gray-100 bg-white shadow-sm hover:-translate-y-0.5 hover:border-signal/40
                         hover:shadow-[0_14px_34px_rgba(46,125,200,0.10)]
                         transition-all duration-200 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex-shrink-0 w-[72px] h-[72px] rounded-lg
                              bg-blueprint border border-gray-200
                              flex items-center justify-center overflow-hidden">
                {pub.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={pub.img} alt={pub.title} className="object-cover w-full h-full" />
                ) : (
                  <BookOpen size={22} className="text-signal/50" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display font-semibold text-[15px] text-deep-space
                             hover:text-signal transition-colors leading-snug line-clamp-2"
                >
                  {pub.title}
                </a>
                <p className="mt-1 text-sm text-slate-mid">{pub.authors}</p>
                <p className="mt-0.5 text-xs text-signal italic">{pub.venue}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Section: Projects ───────────────────────────────────────────────────────

function ProjectsSection() {
  const [expandedId, setExpandedId] = useState(null);
  const toggle = (id) => setExpandedId((prev) => (prev === id ? null : id));

  // If the expanded card sits in the right column (odd index), swap it with its
  // left sibling so md:col-span-2 always starts at column 1 — no row-jumping.
  const displayProjects = (() => {
    if (!expandedId) return PROJECTS;
    const idx = PROJECTS.findIndex(p => p.id === expandedId);
    if (idx < 0 || idx % 2 === 0) return PROJECTS;   // left-column: no swap needed
    const arr = [...PROJECTS];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    return arr;
  })();

  return (
    <section id="projects" className="py-16 bg-lab">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading>Projects</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {displayProjects.map((proj) => (
            <ProjectCard
              key={proj.id}
              proj={proj}
              isExpanded={expandedId === proj.id}
              onToggle={() => toggle(proj.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Skills ─────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading>Skills</SectionHeading>
        <div className="flex flex-col gap-6">
          {SKILLS.map(({ category, items }) => (
            <div key={category} className="flex flex-col sm:flex-row sm:items-start gap-3">
              <span className="w-28 flex-shrink-0 text-sm font-semibold text-deep-space pt-0.5">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-slate-mid transition-colors
                               hover:border-signal/50 hover:text-circuit dark:border-white/10 dark:bg-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Contact ────────────────────────────────────────────────────────

const CONTACT_ITEMS = [
  { Icon: Mail,     label: PROFILE.email,    href: `mailto:${PROFILE.email}`  },
  { Icon: Send,     label: 'Telegram',       href: PROFILE.telegramUrl        },
  { Icon: Linkedin, label: 'LinkedIn',       href: PROFILE.linkedinUrl        },
  { Icon: MapPin,   label: PROFILE.address,  href: null                       },
];

function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-lab">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading>Contact</SectionHeading>
        <ul className="flex flex-col gap-4 max-w-sm">
          {CONTACT_ITEMS.map(({ Icon, label, href }, i) => (
            <li key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blueprint flex items-center justify-center flex-shrink-0">
                <Icon size={17} className="text-signal" />
              </div>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-[15px] text-slate-mid hover:text-signal
                             transition-colors hover:underline underline-offset-2"
                >
                  {label}
                </a>
              ) : (
                <span className="text-[15px] text-slate-mid">{label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white py-8 dark:border-white/10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between
                      items-center gap-2 text-xs text-slate-mid/70">
        <span>© {new Date().getFullYear()} M. Ali Saber</span>
        <span>Built with Ali Saber</span>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <PublicationsSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
