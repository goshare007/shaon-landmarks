import { describe, expect, it } from 'bun:test';
import { allProjects } from '@/content/projects';

describe('allProjects', () => {
  it('has at least one project', () => {
    expect(allProjects).not.toBeEmpty();
  });

  it('every project has required fields', () => {
    for (const p of allProjects) {
      expect(p.id).toBeString();
      expect(p.slug).toBeString();
      expect(p.title).toBeString();
      expect(p.description).toBeString();
      expect(p.status).toBeString();
      expect(p.location).toBeString();
    }
  });

  it('every slug is unique', () => {
    const slugs = allProjects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('every id is unique', () => {
    const ids = allProjects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every project has a date', () => {
    for (const p of allProjects) {
      expect(p.date).toBeTruthy();
    }
  });

  it('projects with detail have specs', () => {
    const detailed = allProjects.filter((p) => p.detail);
    for (const p of detailed) {
      expect(p.detail?.specs.totalArea).toBeString();
      expect(p.detail?.specs.units).toBeString();
      expect(p.detail?.specs.floorCount).toBeString();
      expect(p.detail?.specs.completion).toBeString();
    }
  });
});
