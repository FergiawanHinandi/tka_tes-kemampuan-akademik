function computeRemainingTimeAfterRestore({
  persistedRemainingTime,
  timerSnapshotAt,
  currentTime,
  defaultDurationSeconds,
}) {
  const safeDefault = Math.max(0, Number(defaultDurationSeconds) || 0);
  const safePersisted = Number(persistedRemainingTime);
  if (Number.isNaN(safePersisted) || safePersisted < 0) {
    return safeDefault;
  }

  const safeSnapshot = Number(timerSnapshotAt);
  const safeCurrent = Number(currentTime);
  if (Number.isNaN(safeSnapshot) || Number.isNaN(safeCurrent)) {
    return Math.max(0, safePersisted);
  }

  const elapsedSeconds = Math.max(0, Math.floor((safeCurrent - safeSnapshot) / 1000));
  return Math.max(0, safePersisted - elapsedSeconds);
}

function resolveSyncBadge({ syncInProgress, pendingQueue }) {
  if (syncInProgress) {
    return { label: 'Sinkronisasi', tone: 'processing' };
  }

  if ((Number(pendingQueue) || 0) > 0) {
    return { label: 'Belum sinkron', tone: 'warning' };
  }

  return { label: 'Sudah sinkron', tone: 'success' };
}

function computeIsOnline({ navigatorOnline, socketConnected }) {
  return Boolean(navigatorOnline && socketConnected);
}

module.exports = {
  computeIsOnline,
  computeRemainingTimeAfterRestore,
  resolveSyncBadge,
};
