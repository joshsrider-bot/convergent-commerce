// Convergent Commerce — Tweaks panel
// Exposes: accent palette, density, headline variant

const CC_PALETTES = {
  "#9A5736": "clay",
  "#5F6A3C": "olive",
  "#2B2A26": "ink",
  "#2F5364": "ocean"
};
const CC_PALETTE_SWATCHES = Object.keys(CC_PALETTES);

const CC_HEADLINES = {
  v1: ["Advisory for retail media and ", "commerce monetization", " leaders."],
  v2: ["Helping commerce companies design and scale ", "monetization businesses", "."],
  v3: ["Senior advisory for retail media, connected commerce, and ", "monetization strategy", "."],
  v4: ["Practical operator guidance for ", "commerce monetization", " strategy."]
};

const CC_DEFAULTS = window.__TWEAKS_DEFAULTS__ || {
  accent: "#9A5736",
  density: "standard",
  headlineVariant: "v3"
};

// Apply defaults immediately on load (before mount) so initial paint is correct
document.documentElement.setAttribute('data-palette', CC_PALETTES[CC_DEFAULTS.accent] || 'clay');
document.documentElement.setAttribute('data-density', CC_DEFAULTS.density);

function CCTweaks() {
  const [t, setTweak] = useTweaks(CC_DEFAULTS);

  React.useEffect(() => {
    const name = CC_PALETTES[t.accent] || 'clay';
    document.documentElement.setAttribute('data-palette', name);
  }, [t.accent]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-density', t.density);
  }, [t.density]);

  // Swap hero headline contents based on variant
  React.useEffect(() => {
    const node = document.getElementById('hero-headline');
    if (!node) return;
    const parts = CC_HEADLINES[t.headlineVariant] || CC_HEADLINES.v3;
    node.innerHTML =
      escapeHtml(parts[0]) +
      "<em>" + escapeHtml(parts[1]) + "</em>" +
      escapeHtml(parts[2]);
  }, [t.headlineVariant]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent" />
      <TweakColor
        label="Palette"
        value={t.accent}
        options={CC_PALETTE_SWATCHES}
        onChange={(v) => setTweak('accent', v)}
      />

      <TweakSection label="Density" />
      <TweakRadio
        label="Spacing"
        value={t.density}
        options={["airy", "standard", "compact"]}
        onChange={(v) => setTweak('density', v)}
      />

      <TweakSection label="Headline" />
      <TweakSelect
        label="Variant"
        value={t.headlineVariant}
        options={[
          { value: "v1", label: "Advisory for retail media leaders" },
          { value: "v2", label: "Design and scale monetization" },
          { value: "v3", label: "Senior advisory for retail media…" },
          { value: "v4", label: "Practical operator guidance" }
        ]}
        onChange={(v) => setTweak('headlineVariant', v)}
      />
    </TweaksPanel>
  );
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

// Mount
const ccTweaksRoot = document.createElement('div');
document.body.appendChild(ccTweaksRoot);
ReactDOM.createRoot(ccTweaksRoot).render(<CCTweaks />);
