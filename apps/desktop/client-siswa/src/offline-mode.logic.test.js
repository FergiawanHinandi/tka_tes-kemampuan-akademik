const test = require('node:test');
const assert = require('node:assert/strict');
const {
  computeIsOnline,
  computeRemainingTimeAfterRestore,
  resolveSyncBadge,
} = require('./offline-mode.logic');

test('timer restore mengurangi waktu berdasarkan selisih snapshot', () => {
  const remaining = computeRemainingTimeAfterRestore({
    persistedRemainingTime: 3600,
    timerSnapshotAt: 1000,
    currentTime: 31000,
    defaultDurationSeconds: 7200,
  });

  assert.equal(remaining, 3570);
});

test('timer restore fallback ke default saat data tidak valid', () => {
  const remaining = computeRemainingTimeAfterRestore({
    persistedRemainingTime: 'invalid',
    timerSnapshotAt: 1000,
    currentTime: 31000,
    defaultDurationSeconds: 7200,
  });

  assert.equal(remaining, 7200);
});

test('status sinkron menampilkan Belum sinkron saat antrean masih ada', () => {
  const state = resolveSyncBadge({
    syncInProgress: false,
    pendingQueue: 3,
  });

  assert.deepEqual(state, {
    label: 'Belum sinkron',
    tone: 'warning',
  });
});

test('status sinkron menampilkan Sudah sinkron saat antrean kosong', () => {
  const state = resolveSyncBadge({
    syncInProgress: false,
    pendingQueue: 0,
  });

  assert.deepEqual(state, {
    label: 'Sudah sinkron',
    tone: 'success',
  });
});

test('status koneksi online hanya jika browser dan socket sama-sama terhubung', () => {
  assert.equal(
    computeIsOnline({
      navigatorOnline: true,
      socketConnected: true,
    }),
    true,
  );

  assert.equal(
    computeIsOnline({
      navigatorOnline: true,
      socketConnected: false,
    }),
    false,
  );
});
