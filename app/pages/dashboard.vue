
<template>
  <div style="height:100vh; background:#09090b; font-family:monospace; display:flex; flex-direction:column; overflow:hidden;">

    <!-- TOPBAR -->
    <header style="height:48px; border-bottom:1px solid #27272a; background:#09090b; display:flex; align-items:center; justify-content:space-between; padding:0 16px; flex-shrink:0; z-index:50;">
      <div style="display:flex; align-items:center; gap:16px;">
        <NuxtLink to="/" style="display:flex; align-items:center; gap:8px; text-decoration:none;">
          <div style="width:12px; height:12px; background:#a3e635; transform:rotate(45deg);"></div>
          <span style="color:#f4f4f5; font-size:11px; font-weight:900; letter-spacing:0.15em; text-transform:uppercase;">MockupBuilder</span>
        </NuxtLink>
        <div style="width:1px; height:16px; background:#27272a;"></div>
        <div style="display:flex; align-items:center; gap:2px;">
          <button
            v-for="bp in breakpoints"
            :key="bp.key"
            @click="activeBreakpoint = bp.key"
            :style="{
              padding:'4px 10px',
              fontSize:'10px',
              textTransform:'uppercase',
              letterSpacing:'0.1em',
              border:'none',
              cursor:'pointer',
              fontFamily:'monospace',
              fontWeight: activeBreakpoint === bp.key ? '900' : '400',
              background: activeBreakpoint === bp.key ? '#a3e635' : 'transparent',
              color: activeBreakpoint === bp.key ? '#09090b' : '#52525b',
            }"
          >{{ bp.icon }} {{ bp.label }}</button>
        </div>
      </div>

      <div style="display:flex; align-items:center; gap:8px;">
        <input
          v-model="projectName"
          style="background:transparent; border:1px solid #3f3f46; color:#d4d4d8; font-size:10px; padding:6px 10px; width:160px; outline:none; font-family:monospace; text-transform:uppercase; letter-spacing:0.1em;"
          placeholder="NAMA PROJECT"
        />
        <button
          @click="saveProject"
          :disabled="saving"
          style="padding:6px 12px; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; border:1px solid #3f3f46; background:transparent; color:#71717a; cursor:pointer; font-family:monospace;"
        >{{ saving ? 'Saving...' : '⬡ Save' }}</button>
        <button
          @click="loadProjects"
          style="padding:6px 12px; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; border:1px solid #3f3f46; background:transparent; color:#71717a; cursor:pointer; font-family:monospace;"
        >◈ Load</button>
        <button
          @click="exportHTML"
          style="padding:6px 12px; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; border:none; background:#a3e635; color:#09090b; font-weight:900; cursor:pointer; font-family:monospace;"
        >↓ Export HTML</button>
      </div>
    </header>

    <!-- MAIN -->
    <div style="display:flex; flex:1; overflow:hidden;">

      <!-- LEFT PANEL -->
      <aside style="width:200px; border-right:1px solid #27272a; background:#09090b; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto;">
        <div style="padding:6px 12px; border-bottom:1px solid #27272a;">
          <span style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.12em;">Components</span>
        </div>
        <div v-for="group in componentGroups" :key="group.label" style="border-bottom:1px solid #18181b;">
          <div style="padding:6px 12px;">
            <span style="color:#3f3f46; font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">{{ group.label }}</span>
          </div>
          <div style="padding:0 8px 8px; display:flex; flex-direction:column; gap:3px;">
            <div
              v-for="comp in group.items"
              :key="comp.id"
              draggable="true"
              @dragstart="onDragStart($event, comp)"
              style="display:flex; align-items:center; gap:8px; padding:6px 8px; border:1px solid #27272a; background:#18181b; cursor:grab;"
            >
              <span style="color:#a3e635; font-size:11px;">{{ comp.icon }}</span>
              <span style="color:#a1a1aa; font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">{{ comp.label }}</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- CANVAS -->
      <main style="flex:1; display:flex; flex-direction:column; overflow:hidden; background:#27272a;">
        <div style="height:28px; border-bottom:1px solid #3f3f46; display:flex; align-items:center; padding:0 16px; gap:10px; flex-shrink:0; background:#18181b;">
          <div style="width:5px; height:5px; background:#a3e635; border-radius:50%;"></div>
          <span style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">Canvas</span>
          <span style="color:#3f3f46; font-size:10px;">—</span>
          <span style="color:#52525b; font-size:10px;">{{ canvasWidth }}</span>
          <div style="margin-left:auto;">
            <button @click="clearCanvas" style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; background:transparent; border:none; cursor:pointer; font-family:monospace;">✕ Clear</button>
          </div>
        </div>

        <div style="flex:1; overflow:auto; padding:32px; display:flex; align-items:flex-start; justify-content:center;">
          <div
            :style="{
              background:'#ffffff',
              minHeight:'400px',
              position:'relative',
              transition:'all 0.3s',
              boxShadow:'0 25px 50px rgba(0,0,0,0.5)',
              width: canvasWidthValue,
            }"
            @dragover.prevent="isDraggingOver = true"
            @dragleave="isDraggingOver = false"
            @drop="onDrop"
          >
            <!-- Empty state -->
            <div
              v-if="canvasBlocks.length === 0"
              style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; pointer-events:none;"
            >
              <div style="width:48px; height:48px; border:2px dashed #d4d4d8; display:flex; align-items:center; justify-content:center;">
                <span style="color:#a1a1aa; font-size:20px;">+</span>
              </div>
              <span style="color:#a1a1aa; font-size:10px; text-transform:uppercase; letter-spacing:0.12em; font-family:monospace;">Drag komponen ke sini</span>
            </div>

            <!-- Drop overlay -->
            <div
              v-if="isDraggingOver"
              style="position:absolute; inset:0; border:2px dashed #a3e635; background:rgba(163,230,53,0.04); z-index:10; pointer-events:none; display:flex; align-items:center; justify-content:center;"
            >
              <span style="color:#a3e635; font-size:10px; text-transform:uppercase; letter-spacing:0.15em; font-family:monospace; font-weight:900;">Drop di sini</span>
            </div>

            <!-- Blocks -->
            <div
              v-for="(block, index) in canvasBlocks"
              :key="block.uid"
              @click="selectBlock(index)"
              :style="{
                position:'relative',
                cursor:'pointer',
                outline: selectedIndex === index ? '2px solid #a3e635' : 'none',
                outlineOffset: '0px',
              }"
            >
              <!-- Block toolbar -->
              <div v-if="selectedIndex === index" style="position:absolute; top:-24px; left:0; display:flex; align-items:center; gap:1px; z-index:20;">
                <span style="background:#a3e635; color:#09090b; font-size:10px; padding:2px 8px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em; font-family:monospace;">{{ block.label }}</span>
                <button @click.stop="moveBlock(index, -1)" style="background:#3f3f46; color:#d4d4d8; font-size:10px; padding:2px 6px; border:none; cursor:pointer; font-family:monospace;">↑</button>
                <button @click.stop="moveBlock(index, 1)" style="background:#3f3f46; color:#d4d4d8; font-size:10px; padding:2px 6px; border:none; cursor:pointer; font-family:monospace;">↓</button>
                <button @click.stop="removeBlock(index)" style="background:#ef4444; color:#fff; font-size:10px; padding:2px 6px; border:none; cursor:pointer; font-family:monospace;">✕</button>
              </div>
              <div v-html="block.html" :class="block.classes"></div>
            </div>
          </div>
        </div>
      </main>

      <!-- RIGHT PANEL -->
      <aside style="width:240px; border-left:1px solid #27272a; background:#09090b; display:flex; flex-direction:column; flex-shrink:0; overflow-y:auto;">

        <!-- Class editor -->
        <div style="border-bottom:1px solid #27272a;">
          <div style="padding:6px 12px; border-bottom:1px solid #27272a; display:flex; align-items:center; justify-content:space-between;">
            <span style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.12em;">Class Editor</span>
            <span :style="{ color: selectedBlock ? '#a3e635' : '#3f3f46', fontSize:'10px' }">
              {{ selectedBlock ? selectedBlock.label : '—' }}
            </span>
          </div>
          <div style="padding:10px;">
            <textarea
              v-model="editingClasses"
              @input="applyClasses"
              :disabled="!selectedBlock"
              rows="4"
              style="width:100%; background:#18181b; border:1px solid #3f3f46; color:#a3e635; font-size:10px; padding:8px; resize:none; outline:none; font-family:monospace; box-sizing:border-box;"
              placeholder="Tailwind classes..."
            ></textarea>
            <div style="color:#3f3f46; font-size:10px; margin-top:4px;">Apply otomatis saat ketik</div>
          </div>
        </div>

        <!-- Quick classes -->
        <div style="border-bottom:1px solid #27272a;">
          <div style="padding:6px 12px; border-bottom:1px solid #27272a;">
            <span style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.12em;">Quick Classes</span>
          </div>
          <div style="padding:10px; display:flex; flex-direction:column; gap:10px;">
            <div v-for="qg in quickGroups" :key="qg.label">
              <div style="color:#3f3f46; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:6px;">{{ qg.label }}</div>
              <div style="display:flex; flex-wrap:wrap; gap:4px;">
                <button
                  v-for="cls in qg.classes"
                  :key="cls"
                  @click="toggleQuickClass(cls)"
                  :style="{
                    fontSize:'10px',
                    padding:'2px 6px',
                    border:'1px solid',
                    cursor:'pointer',
                    fontFamily:'monospace',
                    background: editingClasses.includes(cls) ? 'rgba(163,230,53,0.1)' : 'transparent',
                    borderColor: editingClasses.includes(cls) ? '#a3e635' : '#3f3f46',
                    color: editingClasses.includes(cls) ? '#a3e635' : '#71717a',
                  }"
                >{{ cls }}</button>
              </div>
            </div>
          </div>
        </div>

        <!-- HTML preview -->
        <div style="border-bottom:1px solid #27272a;">
          <div style="padding:6px 12px; border-bottom:1px solid #27272a;">
            <span style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.12em;">HTML Output</span>
          </div>
          <div style="padding:10px;">
            <pre style="font-size:10px; color:#71717a; background:#18181b; border:1px solid #27272a; padding:8px; overflow-x:auto; white-space:pre-wrap; word-break:break-all; line-height:1.5; max-height:120px; overflow-y:auto; margin:0; font-family:monospace;">{{ selectedHtmlPreview }}</pre>
          </div>
        </div>

        <!-- Saved projects -->
        <div style="flex:1;">
          <div style="padding:6px 12px; border-bottom:1px solid #27272a; display:flex; align-items:center; justify-content:space-between;">
            <span style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.12em;">Projects</span>
            <button @click="loadProjects" style="color:#3f3f46; font-size:10px; background:transparent; border:none; cursor:pointer; font-family:monospace;">↺</button>
          </div>
          <div style="padding:8px; display:flex; flex-direction:column; gap:4px;">
            <div v-if="projects.length === 0" style="color:#3f3f46; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; padding:8px 4px;">Belum ada project</div>
            <div
              v-for="proj in projects"
              :key="proj.id"
              style="display:flex; align-items:center; justify-content:space-between; padding:8px; border:1px solid #27272a;"
            >
              <div>
                <div style="color:#d4d4d8; font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">{{ proj.name }}</div>
                <div style="color:#52525b; font-size:10px; margin-top:2px;">{{ formatDate(proj.updated_at) }}</div>
              </div>
              <div style="display:flex; gap:4px;">
                <button @click="loadProject(proj)" style="color:#a3e635; font-size:10px; background:transparent; border:none; cursor:pointer; font-family:monospace;">▶</button>
                <button @click="deleteProject(proj.id)" style="color:#ef4444; font-size:10px; background:transparent; border:none; cursor:pointer; font-family:monospace;">✕</button>
              </div>
            </div>
          </div>
        </div>

      </aside>
    </div>

    <!-- STATUS BAR -->
    <footer style="height:24px; border-top:1px solid #27272a; background:#09090b; display:flex; align-items:center; justify-content:space-between; padding:0 16px; flex-shrink:0;">
      <div style="display:flex; align-items:center; gap:16px;">
        <span style="color:#52525b; font-size:10px;">{{ canvasBlocks.length }} blok</span>
        <span style="color:#27272a;">·</span>
        <span style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">{{ activeBreakpoint }}</span>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <div :style="{ width:'6px', height:'6px', borderRadius:'50%', background: dbStatus === 'ok' ? '#a3e635' : '#ef4444' }"></div>
        <span style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.1em;">{{ dbStatus === 'ok' ? 'DB Connected' : 'DB Error' }}</span>
      </div>
    </footer>

    <!-- LOAD MODAL -->
    <div v-if="showLoadModal" style="position:fixed; inset:0; z-index:50; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.85);">
      <div style="background:#09090b; border:1px solid #3f3f46; width:380px; max-height:420px; display:flex; flex-direction:column;">
        <div style="display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #27272a;">
          <span style="color:#f4f4f5; font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:0.12em;">Load Project</span>
          <button @click="showLoadModal = false" style="color:#71717a; font-size:10px; background:transparent; border:none; cursor:pointer; font-family:monospace; text-transform:uppercase;">✕ Tutup</button>
        </div>
        <div style="overflow-y:auto; flex:1; padding:8px; display:flex; flex-direction:column; gap:4px;">
          <div v-if="projects.length === 0" style="color:#52525b; font-size:10px; text-transform:uppercase; letter-spacing:0.1em; text-align:center; padding:20px;">Tidak ada project tersimpan</div>
          <div
            v-for="proj in projects"
            :key="proj.id"
            @click="loadProject(proj); showLoadModal = false"
            style="display:flex; align-items:center; justify-content:space-between; padding:10px 12px; border:1px solid #27272a; cursor:pointer;"
          >
            <div>
              <div style="color:#f4f4f5; font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:0.1em;">{{ proj.name }}</div>
              <div style="color:#52525b; font-size:10px; margin-top:2px;">{{ formatDate(proj.updated_at) }}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="color:#a3e635; font-size:10px; font-family:monospace;">Load →</span>
              <button @click.stop="deleteProject(proj.id)" style="color:#ef4444; font-size:10px; background:transparent; border:none; cursor:pointer; font-family:monospace;">✕</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Block {
  uid: string
  id: string
  label: string
  html: string
  classes: string
}

interface Project {
  id: number
  name: string
  layout_json: string
  updated_at: string
}

const activeBreakpoint = ref<'desktop' | 'tablet' | 'mobile'>('desktop')
const projectName = ref('Untitled Project')
const canvasBlocks = ref<Block[]>([])
const selectedIndex = ref<number | null>(null)
const editingClasses = ref('')
const isDraggingOver = ref(false)
const saving = ref(false)
const projects = ref<Project[]>([])
const showLoadModal = ref(false)
const dbStatus = ref<'ok' | 'error'>('ok')

const breakpoints = [
  { key: 'desktop', label: 'Desktop', icon: '▣' },
  { key: 'tablet', label: 'Tablet', icon: '▤' },
  { key: 'mobile', label: 'Mobile', icon: '▥' },
]

const canvasWidthValue = computed(() => {
  if (activeBreakpoint.value === 'mobile') return '375px'
  if (activeBreakpoint.value === 'tablet') return '768px'
  return '100%'
})

const canvasWidth = computed(() => {
  if (activeBreakpoint.value === 'mobile') return '375px'
  if (activeBreakpoint.value === 'tablet') return '768px'
  return '1280px'
})

const componentGroups = [
  {
    label: 'Layout',
    items: [
      { id: 'navbar', label: 'Navbar', icon: '▬', html: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;background:#18181b;border-bottom:1px solid #27272a;"><div style="font-weight:900;color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:0.1em;">Brand</div><div style="display:flex;gap:24px;"><a style="color:#71717a;font-size:11px;text-transform:uppercase;text-decoration:none;">Home</a><a style="color:#71717a;font-size:11px;text-transform:uppercase;text-decoration:none;">About</a><a style="color:#71717a;font-size:11px;text-transform:uppercase;text-decoration:none;">Contact</a></div><button style="background:#a3e635;color:#09090b;font-size:11px;padding:6px 16px;font-weight:900;text-transform:uppercase;border:none;cursor:pointer;">CTA</button></nav>` },
      { id: 'hero', label: 'Hero', icon: '◈', html: `<section style="padding:80px 32px;background:#09090b;text-align:center;"><p style="color:#a3e635;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:16px;">Subtitle tagline</p><h1 style="font-size:52px;font-weight:900;color:#fff;text-transform:uppercase;line-height:1;margin-bottom:24px;">Headline<br/>Goes Here</h1><p style="color:#71717a;font-size:14px;max-width:400px;margin:0 auto 32px;line-height:1.7;">Deskripsi singkat value proposition produk atau layanan kamu.</p><button style="background:#a3e635;color:#09090b;font-size:12px;padding:12px 32px;font-weight:900;text-transform:uppercase;border:none;cursor:pointer;">Get Started →</button></section>` },
      { id: 'footer', label: 'Footer', icon: '▁', html: `<footer style="padding:24px 32px;background:#18181b;border-top:1px solid #27272a;display:flex;align-items:center;justify-content:space-between;"><span style="color:#52525b;font-size:11px;text-transform:uppercase;">© 2025 Brand</span><div style="display:flex;gap:24px;"><a style="color:#52525b;font-size:11px;text-transform:uppercase;text-decoration:none;">Privacy</a><a style="color:#52525b;font-size:11px;text-transform:uppercase;text-decoration:none;">Terms</a></div></footer>` },
      { id: 'section', label: 'Section', icon: '▭', html: `<section style="padding:64px 32px;background:#fff;"><h2 style="font-size:32px;font-weight:900;color:#09090b;text-transform:uppercase;margin-bottom:16px;">Section Title</h2><p style="color:#71717a;font-size:14px;line-height:1.7;max-width:480px;">Konten section. Tambahkan teks, gambar, atau komponen lain sesuai kebutuhan layout kamu.</p></section>` },
    ]
  },
  {
    label: 'Content',
    items: [
      { id: 'card', label: 'Card', icon: '▢', html: `<div style="margin:16px;border:1px solid #e4e4e7;background:#fff;padding:24px;"><div style="width:100%;height:120px;background:#f4f4f5;margin-bottom:16px;display:flex;align-items:center;justify-content:center;"><span style="color:#a1a1aa;font-size:11px;text-transform:uppercase;">Image</span></div><h3 style="color:#09090b;font-weight:900;font-size:15px;text-transform:uppercase;margin-bottom:8px;">Card Title</h3><p style="color:#71717a;font-size:13px;line-height:1.6;margin-bottom:16px;">Deskripsi card. Preview konten singkat.</p><button style="font-size:11px;text-transform:uppercase;color:#16a34a;font-weight:900;background:transparent;border:none;cursor:pointer;">Read More →</button></div>` },
      { id: 'grid3', label: '3-Col Grid', icon: '⊞', html: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:24px;background:#fff;"><div style="border:1px solid #e4e4e7;padding:16px;"><div style="height:80px;background:#f4f4f5;margin-bottom:12px;"></div><h4 style="font-weight:900;color:#09090b;font-size:13px;text-transform:uppercase;margin-bottom:4px;">Item 01</h4><p style="color:#71717a;font-size:12px;">Deskripsi singkat</p></div><div style="border:1px solid #e4e4e7;padding:16px;"><div style="height:80px;background:#f4f4f5;margin-bottom:12px;"></div><h4 style="font-weight:900;color:#09090b;font-size:13px;text-transform:uppercase;margin-bottom:4px;">Item 02</h4><p style="color:#71717a;font-size:12px;">Deskripsi singkat</p></div><div style="border:1px solid #e4e4e7;padding:16px;"><div style="height:80px;background:#f4f4f5;margin-bottom:12px;"></div><h4 style="font-weight:900;color:#09090b;font-size:13px;text-transform:uppercase;margin-bottom:4px;">Item 03</h4><p style="color:#71717a;font-size:12px;">Deskripsi singkat</p></div></div>` },
      { id: 'text', label: 'Text Block', icon: '≡', html: `<div style="padding:32px;background:#fff;"><h2 style="font-size:24px;font-weight:900;color:#09090b;text-transform:uppercase;margin-bottom:12px;">Judul Konten</h2><p style="color:#71717a;font-size:13px;line-height:1.75;margin-bottom:12px;">Paragraf pertama. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p style="color:#71717a;font-size:13px;line-height:1.75;">Paragraf kedua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div>` },
      { id: 'banner', label: 'Banner', icon: '▬', html: `<div style="padding:48px 32px;background:#09090b;display:flex;align-items:center;justify-content:space-between;"><div><h3 style="color:#fff;font-weight:900;font-size:22px;text-transform:uppercase;margin-bottom:8px;">CTA Banner</h3><p style="color:#71717a;font-size:13px;">Ajakan untuk action. Singkat dan jelas.</p></div><button style="background:#a3e635;color:#09090b;font-size:12px;padding:12px 24px;font-weight:900;text-transform:uppercase;border:none;cursor:pointer;flex-shrink:0;">Action Now →</button></div>` },
    ]
  },
  {
    label: 'Forms',
    items: [
      { id: 'contact', label: 'Contact Form', icon: '▤', html: `<div style="padding:40px 32px;background:#fff;"><h3 style="font-size:18px;font-weight:900;color:#09090b;text-transform:uppercase;margin-bottom:24px;">Contact Us</h3><div style="display:flex;flex-direction:column;gap:16px;"><div><label style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:4px;">Nama</label><input style="width:100%;border:1px solid #e4e4e7;padding:8px 12px;font-size:13px;color:#09090b;outline:none;box-sizing:border-box;" placeholder="John Doe" /></div><div><label style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:4px;">Email</label><input style="width:100%;border:1px solid #e4e4e7;padding:8px 12px;font-size:13px;color:#09090b;outline:none;box-sizing:border-box;" placeholder="email@domain.com" /></div><div><label style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;display:block;margin-bottom:4px;">Pesan</label><textarea style="width:100%;border:1px solid #e4e4e7;padding:8px 12px;font-size:13px;color:#09090b;outline:none;height:80px;resize:none;box-sizing:border-box;" placeholder="Tulis pesan..."></textarea></div><button style="background:#09090b;color:#fff;font-size:11px;padding:10px 24px;font-weight:900;text-transform:uppercase;border:none;cursor:pointer;width:fit-content;">Kirim →</button></div></div>` },
      { id: 'search', label: 'Search Bar', icon: '◎', html: `<div style="padding:16px 24px;background:#fff;border-bottom:1px solid #e4e4e7;display:flex;align-items:center;gap:12px;"><span style="color:#a1a1aa;font-size:16px;">⌕</span><input style="flex:1;font-size:13px;color:#09090b;border:none;outline:none;" placeholder="Cari sesuatu..." /><button style="background:#09090b;color:#fff;font-size:11px;padding:6px 16px;font-weight:900;text-transform:uppercase;border:none;cursor:pointer;">Search</button></div>` },
    ]
  },
  {
    label: 'UI',
    items: [
      { id: 'alert', label: 'Alert', icon: '◉', html: `<div style="margin:12px 16px;border-left:4px solid #a3e635;background:#f7fee7;padding:12px 16px;display:flex;align-items:flex-start;gap:10px;"><span style="color:#4d7c0f;font-size:13px;font-weight:900;">!</span><div><p style="color:#365314;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:2px;">Perhatian</p><p style="color:#4d7c0f;font-size:12px;">Ini adalah pesan notifikasi penting untuk pengguna.</p></div></div>` },
      { id: 'stats', label: 'Stats Row', icon: '▦', html: `<div style="display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-top:1px solid #e4e4e7;border-bottom:1px solid #e4e4e7;"><div style="padding:24px;text-align:center;border-right:1px solid #e4e4e7;"><div style="font-size:28px;font-weight:900;color:#09090b;">24K</div><div style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Users</div></div><div style="padding:24px;text-align:center;border-right:1px solid #e4e4e7;"><div style="font-size:28px;font-weight:900;color:#09090b;">98%</div><div style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Uptime</div></div><div style="padding:24px;text-align:center;border-right:1px solid #e4e4e7;"><div style="font-size:28px;font-weight:900;color:#09090b;">4.9</div><div style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Rating</div></div><div style="padding:24px;text-align:center;"><div style="font-size:28px;font-weight:900;color:#09090b;">12+</div><div style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-top:4px;">Awards</div></div></div>` },
      { id: 'pricing', label: 'Pricing Card', icon: '◇', html: `<div style="margin:16px;border:1px solid #e4e4e7;padding:24px;background:#fff;max-width:280px;"><div style="color:#71717a;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Pro Plan</div><div style="font-size:40px;font-weight:900;color:#09090b;margin-bottom:4px;">$29<span style="font-size:16px;color:#a1a1aa;font-weight:400;">/mo</span></div><div style="color:#a1a1aa;font-size:12px;margin-bottom:20px;">Billed annually</div><ul style="list-style:none;padding:0;margin:0 0 20px;display:flex;flex-direction:column;gap:8px;"><li style="color:#52525b;font-size:12px;display:flex;align-items:center;gap:8px;"><span style="color:#a3e635;">✓</span>Unlimited projects</li><li style="color:#52525b;font-size:12px;display:flex;align-items:center;gap:8px;"><span style="color:#a3e635;">✓</span>Export HTML</li><li style="color:#52525b;font-size:12px;display:flex;align-items:center;gap:8px;"><span style="color:#a3e635;">✓</span>Priority support</li></ul><button style="width:100%;background:#09090b;color:#fff;font-size:11px;padding:10px;font-weight:900;text-transform:uppercase;border:none;cursor:pointer;">Get Started →</button></div>` },
    ]
  }
]

const quickGroups = [
  { label: 'Spacing', classes: ['p-4', 'p-8', 'px-6', 'py-4', 'mx-auto', 'mt-4', 'mb-4'] },
  { label: 'Layout', classes: ['flex', 'grid', 'hidden', 'block', 'items-center', 'justify-between', 'gap-4'] },
  { label: 'Text', classes: ['text-sm', 'text-lg', 'font-black', 'uppercase', 'text-center', 'tracking-widest'] },
  { label: 'Color', classes: ['bg-white', 'bg-zinc-900', 'bg-lime-400', 'text-white', 'text-zinc-900'] },
  { label: 'Border', classes: ['border', 'border-zinc-200', 'rounded', 'rounded-lg', 'shadow-md', 'shadow-xl'] },
]

const selectedBlock = computed(() =>
  selectedIndex.value !== null ? canvasBlocks.value[selectedIndex.value] : null
)

const selectedHtmlPreview = computed(() => {
  if (!selectedBlock.value) return '— pilih blok untuk melihat HTML —'
  const cls = selectedBlock.value.classes
  const tag = selectedBlock.value.html.match(/^<(\w+)/)?.[1] ?? 'div'
  return `<${tag} class="${cls}">\n  ...\n</${tag}>`
})

watch(selectedIndex, (newIdx) => {
  if (newIdx !== null && canvasBlocks.value[newIdx]) {
    editingClasses.value = canvasBlocks.value[newIdx].classes
  } else {
    editingClasses.value = ''
  }
})

let draggedComp: any = null

function onDragStart(event: DragEvent, comp: any) {
  draggedComp = comp
  event.dataTransfer?.setData('text/plain', comp.id)
}

function onDrop() {
  isDraggingOver.value = false
  if (!draggedComp) return
  const newBlock: Block = {
    uid: `${draggedComp.id}-${Date.now()}`,
    id: draggedComp.id,
    label: draggedComp.label,
    html: draggedComp.html,
    classes: '',
  }
  canvasBlocks.value.push(newBlock)
  selectedIndex.value = canvasBlocks.value.length - 1
  draggedComp = null
}

function selectBlock(index: number) {
  selectedIndex.value = selectedIndex.value === index ? null : index
}

function removeBlock(index: number) {
  canvasBlocks.value.splice(index, 1)
  selectedIndex.value = null
}

function moveBlock(index: number, dir: -1 | 1) {
  const newIdx = index + dir
  if (newIdx < 0 || newIdx >= canvasBlocks.value.length) return
  const blocks = [...canvasBlocks.value]
  ;[blocks[index], blocks[newIdx]] = [blocks[newIdx], blocks[index]]
  canvasBlocks.value = blocks
  selectedIndex.value = newIdx
}

function clearCanvas() {
  canvasBlocks.value = []
  selectedIndex.value = null
}

function applyClasses() {
  if (selectedIndex.value === null) return
  canvasBlocks.value[selectedIndex.value].classes = editingClasses.value
}

function toggleQuickClass(cls: string) {
  if (selectedIndex.value === null) return
  const current = editingClasses.value
  if (current.includes(cls)) {
    editingClasses.value = current.replace(cls, '').replace(/\s+/g, ' ').trim()
  } else {
    editingClasses.value = (current + ' ' + cls).trim()
  }
  applyClasses()
}

function exportHTML() {
  const blocksHtml = canvasBlocks.value
    .map(b => `  <div class="${b.classes}">\n    ${b.html}\n  </div>`)
    .join('\n')
  const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${projectName.value}</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
</head>
<body>
${blocksHtml}
</body>
</html>`
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${projectName.value.replace(/\s+/g, '-').toLowerCase()}.html`
  a.click()
  URL.revokeObjectURL(url)
}

async function saveProject() {
  if (!projectName.value.trim()) return
  saving.value = true
  try {
    await $fetch('/api/crud', {
      method: 'POST',
      body: { name: projectName.value, layout_json: canvasBlocks.value, thumbnail: null }
    })
    await loadProjects()
    dbStatus.value = 'ok'
  } catch {
    dbStatus.value = 'error'
  } finally {
    saving.value = false
  }
}

async function loadProjects() {
  showLoadModal.value = true
  try {
    const res = await $fetch<{ data: Project[] }>('/api/crud')
    projects.value = res.data ?? []
    dbStatus.value = 'ok'
  } catch {
    dbStatus.value = 'error'
  }
}

function loadProject(proj: Project) {
  projectName.value = proj.name
  canvasBlocks.value = JSON.parse(proj.layout_json)
  selectedIndex.value = null
  showLoadModal.value = false
}

async function deleteProject(id: number) {
  try {
    await $fetch(`/api/crud?id=${id}`, { method: 'DELETE' })
    projects.value = projects.value.filter(p => p.id !== id)
  } catch {
    dbStatus.value = 'error'
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

useHead({ title: 'Dashboard — MockupBuilder' })
</script>
