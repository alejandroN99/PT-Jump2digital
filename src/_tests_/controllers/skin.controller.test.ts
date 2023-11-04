import { getAllSkins, buySkin, mySkins, otherColor, deleteSkin,getSkin } from "../../controllers/skin.controller";
import fs from "fs";
import { Request, Response } from "express";
import { IUser } from "../../models/interfaces";
import {Skin} from "../../models/skin.Schema";

declare module "express" {
  interface Request {
    user?: IUser;
  }
}

describe("getAllSkins", () => {
  test("should return an array of skins", () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    jest.spyOn(fs, "readFileSync").mockReturnValue(
      JSON.stringify([
        { id: 1, name: "Skin 1" },
        { id: 2, name: "Skin 2" },
      ])
    );

    getAllSkins(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: 1, name: "Skin 1" }),
        expect.objectContaining({ id: 2, name: "Skin 2" }),
      ])
    );
  });

  test("should return an error if an exception occurs", () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    } as unknown as Response;

    jest.spyOn(fs, "readFileSync").mockImplementation(() => {
      throw new Error("Test Error");
    });

    getAllSkins(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: "Talk to the administrator" });
  });
});




describe('buySkin', () => {  
    test('should return an error if an exception occurs', async () => {
      const req = {
        body: { id: 1 },
        user: { _id: 'user_id' },
      } as Request;
  
      jest.spyOn(Skin.prototype, 'save').mockImplementation(() => {
        throw new Error('Test Error');
      });
  
      const json = jest.fn();
      const status = jest.fn(() => ({ json }));
      const res = { json, status } as unknown as Response;
  
      await buySkin(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: 'Talk to the administrator' });
    });
  });


  jest.mock('express');

describe('mySkins', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return user skins', async () => {
    const userId = 'user_id';
    const req = {
      user: { _id: userId },
    } as Request;
    const json = jest.fn();
    const res = { json } as unknown as Response;

    const mockSkins = [
      { id: 1, name: 'Skin 1', color: 'Red' },
      { id: 2, name: 'Skin 2', color: 'Blue' },
    ];
    Skin.find = jest.fn().mockResolvedValue(mockSkins);

    await mySkins(req, res);

    expect(Skin.find).toHaveBeenCalledWith({ user: userId });
    expect(res.json).toHaveBeenCalledWith(mockSkins);
  });

  test('should return an error if req.user is not provided', async () => {
    const req = {} as Request;
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { json, status } as unknown as Response;

    await mySkins(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error on the req.user' });
  });

  test('should return an error if an exception occurs', async () => {
    const userId = 'user_id';
    const req = {
      user: { _id: userId },
    } as Request;
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { json, status } as unknown as Response;

    Skin.find = jest.fn().mockRejectedValue(new Error('Test Error'));

    await mySkins(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Talk to the administrator' });
  });
});

describe('otherColor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should update skin color and return it', async () => {
    const userId = 'user_id';
    const color = 'Green';
    const name = 'Skin 1';
    const req = {
      user: { _id: userId },
      body: { color, name },
    } as Request;
    const json = jest.fn();
    const res = { json } as unknown as Response;

    const updatedSkin = {
      id: 1,
      name: 'Skin 1',
      color: 'Green',
    };

    Skin.findOneAndUpdate = jest.fn().mockResolvedValue(updatedSkin);

    await otherColor(req, res);

    expect(Skin.findOneAndUpdate).toHaveBeenCalledWith(
      { user: userId, name },
      { color }
    );
    expect(res.json).toHaveBeenCalledWith(updatedSkin);
  });

  test('should return an error if req.user is not provided', async () => {
    const req = {
      body: { color: 'Green', name: 'Skin 1' },
    } as Request;
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { json, status } as unknown as Response;

    await otherColor(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error on the req.user' });
  });

  test('should return an error if an exception occurs', async () => {
    const userId = 'user_id';
    const color = 'Green';
    const name = 'Skin 1';
    const req = {
      user: { _id: userId },
      body: { color, name },
    } as Request;
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { json, status } as unknown as Response;

    Skin.findOneAndUpdate = jest.fn().mockRejectedValue(new Error('Test Error'));

    await otherColor(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Talk to the administrator' });
  });
});

describe('deleteSkin', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should delete a skin and return it', async () => {
    const userId = 'user_id';
    const skinId = 'skin_id';
    const req = {
        user: { _id: userId },
        params: { id: skinId },
    } as unknown as Request;
    const json = jest.fn();
    const res = { json } as unknown as Response;

    const deletedSkin = {
      id: 1,
      name: 'Skin 1',
      color: 'Red',
    };

    Skin.findOneAndDelete = jest.fn().mockResolvedValue(deletedSkin);

    await deleteSkin(req, res);

    expect(Skin.findOneAndDelete).toHaveBeenCalledWith({ user: userId, _id: skinId });
    expect(res.json).toHaveBeenCalledWith(deletedSkin);
  });

  test('should return an error if req.user is not provided', async () => {
    const req = {
        params: { id: 'skin_id' },
    } as unknown as Request;
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { json, status } as unknown as Response;

    await deleteSkin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Error on the req.user' });
  });

  test('should return an error if an exception occurs', async () => {
    const userId = 'user_id';
    const skinId = 'skin_id';
    const req = {
        user: { _id: userId },
        params: { id: skinId },
    } as unknown as Request;
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { json, status } as unknown as Response;

    Skin.findOneAndDelete = jest.fn().mockRejectedValue(new Error('Test Error'));

    await deleteSkin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Talk to the administrator' });
  });
});

describe('getSkin', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return a single skin', async () => {
    const skinId = 'skin_id';
    const req = {
        params: { id: skinId },
    } as unknown as Request;
    const json = jest.fn();
    const res = { json } as unknown as Response;

    const mockSkin = {
      id: 1,
      name: 'Skin 1',
      color: 'Red',
    };

    Skin.find = jest.fn().mockResolvedValue(mockSkin);

    await getSkin(req, res);

    expect(Skin.find).toHaveBeenCalledWith({ _id: skinId });
    expect(res.json).toHaveBeenCalledWith(mockSkin);
  });

  test('should return an error if an exception occurs', async () => {
    const skinId = 'skin_id';
    const req = {
        params: { id: skinId },
    } as unknown as Request;
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { json, status } as unknown as Response;

    Skin.find = jest.fn().mockRejectedValue(new Error('Test Error'));

    await getSkin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Talk to the administrator' });
  });
});