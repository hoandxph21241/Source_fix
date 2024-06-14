var Model = require("../Models/DB_Shoes");

async function createDefaultData() {
  const adminExists = await Model.UserModel.findOne({ role: 2 });
  if (!adminExists) {
    const defaultAdmin = new Model.UserModel({
      nameAccount: "admin@example.com",
      namePassword: "admin",
      userName: "Admin",
      fullName: "Admin",
      imageAccount: "Admin",
      gmail: "admin@example.com",
      grender: "Male",
      phoneNumber: "1234567890",
      role: 2,
      locked: false,
    });
    await defaultAdmin.save();
    console.log("Admin_Data_Create");
  } else {
    console.log("Admin_No_Create");
  }

  const userExists = await Model.UserModel.findOne({ role: 1 });
  if (!userExists) {
    const defaultUser = new Model.UserModel({
      nameAccount: "user@example.com",
      namePassword: "user",
      userName: "User",
      fullName: "User",
      imageAccount: "User",
      gmail: "user@example.com",
      grender: "Male",
      phoneNumber: "1234567890",
      role: 1,
      locked: false,
    });
    await defaultUser.save();
    console.log("User_Data_Create");
  } else {
    console.log("User_No_Create");
  }
  // try {
  //   // Check if default shoe exists
  //   let defaultShoe = await Model.ShoeModel.findOne({ name: "Air Jordan 1 Low" });
  //   const finalNikeBrand = await Model.TypeShoeModel.findOne({ nameType: "Air Jordan 1" });
  //   const defaultColor = await Model.ColorShoeModel.findOne({ textColor: "black" });

  //   // Insert colors if they don't exist
  //   const colors = [
  //     { textColor: "White", codeColor: "#FFFFFF" },
  //     { textColor: "Black", codeColor: "#000000" },
  //     { textColor: "Red", codeColor: "#FF0000" },
  //     { textColor: "Blue", codeColor: "#0000FF" },
  //   ];

  //   for (const color of colors) {
  //     const colorExists = await Model.ColorShoeModel.findOne({ textColor: color.textColor });
  //     if (!colorExists) {
  //       const newColor = new Model.ColorShoeModel({
  //         textColor: color.textColor,
  //         codeColor: color.codeColor,
  //         isEnable: true,
  //       });
  //       await newColor.save();
  //       console.log(`Color ${color.textColor} created`);
  //     } else {
  //       console.log(`Color ${color.textColor} already exists`);
  //     }
  //   }

  //   // Insert sizes and collect their IDs
  //   const sizes = [
  //     { size: "EU 35.5", quantity: 20, isEnable: true },
  //     { size: "EU 36", quantity: 20, isEnable: true },
  //     { size: "EU 36.5", quantity: 20, isEnable: true },
  //     { size: "EU 37", quantity: 20, isEnable: true },
  //     { size: "EU 37.5", quantity: 20, isEnable: true },
  //     { size: "EU 38", quantity: 20, isEnable: true },
  //     { size: "EU 38.5", quantity: 20, isEnable: true },
  //     { size: "EU 39", quantity: 20, isEnable: true },
  //     { size: "EU 39.5", quantity: 20, isEnable: true },
  //     { size: "EU 40", quantity: 20, isEnable: true },
  //   ];

  //   const sizeIds = [];
  //   for (const size of sizes) {
  //     const newSize = await Model.SizeShoeModel.findOneAndUpdate(
  //       { size: size.size },
  //       { quantity: size.quantity, isEnable: size.isEnable },
  //       { new: true, upsert: true }
  //     );
  //     sizeIds.push(newSize._id);
  //     console.log(`Size ${size.size} processed`);
  //   }

  //   // Prepare images
  //   const images = [
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/64235401-31a6-4cc5-af9a-d57d3a0fde8a/air-jordan-1-low-shoes-459b4T.png",
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e4ff57b8-30a3-4021-aeec-e26160d047d2/air-jordan-1-low-shoes-459b4T.png",
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/912904c1-d7a7-4855-a418-3507b15c9eb4/air-jordan-1-low-shoes-459b4T.png",
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7cf34220-d131-4e56-ab8c-6c680ae2f10b/air-jordan-1-low-shoes-459b4T.png",
  //   ];

  //   // Create brands if they don't exist
  //   const brands = [
  //     { name: "Air Jordan 1", image: "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/vlwzp4wntlhwmctsuiph/air-force-1.jpg" },
  //     { name: "Dunk", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/31efddc5-18f4-412d-831d-c87a09cb3a91/dunk-low-shoes-4x8b85.png" },
  //     { name: "Air Force 1", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ebad848a-13b1-46d5-a85e-49b4b6a4953c/air-force-1-le-older-shoe-TDGHCN.png" },
  //     { name: "Air Max", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/15d2efc2-a009-4102-9548-ce5f3c70c8d0/air-max-solo-shoes-D0Mfh7.png" },
  //     { name: "Cortez", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/np029vozcemdcdmebpwm/classic-cortez-shoe-8p3Qjt.png" },
  //     { name: "Blazer", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ff42d2ee-1bde-446a-a399-a3277d843f3d/blazer-mid-77-vintage-shoes-dNWPTj.png" },
  //     { name: "Pegasus", image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/353a41d1-56cc-4848-9993-63fae58ed79f/custom-pegasus-40-by-you.png" },
  //   ];

  //   for (const brand of brands) {
  //     const brandExists = await Model.TypeShoeModel.findOne({ nameType: brand.name });
  //     if (!brandExists) {
  //       const newBrand = new Model.TypeShoeModel({
  //         nameType: brand.name,
  //         imageType: brand.image,
  //       });
  //       await newBrand.save();
  //       console.log(`${brand.name} brand created`);
  //     } else {
  //       console.log(`${brand.name} brand already exists`);
  //     }
  //   }

  //   // Create default shoe if it doesn't exist
  //   if (!defaultShoe) {
  //     defaultShoe = new Model.ShoeModel({
  //       shoeId: "air-jordan-1-low",
  //       name: "Air Jordan 1 Low",
  //       price: 20000,
  //       description: "A popular low-cut version of the iconic Air Jordan 1.",
  //       brandShoe: finalNikeBrand._id,
  //       colorShoe: defaultColor._id,
  //       sizeShoe: sizeIds,
  //       imageShoe: null, // Placeholder for now
  //       thumbnail: "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/vlwzp4wntlhwmctsuiph/air-force-1.jpg",
  //       hidden: false,
  //     });
  //     const savedShoe = await defaultShoe.save();
  //     console.log("Air Jordan 1 Low created");

  //     // Update images with the new shoe ID
  //     const newImage = new Model.ImageShoeModel({
  //       shoeId: savedShoe._id,
  //       imageShoe: images,
  //     });

  //     const savedImage = await newImage.save();
  //     console.log(`Image Array created`);

  //     // Update the defaultShoe with the savedImage ID
  //     await Model.ShoeModel.findByIdAndUpdate(savedShoe._id, { imageShoe: savedImage._id });
  //     console.log("Shoe updated with image ID");
  //   } else {
  //     console.log("Air Jordan 1 Low already exists");
  //   }
  // } catch (err) {
  //   console.error("Error inserting default values:", err);
  // }

  // try {
  //   // Check if default shoe exists
  //   let defaultShoe = await Model.ShoeModel.findOne({
  //     name: "Air Jordan 1 Low",
  //   });
  //   const finalNikeBrand = await Model.TypeShoeModel.findOne({
  //     nameType: "Air Jordan 1",
  //   });
  //   const defaultColor = await Model.ColorShoeModel.findOne({
  //     textColor: "Black",
  //   });

  //   // Insert colors if they don't exist
  //   const colors = [
  //     { textColor: "White", codeColor: "#FFFFFF" },
  //     { textColor: "Black", codeColor: "#000000" },
  //     { textColor: "Red", codeColor: "#FF0000" },
  //     { textColor: "Blue", codeColor: "#0000FF" },
  //   ];

  //   for (const color of colors) {
  //     const colorExists = await Model.ColorShoeModel.findOne({
  //       textColor: color.textColor,
  //     });
  //     if (!colorExists) {
  //       const newColor = new Model.ColorShoeModel({
  //         textColor: color.textColor,
  //         codeColor: color.codeColor,
  //         isEnable: true,
  //       });
  //       await newColor.save();
  //       console.log(`Color ${color.textColor} created`);
  //     } else {
  //       console.log(`Color ${color.textColor} already exists`);
  //     }
  //   }

  //   function generateSizeId(sizeName) {
  //     const sizeId = sizeName.replace(/\s+/g, "-");
  //     return sizeId;
  //   }

  //   const sizes = [
  //     { size: "EU 35.5", isEnable: true },
  //     { size: "EU 36", isEnable: true },
  //     { size: "EU 36.5", isEnable: true },
  //     { size: "EU 37", isEnable: true },
  //     { size: "EU 37.5", isEnable: true },
  //     { size: "EU 38", isEnable: true },
  //     { size: "EU 38.5", isEnable: true },
  //     { size: "EU 39", isEnable: true },
  //     { size: "EU 39.5", isEnable: true },
  //     { size: "EU 40", isEnable: true },
  //   ];

  //   const sizeIds = [];
  //   if (!defaultShoe) {
  //     for (const size of sizes) {
  //       // Tạo một size mới
  //       const newSize = new Model.SizeShoeModel({
  //         size: size.size,
  //         isEnable: size.isEnable,
  //         sizeId: generateSizeId(size.size),
  //       });

  //       // Lưu size mới
  //       await newSize.save();

  //       // Thêm id của size mới vào mảng sizeIds
  //       sizeIds.push(newSize._id);
  //       console.log(`Size ${size.size} processed`);
  //     }
  //   } else {
  //     console.log(`Size already exists`);
  //   }

  //   // Prepare images
  //   const images = [
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/64235401-31a6-4cc5-af9a-d57d3a0fde8a/air-jordan-1-low-shoes-459b4T.png",
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e4ff57b8-30a3-4021-aeec-e26160d047d2/air-jordan-1-low-shoes-459b4T.png",
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/912904c1-d7a7-4855-a418-3507b15c9eb4/air-jordan-1-low-shoes-459b4T.png",
  //     "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/7cf34220-d131-4e56-ab8c-6c680ae2f10b/air-jordan-1-low-shoes-459b4T.png",
  //   ];
  //   const sizedata = [
  //        ];

  //   // Create brands if they don't exist
  //   const brands = [
  //     {
  //       name: "Air Jordan 1",
  //       image:
  //         "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/vlwzp4wntlhwmctsuiph/air-force-1.jpg",
  //     },
  //     {
  //       name: "Dunk",
  //       image:
  //         "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/31efddc5-18f4-412d-831d-c87a09cb3a91/dunk-low-shoes-4x8b85.png",
  //     },
  //     {
  //       name: "Air Force 1",
  //       image:
  //         "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ebad848a-13b1-46d5-a85e-49b4b6a4953c/air-force-1-le-older-shoe-TDGHCN.png",
  //     },
  //     {
  //       name: "Air Max",
  //       image:
  //         "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/15d2efc2-a009-4102-9548-ce5f3c70c8d0/air-max-solo-shoes-D0Mfh7.png",
  //     },
  //     {
  //       name: "Cortez",
  //       image:
  //         "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/np029vozcemdcdmebpwm/classic-cortez-shoe-8p3Qjt.png",
  //     },
  //     {
  //       name: "Blazer",
  //       image:
  //         "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ff42d2ee-1bde-446a-a399-a3277d843f3d/blazer-mid-77-vintage-shoes-dNWPTj.png",
  //     },
  //     {
  //       name: "Pegasus",
  //       image:
  //         "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/353a41d1-56cc-4848-9993-63fae58ed79f/custom-pegasus-40-by-you.png",
  //     },
  //   ];

  //   for (const brand of brands) {
  //     const brandExists = await Model.TypeShoeModel.findOne({
  //       nameType: brand.name,
  //     });
  //     if (!brandExists) {
  //       const newBrand = new Model.TypeShoeModel({
  //         nameType: brand.name,
  //         imageType: brand.image,
  //       });
  //       await newBrand.save();
  //       console.log(`${brand.name} brand created`);
  //     } else {
  //       console.log(`${brand.name} brand already exists`);
  //     }
  //   }
  //   if (!defaultShoe) {
  //     defaultShoe = new Model.ShoeModel({
  //       shoeId: "air-jodan-1-low",
  //       // shoeId: "air-jordan-1-low",
  //       // name: "Air Jordan 1 Low",
  //       name: "Air Jordan 1 Low",
  //       price: 20000,
  //       description: "A popular low-cut version of the iconic Air Jordan 1.",
  //       brandShoe: finalNikeBrand._id,
  //       thumbnail:
  //         "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/vlwzp4wntlhwmctsuiph/air-force-1.jpg",
  //       status: 0,
  //       imageShoe: images,
  //     });
  //     const savedShoe = await defaultShoe.save();
  //     console.log("Air Jordan 1 Low created");
  //   } else {
  //     console.log("Air Jordan 1 Low already exists");
  //   }
  // } catch (error) {
  //   console.error("Error during default shoe initialization: ", error);
  // }


  try {

    let defaultShoe = await Model.ShoeModel.findOne({ name: "Air Jordan 3 Low" });
    const finalNikeBrand = await Model.TypeShoeModel.findOne({ nameType: "Air Jordan 1" });


    const colors = [
      { textColor: "White", codeColor: "#FFFFFF" },
      { textColor: "Black", codeColor: "#000000" },
      { textColor: "Red", codeColor: "#FF0000" },
      { textColor: "Blue", codeColor: "#0000FF" },
    ];

    const colorIds = await Promise.all(colors.map(async (color) => {
      const colorDoc = await Model.ColorShoeModel.findOne({ textColor: color.textColor });
      if (!colorDoc) {
        const newColor = new Model.ColorShoeModel(color);
        await newColor.save();
        console.log(`Color ${color.textColor} created`);
        return newColor._id;
      } else {
        console.log(`Color ${color.textColor} already exists`);
        return colorDoc._id;
      }
    }));

    function generateSizeId(sizeName) {
      return sizeName.replace(/\s+/g, '-');
    }


    const sizes = [
      "EU 35.5", "EU 36", "EU 36.5", "EU 37", "EU 37.5",
      "EU 38", "EU 38.5", "EU 39", "EU 39.5", "EU 40",
    ];

    let sizeIds = [];
    for (const size of sizes) {
      let sizeExists = await Model.SizeShoeModel.findOne({ size: size });
      if (!sizeExists) {
        let newSize = new Model.SizeShoeModel({
          size: size,
          isEnable: true,
          sizeId: generateSizeId(size),
        });
        await newSize.save();
        sizeIds.push(newSize._id);
        console.log(`Size ${size} created`);
      } else {
        sizeIds.push(sizeExists._id);
        console.log(`Size ${size} already exists`);
      }
    }


    const images = [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/air-jordan-1-low-shoes-1.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/air-jordan-1-low-shoes-2.png",
    ];


    if (!defaultShoe) {
      defaultShoe = new Model.ShoeModel({
        shoeId: "air-jordan-1-low",
        name: "Air Jordan 2 Low",
        price: 20000,
        description: "A popular low-cut version of the iconic Air Jordan 1.",
        brandShoe: finalNikeBrand._id,
        thumbnail: "https://static.nike.com/a/images/air-force-1.jpg",
        status: 0,
        imageShoe: images,
        sizeShoe: sizeIds, 
        colorShoe:colorIds,
        grender:1
      });
      await defaultShoe.save();
      console.log("Air Jordan 1 Low created");
    } else {
      console.log("Air Jordan 1 Low already exists");
    }
  } catch (error) {
    console.error("Error during default shoe initialization: ", error);
  }
}

console.log("Finished_Create");

createDefaultData().catch((error) => {
  console.error("Error:", error);
});

exports.yeu_cau_dang_nhap = (req, res, next) => {
  if (req.session.userLogin) {
    console.log("Đã Đăng Nhập");
    next();
  } else {
    console.log("Chưa Đăng Nhập");
    res.redirect("/auth/signin");
  }
};
