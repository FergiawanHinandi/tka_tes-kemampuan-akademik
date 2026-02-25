import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  BarChart2,
  CheckCircle2,
  Download,
  Filter,
  Search,
  TrendingUp,
  XCircle,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface AnalysisItem {
  id: string;
  category: string;
  content: string;
  difficulty: number;
  discrimination: number;
  pointBiserial: number;
  pearson: number;
  validity: 'Valid' | 'Invalid';
  validityReason: string;
  status: 'Mudah' | 'Sedang' | 'Sulit';
  recommendation: string;
  sampleSize: number;
  responseSource: 'DIRECT_RESPONSE' | 'ESTIMATED_CATEGORY_PROFILE' | 'MIXED';
  reliabilityIndex: number;
}

interface ApiAnalysisItem {
  questionId: string;
  category: string;
  content: string;
  difficultyIndex: number;
  discriminationPower: number;
  pointBiserialCorrelation: number;
  pearsonCorrelation?: number;
  validityScore: 'Valid' | 'Invalid';
  validityReason?: string;
  reliabilityIndex?: number;
  sampleSize?: number;
  responseSource?: 'DIRECT_RESPONSE' | 'ESTIMATED_CATEGORY_PROFILE' | 'MIXED';
}

interface ApiAnalysisMeta {
  participantCount?: number;
  questionCount?: number;
  examSessionId?: string | null;
  availableSessions?: string[];
  generatedAt?: string;
}

interface ApiEnvelope {
  data?: ApiAnalysisItem[];
  meta?: ApiAnalysisMeta;
}

const FALLBACK_ANALYSIS_DATA: AnalysisItem[] = [
  {
    id: 'Q-001',
    category: 'Matematika',
    content: 'Hasil dari 15 x 4 adalah...',
    difficulty: 0.82,
    discrimination: 0.41,
    pointBiserial: 0.54,
    pearson: 0.56,
    validity: 'Valid',
    validityReason: 'Memenuhi ambang validitas butir',
    status: 'Mudah',
    recommendation: 'Pertahankan. Distraktor sudah berfungsi baik.',
    sampleSize: 120,
    responseSource: 'DIRECT_RESPONSE',
    reliabilityIndex: 0.84,
  },
  {
    id: 'Q-002',
    category: 'Bahasa Indonesia',
    content: 'Ide pokok paragraf di atas adalah...',
    difficulty: 0.43,
    discrimination: 0.35,
    pointBiserial: 0.37,
    pearson: 0.39,
    validity: 'Valid',
    validityReason: 'Memenuhi ambang validitas butir',
    status: 'Sedang',
    recommendation: 'Pertahankan. Cocok sebagai soal anchor.',
    sampleSize: 120,
    responseSource: 'DIRECT_RESPONSE',
    reliabilityIndex: 0.84,
  },
  {
    id: 'Q-003',
    category: 'IPA',
    content: 'Fungsi mitokondria pada sel adalah...',
    difficulty: 0.18,
    discrimination: 0.11,
    pointBiserial: 0.12,
    pearson: 0.09,
    validity: 'Invalid',
    validityReason: 'Korelasi point-biserial rendah; Daya pembeda rendah',
    status: 'Sulit',
    recommendation: 'Revisi total butir. Korelasi terlalu rendah.',
    sampleSize: 120,
    responseSource: 'DIRECT_RESPONSE',
    reliabilityIndex: 0.84,
  },
  {
    id: 'Q-004',
    category: 'Matematika',
    content: 'Jika x + 5 = 12, maka nilai x adalah...',
    difficulty: 0.76,
    discrimination: 0.52,
    pointBiserial: 0.49,
    pearson: 0.5,
    validity: 'Valid',
    validityReason: 'Memenuhi ambang validitas butir',
    status: 'Mudah',
    recommendation: 'Pertahankan untuk level dasar.',
    sampleSize: 120,
    responseSource: 'DIRECT_RESPONSE',
    reliabilityIndex: 0.84,
  },
  {
    id: 'Q-005',
    category: 'Bahasa Inggris',
    content: 'Choose the correct synonym of "rapid"...',
    difficulty: 0.29,
    discrimination: 0.27,
    pointBiserial: 0.31,
    pearson: 0.29,
    validity: 'Valid',
    validityReason: 'Memenuhi ambang validitas butir',
    status: 'Sulit',
    recommendation: 'Pertahankan dengan penyempurnaan redaksi.',
    sampleSize: 120,
    responseSource: 'DIRECT_RESPONSE',
    reliabilityIndex: 0.84,
  },
  {
    id: 'Q-006',
    category: 'IPA',
    content: 'Perubahan energi pada panel surya adalah...',
    difficulty: 0.65,
    discrimination: 0.17,
    pointBiserial: 0.22,
    pearson: 0.2,
    validity: 'Invalid',
    validityReason: 'Daya pembeda rendah',
    status: 'Sedang',
    recommendation: 'Revisi distraktor untuk meningkatkan daya pembeda.',
    sampleSize: 120,
    responseSource: 'DIRECT_RESPONSE',
    reliabilityIndex: 0.84,
  },
];

const API_BASE =
  (window as Window & { __TKA_API_BASE__?: string }).__TKA_API_BASE__ || 'http://localhost:3000/api';

function classifyDifficulty(value: number): 'Mudah' | 'Sedang' | 'Sulit' {
  if (value > 0.7) {
    return 'Mudah';
  }

  if (value < 0.3) {
    return 'Sulit';
  }

  return 'Sedang';
}

function getRecommendation(item: {
  difficulty: number;
  discrimination: number;
  pointBiserial: number;
  pearson: number;
  validity: 'Valid' | 'Invalid';
}): string {
  if (item.validity === 'Invalid' && item.pointBiserial < 0.2) {
    return 'Revisi total butir. Korelasi sangat lemah.';
  }

  if (item.discrimination < 0.2) {
    return 'Perbaiki distraktor agar daya pembeda meningkat.';
  }

  if (item.pearson < 0.2) {
    return 'Cek kembali kesesuaian butir dengan konstruk yang diukur.';
  }

  if (item.difficulty > 0.85 || item.difficulty < 0.15) {
    return 'Cek ulang tingkat kesulitan, terlalu ekstrem.';
  }

  return 'Pertahankan dalam bank soal utama.';
}

function normalizeApiItem(apiItem: ApiAnalysisItem): AnalysisItem {
  const difficulty = Number(apiItem.difficultyIndex.toFixed(2));
  const discrimination = Number(apiItem.discriminationPower.toFixed(2));
  const pointBiserial = Number(apiItem.pointBiserialCorrelation.toFixed(2));
  const pearson = Number((apiItem.pearsonCorrelation ?? apiItem.pointBiserialCorrelation).toFixed(2));
  const validity = apiItem.validityScore === 'Valid' ? 'Valid' : 'Invalid';

  return {
    id: apiItem.questionId,
    category: apiItem.category,
    content: apiItem.content,
    difficulty,
    discrimination,
    pointBiserial,
    pearson,
    validity,
    validityReason: apiItem.validityReason || 'Tidak ada alasan validitas.',
    status: classifyDifficulty(difficulty),
    recommendation: getRecommendation({
      difficulty,
      discrimination,
      pointBiserial,
      pearson,
      validity,
    }),
    sampleSize: apiItem.sampleSize || 0,
    responseSource: apiItem.responseSource || 'ESTIMATED_CATEGORY_PROFILE',
    reliabilityIndex: Number((apiItem.reliabilityIndex ?? 0).toFixed(2)),
  };
}

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/[^a-zA-Z0-9_.-]/g, '_');
}

function parseFileNameFromDisposition(disposition: string | null, fallback: string): string {
  if (!disposition) {
    return fallback;
  }

  const match = disposition.match(/filename=([^;]+)/i);
  if (!match || !match[1]) {
    return fallback;
  }

  const raw = match[1].trim().replace(/^"|"$/g, '');
  return sanitizeFileName(raw || fallback);
}

function triggerDownload(blob: Blob, fileName: string) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}

function escapeCsvCell(value: unknown): string {
  const escaped = String(value ?? '').replace(/"/g, '""');
  return `"${escaped}"`;
}

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildCsvContent(rows: AnalysisItem[]): string {
  const header = [
    'questionId',
    'category',
    'content',
    'difficulty',
    'discrimination',
    'pointBiserial',
    'pearson',
    'validity',
    'validityReason',
    'reliabilityIndex',
    'sampleSize',
    'responseSource',
    'recommendation',
  ];

  const dataRows = rows.map((item) => [
    item.id,
    item.category,
    item.content,
    item.difficulty,
    item.discrimination,
    item.pointBiserial,
    item.pearson,
    item.validity,
    item.validityReason,
    item.reliabilityIndex,
    item.sampleSize,
    item.responseSource,
    item.recommendation,
  ]);

  return [header, ...dataRows]
    .map((row) => row.map((cell) => escapeCsvCell(cell)).join(','))
    .join('\n');
}

function buildHtmlExcelContent(rows: AnalysisItem[]): string {
  const header = [
    'Question ID',
    'Kategori',
    'Konten Soal',
    'P',
    'Daya Pembeda',
    'Point-Biserial',
    'Pearson',
    'Validitas',
    'Alasan Validitas',
    'Reliabilitas',
    'Sample',
    'Sumber Data',
  ];

  const headHtml = `<tr>${header
    .map((column) => `<th style="background:#f1f5f9;padding:8px;border:1px solid #cbd5e1">${escapeHtml(column)}</th>`)
    .join('')}</tr>`;

  const bodyHtml = rows
    .map(
      (item) => `<tr>
      <td style="padding:8px;border:1px solid #e2e8f0">${escapeHtml(item.id)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${escapeHtml(item.category)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${escapeHtml(item.content)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${item.difficulty.toFixed(2)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${item.discrimination.toFixed(2)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${item.pointBiserial.toFixed(2)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${item.pearson.toFixed(2)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${escapeHtml(item.validity)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${escapeHtml(item.validityReason)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${item.reliabilityIndex.toFixed(2)}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${item.sampleSize}</td>
      <td style="padding:8px;border:1px solid #e2e8f0">${escapeHtml(item.responseSource)}</td>
    </tr>`,
    )
    .join('');

  return `
  <html>
    <head><meta charset="UTF-8" /></head>
    <body>
      <table>${headHtml}${bodyHtml}</table>
    </body>
  </html>
  `;
}

const ItemAnalysis: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisItem[]>(FALLBACK_ANALYSIS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedSession, setSelectedSession] = useState<string>('Semua');
  const [availableSessions, setAvailableSessions] = useState<string[]>(['Semua']);
  const [validityFilter, setValidityFilter] = useState<'Semua' | 'Valid' | 'Invalid'>('Semua');
  const [chartMetric, setChartMetric] = useState<'pointBiserial' | 'pearson'>('pointBiserial');
  const [chartFocus, setChartFocus] = useState<'Semua' | 'Invalid'>('Semua');
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [apiMeta, setApiMeta] = useState<ApiAnalysisMeta | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setIsLoading(true);
      setFetchError(null);

      const query = new URLSearchParams();
      if (selectedSession !== 'Semua') {
        query.set('sessionId', selectedSession);
      }

      const endpoint = `${API_BASE}/results/analysis${query.toString() ? `?${query.toString()}` : ''}`;

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Gagal mengambil data analisis (HTTP ${response.status})`);
        }

        const payload = (await response.json()) as ApiEnvelope;
        const items = payload.data || [];

        setApiMeta(payload.meta || null);

        if (payload.meta?.availableSessions && payload.meta.availableSessions.length > 0) {
          const unique = Array.from(new Set(payload.meta.availableSessions));
          setAvailableSessions(['Semua', ...unique]);
        }

        if (items.length > 0) {
          setAnalysisData(items.map(normalizeApiItem));
        } else {
          setAnalysisData([]);
        }
      } catch (error) {
        setFetchError(error instanceof Error ? error.message : 'Gagal mengambil data analisis.');
        setAnalysisData(FALLBACK_ANALYSIS_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchAnalysis();
  }, [selectedSession]);

  const categories = useMemo(() => {
    const categorySet = new Set(analysisData.map((item) => item.category));
    return ['Semua', ...Array.from(categorySet)];
  }, [analysisData]);

  const filteredData = useMemo(() => {
    return analysisData.filter((item) => {
      const matchSearch =
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchValidity = validityFilter === 'Semua' || item.validity === validityFilter;
      return matchSearch && matchCategory && matchValidity;
    });
  }, [analysisData, searchTerm, selectedCategory, validityFilter]);

  const chartData = useMemo(() => {
    if (chartFocus === 'Invalid') {
      return filteredData.filter((item) => item.validity === 'Invalid');
    }

    return filteredData;
  }, [filteredData, chartFocus]);

  const summary = useMemo(() => {
    const total = filteredData.length || 1;
    const validCount = filteredData.filter((item) => item.validity === 'Valid').length;
    const invalidCount = filteredData.filter((item) => item.validity === 'Invalid').length;
    const revisionCount = filteredData.filter(
      (item) => item.discrimination < 0.2 || item.pointBiserial < 0.3,
    ).length;

    const avgPointBiserial =
      filteredData.reduce((sum, item) => sum + item.pointBiserial, 0) / Math.max(filteredData.length, 1);
    const avgDiscrimination =
      filteredData.reduce((sum, item) => sum + item.discrimination, 0) / Math.max(filteredData.length, 1);

    return {
      validPercent: Math.round((validCount / total) * 100),
      invalidPercent: Math.round((invalidCount / total) * 100),
      revisionPercent: Math.round((revisionCount / total) * 100),
      avgPointBiserial: avgPointBiserial.toFixed(2),
      avgDiscrimination: avgDiscrimination.toFixed(2),
      validCount,
      invalidCount,
    };
  }, [filteredData]);

  const categoryQualityData = useMemo(() => {
    const grouped = new Map<
      string,
      {
        category: string;
        valid: number;
        invalid: number;
      }
    >();

    filteredData.forEach((item) => {
      const existing = grouped.get(item.category) || {
        category: item.category,
        valid: 0,
        invalid: 0,
      };
      if (item.validity === 'Valid') {
        existing.valid += 1;
      } else {
        existing.invalid += 1;
      }
      grouped.set(item.category, existing);
    });

    return Array.from(grouped.values());
  }, [filteredData]);

  const activeMetricLabel = chartMetric === 'pointBiserial' ? 'Point-Biserial' : 'Pearson';
  const activeMetricKey = chartMetric;
  const activeMetricThreshold = 0.2;

  const exportLocally = (format: 'csv' | 'excel') => {
    if (format === 'csv') {
      const csv = buildCsvContent(filteredData);
      triggerDownload(new Blob([csv], { type: 'text/csv;charset=utf-8' }), 'item-analysis-local.csv');
      return;
    }

    const html = buildHtmlExcelContent(filteredData);
    triggerDownload(
      new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' }),
      'item-analysis-local.xls',
    );
  };

  const handleExport = async (format: 'csv' | 'excel') => {
    setIsExporting(true);
    try {
      const query = new URLSearchParams();
      query.set('format', format);

      if (selectedCategory !== 'Semua') {
        query.set('category', selectedCategory);
      }

      if (selectedSession !== 'Semua') {
        query.set('sessionId', selectedSession);
      }

      const endpoint = `${API_BASE}/results/analysis/export?${query.toString()}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Export API gagal (HTTP ${response.status})`);
      }

      const blob = await response.blob();
      const fileName = parseFileNameFromDisposition(
        response.headers.get('content-disposition'),
        `item-analysis.${format === 'csv' ? 'csv' : 'xlsx'}`,
      );
      triggerDownload(blob, fileName);
    } catch {
      exportLocally(format);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart2 className="text-indigo-600" size={32} />
            Analisis Butir Soal Lanjutan
          </h2>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">
            Korelasi Pearson + Point-Biserial, Validitas Butir, dan Rekomendasi Revisi
          </p>
          <p className="text-[11px] font-bold text-slate-500 mt-2">
            Peserta: {apiMeta?.participantCount ?? '-'} | Butir: {apiMeta?.questionCount ?? filteredData.length} |
            Sesi Aktif: {selectedSession}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500"
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Cari ID / isi soal..."
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500 w-64 shadow-sm transition-all"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedSession}
            onChange={(event) => setSelectedSession(event.target.value)}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {availableSessions.map((session) => (
              <option key={session} value={session}>
                Sesi: {session}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setValidityFilter((previous) => {
                if (previous === 'Semua') {
                  return 'Valid';
                }
                if (previous === 'Valid') {
                  return 'Invalid';
                }
                return 'Semua';
              });
            }}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            <Filter size={16} />
            VALIDITAS: {validityFilter}
          </button>
          <button
            onClick={() => setChartFocus((previous) => (previous === 'Semua' ? 'Invalid' : 'Semua'))}
            className="px-4 py-2.5 bg-slate-800 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-700"
          >
            Chart: {chartFocus === 'Semua' ? 'Semua' : 'Invalid'}
          </button>
          <button
            onClick={() => setChartMetric((previous) => (previous === 'pointBiserial' ? 'pearson' : 'pointBiserial'))}
            className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-black text-xs uppercase tracking-widest text-slate-700 hover:border-indigo-300"
          >
            Metric: {activeMetricLabel}
          </button>
          <button
            onClick={() => void handleExport('csv')}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 disabled:opacity-50"
          >
            <Download size={15} /> CSV
          </button>
          <button
            onClick={() => void handleExport('excel')}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 disabled:opacity-50"
          >
            <Download size={15} /> Excel
          </button>
        </div>
      </div>

      {fetchError ? (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-700 text-sm font-bold">
          API analisis tidak tersedia ({fetchError}). Menampilkan data fallback lokal.
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">
                Soal Valid
              </p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">{summary.validPercent}%</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl">
              <XCircle size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">
                Soal Invalid
              </p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">{summary.invalidPercent}%</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">
                Perlu Revisi
              </p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">{summary.revisionPercent}%</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-0.5">
                Rata-rata rPb / D
              </p>
              <h3 className="text-2xl font-black text-slate-900 leading-none">
                {summary.avgPointBiserial} / {summary.avgDiscrimination}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-4">
            Scatter {activeMetricLabel} vs Daya Pembeda ({chartFocus === 'Invalid' ? 'Invalid Saja' : 'Semua'})
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  dataKey={activeMetricKey}
                  name={activeMetricLabel}
                  domain={[-0.2, 1]}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis
                  type="number"
                  dataKey="discrimination"
                  name="Daya Pembeda"
                  domain={[-0.2, 1]}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value: string | number) => Number(value).toFixed(2)}
                  labelFormatter={(_, payload: Array<{ payload?: { id?: string } }>) => {
                    if (!payload || payload.length === 0) {
                      return '';
                    }
                    return payload[0].payload?.id || '';
                  }}
                />
                <ReferenceLine x={activeMetricThreshold} stroke="#f59e0b" strokeDasharray="6 4" />
                <ReferenceLine y={0.2} stroke="#ef4444" strokeDasharray="6 4" />
                <Scatter data={chartData} fill="#4f46e5">
                  {chartData.map((item) => (
                    <Cell key={item.id} fill={item.validity === 'Valid' ? '#10b981' : '#ef4444'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-4">
            Validitas per Kategori
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryQualityData} layout="vertical" margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis
                  type="category"
                  dataKey="category"
                  width={95}
                  tick={{ fontSize: 12, fill: '#334155', fontWeight: 700 }}
                />
                <Tooltip />
                <Bar dataKey="valid" stackId="a" fill="#10b981" radius={[6, 0, 0, 6]} />
                <Bar dataKey="invalid" stackId="a" fill="#ef4444" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
            Detail Korelasi & Validitas Butir
          </h3>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {isLoading
              ? 'Memuat data...'
              : `${filteredData.length} butir | Valid ${summary.validCount} | Invalid ${summary.invalidCount}`}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Kategori</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Butir Soal</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">P</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Daya Pembeda</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">rPb</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pearson</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Validitas</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sample</th>
                <th className="text-left p-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Rekomendasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className={`group hover:bg-slate-50/50 transition-colors ${
                    item.validity === 'Invalid' ? 'bg-red-50/40' : ''
                  }`}
                >
                  <td className="p-6">
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="text-xs font-black text-slate-500 mb-1">{item.id}</p>
                    <p className="text-sm font-bold text-slate-800">{item.content}</p>
                    <p className="text-[10px] mt-1 font-black uppercase tracking-widest text-slate-400">
                      Sumber: {item.responseSource}
                    </p>
                  </td>
                  <td className="p-6 text-xs font-black text-slate-600">{item.difficulty.toFixed(2)}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-700">{item.discrimination.toFixed(2)}</span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                          item.discrimination >= 0.3 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {item.discrimination >= 0.3 ? 'Baik' : 'Lemah'}
                      </span>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-black text-slate-700">{item.pointBiserial.toFixed(2)}</td>
                  <td className="p-6 text-xs font-black text-slate-700">{item.pearson.toFixed(2)}</td>
                  <td className="p-6">
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest ${
                        item.validity === 'Valid' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {item.validity}
                    </span>
                    <p className="text-[10px] text-slate-500 font-bold mt-2">{item.validityReason}</p>
                  </td>
                  <td className="p-6 text-xs font-black text-slate-700">{item.sampleSize}</td>
                  <td className="p-6 text-xs font-bold text-slate-600">
                    {item.recommendation}
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                      KR-20: {item.reliabilityIndex.toFixed(2)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemAnalysis;
