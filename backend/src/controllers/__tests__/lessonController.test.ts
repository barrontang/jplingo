import { describe, it, expect, beforeAll, jest } from '@jest/globals';
import { Response, NextFunction } from 'express';
import { LessonController } from '../lessonController';
import { AuthRequest } from '../../middleware/auth';
import { lessonService } from '../../services/lessonService';

function mockResponse(): Response {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res) as unknown as Response['status'];
  res.json = jest.fn().mockReturnValue(res) as unknown as Response['json'];
  return res as Response;
}

describe('LessonController#getAllLessons level filtering', () => {
  const controller = new LessonController();
  const next = jest.fn() as unknown as NextFunction;

  beforeAll(async () => {
    await lessonService.loadLessons();
  });

  it('returns every lesson when no level query param is given', async () => {
    const req = { query: {} } as unknown as AuthRequest;
    const res = mockResponse();

    await controller.getAllLessons(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, count: 40 })
    );
  });

  it('filters lessons by a valid level (case-insensitive)', async () => {
    const req = { query: { level: 'n3' } } as unknown as AuthRequest;
    const res = mockResponse();

    await controller.getAllLessons(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, count: 5 })
    );
  });

  it('rejects an invalid level with a 400 response', async () => {
    const req = { query: { level: 'N9' } } as unknown as AuthRequest;
    const res = mockResponse();

    await controller.getAllLessons(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
});
