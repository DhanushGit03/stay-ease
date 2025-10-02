import express, { Request, Response} from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { HotelType } from '../../shared/types';
import Hotel from '../models/Hotel'
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5*1024*1024,
    },
})

router.post('/', verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
], upload.array("imageFiles", 6), async(req : Request, res : Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;
  
        const imageUrls = await uploadImages(imageFiles);
  
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userID = req.userID;
  
        const hotel = new Hotel(newHotel);
        await hotel.save();
  
        res.status(201).send(hotel);
      } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });
      }
    
})

router.get('/', verifyToken, async (req : Request, res : Response) => {
    
    try {
        const hotels = await Hotel.find({userID : req.userID});
        return res.json(hotels);
    } catch (error) {
        return res.status(500).send({message : "Error fetching hotels"});
    }
})

router.get("/:id", verifyToken, async (req : Request, res : Response) => {
    const id = req.params.id.toString();
    try {
        const hotelData = await Hotel.findOne({
            _id : id,
            userID : req.userID
        });

        return res.json(hotelData);
    } catch (error) {
        console.log(error);
        return res.status(500).send({message : "Error fetching hotel"});
    }
    
})

router.put("/:hotelID", verifyToken, upload.array("imageFiles"), async(req : Request, res : Response) => {
    try {
        const id = req.params.hotelID;
        const newData : HotelType = req.body;
        newData.lastUpdated = new Date();
        const updated = await Hotel.findOneAndUpdate({
            _id : id,
            userID : req.userID
        }, newData, { new : true});

        if(!updated){
            return res.status(404).json({message : "Hotel not found"});
        }

        const images = req.files as Express.Multer.File[];
        const updatedImageFiles = await uploadImages(images);

        updated.imageUrls = [...updatedImageFiles, ...(newData.imageUrls || [])];
        await updated.save();

        return res.status(201).json(updated)


    } catch(error){
        return res.status(500).send({message : "Error updating hotel"});
    }
})


async function uploadImages(imageFiles: Express.Multer.File[]) {
    // console.log("File images in upload function backend", fileImages)
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });
    
      const imageUrls = await Promise.all(uploadPromises);
      return imageUrls;
}

export default router;
