import { Skin } from "../models/skin.Schema";
import { Request, Response } from "express";
import { readSkins, readSkinsIdAndUpdate } from "../helpers/readSkinsJson";

export const getAllSkins = (_req: Request, res: Response) => {
  try {
    const skins = readSkins();
    res.json(skins);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

export const buySkin = async (req: Request, res: Response) => {
  try {
    const { id }: { id: number } = req.body;

    const skinToBuy = readSkinsIdAndUpdate(id);

    if(!skinToBuy){
      return res.status(404).json({
        msg: "Skin not found",
      });
    }

    if (!req.user) {
      return res.status(400).json({
        msg: "Error on the req.user",
      });
    }

    const data = {
      name: skinToBuy.name,
      kind: skinToBuy.kind,
      price: skinToBuy.price,
      color: skinToBuy.color,
      user: req.user._id,
    };

    const skin = new Skin(data);
    await skin.save();

    res.json(skin);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

export const mySkins = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        msg: "Error on the req.user",
      });
    }

    const { _id }: { _id: string } = req.user;

    const skins = await Skin.find({ user: _id });

    res.json(skins);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

export const otherColor = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        msg: "Error on the req.user",
      });
    }
    const { color, name }: { color: string; name: string } = req.body;
    const { _id }: { _id: string } = req.user;

    const skins = await Skin.findOneAndUpdate(
      { user: _id, name },
      { color: color }
    );

    res.json(skins);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};

export const deleteSkin = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        msg: "Error on the req.user",
      });
    }
    const id: string = req.params.id;
    const { _id }: { _id: string } = req.user;

    const skins = await Skin.findOneAndDelete({ user: _id, _id: id });

    if(!skins){
      return res.status(404).json({
        msg: "Skin not found",
      });
    }

    res.json(skins);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Talk to the administrator",
    });
  }
};


export const getSkin = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const skin = await Skin.find({ _id: id });
  
      res.json(skin);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Talk to the administrator",
      });
    }
  };