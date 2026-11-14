import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EMPTY_STATE,
  ensureWritableFetch,
  isPlainObject,
  mergeValidatedState,
  normalizeImportedState,
  validateImportedMedia,
} from './nexoraState';

test('isPlainObject identifies plain objects vs arrays and primitives', () => {
  assert.equal(isPlainObject({ a: 1 }), true);
  assert.equal(isPlainObject([]), false);
  assert.equal(isPlainObject(null), false);
  assert.equal(isPlainObject('string'), false);
});

test('mergeValidatedState merges partial candidate state onto EMPTY_STATE defaults', () => {
  const merged = mergeValidatedState(EMPTY_STATE, {
    focusGoalHrs: 8,
    profile: { name: 'Shrishaila M', theme: 'industrial' },
  });
  assert.equal(merged.focusGoalHrs, 8);
  assert.equal(merged.profile.theme, 'industrial');
  assert.equal(merged.profile.soundEnabled, true);
  assert.deepEqual(merged.tasks, []);
});

test('normalizeImportedState marks completed tasks as rewardClaimed when missing', () => {
  const imported = normalizeImportedState({
    tasks: [
      { id: 't1', title: 'Complete OS Kernel Lab', completed: true },
      { id: 't2', title: 'Review Signals', completed: false },
    ],
  });
  assert.equal(imported.tasks[0].rewardClaimed, true);
  assert.equal(imported.tasks[1].rewardClaimed, undefined);
});

test('normalizeImportedState rejects invalid non-object backups or mismatched types', () => {
  assert.throws(() => normalizeImportedState(null), /Backup data must be an object/);
  assert.throws(
    () => normalizeImportedState({ focusGoalHrs: 'invalid' }),
    /state\.focusGoalHrs has an invalid value/
  );
});

test('validateImportedMedia accepts valid data URLs and rejects empty or non-string entries', () => {
  const valid = validateImportedMedia({ item1: 'data:image/png;base64,AAAA' });
  assert.equal(valid.item1, 'data:image/png;base64,AAAA');
  assert.throws(() => validateImportedMedia({ item1: '' }), /Backup contains invalid media/);
  assert.throws(() => validateImportedMedia([]), /Backup media must be an object/);
});

test('ensureWritableFetch allows assigning to a previously getter-only fetch property', () => {
  const mockWin: any = {};
  const originalFetch = async () => 'ok';
  Object.defineProperty(mockWin, 'fetch', {
    configurable: true,
    get() {
      return originalFetch;
    },
  });
  assert.throws(() => {
    'use strict';
    mockWin.fetch = async () => 'intercepted';
  }, /Cannot set property fetch/);

  assert.equal(ensureWritableFetch(mockWin), true);
  const replacementFetch = async () => 'intercepted';
  mockWin.fetch = replacementFetch;
  assert.equal(mockWin.fetch, replacementFetch);
});

