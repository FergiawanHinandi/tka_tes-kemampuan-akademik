import React, { useEffect, useMemo, useState } from 'react';
import {
  Bot,
  BellRing,
  CalendarClock,
  CheckCircle2,
  Mail,
  MessageSquare,
  RefreshCw,
  Save,
  Send,
  XCircle,
} from 'lucide-react';

interface NotificationSettings {
  schoolId: string;
  emailEnabled: boolean;
  emailProvider: 'SMTP' | 'SENDGRID' | 'WEBHOOK';
  whatsappEnabled: boolean;
  whatsappProvider: 'TWILIO' | 'WHATSAPP_CLOUD_API' | 'WEBHOOK';
  reminderMinutesBefore: number;
  emails: string[];
  whatsappNumbers: string[];
  updatedAt: string;
}

interface NotificationDelivery {
  id: string;
  schoolId: string;
  channel: 'EMAIL' | 'WHATSAPP';
  provider: string;
  triggerType: 'AUTO' | 'MANUAL';
  recipient: string;
  scheduleAt: string;
  status: 'DELIVERED' | 'FAILED';
  providerMessage: string;
  createdAt: string;
}

interface SendScheduleResult {
  total: number;
  delivered: number;
  failed: number;
  deliveries: NotificationDelivery[];
}

interface AutoDispatchResult {
  scanned: number;
  triggered: number;
  skippedDuplicate: number;
  results: Array<{
    sessionId: string;
    schoolId: string;
    scheduleAt: string;
    result: SendScheduleResult;
  }>;
}

interface NotificationMetrics {
  total: number;
  delivered: number;
  failed: number;
  byChannel: Record<'EMAIL' | 'WHATSAPP', { total: number; delivered: number; failed: number }>;
  byProvider: Record<string, { total: number; delivered: number; failed: number }>;
  recentFailures: NotificationDelivery[];
}

const API_BASE =
  (window as Window & { __TKA_API_BASE__?: string }).__TKA_API_BASE__ || 'http://localhost:3000/api';

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'content-type': 'application/json',
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request gagal (${response.status})`);
  }

  const payload = (await response.json()) as { data?: T };
  return (payload.data !== undefined ? payload.data : payload) as T;
}

function toLocalDateTimeInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hour}:${minute}`;
}

const Notifications: React.FC = () => {
  const [schoolId, setSchoolId] = useState('SCHOOL-001');
  const [settings, setSettings] = useState<NotificationSettings | null>(null);
  const [emailInput, setEmailInput] = useState('');
  const [whatsappInput, setWhatsappInput] = useState('');
  const [history, setHistory] = useState<NotificationDelivery[]>([]);
  const [metrics, setMetrics] = useState<NotificationMetrics | null>(null);

  const [examTitle, setExamTitle] = useState('TKA Nasional 2026');
  const [sessionName, setSessionName] = useState('Sesi 1 - Pagi');
  const [room, setRoom] = useState('Lab Komputer 1');
  const [notes, setNotes] = useState('Harap hadir 30 menit sebelum ujian dimulai.');
  const [scheduleAt, setScheduleAt] = useState(
    toLocalDateTimeInput(new Date(Date.now() + 60 * 60 * 1000)),
  );

  const [loadingSettings, setLoadingSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [sendingNotification, setSendingNotification] = useState(false);
  const [dispatchingAuto, setDispatchingAuto] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [sendResult, setSendResult] = useState<SendScheduleResult | null>(null);
  const [autoResult, setAutoResult] = useState<AutoDispatchResult | null>(null);

  const parsedEmails = useMemo(
    () =>
      emailInput
        .split(',')
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0),
    [emailInput],
  );
  const parsedWhatsappNumbers = useMemo(
    () =>
      whatsappInput
        .split(',')
        .map((entry) => entry.trim())
        .filter((entry) => entry.length > 0),
    [whatsappInput],
  );

  const loadData = async () => {
    setLoadingSettings(true);
    setStatusMessage(null);

    try {
      const [settingsResponse, historyResponse, metricsResponse] = await Promise.all([
        apiRequest<NotificationSettings>(`/notifications/school-admin/${schoolId}/settings`),
        apiRequest<NotificationDelivery[]>(
          `/notifications/history?schoolId=${encodeURIComponent(schoolId)}&limit=20`,
        ),
        apiRequest<NotificationMetrics>(
          `/notifications/metrics?schoolId=${encodeURIComponent(schoolId)}&failureLimit=5`,
        ),
      ]);

      setSettings(settingsResponse);
      setEmailInput(settingsResponse.emails.join(', '));
      setWhatsappInput(settingsResponse.whatsappNumbers.join(', '));
      setHistory(historyResponse);
      setMetrics(metricsResponse);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Gagal memuat data notifikasi.');
    } finally {
      setLoadingSettings(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, [schoolId]);

  const handleSaveSettings = async () => {
    if (!settings) {
      return;
    }

    setSavingSettings(true);
    setStatusMessage(null);

    try {
      const updated = await apiRequest<NotificationSettings>(
        `/notifications/school-admin/${schoolId}/settings`,
        {
          method: 'PUT',
          body: JSON.stringify({
            emailEnabled: settings.emailEnabled,
            emailProvider: settings.emailProvider,
            whatsappEnabled: settings.whatsappEnabled,
            whatsappProvider: settings.whatsappProvider,
            reminderMinutesBefore: settings.reminderMinutesBefore,
            emails: parsedEmails,
            whatsappNumbers: parsedWhatsappNumbers,
          }),
        },
      );

      setSettings(updated);
      setStatusMessage('Pengaturan notifikasi berhasil disimpan.');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Gagal menyimpan pengaturan.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSendSchedule = async () => {
    if (!settings) {
      return;
    }

    setSendingNotification(true);
    setStatusMessage(null);
    setSendResult(null);
    setAutoResult(null);

    try {
      const scheduleDate = new Date(scheduleAt);
      if (Number.isNaN(scheduleDate.getTime())) {
        throw new Error('Waktu jadwal ujian tidak valid.');
      }

      const payload = await apiRequest<SendScheduleResult>('/notifications/schedule-alert/send', {
        method: 'POST',
        body: JSON.stringify({
          schoolId,
          examTitle,
          sessionName,
          scheduleAt: scheduleDate.toISOString(),
          room,
          notes,
          triggerType: 'MANUAL',
        }),
      });

      setSendResult(payload);
      setStatusMessage('Notifikasi jadwal ujian diproses.');
      await loadData();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Pengiriman notifikasi gagal.');
    } finally {
      setSendingNotification(false);
    }
  };

  const handleDispatchAuto = async () => {
    setDispatchingAuto(true);
    setStatusMessage(null);
    setAutoResult(null);

    try {
      const payload = await apiRequest<AutoDispatchResult>('/notifications/schedule-alert/dispatch-auto', {
        method: 'POST',
        body: JSON.stringify({
          schoolId,
          lookbackMinutes: 10,
        }),
      });

      setAutoResult(payload);
      setStatusMessage(
        `Dispatch otomatis selesai. Triggered: ${payload.triggered}, Duplicate: ${payload.skippedDuplicate}.`,
      );
      await loadData();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Dispatch otomatis gagal.');
    } finally {
      setDispatchingAuto(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BellRing className="text-orange-600" size={32} />
            Notifikasi Push Jadwal Ujian
          </h2>
          <p className="text-slate-400 font-bold mt-1 uppercase tracking-widest text-[10px]">
            Integrasi Email & WhatsApp untuk pemberitahuan ke Admin Sekolah
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
            School ID
          </label>
          <input
            type="text"
            value={schoolId}
            onChange={(event) => setSchoolId(event.target.value.trim() || 'SCHOOL-001')}
            className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {statusMessage ? (
        <div className="p-4 rounded-2xl bg-slate-900 text-white text-sm font-bold">{statusMessage}</div>
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Konfigurasi Channel</h3>
              {loadingSettings ? (
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Memuat...
                </span>
              ) : null}
            </div>

            {settings ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailEnabled}
                      onChange={(event) =>
                        setSettings({ ...settings, emailEnabled: event.target.checked })
                      }
                      className="mt-1"
                    />
                    <div>
                      <p className="text-xs font-black text-slate-700 uppercase tracking-widest">Email</p>
                      <p className="text-[11px] text-slate-500 font-bold mt-1">
                        Kirim pengingat ke email admin sekolah.
                      </p>
                    </div>
                  </label>

                  <label className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.whatsappEnabled}
                      onChange={(event) =>
                        setSettings({ ...settings, whatsappEnabled: event.target.checked })
                      }
                      className="mt-1"
                    />
                    <div>
                      <p className="text-xs font-black text-slate-700 uppercase tracking-widest">WhatsApp</p>
                      <p className="text-[11px] text-slate-500 font-bold mt-1">
                        Kirim reminder ke nomor WA admin sekolah.
                      </p>
                    </div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Provider Email
                    </label>
                    <select
                      value={settings.emailProvider}
                      onChange={(event) =>
                        setSettings({
                          ...settings,
                          emailProvider: event.target.value as NotificationSettings['emailProvider'],
                        })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="SMTP">SMTP</option>
                      <option value="SENDGRID">SendGrid</option>
                      <option value="WEBHOOK">Webhook</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Provider WhatsApp
                    </label>
                    <select
                      value={settings.whatsappProvider}
                      onChange={(event) =>
                        setSettings({
                          ...settings,
                          whatsappProvider: event.target.value as NotificationSettings['whatsappProvider'],
                        })
                      }
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="TWILIO">Twilio</option>
                      <option value="WHATSAPP_CLOUD_API">WhatsApp Cloud API</option>
                      <option value="WEBHOOK">Webhook</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Daftar Email
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={emailInput}
                        onChange={(event) => setEmailInput(event.target.value)}
                        placeholder="admin@smpn1.sch.id, operator@smpn1.sch.id"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Nomor WhatsApp
                    </label>
                    <div className="relative">
                      <MessageSquare
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="text"
                        value={whatsappInput}
                        onChange={(event) => setWhatsappInput(event.target.value)}
                        placeholder="+628123456789, 081234567890"
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Reminder (menit sebelum ujian)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={1440}
                    value={settings.reminderMinutesBefore}
                    onChange={(event) =>
                      setSettings({
                        ...settings,
                        reminderMinutesBefore: Number(event.target.value),
                      })
                    }
                    className="w-40 px-4 py-3 rounded-2xl border border-slate-200 text-sm font-black text-slate-700 outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <button
                  onClick={handleSaveSettings}
                  disabled={savingSettings}
                  className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-orange-200 hover:bg-orange-700 transition-all disabled:opacity-60"
                >
                  <Save size={16} />
                  {savingSettings ? 'MENYIMPAN...' : 'SIMPAN PENGATURAN'}
                </button>
              </div>
            ) : null}
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Kirim Notifikasi Jadwal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Judul Ujian
                </label>
                <input
                  value={examTitle}
                  onChange={(event) => setExamTitle(event.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Nama Sesi
                </label>
                <input
                  value={sessionName}
                  onChange={(event) => setSessionName(event.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Jadwal
                </label>
                <div className="relative">
                  <CalendarClock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="datetime-local"
                    value={scheduleAt}
                    onChange={(event) => setScheduleAt(event.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Ruang
                </label>
                <input
                  value={room}
                  onChange={(event) => setRoom(event.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Catatan</label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="w-full h-24 px-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={handleSendSchedule}
                disabled={sendingNotification}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs shadow-lg hover:bg-slate-800 transition-all disabled:opacity-60"
              >
                <Send size={16} />
                {sendingNotification ? 'MENGIRIM...' : 'KIRIM NOTIFIKASI JADWAL'}
              </button>
              <button
                onClick={handleDispatchAuto}
                disabled={dispatchingAuto}
                className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-2xl font-black text-xs shadow-lg hover:bg-orange-700 transition-all disabled:opacity-60"
              >
                <Bot size={16} />
                {dispatchingAuto ? 'DISPATCHING...' : 'TRIGGER OTOMATIS SEKARANG'}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4">Ringkasan Pengiriman</h3>
            <div className="space-y-4">
              {metrics ? (
                <>
                  <div className="flex items-center justify-between text-sm font-bold text-slate-700">
                    <span>Total Log</span>
                    <span>{metrics.total}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-emerald-600">
                    <span>Delivered</span>
                    <span>{metrics.delivered}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-red-600">
                    <span>Failed</span>
                    <span>{metrics.failed}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {Object.entries(metrics.byProvider).map(([provider, value]) => (
                      <div key={provider} className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                        <span>{provider}</span>
                        <span>
                          {value.delivered}/{value.total}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm font-bold text-slate-400">Belum ada data monitoring.</p>
              )}
              {sendResult ? (
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Hasil Pengiriman Manual Terakhir
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    Total {sendResult.total} | Delivered {sendResult.delivered} | Failed {sendResult.failed}
                  </p>
                </div>
              ) : null}
              {autoResult ? (
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                    Hasil Trigger Otomatis Terakhir
                  </p>
                  <p className="text-xs font-bold text-slate-700">
                    Scanned {autoResult.scanned} | Triggered {autoResult.triggered} | Duplicate{' '}
                    {autoResult.skippedDuplicate}
                  </p>
                </div>
              ) : null}
              <button
                onClick={() => void loadData()}
                className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-200"
              >
                <RefreshCw size={14} />
                Refresh Monitoring
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-4">Riwayat Terakhir</h3>
            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
              {history.length === 0 ? (
                <p className="text-sm font-bold text-slate-400">Belum ada riwayat notifikasi.</p>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-100 bg-slate-50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black text-slate-700 uppercase tracking-widest">
                        {item.channel} • {item.provider}
                      </p>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${
                          item.status === 'DELIVERED'
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {item.status === 'DELIVERED' ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <XCircle size={12} />
                        )}
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-700">{item.recipient}</p>
                    <p className="text-[11px] font-bold text-slate-500">{item.providerMessage}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Trigger: {item.triggerType}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {new Date(item.createdAt).toLocaleString('id-ID')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
