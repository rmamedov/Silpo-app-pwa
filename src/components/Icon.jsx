// Сільпо — icon set (custom outline, 24px viewBox, currentColor fill grammar)
const Icon = ({ name, size = 24, color = 'currentColor', sw = 2 }) => {
  const c = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'pin':     return (<svg {...c}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></svg>);
    case 'search':  return (<svg {...c}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.2-4.2"/></svg>);
    case 'plus':    return (<svg {...c}><path d="M12 5v14M5 12h14"/></svg>);
    case 'minus':   return (<svg {...c}><path d="M5 12h14"/></svg>);
    case 'chevR':   return (<svg {...c}><path d="m9 6 6 6-6 6"/></svg>);
    case 'arrowL':  return (<svg {...c}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>);
    case 'arrowR':  return (<svg {...c}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case 'share':   return (<svg {...c}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>);
    case 'heart':   return (<svg {...c} fill={color} stroke="none"><path d="M12 21s-7.5-4.7-10-9.3C.6 9 1.6 5.4 4.7 4.3 7 3.5 9.4 4.4 12 7c2.6-2.6 5-3.5 7.3-2.7 3.1 1.1 4.1 4.7 2.7 7.4C19.5 16.3 12 21 12 21z"/></svg>);
    case 'heartO':  return (<svg {...c}><path d="M12 20.5s-6.8-4.3-9.1-8.5C1.7 9.6 2.6 6.6 5.2 5.7c2-.7 4 .1 6.3 2.5 2.3-2.4 4.3-3.2 6.3-2.5 2.6.9 3.5 3.9 2.3 6.3C18.8 16.2 12 20.5 12 20.5z"/></svg>);
    case 'scan':    return (<svg {...c}><path d="M3 8V6a2 2 0 0 1 2-2h2M17 4h2a2 2 0 0 1 2 2v2M21 16v2a2 2 0 0 1-2 2h-2M7 20H5a2 2 0 0 1-2-2v-2"/><path d="M3 12h18"/></svg>);
    case 'home':    return (<svg {...c}><path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>);
    case 'cart':    return (<svg {...c}><circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.4 11.5h10L20 7H6.5"/></svg>);
    case 'list':    return (<svg {...c}><path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/></svg>);
    case 'profile': return (<svg {...c}><circle cx="12" cy="8" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></svg>);
    case 'qr':      return (<svg {...c} fill={color} stroke="none"><path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm9 0h2v2h-2v-2zm3-2h2v2h2v2h-2v3h-2v-3h-2v-2h2v-2zm2 5h2v2h-2v-2z"/></svg>);
    case 'homeF':   return (<svg {...c} fill={color} stroke="none"><path d="M11.2 3.1a1.3 1.3 0 0 1 1.6 0l7.7 6.4c.3.25.5.62.5 1V19a2 2 0 0 1-2 2h-4.2v-5a1 1 0 0 0-1-1h-3.6a1 1 0 0 0-1 1v5H5a2 2 0 0 1-2-2v-8.5c0-.38.17-.75.47-1z"/></svg>);
    case 'delivery':return (<svg {...c}><circle cx="4.9" cy="18.3" r="2.1"/><circle cx="19.1" cy="18.3" r="2.1"/><path d="M7 18.3h10"/><path d="M19.1 16.2 16.7 5h-2.5"/><path d="M12.6 8.6l-2.1 3.6h2.6l-2.1 3.6"/></svg>);
    case 'store':   return (<svg {...c}><path d="M4.2 9.3 5.4 4.5h13.2l1.2 4.8"/><path d="M3.8 9.3a2.73 2.73 0 0 0 5.46 0 2.73 2.73 0 0 0 5.46 0 2.73 2.73 0 0 0 5.46 0"/><path d="M5.2 13v6.5h13.6V13"/><path d="M10 19.5v-4.4h4v4.4"/></svg>);
    case 'receipt': return (<svg {...c}><path d="M6 3.5h12V20.5l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z"/><path d="M9 8.5h6M9 12.5h6"/></svg>);
    case 'person':  return (<svg {...c} fill={color} stroke="none"><circle cx="12" cy="7.6" r="3.8"/><path d="M4.6 20.4a7.4 7.4 0 0 1 14.8 0c0 .33-.27.6-.6.6H5.2a.6.6 0 0 1-.6-.6z"/></svg>);
    default: return null;
  }
};

export default Icon;
