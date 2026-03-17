```vue
<template>
  <div style="min-height:100vh; background:#09090b; font-family:monospace; overflow-x:hidden;">

    <!-- NOISE -->
    <div style="position:fixed; inset:0; pointer-events:none; z-index:0; opacity:0.03; background-image:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC45IiBudW1PY3RhdmVzPSI0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNuKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==');"></div>

    <!-- NAVBAR -->
    <nav style="position:fixed; top:0; left:0; right:0; z-index:50; border-bottom:1px solid #27272a; background:rgba(9,9,11,0.92); backdrop-filter:blur(8px); height:56px; display:flex; align-items:center; justify-content:space-between; padding:0 24px;">
      <div style="display:flex; align-items:center; gap:10px;">
        <div style="width:14px; height:14px; background:#a3e635; transform:rotate(45deg);"></div>
        <span style="color:#f4f4f5; font-size:12px; font-weight:900; letter-spacing:0.15em; text-transform:uppercase;">MockupBuilder</span>
      </div>
      <div style="display:flex; align-items:center; gap:28px;">
        <a href="#fitur" style="color:#71717a; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none;">Fitur</a>
        <a href="#cara-kerja" style="color:#71717a; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none;">Cara Kerja</a>
        <a href="#stack" style="color:#71717a; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; text-decoration:none;">Stack</a>
      </div>
      <NuxtLink to="/dashboard" style="font-size:11px; letter-spacing:0.12em; text-transform:uppercase; background:#a3e635; color:#09090b; padding:8px 16px; font-weight:900; text-decoration:none; font-family:monospace;">Buka App →</NuxtLink>
    </nav>

    <!-- HERO -->
    <section style="position:relative; z-index:10; padding:140px 24px 96px; max-width:1280px; margin:0 auto;">
      <div style="display:grid; grid-template-columns:7fr 5fr; gap:48px; align-items:start;">

        <!-- Left -->
        <div style="display:flex; flex-direction:column; gap:28px;">

          <div style="display:inline-flex; align-items:center; gap:8px; border:1px solid #3f3f46; padding:6px 12px; width:fit-content;">
            <div style="width:6px; height:6px; background:#a3e635; border-radius:50%; animation:pulse 2s infinite;"></div>
            <span style="color:#71717a; font-size:11px; letter-spacing:0.12em; text-transform:uppercase;">v1.0 — Nuxt 4 + inline css / internal css </span>
          </div>

          <h1 style="font-size:76px; font-weight:900; color:#f4f4f5; line-height:0.95; letter-spacing:-0.03em; text-transform:uppercase; margin:0;">
            Design<br/>
            <span style="color:#a3e635;">Before</span><br/>
            You Code.
          </h1>

          <p style="color:#71717a; font-size:15px; line-height:1.75; max-width:420px; margin:0;">
            Drag. Drop. Export. Tool mockup berbasis Tailwind CSS untuk developer yang malas bolak-balik Figma — langsung hasilkan HTML siap pakai.
          </p>

          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <NuxtLink to="/dashboard" style="display:inline-flex; align-items:center; gap:10px; background:#a3e635; color:#09090b; padding:12px 24px; font-size:12px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em; text-decoration:none; font-family:monospace;">
              Mulai Sekarang →
            </NuxtLink>
            <a href="#cara-kerja" style="display:inline-flex; align-items:center; border:1px solid #3f3f46; color:#71717a; padding:12px 24px; font-size:12px; text-transform:uppercase; letter-spacing:0.1em; text-decoration:none; font-family:monospace;">
              Lihat Demo
            </a>
          </div>

          <div style="display:flex; gap:32px; padding-top:16px; border-top:1px solid #27272a;">
            <div v-for="stat in stats" :key="stat.label">
              <div style="font-size:22px; font-weight:900; color:#f4f4f5;">{{ stat.value }}</div>
              <div style="font-size:10px; color:#52525b; text-transform:uppercase; letter-spacing:0.1em; margin-top:2px;">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Right mockup -->
        <div style="border:1px solid #3f3f46; background:#18181b;">
          <div style="display:flex; align-items:center; gap:6px; padding:10px 14px; border-bottom:1px solid #3f3f46; background:rgba(39,39,42,0.6);">
            <div style="width:10px; height:10px; border-radius:50%; background:#ef4444;"></div>
            <div style="width:10px; height:10px; border-radius:50%; background:#eab308;"></div>
            <div style="width:10px; height:10px; border-radius:50%; background:#22c55e;"></div>
            <span style="margin-left:8px; color:#52525b; font-size:10px;">dashboard.vue</span>
          </div>
          <div style="padding:14px; display:flex; flex-direction:column; gap:10px;">
            <div style="display:flex; gap:10px;">
              <div style="width:88px; background:#27272a; border:1px solid #3f3f46; padding:8px; display:flex; flex-direction:column; gap:5px;">
                <div style="color:#52525b; font-size:9px; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:2px;">Components</div>
                <div style="background:#3f3f46; height:18px; width:100%;"></div>
                <div style="background:#3f3f46; height:18px; width:75%;"></div>
                <div style="background:rgba(163,230,53,0.15); border:1px solid rgba(163,230,53,0.3); height:18px; width:85%;"></div>
                <div style="background:#3f3f46; height:18px; width:100%;"></div>
                <div style="background:#3f3f46; height:18px; width:60%;"></div>
              </div>
              <div style="flex:1; background:#27272a; border:1px solid #3f3f46; padding:8px; display:flex; flex-direction:column; gap:8px;">
                <div style="color:#52525b; font-size:9px; text-transform:uppercase; letter-spacing:0.1em;">Canvas</div>
                <div style="border:2px dashed rgba(163,230,53,0.25); flex:1; min-height:108px; display:flex; align-items:center; padding:10px;">
                  <div style="display:flex; flex-direction:column; gap:5px; width:100%;">
                    <div style="background:#a3e635; height:14px; width:70%;"></div>
                    <div style="background:#52525b; height:8px; width:100%;"></div>
                    <div style="background:#52525b; height:8px; width:80%;"></div>
                    <div style="background:#3f3f46; height:22px; width:80px; margin-top:6px;"></div>
                  </div>
                </div>
                <div style="display:flex; gap:5px;">
                  <div style="background:#3f3f46; height:28px; flex:1;"></div>
                  <div style="background:#3f3f46; height:28px; flex:1;"></div>
                </div>
              </div>
            </div>
            <div style="background:#09090b; border:1px solid #27272a; padding:10px;">
              <div style="color:#a3e635; font-size:10px; font-family:monospace;">&lt;div class="flex items-center gap-4"&gt;</div>
              <div style="color:#52525b; font-size:10px; font-family:monospace; padding-left:14px;">&lt;h1 class="text-4xl font-black"&gt;...&lt;/h1&gt;</div>
              <div style="color:#a3e635; font-size:10px; font-family:monospace;">&lt;/div&gt;</div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- TICKER -->
    <div style="position:relative; z-index:10; border-top:1px solid #27272a; border-bottom:1px solid #27272a; background:#18181b; overflow:hidden; padding:10px 0;">
      <div style="display:flex; gap:40px; animation:marquee 22s linear infinite; white-space:nowrap; width:max-content;">
        <span v-for="item in tickerDouble" :key="item.key" style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.15em; display:inline-flex; align-items:center; gap:10px;">
          <span style="color:#a3e635;">✦</span>{{ item.label }}
        </span>
      </div>
    </div>

    <!-- FITUR -->
    <section id="fitur" style="position:relative; z-index:10; padding:96px 24px; max-width:1280px; margin:0 auto;">
      <div style="margin-bottom:56px;">
        <div style="color:#a3e635; font-size:10px; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:10px;">— Fitur Utama</div>
        <h2 style="font-size:44px; font-weight:900; color:#f4f4f5; text-transform:uppercase; letter-spacing:-0.02em; line-height:1; margin:0;">
          Semua yang kamu<br/>butuhkan, tidak lebih.
        </h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#27272a;">
        <div v-for="(fitur, i) in fiturs" :key="i" style="background:#09090b; padding:32px;">
          <div style="font-size:26px; margin-bottom:20px;">{{ fitur.icon }}</div>
          <div style="color:#a3e635; font-size:10px; text-transform:uppercase; letter-spacing:0.12em; margin-bottom:6px;">{{ fitur.label }}</div>
          <h3 style="color:#f4f4f5; font-size:17px; font-weight:900; text-transform:uppercase; margin:0 0 10px;">{{ fitur.title }}</h3>
          <p style="color:#52525b; font-size:13px; line-height:1.65; margin:0;">{{ fitur.desc }}</p>
          <div style="margin-top:20px; width:28px; height:2px; background:#a3e635;"></div>
        </div>
      </div>
    </section>

    <!-- CARA KERJA -->
    <section id="cara-kerja" style="position:relative; z-index:10; padding:96px 24px; background:#18181b; border-top:1px solid #27272a; border-bottom:1px solid #27272a;">
      <div style="max-width:1280px; margin:0 auto;">
        <div style="margin-bottom:56px;">
          <div style="color:#a3e635; font-size:10px; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:10px;">— Cara Kerja</div>
          <h2 style="font-size:44px; font-weight:900; color:#f4f4f5; text-transform:uppercase; letter-spacing:-0.02em; line-height:1; margin:0;">
            4 langkah,<br/>langsung jadi.
          </h2>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:#27272a;">
          <div v-for="(step, i) in steps" :key="i" style="background:#18181b; padding:32px;">
            <div style="font-size:52px; font-weight:900; color:#27272a; line-height:1; margin-bottom:14px;">0{{ i + 1 }}</div>
            <h3 style="color:#f4f4f5; font-weight:900; text-transform:uppercase; font-size:15px; margin:0 0 8px;">{{ step.title }}</h3>
            <p style="color:#52525b; font-size:12px; line-height:1.65; margin:0;">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- STACK -->
    <section id="stack" style="position:relative; z-index:10; padding:96px 24px; max-width:1280px; margin:0 auto;">
      <div style="margin-bottom:56px;">
        <div style="color:#a3e635; font-size:10px; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:10px;">— Tech Stack</div>
        <h2 style="font-size:44px; font-weight:900; color:#f4f4f5; text-transform:uppercase; letter-spacing:-0.02em; line-height:1; margin:0;">
          Dibangun di atas<br/>fondasi yang solid.
        </h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(6,1fr); gap:1px; background:#27272a;">
        <div v-for="tech in stacks" :key="tech.name" style="background:#09090b; padding:24px 16px; display:flex; flex-direction:column; align-items:center; gap:10px;">
          <div style="font-size:22px;">{{ tech.icon }}</div>
          <div style="color:#f4f4f5; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em; text-align:center;">{{ tech.name }}</div>
          <div style="color:#52525b; font-size:10px; text-align:center;">{{ tech.role }}</div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section style="position:relative; z-index:10; padding:96px 24px; border-top:1px solid #27272a;">
      <div style="max-width:1280px; margin:0 auto; display:grid; grid-template-columns:2fr 1fr; gap:32px; align-items:center;">
        <div>
          <div style="color:#a3e635; font-size:10px; text-transform:uppercase; letter-spacing:0.15em; margin-bottom:14px;">— Siap Mulai?</div>
          <h2 style="font-size:52px; font-weight:900; color:#f4f4f5; text-transform:uppercase; letter-spacing:-0.02em; line-height:1; margin:0;">
            Stop wireframing<br/>di kertas.
            <span style="color:#a3e635;">Build it.</span>
          </h2>
        </div>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <NuxtLink to="/dashboard" style="display:flex; align-items:center; justify-content:space-between; background:#a3e635; color:#09090b; padding:16px 20px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em; font-size:12px; text-decoration:none; font-family:monospace;">
            <span>Buka Dashboard</span>
            <span>→</span>
          </NuxtLink>
          <div style="display:flex; align-items:center; gap:8px; color:#3f3f46; font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">
            <div style="width:5px; height:5px; background:#a3e635; border-radius:50%;"></div>
            <span>Free. No login. No bullshit.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer style="position:relative; z-index:10; border-top:1px solid #27272a; padding:28px 24px;">
      <div style="max-width:1280px; margin:0 auto; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:12px; height:12px; background:#a3e635; transform:rotate(45deg);"></div>
          <span style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">MockupBuilder © 2025</span>
        </div>
        <div style="display:flex; align-items:center; gap:16px;">
          <span v-for="(s, i) in footerStack" :key="s">
            <span style="color:#3f3f46; font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">{{ s }}</span>
            <span v-if="i < footerStack.length - 1" style="color:#27272a; margin-left:16px;">·</span>
          </span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
const ticker = [
  'Drag & Drop Canvas',
  'Tailwind Class Editor',
  'Responsive Preview',
  'Export HTML',
  'Save to MariaDB',
  'Nitro Backend',
  'No Figma Needed',
  'Real-time Preview',
]

const tickerDouble = [
  ...ticker,
  ...ticker,
].map((label, i) => ({ key: `t-${i}`, label }))

const stats = [
  { value: '3x', label: 'Lebih Cepat' },
  { value: '100%', label: 'Tailwind Native' },
  { value: '0', label: 'Config Ribet' },
]

const fiturs = [
  { icon: '⬚', label: 'Fitur 01', title: 'Drag & Drop Canvas', desc: 'Seret komponen UI ke kanvas — navbar, hero, card, form, footer. Pindah, susun, hapus. Langsung terlihat hasilnya.' },
  { icon: '◈', label: 'Fitur 02', title: 'internal css', desc: 'Edit internal css per komponen dengan quick chips. Perubahan reflect real-time ke canvas tanpa reload.' },
  { icon: '⬡', label: 'Fitur 03', title: 'Export & Simpan', desc: 'Export jadi file HTML standalone siap pakai, atau simpan project ke database MariaDB dan load kapan saja.' },
]

const steps = [
  { title: 'Drag Komponen', desc: 'Pilih dari library komponen dan seret ke kanvas.' },
  { title: 'Edit Class', desc: 'Atur Tailwind class di panel kanan secara real-time.' },
  { title: 'Preview', desc: 'Cek tampilan di desktop, tablet, dan mobile.' },
  { title: 'Export', desc: 'Download HTML atau simpan project ke database.' },
]

const stacks = [
  { icon: '▲', name: 'Nuxt 4', role: 'Framework' },
  { icon: '◈', name: 'internal css / inline css', role: 'Styling' },
  { icon: '⬡', name: 'Nitro', role: 'Backend' },
  { icon: '◆', name: 'MariaDB', role: 'Database' },
  { icon: '▣', name: 'mysql2', role: 'DB Driver' },
  { icon: '◉', name: 'Vite', role: 'Bundler' },
]

const footerStack = ['Nuxt 4', 'internal css / inline css', 'MariaDB', 'Nitro']

useHead({ title: 'MockupBuilder — Design Before You Code' })
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
```