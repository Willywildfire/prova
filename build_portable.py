"""Build a single-file browser app; no JS bundler or third-party Python package needed."""
from pathlib import Path
import json
import re
root = Path(__file__).resolve().parent.parent
major = json.loads((root / 'package.json').read_text())['version'].split('.')[0]
modules = ['storage-sync.js', 'progression-ai.js', 'audio-haptics.js', 'ui-renderer.js',
           'strength-core.js', 'overview-core.js', 'overview-ui.js', 'strength-ui.js', 'recovery-map.js', 'fsm-engine.js',
           'mobile-ui.js', 'main.js']
script = '\n'.join((root / 'js' / name).read_text() for name in modules)
script = re.sub(r'^import .*?;\s*', '', script, flags=re.M)
script = re.sub(r'\bexport\s+', '', script)
script = script.replace("if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});", '')
html = re.sub(r'<link[^>]+>', '', (root / 'index.html').read_text())
html = html.replace('</head>', '<style>' + (root / 'css/app.css').read_text() + '</style></head>')
html = html.replace('<script type="module" src="js/main.js"></script>', '<script type="module">' + script + '</script>')
output = root / f'PRIMER-v{major}-obre-aquest.html'
output.write_text(html)
print(f'Built {output.name}: {output.stat().st_size:,} bytes')
