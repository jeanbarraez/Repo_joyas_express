import express from "express";
import {
  
  filterControllerjoyas,
 getControllerjoyasWithHateoas,
 getOrderAndLimitjoya,
 // getJoyasById,
 
} from "../src/controllers/joyasControllers.js";
const router = express.Router();
router.get("/joyas", getOrderAndLimitjoya,);
router.get("/joyas_filter",filterControllerjoyas);
router.get("/joyas_with_hateoas", getControllerjoyasWithHateoas);

export default 
router;