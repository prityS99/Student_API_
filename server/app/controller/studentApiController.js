const Student = require("../models/student");
const fs = require("fs");
const cloudinary =require("../config/cloudinary")

const csv = require('csv-parser');

class StudentApiController {

    async createStudent(req, res) {
  try {
    const { name, standard, address } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "student",  
      });

      imageUrl = result.secure_url;
    }

    const data = new Student({
      name,
      standard,
      address,
      image: imageUrl,
    });

    const student = await data.save();

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async uploadCSV(req, res) {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", async (data) => {
        const student = new Student({
          name: data.name,
          standard: data.standard,
          address: data.address,
        });

        await student.save();
        results.push(student);
      })
      .on("end", () => {
        res.status(200).json({
          success: true,
          message: "CSV uploaded successfully",
          total: results.length,
          data: results,
        });
      });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
  async getStudent(req, res) {
    try {
      const data = await Student.find();
      return res.status(200).json({
        success: true,
        message: "Student list",
        total: data.length,
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getEditStudent(req, res) {
    try {
      const id = req.params.id;
      const data = await Student.findById(id);
      return res.status(200).json({
        success: true,
        message: "Get student",
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "student id is required",
        });
      }

      // const {name,email,city}=req.body
      //const data=await Student.findByIdAndUpdate(id,{name,email,city},{new:true})
      
      if (req.file) {
        const student = await StudentModel.findById(id);
        if (student && student.image && student.image !== "default.png") {
          const imagePath = student.image;
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
        req.body.image = req.file.path;
      }

      const data = await StudentModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json({
        success: true,
        message: "student updated successfully",
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const id = req.params.id;

      const student = await StudentModel.findById(id);
      if (student && student.image && student.image !== "default.png") {
        const imagePath = student.image;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      await StudentModel.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "student deleted successfully",
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  //     async deleteStudent(req, res) {
  //     try {
  //         const id = req.params.id;
  //         const student = await Student.findById(id);

  //         if (!student) {
  //             return res.status(404).json({
  //                 success: false,
  //                 message: "Student not found",
  //             });
  //         }

  //         if (student.image) {
  //             fs.unlink(student.image, (err) => {
  //                 if (err) {
  //                     console.log("Error deleting image:", err.message);
  //                 } else {
  //                     console.log("Image deleted successfully");
  //                 }
  //             });
  //         }

  //         // DELETE FROM DB//
  //         await Student.findByIdAndDelete(id);

  //         return res.status(200).json({
  //             success: true,
  //             message: "Student and image deleted successfully",
  //         });

  //     } catch (err) {
  //         return res.status(500).json({
  //             success: false,
  //             message: err.message,
  //         });
  //     }
  // }
}

module.exports = new StudentApiController();
