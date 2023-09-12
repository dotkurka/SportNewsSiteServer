import { Request, Response } from 'express';

class fileController {
    async getImageFile(req: Request, res: Response) {
        const file = req.uploadedFiles[0];

        return res.json(file);
    }
}

export default new fileController();
