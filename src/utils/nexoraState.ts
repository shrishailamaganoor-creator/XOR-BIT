export const STORAGE_KEY = 'NEXORA_ARCHITECTURAL_OS_V1';
export const IDB_NAME = 'NexoraStyleVaultDB';
export const IDB_STORE = 'garmentMedia';
export const AUTH_KEY = 'XOR_BIT_AUTH_V1';

export const DEFAULT_DAY_TYPES = [
  { id: 'productive', label: 'Logged / Productive Day', color: '#10B981' },
  { id: 'hackathon', label: 'Hackathon / Deep Build Day', color: '#F59E0B' },
  { id: 'chill', label: 'Movie / Chill Day', color: '#EAB308' },
  { id: 'travel', label: 'Outing / Travel Day', color: '#06B6D4' },
  { id: 'deadline', label: 'Holiday / Exam / Deadline', color: '#F43F5E' },
  { id: 'rest', label: 'Rest / Recharge Day', color: '#A855F7' }
];

export const EMPTY_STATE = {
  habitDesigns: [] as any[],
  identityVotes: [] as any[],
  revisionTopics: [] as any[],
  problemPages: [] as any[],
  bioLog: { days: {} as Record<string, any>, templates: {} as Record<string, any> },
  audioPrefs: { track: 'pink', volume: 0.4, timerMin: 15, nsdrDuration: 10 },
  morningRoutine: [] as any[],
  morningLog: {} as Record<string, any>,
  decisions: [] as any[],
  growthMetrics: [] as any[],
  roadmaps: [] as any[],
  feynmanNotes: [] as any[],
  recallQs: [] as any[],
  lifeWheel: [] as any[],
  lifeSettings: {} as Record<string, any>,
  profile: {
    name: 'Shrishaila M',
    title: 'B.Tech Engineering',
    semester: 'Semester 1',
    theme: 'obsidian', // 'obsidian' | 'paper' | 'industrial'
    soundEnabled: true,
    gamificationEnabled: true,
    xp: 0
  },
  subjects: [] as any[],
  transactions: [] as any[],
  savingsPots: [] as any[],
  tasks: [] as any[],
  skills: [] as any[],
  projects: [] as any[],
  ideas: [] as any[],
  wardrobe: [] as any[],
  outfits: [] as any[],
  experiences: [] as any[],
  diary: [] as any[],
  calendarEvents: [] as any[],
  dayTags: {} as Record<string, any>,
  customDayTypes: [] as any[],
  habits: [] as any[],
  habitShields: {} as Record<string, any>,
  extracurriculars: [] as any[],
  focusSessions: [] as any[],
  distractionLog: [] as any[],
  shutdownDays: {} as Record<string, any>,
  focusGoalHrs: 10,
  arcadeScores: {
    roverNodes: 0,
    snakeHigh: 0,
    pongWins: 0,
    reactionBestMs: 0,
    memoryHigh: 0
  }
};

export function isPlainObject(value: unknown): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function mergeValidatedState(defaults: any, candidate: any, path = 'state'): any {
  if (Array.isArray(defaults)) {
    if (candidate === undefined) return [];
    if (!Array.isArray(candidate)) throw new Error(`${path} must be an array`);
    return candidate;
  }

  if (isPlainObject(defaults)) {
    if (candidate === undefined) return { ...defaults };
    if (!isPlainObject(candidate)) throw new Error(`${path} must be an object`);
    const merged: Record<string, any> = { ...defaults };
    Object.entries(candidate).forEach(([key, value]) => {
      merged[key] = Object.prototype.hasOwnProperty.call(defaults, key)
        ? mergeValidatedState(defaults[key], value, `${path}.${key}`)
        : value;
    });
    return merged;
  }

  if (candidate === undefined) return defaults;
  if (typeof candidate !== typeof defaults) throw new Error(`${path} has an invalid value`);
  return candidate;
}

export function normalizeImportedState(candidate: unknown) {
  if (!isPlainObject(candidate)) throw new Error('Backup data must be an object');
  const normalized = mergeValidatedState(EMPTY_STATE, candidate);
  normalized.tasks = normalized.tasks.map((task: any) =>
    task && task.completed && task.rewardClaimed === undefined ? { ...task, rewardClaimed: true } : task
  );
  return normalized;
}

export function validateImportedMedia(candidate: unknown): Record<string, string> {
  if (!isPlainObject(candidate)) throw new Error('Backup media must be an object');
  const media: Record<string, string> = {};
  Object.entries(candidate).forEach(([key, value]) => {
    if (typeof value !== 'string' || value.length === 0) {
      throw new Error('Backup contains invalid media');
    }
    media[key] = value;
  });
  return media;
}

export function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw);
    const mergedProfile = { ...EMPTY_STATE.profile, ...(parsed.profile || {}) };
    if (mergedProfile.name === 'Operator') mergedProfile.name = 'Shrishaila M';
    return {
      ...EMPTY_STATE,
      ...parsed,
      tasks: (Array.isArray(parsed.tasks) ? parsed.tasks : []).map((task: any) =>
        task && task.completed && task.rewardClaimed === undefined ? { ...task, rewardClaimed: true } : task
      ),
      profile: mergedProfile,
      arcadeScores: { ...EMPTY_STATE.arcadeScores, ...(parsed.arcadeScores || {}) },
      dayTags: parsed.dayTags || {},
      customDayTypes: parsed.customDayTypes || [],
      habitShields: parsed.habitShields || {},
      ideas: parsed.ideas || [],
      distractionLog: parsed.distractionLog || [],
      shutdownDays: parsed.shutdownDays || {},
      focusGoalHrs: parsed.focusGoalHrs !== undefined ? parsed.focusGoalHrs : 10,
      feynmanNotes: parsed.feynmanNotes || [],
      recallQs: parsed.recallQs || [],
      lifeWheel: parsed.lifeWheel || [],
      lifeSettings: parsed.lifeSettings || {}
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function savePersistedState(state: unknown): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function ensureWritableFetch(target: any = typeof window !== 'undefined' ? window : undefined): boolean {
  if (!target) return false;
  try {
    let currentFetch = typeof target.fetch === 'function' ? target.fetch.bind(target) : target.fetch;
    const desc =
      Object.getOwnPropertyDescriptor(target, 'fetch') ||
      (typeof Window !== 'undefined' ? Object.getOwnPropertyDescriptor(Window.prototype, 'fetch') : undefined);
    if (!desc || desc.configurable !== false) {
      Object.defineProperty(target, 'fetch', {
        configurable: true,
        enumerable: true,
        get() {
          return currentFetch;
        },
        set(fn) {
          currentFetch = fn;
        },
      });
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

